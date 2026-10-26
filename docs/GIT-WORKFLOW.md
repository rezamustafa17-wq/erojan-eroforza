# Penyimpanan Git dan pemulihan

## Temuan

Saat sesi ini dimulai, folder EROJAN hanya memiliki `.env` dan `.gitignore`; tidak ada `.git` atau kode website. Jadi perintah commit yang dijalankan langsung pada folder ini belum memiliki repositori untuk menyimpan perubahan.

Repositori `https://github.com/rezamustafa17-wq/erojan-eroforza.git` berhasil diambil lengkap dengan riwayatnya. Commit terakhir yang ditemukan saat pemulihan adalah `c299d62`, bertanggal 24 Oktober 2026. Sesi cloud sebelumnya mencatat pengiriman paket besar belum menghasilkan commit; penyebab pasti kegagalan paket cloud tidak dapat ditentukan dari data yang tersedia.

## Pemeriksaan sebelum commit

```sh
python3 scripts/project.py check
python3 scripts/project.py build
git status --short --branch
git diff --check
git diff --stat
git check-ignore .env references/media/erojan-reference-2026-10-24.mp4
```

Pakai penambahan file secara eksplisit seperti contoh di README. Periksa nama file yang akan disimpan dengan `git diff --cached --name-only`. `.env`, `references/`, `.local-state/`, dan `dist/` diabaikan. Video website pada `assets/video/` memang bagian sumber website.

## Commit dan push

Perubahan pemulihan disimpan pada cabang tersendiri agar bisa ditinjau. Lihat hasil nyata sesi ini di `docs/STATUS.md`.

```sh
git branch --show-current
git log -1 --oneline
git status --short
```

Jika sudah ingin mengirim cabang ke GitHub, gunakan nama cabang yang ditampilkan:

```sh
git push -u origin HEAD
```

Push memerlukan akses GitHub pada komputer ini. Jangan memasukkan token ke URL remote. Jangan memakai force push untuk pemulihan ini. Mengirim atau menggabungkan perubahan ke cabang yang dipakai GitHub Pages dapat mengubah situs publik; periksa pengaturan publikasi sebelum melakukannya.

## Mengembalikan versi

Periksa commit dasar tanpa menimpa pekerjaan saat ini menggunakan `git show c299d62:index.html`. Untuk membatalkan perubahan yang sudah dipublikasikan, gunakan commit pembatalan yang terarah setelah memastikan commit tujuan. Tidak perlu reset paksa atau menghapus riwayat.
