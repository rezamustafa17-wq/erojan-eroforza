# Pemeriksaan sebelum publikasi

## Otomatis

```sh
python3 scripts/project.py check
python3 scripts/project.py build
git diff --check
```

Pemeriksaan mencakup satu H1, ID dan anchor, aset lokal, ikon SVG, gambar dengan alt, tautan tab baru, struktur JSON-LD, sitemap, nomor WhatsApp, dan keberadaan kontainer MP4. Build membatasi file yang masuk ke paket publik.

## Browser

- Periksa desktop dan ponsel: teks terbaca, tidak meluber ke samping.
- Setelah 2,5 detik, sapaan lonjong tampil; 6 detik kemudian hilang dan ikon chat memantul.
- Muat ulang, lalu ketuk halaman, pesan, dan tombol X secara terpisah: sapaan menutup tanpa muncul lagi pada pemuatan halaman itu.
- Tekan Escape saat sapaan terbuka; uji navigasi keyboard dan reduced motion.
- Ikon memakai logo WhatsApp, radar hijau berhenti setelah tiga putaran tiap cincin, dan ikon tetap memantul.
- Ikon WhatsApp membuka kontak yang benar; pengujian tidak perlu mengirim pesan.
- Video bisa diputar, dijeda, dan digeser; audio diperiksa oleh pemilik sebelum publikasi.
- URL R2 kosong tetap memakai file lokal; URL R2 gagal kembali ke sumber lokal.
- Semua FAQ bisa dibuka dan ditutup.
- `.env` dan `references/` tidak tersedia melalui server pratinjau.

## Pengukuran dan hosting

Tracking konversi, penerimaan pesan oleh operator, Search Console, audit menyeluruh isi video, dan konfigurasi hosting tidak dibuktikan oleh pemeriksaan struktur. Catat hasil nyata di `docs/STATUS.md` agar pemeriksaan yang belum dilakukan tidak tertukar dengan yang sudah lulus.
