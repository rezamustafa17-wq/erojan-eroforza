# Struktur dan pengoperasian

## Website

`index.html` merupakan halaman utama. Gaya lama tetap dipertahankan. `assets/ui/supporting-assets.css` menyediakan gaya pendukung; `assets/experience.css` dan `assets/experience.js` mengatur video. `assets/floating-chat.css` dan `assets/floating-chat.js` mengatur floating WhatsApp secara terpisah.

Video berada di `assets/video/erojan-product.mp4`. Pemutaran dimulai oleh pengunjung, menggunakan kontrol bawaan browser dan `playsinline`. Video tidak otomatis diputar dan menggunakan `preload="none"`. Poster memakai gambar produk yang sudah ada.

## Konfigurasi publik

`config/media.json` hanya berisi lokasi media publik. `publicVideoUrl` kosong berarti memakai video lokal. Jika URL R2 sudah tersedia, isikan URL HTTPS publik tanpa token, query, atau kredensial. Jika sumber remote gagal diputar, halaman kembali ke video lokal. Jika pengunjung sudah mulai memutar video lokal sebelum konfigurasi selesai diambil, sumber tidak diganti di tengah pemutaran.

`localVideo` dan `poster` dipakai oleh pemeriksaan berkas. Jika mengganti lokasi keduanya, sesuaikan juga `src` dan `poster` pada elemen video di `index.html` agar tetap berfungsi ketika konfigurasi gagal dimuat.

## Floating chat

Label “Konsultan Erojan Online” dan “Siap Balas Cepat” tetap menyatu dengan tombol WhatsApp pada kapsul 274 × 58 px. Jalur langsung ke WhatsApp tetap tersedia sepanjang waktu.

Panel contoh percakapan mulai tampil setelah 2,5 detik: indikator mengetik, pesan pertama setelah 0,85 detik, indikator mengetik kembali, lalu pesan kedua setelah 2,9 detik. Setelah kedua pesan tampil, panel menutup jika tidak ada aktivitas selama 5 detik. Gerakan scroll, sentuhan, keyboard, atau interaksi dalam panel mengulang hitungan waktu diam. Klik di luar panel, X, dan Escape dapat menutup lebih awal.

Penutupan mengganti panel menjadi tombol chat bundar 48 px di atas kapsul WhatsApp, dengan badge merah “2”. Menekan tombol membuka panel dan langsung menampilkan empat pesan: dua pesan awal dan dua pesan tambahan sesuai teks pengguna. Badge dihapus setelah pesan tambahan dibuka. Panel yang dibuka kembali tidak memiliki waktu penutupan otomatis; pengunjung bisa membaca dan mengeklik “Konsultasi gratis via WhatsApp”. Menutup lalu membuka lagi menampilkan empat pesan yang sama tanpa duplikasi.

Panel panjang dapat digulir dan dibatasi sesuai tinggi layar. Pembukaan mengarahkan fokus ke panel dan posisi gulir ke pesan tambahan. Penutupan melalui keyboard memindahkan fokus kembali ke ikon chat. Ikon WhatsApp memantul berkala dengan tiga putaran tiap cincin radar hijau; reduced motion mematikan animasi gerak.

Panel ditandai “Contoh percakapan”; ini interaksi lokal tanpa backend chat atau pengiriman pesan otomatis.

## Paket dan pratinjau

`python3 scripts/project.py build` memeriksa berkas lalu membuat ulang `dist/`. Hanya HTML, favicon, CNAME, robots, sitemap, `.nojekyll`, `assets/`, dan `config/` yang disalin. Hasil build tidak memuat dokumen, token, riwayat Git, atau referensi pribadi.

`python3 scripts/project.py serve` menyajikan `dist/` di `127.0.0.1:4173`. Jalankan build ulang setelah mengedit sumber. Jangan menyajikan seluruh folder kerja sebagai situs publik.

## Hosting yang ditemukan

Repositori memiliki `CNAME` dan `.nojekyll`, konsisten dengan publikasi statis GitHub Pages. Status pengaturan hosting saat ini belum diaudit melalui API. Tidak ada workflow deploy baru yang ditambahkan. `dist/` merupakan paket bersih untuk peninjauan atau unggahan hosting; pemilihan sumber publikasi tetap harus cocok dengan pengaturan hosting aktual.

Proyek DVN adalah sumber referensi pengelolaan kerja saja. Konfigurasi Astro, Worker, domain `wellnesglow.com`, route `/dvn`, dan token DVN tidak disalin.
