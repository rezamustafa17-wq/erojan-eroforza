#!/usr/bin/env python3
"""Login OAuth Google Ads Desktop app; token disimpan lokal tanpa dicetak."""
import base64
import hashlib
from http.server import BaseHTTPRequestHandler, HTTPServer
import os
from pathlib import Path
import secrets
import time
import urllib.parse
import webbrowser

from google_ads import ApiFailure, request_json
from project import ROOT, load_env

SCOPE = 'https://www.googleapis.com/auth/adwords'
TOKEN_FILE = ROOT / '.env.google-ads'


def pkce_challenge(verifier):
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode('ascii')).digest()).rstrip(b'=').decode('ascii')


def callback_result(path, expected_state):
    parsed = urllib.parse.urlsplit(path)
    params = urllib.parse.parse_qs(parsed.query)
    if parsed.path != '/':
        return None
    if not secrets.compare_digest(params.get('state', [''])[0], expected_state):
        return None
    if params.get('error'):
        return {'denied': True}
    code = params.get('code', [''])[0]
    return {'code': code} if code else None


def save_token(path, refresh_token):
    if not isinstance(refresh_token, str) or not refresh_token or any(c.isspace() for c in refresh_token):
        raise ValueError('Refresh token tidak valid; tidak disimpan.')
    # O_EXCL juga menolak menimpa file/symlink lama. Tidak ada token lama yang dihapus.
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as stream:
        stream.write('# Token OAuth Ads lokal; jangan unggah atau bagikan.\n')
        stream.write('GOOGLE_ADS_REFRESH_TOKEN=' + refresh_token + '\n')


def main():
    env = load_env()
    missing = [k for k in ('GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET') if not env.get(k)]
    if missing:
        raise ValueError('Isi OAuth Desktop app di .env terlebih dahulu: ' + ', '.join(missing))
    if env.get('GOOGLE_ADS_REFRESH_TOKEN') or TOKEN_FILE.exists() or TOKEN_FILE.is_symlink():
        raise ValueError('Refresh token/file token sudah ada; login dihentikan agar data lama tidak tertimpa.')
    state = secrets.token_urlsafe(32)
    verifier = secrets.token_urlsafe(64)
    outcome = {}

    class Callback(BaseHTTPRequestHandler):
        def log_message(self, *_args):
            pass  # Jangan merekam URL callback yang mengandung authorization code.

        def do_GET(self):
            result = callback_result(self.path, state)
            self.send_response(200 if result else 400)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Referrer-Policy', 'no-referrer')
            self.end_headers()
            self.wfile.write(('Respons diterima. Kembali ke terminal.' if result else 'Callback tidak valid.').encode())
            if result:
                outcome.update(result)

    with HTTPServer(('127.0.0.1', 0), Callback) as server:
        server.timeout = 1
        redirect = 'http://127.0.0.1:' + str(server.server_port)
        query = urllib.parse.urlencode({
            'client_id': env['GOOGLE_ADS_CLIENT_ID'], 'redirect_uri': redirect,
            'response_type': 'code', 'scope': SCOPE, 'access_type': 'offline',
            'prompt': 'consent', 'state': state, 'code_challenge': pkce_challenge(verifier),
            'code_challenge_method': 'S256',
        })
        url = 'https://accounts.google.com/o/oauth2/v2/auth?' + query
        print('Login Google dibuka di browser. Pilih akun Ads yang benar dan tinjau persetujuannya.')
        print('Jika browser tidak terbuka, buka tautan ini di komputer yang sama:\n' + url)
        webbrowser.open(url)
        deadline = time.monotonic() + 300
        while not outcome and time.monotonic() < deadline:
            server.handle_request()
    if not outcome:
        raise ValueError('Login melewati 5 menit; listener ditutup, tidak ada token tersimpan.')
    if outcome.get('denied'):
        raise ValueError('Persetujuan OAuth ditolak; tidak ada token tersimpan.')
    body = urllib.parse.urlencode({
        'client_id': env['GOOGLE_ADS_CLIENT_ID'], 'client_secret': env['GOOGLE_ADS_CLIENT_SECRET'],
        'code': outcome['code'], 'redirect_uri': redirect, 'grant_type': 'authorization_code',
        'code_verifier': verifier,
    }).encode()
    response = request_json('https://oauth2.googleapis.com/token', body,
                            {'Content-Type': 'application/x-www-form-urlencoded'})
    if response.get('scope') and SCOPE not in response['scope'].split():
        raise ValueError('Scope Ads tidak diberikan; token tidak disimpan.')
    refresh = response.get('refresh_token')
    if not refresh:
        raise ValueError('Google tidak memberikan refresh token; periksa pengaturan OAuth dan persetujuan.')
    save_token(TOKEN_FILE, refresh)
    print('Refresh token disimpan di .env.google-ads dengan izin 600. Nilainya tidak ditampilkan.')
    print('Lanjutkan dengan: python3 scripts/google_ads.py accounts')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, ApiFailure, OSError, KeyboardInterrupt) as exc:
        # Hindari exception OS mentah yang mungkin menyertakan isi/URL kredensial.
        print(str(exc) if isinstance(exc, (ValueError, ApiFailure)) else 'Login berhenti; file lama dipertahankan.')
        raise SystemExit(1)
