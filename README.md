# EROJAN — Eroforza

Folder kerja lokal untuk website informasi EROJAN milik Eza. Kode dan riwayat Git dipulihkan pada 26 Oktober 2026 dari [repositori EROJAN](https://github.com/rezamustafa17-wq/erojan-eroforza), commit dasar `c299d62`.

Website berupa HTML, CSS, dan JavaScript statis. Tidak memerlukan pemasangan paket tambahan. Alamat yang tercatat di `CNAME`: https://eroforza.com/. Kontak pada versi terakhir GitHub: **0813-9193-9099**.

## Hasil terbaru

Kontrol privasi baru sudah terbit pada 3 November 2026 setelah persetujuan pemilik. Overlay yang menutupi tombol WhatsApp diganti panel dalam halaman; izin statistik dan iklan terpisah. Basic Consent Mode tetap digunakan, Advanced/cookieless nonaktif. Lihat [hasil publikasi consent](docs/HASIL-PUBLIKASI-CONSENT-EROJAN-2026-11-03.md).

Landing page baru terbit pada 3 November 2026 dengan video Tora Sudiro, tanpa nominal harga, dan CTA ke WhatsApp. Pengukuran dengan izin pengunjung dipertahankan. Perubahan sitelink belum diterapkan karena pembatasan konektor. Lihat [hasil publikasi](docs/HASIL-PUBLIKASI-LANDING-EROJAN-2026-11-03.md) dan [daftar tujuan sitelink](docs/SITELINK-LANDING-BARU-EROJAN-2026-11-03.md).

Koreksi materi EROJAN terbit pada 1 November 2026: komposisi mengikuti detail registrasi BPOM, video testimoni diganti video informasi faktual, dan tiga teks iklan diperbaiki. Dua pengajuan peninjauan Google berhasil diterima; keputusan akhir belum tersedia. Campaign kini aktif, dengan budget tetap Rp100.000/hari. Label Indonesia lengkap masih diperlukan untuk audit menyeluruh. Lihat [laporan koreksi](docs/HASIL-KOREKSI-KEBIJAKAN-EROJAN-2026-11-01.md).

## Riwayat eksekusi 28 Oktober 2026

Arsitektur Google Ads EROJAN telah diterapkan 28 Oktober 2026: Maximize conversions tanpa tCPA, dua grup/delapan Exact keyword dan aset lengkap. Campaign tetap Paused karena review serta bukti materi belum lengkap. Lihat [hasil eksekusi](docs/HASIL-EKSEKUSI-MAX-KONVERSI-EROJAN-2026-10-28.md) dan [SOP evaluasi pesanan](docs/SOP-EVALUASI-PESANAN-EROJAN.md).

Versi peningkatan SEO sudah tersedia di https://eroforza.com/. Enam halaman publik meliputi informasi produk, video, Tentang Eza, pemesanan, privasi dan ketentuan. Search Console telah terverifikasi dengan sitemap lima URL; GA4 memakai pilihan izin pengunjung.

Baca [laporan lengkap peningkatan](docs/HASIL-PENINGKATAN-EROJAN-2026-10-26.md), [pengukuran](docs/PENGUKURAN-EROJAN.md), dan [status proyek](docs/STATUS.md) sebelum melanjutkan. R2 tetap ditunda. Perbaikan 27 Oktober mengembalikan pemutar beranda, halaman `video.html`, metadata dan sitemap video; `dist` kini menyertakan MP4 beserta thumbnail. Perbaikan sudah diterbitkan setelah persetujuan pemilik; video publik berhasil diputar.

## Mulai bekerja

Jalankan dari folder ini:

```sh
python3 scripts/project.py doctor
python3 scripts/project.py check
python3 scripts/project.py build
python3 scripts/project.py serve
```

Buka http://127.0.0.1:4173/. Hentikan pratinjau dengan Ctrl+C. Server hanya menyajikan `dist/`, sehingga `.env` dan referensi pribadi tidak ikut tersaji.

## Berkas penting

| Berkas | Kegunaan |
| --- | --- |
| `index.html` | Halaman utama dan isi produk yang dipulihkan |
| `assets/` | Gambar, font, gaya, dan video website |
| `config/media.json` | Pilihan video lokal atau URL publik R2 |
| `docs/STATUS.md` | Progres, hasil pemeriksaan, dan yang belum selesai |
| `docs/PROJECT-BRIEF.md` | Ruang lingkup dan keputusan proyek |
| `docs/ARCHITECTURE.md` | Struktur dan cara membuat paket website |
| `docs/R2-VIDEO.md` | Video, pemeriksaan koneksi R2, dan pengaturan URL |
| `docs/GIT-WORKFLOW.md` | Commit, push, dan pemulihan perubahan |
| `docs/REFERENCES.md` | Asal referensi dan perbedaan antarversi |
| `docs/CONTENT.md` | Sumber konten dan batas data yang sudah diverifikasi |
| `docs/QA-CHECKLIST.md` | Pemeriksaan sebelum perubahan dipublikasikan |
| `references/` | Salinan bahan lokal; tidak masuk Git atau paket website |
| `exports/` | Paket ZIP website siap ditinjau, tanpa token dan dokumen internal |

## Menyimpan perubahan

```sh
python3 scripts/project.py check
python3 scripts/project.py build
git status
git add index.html tentang.html pemesanan.html kebijakan-privasi.html ketentuan.html assets config scripts docs README.md robots.txt sitemap.xml
git diff --cached --stat
git commit -m "Restore local EROJAN project and prepare product video"
```

Lihat `docs/GIT-WORKFLOW.md` sebelum push. Folder `.env` dan `references/` tetap lokal. Proyek ini tidak memakai konfigurasi Astro atau domain DVN.
