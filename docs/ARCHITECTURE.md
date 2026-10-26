# Struktur dan pengoperasian

## Website

`index.html` merupakan halaman utama. Gaya lama tetap dipertahankan. `assets/ui/supporting-assets.css` menyediakan gaya pendukung; `assets/experience.css` memuat gaya video dan floating chat baru. `assets/experience.js` mengatur pesan singkat dan pemilihan sumber video.

Video berada di `assets/video/erojan-product.mp4`. Pemutaran dimulai oleh pengunjung, menggunakan kontrol bawaan browser dan `playsinline`. Video tidak otomatis diputar dan menggunakan `preload="none"`. Poster memakai gambar produk yang sudah ada.

## Konfigurasi publik

`config/media.json` hanya berisi lokasi media publik. `publicVideoUrl` kosong berarti memakai video lokal. Jika URL R2 sudah tersedia, isikan URL HTTPS publik tanpa token, query, atau kredensial. Jika sumber remote gagal diputar, halaman kembali ke video lokal. Jika pengunjung sudah mulai memutar video lokal sebelum konfigurasi selesai diambil, sumber tidak diganti di tengah pemutaran.

`localVideo` dan `poster` dipakai oleh pemeriksaan berkas. Jika mengganti lokasi keduanya, sesuaikan juga `src` dan `poster` pada elemen video di `index.html` agar tetap berfungsi ketika konfigurasi gagal dimuat.

## Floating chat

Pesan singkat muncul 3 detik setelah halaman siap, lalu hilang 6 detik kemudian. Mengetuk halaman atau pesan, menekan X, mengeklik ikon WhatsApp, atau menekan Escape menutupnya. Pesan tidak muncul kembali selama halaman tersebut belum dimuat ulang. Ikon WhatsApp tetap mengarah langsung ke kontak Eza. Animasi memantul dinonaktifkan bila perangkat meminta reduced motion.

Ini sapaan lokal, bukan sistem percakapan langsung. Tidak ada backend chat atau pengiriman data formulir.

## Paket dan pratinjau

`python3 scripts/project.py build` memeriksa berkas lalu membuat ulang `dist/`. Hanya HTML, favicon, CNAME, robots, sitemap, `.nojekyll`, `assets/`, dan `config/` yang disalin. Hasil build tidak memuat dokumen, token, riwayat Git, atau referensi pribadi.

`python3 scripts/project.py serve` menyajikan `dist/` di `127.0.0.1:4173`. Jalankan build ulang setelah mengedit sumber. Jangan menyajikan seluruh folder kerja sebagai situs publik.

## Hosting yang ditemukan

Repositori memiliki `CNAME` dan `.nojekyll`, konsisten dengan publikasi statis GitHub Pages. Status pengaturan hosting saat ini belum diaudit melalui API. Tidak ada workflow deploy baru yang ditambahkan. `dist/` merupakan paket bersih untuk peninjauan atau unggahan hosting; pemilihan sumber publikasi tetap harus cocok dengan pengaturan hosting aktual.

Proyek DVN adalah sumber referensi pengelolaan kerja saja. Konfigurasi Astro, Worker, domain `wellnesglow.com`, route `/dvn`, dan token DVN tidak disalin.
