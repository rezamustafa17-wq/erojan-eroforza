# Struktur dan pengoperasian

## Website

`index.html` merupakan halaman utama. Gaya lama tetap dipertahankan. `assets/ui/supporting-assets.css` menyediakan gaya pendukung; `assets/experience.css` dan `assets/experience.js` mengatur video. `assets/floating-chat.css` dan `assets/floating-chat.js` mengatur floating WhatsApp secara terpisah.

Video berada di `assets/video/erojan-product.mp4`. Pemutaran dimulai oleh pengunjung, menggunakan kontrol bawaan browser dan `playsinline`. Video tidak otomatis diputar dan menggunakan `preload="none"`. Poster memakai gambar produk yang sudah ada.

## Konfigurasi publik

`config/media.json` hanya berisi lokasi media publik. `publicVideoUrl` kosong berarti memakai video lokal. Jika URL R2 sudah tersedia, isikan URL HTTPS publik tanpa token, query, atau kredensial. Jika sumber remote gagal diputar, halaman kembali ke video lokal. Jika pengunjung sudah mulai memutar video lokal sebelum konfigurasi selesai diambil, sumber tidak diganti di tengah pemutaran.

`localVideo` dan `poster` dipakai oleh pemeriksaan berkas. Jika mengganti lokasi keduanya, sesuaikan juga `src` dan `poster` pada elemen video di `index.html` agar tetap berfungsi ketika konfigurasi gagal dimuat.

## Floating chat

Tombol WhatsApp selalu menampilkan label “Konsultan Erojan Online” dan “Siap Balas Cepat”, menyatu dengan ikon WhatsApp pada kapsul selebar 274 px dan tinggi 58 px. Label tetap terlihat sebelum, selama, dan sesudah animasi percakapan.

Panel contoh percakapan muncul setelah 2,5 detik. Indikator mengetik tampil terlebih dahulu, diikuti pesan pertama setelah 0,85 detik. Indikator mengetik muncul kembali, kemudian pesan kedua tampil setelah 2,9 detik. Panel hilang 6,5 detik sesudah mulai tampil. Klik halaman/pesan, X, atau Escape menutup panel lebih awal dan membatalkan semua jadwal pesan berikutnya. Panel tidak terbuka kembali sampai halaman dimuat ulang.

Ikon WhatsApp memantul berkala setelah panel ditutup. Tiga cincin radar hijau menjalankan masing-masing tiga putaran lalu berhenti. Label tetap diam dan terbaca. Reduced motion mematikan animasi gerak. Tombol selalu mengarah langsung ke nomor Eza yang sudah tersimpan.

Panel ditandai “Contoh percakapan”; ini animasi lokal tanpa backend chat atau pengiriman data formulir.

## Paket dan pratinjau

`python3 scripts/project.py build` memeriksa berkas lalu membuat ulang `dist/`. Hanya HTML, favicon, CNAME, robots, sitemap, `.nojekyll`, `assets/`, dan `config/` yang disalin. Hasil build tidak memuat dokumen, token, riwayat Git, atau referensi pribadi.

`python3 scripts/project.py serve` menyajikan `dist/` di `127.0.0.1:4173`. Jalankan build ulang setelah mengedit sumber. Jangan menyajikan seluruh folder kerja sebagai situs publik.

## Hosting yang ditemukan

Repositori memiliki `CNAME` dan `.nojekyll`, konsisten dengan publikasi statis GitHub Pages. Status pengaturan hosting saat ini belum diaudit melalui API. Tidak ada workflow deploy baru yang ditambahkan. `dist/` merupakan paket bersih untuk peninjauan atau unggahan hosting; pemilihan sumber publikasi tetap harus cocok dengan pengaturan hosting aktual.

Proyek DVN adalah sumber referensi pengelolaan kerja saja. Konfigurasi Astro, Worker, domain `wellnesglow.com`, route `/dvn`, dan token DVN tidak disalin.
