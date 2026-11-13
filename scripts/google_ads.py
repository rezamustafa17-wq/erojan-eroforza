#!/usr/bin/env python3
"""Klien REST Google Ads lokal; OAuth pribadi, tanpa dependensi tambahan."""
import argparse
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

from project import ROOT, load_env

SERVICES = (
    'campaignBudgets', 'campaigns', 'adGroups', 'adGroupAds',
    'campaignCriteria', 'adGroupCriteria', 'assets', 'campaignAssets',
    'adGroupAssets', 'customerAssets', 'conversionActions',
    'customerConversionGoals', 'campaignConversionGoals',
    'conversionGoalCampaignConfigs', 'customConversionGoals',
    'biddingStrategies', 'sharedSets', 'sharedCriteria',
    'campaignSharedSets', 'labels', 'campaignLabels',
    'assetGroups', 'assetGroupAssets', 'userLists', 'googleAds',
)


class ApiFailure(Exception):
    pass


def ads_environment():
    env = load_env()
    token_file = ROOT / '.env.google-ads'
    if not env.get('GOOGLE_ADS_REFRESH_TOKEN') and token_file.is_file() and not token_file.is_symlink():
        for line in token_file.read_text().splitlines():
            match = re.fullmatch(r'GOOGLE_ADS_REFRESH_TOKEN=(\S+)', line)
            if match:
                env['GOOGLE_ADS_REFRESH_TOKEN'] = match[1]
    return env


def customer_id(value):
    value = re.sub(r'[-\s]', '', value or '')
    if not re.fullmatch(r'\d{10}', value):
        raise ValueError('Customer ID harus 10 digit; tentukan akun EROJAN secara eksplisit.')
    return value


def clean_output(value, secrets):
    text = json.dumps(value, ensure_ascii=False)
    for secret in sorted((s for s in secrets if s), key=len, reverse=True):
        text = text.replace(secret, '[RAHASIA DIHAPUS]')
    return text


def request_json(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        # Jangan mencetak respons mentah OAuth yang mungkin memuat kredensial.
        try:
            payload = json.loads(exc.read())
        except Exception:
            payload = {}
        err = payload.get('error', {}) if isinstance(payload, dict) else {}
        status = err.get('status', '') if isinstance(err, dict) else str(err)
        codes = []
        if isinstance(err, dict):
            for detail in err.get('details', []):
                for issue in detail.get('errors', []):
                    codes.append(issue.get('errorCode', {}))
        raise ApiFailure(f'HTTP {exc.code}; status={status}; kode={json.dumps(codes)}. '
                         'Permintaan tidak diulang otomatis.') from None
    except (urllib.error.URLError, TimeoutError, OSError):
        raise ApiFailure('Koneksi gagal/timeout. Hasil mutasi mungkin belum diketahui; '
                         'baca ulang state akun sebelum mencoba lagi.') from None


def access_token(env):
    keys = ('GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN')
    missing = [k for k in keys if not env.get(k)]
    if missing:
        raise ValueError('Kredensial belum lengkap: ' + ', '.join(missing))
    body = urllib.parse.urlencode({
        'client_id': env[keys[0]], 'client_secret': env[keys[1]],
        'refresh_token': env[keys[2]], 'grant_type': 'refresh_token',
    }).encode()
    response = request_json('https://oauth2.googleapis.com/token', body,
                            {'Content-Type': 'application/x-www-form-urlencoded'})
    result = response.get('access_token')
    if not result:
        raise ApiFailure('OAuth tidak mengembalikan access token.')
    return result


def mutation_body(payload, apply):
    if not isinstance(payload, dict):
        raise ValueError('Payload harus objek JSON.')
    body = dict(payload)
    if 'validate_only' in body or 'partial_failure' in body:
        raise ValueError('Gunakan nama field REST lowerCamelCase; jangan validate_only/partial_failure.')
    ops = body.get('mutateOperations', body.get('operations'))
    if not isinstance(ops, list) or not ops:
        raise ValueError('Isi operations atau mutateOperations dengan operasi yang sesuai schema Google.')
    # Default selalu validasi; nilai dari file tidak dapat mengaktifkan penyimpanan.
    body['validateOnly'] = not apply
    body['partialFailure'] = False
    return body


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('doctor', help='Status lokal saja; tidak menampilkan nilai rahasia.')
    sub.add_parser('accounts', help='Daftar customer yang terlihat oleh OAuth pribadi.')
    query = sub.add_parser('query', help='Baca GAQL dari file.')
    query.add_argument('--customer-id')
    query.add_argument('--file', required=True)
    mutate = sub.add_parser('mutate', help='Validasi default; --apply menyimpan perubahan.')
    mutate.add_argument('--customer-id', required=True)
    mutate.add_argument('--service', required=True, choices=SERVICES)
    mutate.add_argument('--file', required=True)
    mutate.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    env = ads_environment()
    if args.command == 'doctor':
        keys = ('GOOGLE_PROJECT_ID', 'GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET',
                'GOOGLE_ADS_REFRESH_TOKEN', 'GOOGLE_ADS_CUSTOMER_ID', 'GOOGLE_ADS_LOGIN_CUSTOMER_ID')
        print(json.dumps({k: 'terisi' if env.get(k) else 'kosong' for k in keys}, indent=2))
        print('Tidak menguji OAuth, level akses Google Cloud, atau akun jarak jauh.')
        return
    version = env.get('GOOGLE_ADS_API_VERSION') or 'v26'
    if not re.fullmatch(r'v\d+', version):
        raise ValueError('GOOGLE_ADS_API_VERSION harus seperti v26.')
    base = 'https://googleads.googleapis.com/' + version
    if args.command == 'accounts':
        path, body = '/customers:listAccessibleCustomers', None
    else:
        cid = customer_id(args.customer_id or env.get('GOOGLE_ADS_CUSTOMER_ID'))
        if args.command == 'query':
            path = f'/customers/{cid}/googleAds:searchStream'
            body = {'query': Path(args.file).read_text()}
        else:
            path = f'/customers/{cid}/{args.service}:mutate'
            body = mutation_body(json.loads(Path(args.file).read_text()), args.apply)
    bearer = access_token(env)
    headers = {'Authorization': 'Bearer ' + bearer, 'Content-Type': 'application/json'}
    if env.get('GOOGLE_ADS_LOGIN_CUSTOMER_ID'):
        headers['login-customer-id'] = customer_id(env['GOOGLE_ADS_LOGIN_CUSTOMER_ID'])
    result = request_json(base + path, None if body is None else json.dumps(body).encode(), headers)
    secrets = [bearer] + [v for k, v in env.items() if any(s in k for s in ('TOKEN', 'SECRET', 'PASSWORD', 'API_KEY'))]
    print(clean_output(result, secrets))
    if args.command == 'mutate':
        print('Perubahan dikirim; cocokkan hasil dengan pembacaan ulang.' if args.apply
              else 'Validasi saja: tidak ada perubahan disimpan.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, ApiFailure, OSError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
