# Status proyek EROJAN

Diperbarui: 26 Oktober 2026, WIB.

## Sudah selesai

- Kode dan riwayat Git dipulihkan dari `rezamustafa17-wq/erojan-eroforza`; commit dasar `c299d62`.
- Foto, mockup, pratinjau lama, video, laporan validasi, dan rancangan kampanye dikumpulkan ke `references/` lokal. Delapan file sumber dicatat dalam manifest.
- Video produk disalin ke aset website dan dipasang dengan kontrol pemutaran.
- Pemilihan URL publik R2 disiapkan melalui `config/media.json`; sumber lokal tetap tersedia.
- Animasi percakapan kembali tersedia dengan indikator mengetik dan dua pesan bertahap. Label konsultan selalu menempel pada tombol WhatsApp; hanya panel percakapan yang hilang otomatis.
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

Perubahan pemulihan disimpan melalui commit lokal pada cabang `recovery/local-project-20261026`. Gunakan `git log -1 --oneline` untuk melihat hash commit dan `git status --short --branch` untuk memastikan kondisi terkini. Pada sesi pemulihan awal belum ada push atau deploy. Tindak lanjut floating WhatsApp kini sudah dipublikasikan ke `main` melalui commit `8b74dfd77c3320b1214175dae85e6b7436a4a9bf` dan diverifikasi di https://eroforza.com/.

## Masih membutuhkan langkah berikutnya

1. Pemilik mengaktifkan R2 melalui dashboard bila ingin video disajikan dari Cloudflare. Pemeriksaan tanggal ini membuktikan kendala aktivasi masih terjadi.
2. Sesudah aktif: unggah video, siapkan URL publik, uji izin baca/pemutaran, lalu isi konfigurasi media. Akses unggah dan pemutaran R2 belum diverifikasi.
3. Periksa desktop, perangkat lain, isi audio/video secara utuh, reduced motion, dan pengukuran konversi sebelum publikasi.
4. Video dan dokumen pemulihan masih berada pada cabang kerja lokal. Publikasi tindak lanjut ini khusus floating WhatsApp; publikasi video menunggu langkah berikutnya terkait sumber media.

Sesi ini tidak mengaudit ulang status BPOM/BPJPH, tidak menayangkan iklan, dan tidak mengganti DNS. Versi cloud yang gagal tidak berhasil diambil utuh; perubahan tertunda dibangun kembali dari konfirmasi pengguna.

## Hasil tindak lanjut floating WhatsApp

- Logo WhatsApp putih pada tombol hijau; sapaan berbentuk kapsul dengan tulisan “Konsultan Erojan Online” dan “Siap Balas Cepat”.
- Pesan muncul setelah 2,5 detik, tampil 6 detik, lalu otomatis hilang. Klik halaman/pesan, X, dan Escape dapat menutup sapaan.
- Setelah hilang, ikon memantul berkala. Tiga cincin radar hijau menjalankan masing-masing tiga putaran lalu berhenti.
- Pemeriksaan lokal desktop (1280 px) dan situs aktif ponsel (460 px): kapsul 278 × 64 px, tanpa luapan horizontal.
- Situs aktif terkonfirmasi memakai SVG WhatsApp baru. Sapaan terlihat lalu hilang otomatis; animasi tombol `wa-chat-bounce` dan radar `wa-chat-radar` terkonfirmasi dengan jumlah putaran 3.
- Klik halaman menutup pesan berhasil diuji pada pratinjau. File build dan pemeriksaan JavaScript lulus.
- Bukti situs aktif: `.local-state/qa/whatsapp-live-message.png` dan `.local-state/qa/whatsapp-live-icon.png`.
- Konten utama situs dipertahankan persis dari versi sebelumnya pada publikasi khusus ini.

## Koreksi: animasi percakapan dan label permanen

Permintaan terbaru mengoreksi pemisahan tampilan: animasi percakapan harus tetap ada, sedangkan teks konsultan harus selalu menempel pada floating WhatsApp. Bagian ini menggantikan uraian sapaan sementara pada tindak lanjut sebelumnya.

- Label “Konsultan Erojan Online” dan “Siap Balas Cepat” selalu terlihat pada kapsul WhatsApp 274 × 58 px.
- Panel menampilkan indikator mengetik, pesan pertama, indikator mengetik kembali, lalu pesan kedua.
- Panel muncul setelah 2,5 detik dan hilang setelah tampil 6,5 detik, atau lebih awal melalui klik halaman/pesan, X, dan Escape.
- Menutup panel membatalkan sisa jadwal pesan. Label tetap terlihat; animasi memantul hanya berlaku pada ikon WhatsApp, dengan radar hijau terbatas.
- Pengujian desktop lokal berhasil: label sebelum chat terlihat, indikator mengetik terlihat, kedua pesan muncul, klik halaman menutup panel, label sesudah penutupan tetap terlihat.
- Commit publikasi: `15eb8cb79c0ec0f97f9c53d1f267a2212b86d135`.
- Verifikasi situs aktif ponsel (460 px): kedua pesan tampil bertahap, panel setinggi sekitar 180 px, tombol 274 px, tanpa luapan horizontal. Sesudah panel otomatis hilang, kedua baris label tetap terlihat dan berada di dalam tombol WhatsApp.
- Bukti: `.local-state/qa/conversation-live-with-label.png` dan `.local-state/qa/conversation-live-label-after-hide.png`.

## Revisi: ikon notifikasi dan percakapan lanjutan

- Dua pesan awal tetap tampil bertahap dengan animasi mengetik.
- Panel menutup setelah 5 detik tanpa aktivitas sesudah pesan kedua. Aktivitas mengulang waktu diam.
- Panel yang ditutup berubah menjadi ikon chat bundar dengan notifikasi merah 2, di atas kapsul WhatsApp yang tetap terlihat.
- Klik ikon langsung menampilkan dua pesan tambahan persis sesuai permintaan pengguna, berikut tautan konsultasi WhatsApp.
- Setelah dibuka, notifikasi dibersihkan. Panel dapat ditutup dan dibuka lagi tanpa pesan ganda dan tanpa menutup otomatis saat dibaca.
- Pemeriksaan lokal berhasil: panel awal menutup menjadi tombol; pembukaan menampilkan empat pesan; badge tersembunyi setelah dibaca; tidak ada luapan horizontal.
- Bukti lokal: `.local-state/qa/unread-chat-local.png` dan `.local-state/qa/unread-chat-open-local.png`.
- Commit publikasi revisi notifikasi: `2b8e4aa799eb22fcc3fc1c83263d40aabc05fe3a`.
- Verifikasi situs aktif ponsel (460 px) berhasil: dua pesan awal tercatat sudah tampil, panel otomatis tertutup, ikon dan badge merah 2 terlihat; klik ikon membuka empat pesan sekaligus dengan dua pesan tambahan, badge dibersihkan, CTA tersedia, dan tidak ada luapan horizontal.
- Bukti situs aktif: `.local-state/qa/unread-chat-live-badge.png` dan `.local-state/qa/unread-chat-live-open.png`.
