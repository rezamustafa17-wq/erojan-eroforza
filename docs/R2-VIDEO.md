# Video produk dan Cloudflare R2

## Ditunda: menunggu aktivasi

Keputusan pengguna pada 26 Oktober 2026: tahan pekerjaan R2 sampai pemilik mengaktifkannya melalui dashboard dengan kartu kredit. Aktivasi/checkout belum dilakukan dalam sesi ini. Pemeriksaan API terakhir: token aktif, akun sesuai, daftar langganan kosong, dan R2 ditolak HTTP 403 kode `10042`.

Langkah berikutnya setelah aktivasi oleh pemilik: uji ulang akses bucket. Unggah video dan konfigurasi URL publik masih tertunda.

## Berkas yang tersedia

- Video website: `assets/video/erojan-product.mp4`.
- Salinan asli lokal: `references/media/erojan-reference-2026-10-24.mp4`.
- Asal: `Downloads/WhatsApp Video 2026-10-24 at 14.42.36.mp4`.
- Konfigurasi URL: `config/media.json`.

Video disalin tanpa transcode. Isi, codec, dan kesesuaian seluruh materi video perlu ditinjau sebelum publikasi; pemeriksaan kontainer MP4 tidak membuktikan semua perangkat bisa memutarnya.

## Keadaan sebelumnya

Chat lama merekam respons Cloudflare `10042`, dengan pesan “Please enable R2 through the Cloudflare Dashboard.” Status terkini hasil pemeriksaan lokal dicatat di `docs/STATUS.md` dan `.local-state/r2-status.json`. Respons lama tidak diperlakukan sebagai bukti bahwa status akun tidak pernah berubah.

## Memeriksa akses

Token sudah ada pada `.env` lokal. Jangan menyalin token ke kode website atau ke `config/media.json`.

```sh
python3 scripts/project.py doctor
python3 scripts/project.py verify-r2
```

Pemeriksaan hanya meminta daftar bucket melalui API. Keluaran berupa status HTTP dan kode kesalahan tanpa token atau respons mentah. Pemeriksaan ini tidak membuat bucket, mengunggah file, mengaktifkan langganan, atau mengubah akses publik. Account ID bawaan berasal dari chat lama dan dapat diganti dengan `CLOUDFLARE_ACCOUNT_ID` pada `.env` bila diperlukan.

## Setelah pemilik mengaktifkan R2

1. Buka dashboard Cloudflare untuk akun yang benar dan aktifkan R2 jika belum aktif.
2. Jalankan pemeriksaan akses di atas sampai berhasil. Akses daftar bucket belum membuktikan izin unggah.
3. Buat atau pilih bucket media khusus website, lalu unggah video melalui dashboard R2. Nama yang disiapkan pada contoh konfigurasi adalah `erojan-media`; keberadaannya belum diasumsikan.
4. Untuk penggunaan produksi, hubungkan custom domain media dari bucket. `r2.dev` tersedia sebagai URL pengembangan dengan batas penggunaan; jangan menganggap endpoint S3 sebagai URL publik video.
5. Pastikan URL objek merespons berhasil tanpa login, memiliki tipe `video/mp4`, dan dapat diputar serta digeser posisinya di browser.
6. Isi `publicVideoUrl` di `config/media.json`, misalnya URL objek HTTPS dari domain media yang benar. Jangan memakai contoh domain yang belum dikonfigurasi.
7. Jalankan check dan build, lalu periksa pemutaran di desktop serta ponsel.

Video lokal tetap tersedia ketika URL R2 kosong atau sumber remote gagal. Unggahan dan aktivasi layanan tidak dilakukan oleh alat pemeriksaan proyek ini.

## Rujukan resmi

- [Cloudflare: Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/)
- [Cloudflare: R2 API](https://developers.cloudflare.com/api/resources/r2/)
- [Cloudflare: Wrangler R2 commands](https://developers.cloudflare.com/r2/reference/wrangler-commands/)

Panduan akses publik disesuaikan dengan dokumentasi resmi yang dibaca pada 26 Oktober 2026.
