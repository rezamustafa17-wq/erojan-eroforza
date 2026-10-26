# Status proyek EROJAN

Diperbarui: 26 Oktober 2026, WIB.

## Sudah selesai

- Kode dan riwayat Git dipulihkan dari `rezamustafa17-wq/erojan-eroforza`; commit dasar `c299d62`.
- Foto, mockup, pratinjau lama, video, laporan validasi, dan rancangan kampanye dikumpulkan ke `references/` lokal. Delapan file sumber dicatat dalam manifest.
- Video produk disalin ke aset website dan dipasang dengan kontrol pemutaran.
- Pemilihan URL publik R2 disiapkan melalui `config/media.json`; sumber lokal tetap tersedia.
- Sapaan chat dibuat ringkas dan lonjong, tampil setelah 3 detik selama 6 detik, kemudian hilang dan mengaktifkan ikon chat memantul.
- Klik pada halaman/pesan, tombol X, serta Escape menutup sapaan. Tombol WhatsApp tetap menuju Eza.
- README, ringkasan proyek, arsitektur, panduan Git, panduan R2, sumber konten, daftar referensi, dan daftar pemeriksaan tersedia.
- robots.txt dan sitemap.xml ditambahkan untuk domain yang sudah tercatat.
- Peralatan check, build, pratinjau, doctor, serta pemeriksaan baca R2 tersedia tanpa dependensi tambahan.

## Hasil pemeriksaan

| Pemeriksaan | Hasil |
| --- | --- |
| Struktur HTML, anchor, aset, SVG, JSON-LD, sitemap | Lulus |
| Nomor WhatsApp | Konsisten `6281391939099` |
| Kontainer MP4 lokal | Dikenali; file tersedia |
| Pembuatan paket dist | Lulus; hanya berkas website yang disertakan |
| Browser ukuran ponsel, lebar sekitar 460 px | Video dan sapaan terlihat proporsional pada tampilan yang diperiksa |
| Pemutaran video di browser | Berhasil; durasi yang ditampilkan sekitar 52 detik; dapat dijeda |
| Sapaan muncul lalu hilang otomatis | Terlihat pada pemeriksaan browser |
| Menutup melalui klik halaman | Diuji: terlihat sebelum klik, tersembunyi sesudah klik |
| Menutup melalui X | Diuji: tersembunyi, ikon memiliki kelas animasi memantul |
| Menutup melalui Escape | Diuji di browser: sapaan tersembunyi sesudah Escape |
| Reduced motion | Tersedia di CSS; mode perangkat belum diuji terpisah |
| R2 API baca saja | HTTP 403, kode `10042`; R2 belum aktif |

Bukti tampilan lokal: `.local-state/qa/chat-mobile.png` dan `.local-state/qa/video-mobile.png`. Keluaran R2 tanpa token: `.local-state/r2-status.json`. Paket website: `exports/erojan-website-2026-10-26.zip`.

## Penyimpanan Git

Perubahan pemulihan disimpan melalui commit lokal pada cabang `recovery/local-project-20261026`. Gunakan `git log -1 --oneline` untuk melihat hash commit dan `git status --short --branch` untuk memastikan kondisi terkini. Tidak ada push atau deploy dari sesi pemulihan ini.

## Masih membutuhkan langkah berikutnya

1. Pemilik mengaktifkan R2 melalui dashboard bila ingin video disajikan dari Cloudflare. Pemeriksaan tanggal ini membuktikan kendala aktivasi masih terjadi.
2. Sesudah aktif: unggah video, siapkan URL publik, uji izin baca/pemutaran, lalu isi konfigurasi media. Akses unggah dan pemutaran R2 belum diverifikasi.
3. Periksa desktop, perangkat lain, isi audio/video secara utuh, reduced motion, dan pengukuran konversi sebelum publikasi.
4. Jika ingin memperbarui situs publik: tinjau commit lokal dan pengaturan hosting, lalu kirim cabang ke GitHub sesuai arahan pemilik.

Sesi ini tidak mengaudit ulang status BPOM/BPJPH, tidak menayangkan iklan, dan tidak mengganti DNS. Versi cloud yang gagal tidak berhasil diambil utuh; perubahan tertunda dibangun kembali dari konfirmasi pengguna.
