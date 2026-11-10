#!/usr/bin/env python3
"""Peralatan proyek statis EROJAN; hanya pustaka bawaan Python 3."""
import argparse
import functools
import http.server
import json
import re
import shutil
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
PAGES = ['index.html', 'tentang.html', 'pemesanan.html', 'kebijakan-privasi.html', 'ketentuan.html', 'video.html']
FILES = PAGES + ['favicon.svg', 'CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml']
DIRECTORIES = ['assets']


def media():
    data = json.loads((ROOT / 'config/media.json').read_text())
    for key in ['localVideo', 'poster']:
        p = (ROOT / data[key]).resolve()
        if ROOT not in p.parents or not p.is_file():
            raise ValueError('File media tidak tersedia: ' + key)
    remote = data['publicVideoUrl']
    if remote:
        url = urlsplit(remote)
        if url.scheme != 'https' or not url.hostname or url.username or url.password or url.query or url.fragment:
            raise ValueError('publicVideoUrl harus URL HTTPS publik tanpa kredensial atau query rahasia.')
    return data


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.errors, self.h1 = set(), [], [], 0
        self.json_parts, self.json_active = [], False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if a.get('id'):
            if a['id'] in self.ids: self.errors.append('ID duplikat: ' + a['id'])
            self.ids.add(a['id'])
        for key in ['href', 'src', 'poster']:
            if a.get(key): self.refs.append(a[key])
        if a.get('srcset'):
            self.refs.extend(x.strip().split()[0] for x in a['srcset'].split(','))
        if tag == 'img' and 'alt' not in a: self.errors.append('Gambar tanpa alt')
        if a.get('target') == '_blank' and 'noopener' not in a.get('rel', ''):
            self.errors.append('Tautan tab baru tanpa noopener')
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.json_active = True
            self.json_parts.append('')

    def handle_data(self, data):
        if self.json_active: self.json_parts[-1] += data

    def handle_endtag(self, tag):
        if tag == 'script': self.json_active = False


