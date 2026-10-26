# EROJAN — Eroforza

Folder kerja lokal untuk website informasi EROJAN milik Eza. Kode dan riwayat Git dipulihkan pada 26 Oktober 2026 dari [repositori EROJAN](https://github.com/rezamustafa17-wq/erojan-eroforza), commit dasar `c299d62`.

Website berupa HTML, CSS, dan JavaScript statis. Tidak memerlukan pemasangan paket tambahan. Alamat yang tercatat di `CNAME`: https://eroforza.com/. Kontak pada versi terakhir GitHub: **0813-9193-9099**.

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
git add index.html assets config scripts docs README.md .env.example .gitignore robots.txt sitemap.xml
git diff --cached --stat
git commit -m "Restore local EROJAN project and prepare product video"
```

Lihat `docs/GIT-WORKFLOW.md` sebelum push. Folder `.env` dan `references/` tetap lokal. Proyek ini tidak memakai konfigurasi Astro atau domain DVN.
