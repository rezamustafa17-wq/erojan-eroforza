# Arsitektur website EROJAN

Situs statis HTML/CSS/JavaScript dengan sumber lokal dan hosting GitHub Pages pada eroforza.com.

## Sumber publik

- index.html: informasi brand EROJAN, kemasan, komposisi, registrasi dan chat.
- tentang.html: identitas kontak dan sumber informasi.
- pemesanan.html: alur menanyakan rincian dan kesepakatan pesanan.
- kebijakan-privasi.html dan ketentuan.html: informasi pengunjung.
- assets/site.css: gaya utama yang dipakai bersama.
- assets/improvements.css: perbaikan tata letak dan pilihan pengukuran.
- assets/floating-chat.css/js: alur dua pesan → ikon badge 2 → dua pesan lanjutan.
- assets/site-config.js: ID pengukuran publik; tidak memuat token.
- assets/tracking.js: pemuatan tag sesudah izin dan event klik WhatsApp.
- robots.txt, sitemap.xml, CNAME, .nojekyll, favicon.svg.

## Paket dan pemeriksaan

python3 scripts/project.py check memeriksa enam halaman, canonical, satu H1, ID/anchor, sumber lokal, SVG, JSON-LD, sitemap dan nomor WhatsApp. Pemutar dan metadata video diperiksa terhadap config/media.json. MP4 serta thumbnail masuk dist; publikasi masih perlu mengikuti status terbaru di docs/STATUS.md.

python3 scripts/project.py build menghasilkan dist berisi hanya file publik. Video, TTF sumber, experience.js/css yang tidak dipakai, config internal, .env, dokumen, references dan .local-state tidak disalin. Pratinjau hanya menyajikan dist. node scripts/test-tracking.cjs memeriksa batas privasi dan deduplikasi event tanpa mengirim permintaan eksternal.

## Data lokal

config/media.json dan assets/video menyimpan sumber dan metadata video. Video disajikan dari domain situs sendiri; R2 tetap ditunda. config/ads-plan.json adalah rancangan kampanye lokal, bukan kampanye aktif. references serta .local-state berisi bukti dan checkpoint; keduanya diabaikan Git. Tidak ada data ini yang dibutuhkan pengunjung untuk memuat halaman.

Jangan melakukan push seluruh cabang pemulihan tanpa meninjau video dan bahan sumber. Publikasi situs dilakukan dari daftar berkas yang dipilih; riwayat kerja lokal tetap dapat berisi aset yang belum ditayangkan.