def check():
    data = media()
    errors, pages = [], {}
    for name in PAGES:
        if not (ROOT / name).is_file():
            errors.append('Halaman tidak ditemukan: ' + name)
            continue
        page = Page()
        text = (ROOT / name).read_text()
        page.feed(text)
        pages[name] = page
        errors.extend(name + ': ' + e for e in page.errors)
        if page.h1 != 1: errors.append(name + ': harus memiliki satu H1')
        canonical = 'https://eroforza.com/' + ('' if name == 'index.html' else name)
        if not re.search(r'rel="canonical"\s+href="' + re.escape(canonical) + r'"', text):
            errors.append(name + ': canonical tidak sesuai')
        if re.search(r'<meta[^>]+content="[^"]*noindex', text): errors.append(name + ': tidak boleh noindex')
        if set(re.findall(r'wa\.me/(\d+)', text)) != {'6281391939099'}:
            errors.append(name + ': nomor WhatsApp tidak sesuai')
        for part in page.json_parts: json.loads(part)
    for name, page in pages.items():
        for ref in page.refs:
            u = urlsplit(ref)
            if u.scheme or u.netloc: continue
            p = (ROOT / (unquote(u.path).lstrip('/') or name)).resolve()
            if ROOT not in p.parents or not p.is_file():
                errors.append(name + ': aset tidak ditemukan: ' + ref)
            elif u.fragment:
                if p.suffix == '.svg': ids = {x.attrib.get('id') for x in ET.parse(p).iter()}
                elif p.name in pages: ids = pages[p.name].ids
                else: continue
                if u.fragment not in ids: errors.append(name + ': anchor tidak ditemukan: ' + ref)
    for p in (ROOT / 'assets').rglob('*.css'):
        for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)', p.read_text()):
            if urlsplit(ref).scheme or ref.startswith('#'): continue
            if not (p.parent / unquote(ref)).is_file(): errors.append('Aset CSS tidak ditemukan: ' + ref)
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    locations = {x.text for x in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
    expected = {'https://eroforza.com/' + ('' if p == 'index.html' else p) for p in PAGES}
    if locations != expected: errors.append('Sitemap tidak sesuai halaman publik')
    for name in FILES:
        if not (ROOT / name).is_file(): errors.append('Berkas wajib tidak ditemukan: ' + name)
    # Keep the visible player, crawlable metadata and video sitemap in sync.
    expected_content = 'https://eroforza.com/' + data['localVideo']
    expected_poster = 'https://eroforza.com/' + data['poster']
    for name in ['index.html', 'video.html']:
        page = pages.get(name)
        if not page: continue
        source = (ROOT / name).read_text()
        if '<video ' not in source or data['localVideo'] not in page.refs:
            errors.append(name + ': pemutar video lokal wajib tersedia')
        objects = [item for part in page.json_parts
                   for item in json.loads(part).get('@graph', [])
                   if item.get('@type') == 'VideoObject']
        if len(objects) != 1:
            errors.append(name + ': harus memiliki satu VideoObject')
        else:
            obj = objects[0]
            expected = dict(name=data['name'], description=data['description'],
                            uploadDate=data['uploadDate'], duration=data['duration'],
                            contentUrl=expected_content, thumbnailUrl=[expected_poster])
            if any(obj.get(k) != v for k, v in expected.items()):
                errors.append(name + ': metadata video tidak sesuai config/media.json')
    video_ns = '{http://www.google.com/schemas/sitemap-video/1.1}'
    entries = sitemap.findall('.//' + video_ns + 'video')
    if len(entries) != 1 or entries[0].findtext(video_ns + 'content_loc') != expected_content or entries[0].findtext(video_ns + 'thumbnail_loc') != expected_poster:
        errors.append('Sitemap video tidak sesuai konfigurasi media')
    video = ROOT / data['localVideo']
    with video.open('rb') as f:
        if b'ftyp' not in f.read(64): errors.append('Video lokal bukan kontainer MP4 yang dikenal')
    if errors: raise ValueError('\n'.join(errors))
    print('LULUS: enam halaman, canonical, anchor, aset, ikon, JSON-LD, sitemap, WhatsApp, dan arsip video.')


def build():
    check()
    if DIST.is_symlink(): raise ValueError('dist tidak boleh berupa symlink')
    if DIST.exists(): shutil.rmtree(DIST)
    DIST.mkdir()
    for name in FILES: shutil.copy2(ROOT / name, DIST / name)
    for name in DIRECTORIES:
        shutil.copytree(ROOT / name, DIST / name, ignore=shutil.ignore_patterns('*.ttf', 'experience.js', 'experience.css'))
    # Validate that the deployable package resolves the same public references.
    for name in PAGES:
        page = Page(); page.feed((DIST / name).read_text())
        for ref in page.refs:
            u = urlsplit(ref)
            if not u.scheme and not u.netloc and u.path:
                if not (DIST / unquote(u.path).lstrip('/')).is_file():
                    raise ValueError('Referensi tidak masuk paket: ' + ref)
    print('Paket website siap di dist/. Dokumen, .env, .git, dan references tidak disalin.')


def load_env():
    values = {}
    p = ROOT / '.env'
    if p.exists():
        for line in p.read_text().splitlines():
            m = re.match(r'^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$', line)
            if m: values[m[1]] = m[2].strip('"\'')
    return values


def doctor():
    env = load_env()
    print('Python:', sys.version.split()[0])
    print('Riwayat Git:', 'tersedia' if (ROOT / '.git').is_dir() else 'belum ada')
    print('Token Cloudflare:', 'terisi' if env.get('CLOUDFLARE_API_TOKEN') else 'belum diisi')
    print('Video lokal:', 'tersedia' if (ROOT / 'assets/video/erojan-product.mp4').is_file() else 'belum ada')
    print('URL video R2:', 'dikonfigurasi' if media()['publicVideoUrl'] else 'belum diisi; memakai video lokal')


def verify_r2():
    env = load_env()
    token = env.get('CLOUDFLARE_API_TOKEN')
    account = env.get('CLOUDFLARE_ACCOUNT_ID', '767723b319b506885ae681dc3e0eec9e')
    if not token: raise ValueError('Isi CLOUDFLARE_API_TOKEN di .env lokal terlebih dahulu.')
    if not re.fullmatch(r'[a-fA-F0-9]{32}', account): raise ValueError('Format account ID tidak valid.')
    request = urllib.request.Request('https://api.cloudflare.com/client/v4/accounts/' + account + '/r2/buckets',
        headers={'Authorization': 'Bearer ' + token, 'User-Agent': 'EROJAN-local-check/1.0'})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            status, result = response.status, json.load(response)
    except urllib.error.HTTPError as e:
        status = e.code
        try: result = json.loads(e.read())
        except (ValueError, OSError): result = {}
    except urllib.error.URLError:
        raise ValueError('Cloudflare tidak dapat dihubungi; periksa koneksi jaringan.')
    codes = [e.get('code') for e in result.get('errors', [])]
    ok = status == 200 and result.get('success') is True
    summary = {'http_status': status, 'success': ok, 'error_codes': codes}
    if 10042 in codes: summary['note'] = 'R2 belum diaktifkan melalui dashboard Cloudflare.'
    print(json.dumps(summary, ensure_ascii=False))
    state = ROOT / '.local-state'
    state.mkdir(exist_ok=True)
    from datetime import datetime, timezone
    summary['checked_at'] = datetime.now(timezone.utc).isoformat()
    (state / 'r2-status.json').write_text(json.dumps(summary, indent=2))
    return 0 if ok else 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['check', 'build', 'serve', 'doctor', 'verify-r2'])
    parser.add_argument('--port', type=int, default=4173)
    args = parser.parse_args()
    try:
        if args.command == 'check': check()
        elif args.command == 'build': build()
        elif args.command == 'doctor': doctor()
        elif args.command == 'verify-r2': return verify_r2()
        elif args.command == 'serve':
            if not (DIST / 'index.html').exists(): build()
            handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(DIST))
            server = http.server.ThreadingHTTPServer(('127.0.0.1', args.port), handler)
            print('Pratinjau: http://127.0.0.1:' + str(args.port) + '/', flush=True)
            server.serve_forever()
    except KeyboardInterrupt: print('\nPratinjau dihentikan.')
    except (ValueError, OSError) as e:
        print('GAGAL: ' + str(e), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
