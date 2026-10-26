# Status proyek EROJAN

Diperbarui: 26 Oktober 2026, WIB.

## Google Ads: jalur Google Ads Scripts

- Pengguna memilih tidak melanjutkan Google Cloud/OAuth client pribadi dan meminta konfigurasi melalui skrip Google.
- Paket lokal tersedia di `integrations/google-ads-scripts/`: Code.js, README, contoh konfigurasi dan pengujian offline.
- Runtime yang digunakan adalah Google Ads Scripts di akun Ads, bukan editor Apps Script biasa. Authorize bawaan Google tetap diperlukan; tidak memerlukan token dari Composio.
- Paket mencakup builder Search campaign PAUSED, update campaign/budget, create/update konversi, goals/custom goals, generic mutate dan laporan Sheets. Mode default PLAN/AUDIT.
- Pengujian lokal dengan mock lulus; pemasangan, Authorize, Preview dan eksekusi di akun pengguna belum dilakukan. Belum ada perubahan iklan/konversi/budget.
- Riset dan berkas REST/OAuth sebelumnya dipertahankan, tetapi tidak diaktifkan. R2 tetap ditunda.

## Status terbaru: peningkatan SEO dan pengukuran

Bagian ini menggantikan status implementasi lama di bawah untuk pekerjaan yang sama. Bagian-bagian lama dipertahankan sebagai riwayat.

- Versi produk baru, empat halaman informasi, robots dan sitemap sudah dipublikasikan. Commit situs: `7122228de257cb18d0bfbc0edbbdcb22b2c09bba`.
- Search Console URL-prefix https://eroforza.com/ sudah diverifikasi lewat tag HTML. Sitemap berstatus **Sukses**, 5 halaman ditemukan.
- Beranda sebelumnya sudah diindeks dengan masalah data Product lama. Uji langsung versi baru: tersedia untuk Google dan dapat diindeks. Pengindeksan ulang berhasil diminta.
- Google Analytics dibuat setelah persetujuan eksplisit pemilik pada persyaratan layanan; properti 560814305, aliran 16206738784, ID G-RWTJBMGCLL. Commit pengukuran: `5a135d41345ba84e5536748963a0b2dfc1bea62e`.
- Pengukuran menunggu izin pengunjung. Pengujian browser membuktikan 0 script Google sebelum izin dan satu tag yang benar setelah izin. Enhanced measurement dimatikan. Realtime menerima 1 page_view dan 1 whatsapp_click dari pengujian, beserta 1 pengguna aktif. Ini data uji.
- Dua pesan bertahap, penutupan otomatis, ikon chat badge 2, pembukaan dua pesan lanjutan, serta label WhatsApp permanen tetap ada. Pesan lanjutan menggunakan informasi produk tanpa janji mengatasi keluhan.
- Pemilik tidak ingin mengisi harga/stock/syarat rinci. Halaman menyarankan konfirmasi tertulis lewat Eza; data tidak dikarang.
- Pembuatan kampanye Google Ads belum dapat dilakukan karena alat tulis dibatasi layanan. Rancangan lokal PAUSED tersedia di config/ads-plan.json. Tidak ada anggaran atau kampanye DVN diubah.
- Semua data sumber dan video lokal tetap disimpan; R2 masih ditunda. Video tidak disertakan dalam publikasi peningkatan ini.
- Laporan lengkap: [HASIL-PENINGKATAN-EROJAN-2026-10-26.md](HASIL-PENINGKATAN-EROJAN-2026-10-26.md). Pengukuran: [PENGUKURAN-EROJAN.md](PENGUKURAN-EROJAN.md).


## Keputusan terbaru: R2 ditunda

- Pengguna meminta pekerjaan R2 ditahan pada 26 Oktober 2026.
- Menunggu pemilik melakukan aktivasi/checkout R2 melalui dashboard dengan kartu kredit.
- Pemeriksaan API langsung terakhir: token aktif dan akun sesuai; daftar langganan akun kosong; R2 mengembalikan HTTP 403 kode `10042` dengan permintaan aktivasi melalui dashboard.
- Setelah pemilik menyelesaikan aktivasi, uji ulang akses bucket sebelum melanjutkan unggah video dan konfigurasi media publik.

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

## Audit keyword EROJAN: Google Ads dan SEO

- Audit 26 Oktober 2026 membaca akun tujuan Google Ads, Keyword Planner, situs publik dan sumber lokal; situs serta kampanye tidak diubah.
- Akun 973-306-3009 hanya mengembalikan kampanye DVN yang tidak dihapus. Keyword EROJAN tidak ditemukan, sehingga Quality Score EROJAN belum tersedia pada akun tersebut.
- Keyword Planner Indonesia/Google Search mengembalikan estimasi rata-rata: erojan 2.400 pencarian/bulan, harga erojan 320, erojan wellous 260, erojan bpom 10. Ini estimasi historis, bukan traffic atau CPC yang dijamin.
- Pemilik mengonfirmasi Search Console belum didaftarkan. Status indeks dan ranking organik belum diverifikasi.
- Situs publik masih memberi 404 pada robots.txt dan sitemap.xml yang sudah ada secara lokal. Tidak ditemukan tag Google maupun tautan privasi/ketentuan pada sumber halaman yang diperiksa.
- Teks chat tentang membantu mengatasi keluhan dan urusan ranjang ditandai untuk peninjauan klaim/kategori iklan. Ini penilaian risiko, bukan keputusan penolakan Google.
- PageSpeed mobile memberi HTTP 429 akibat kuota; skor performa dan Core Web Vitals belum diukur.
- Laporan: `AUDIT-GOOGLE-ADS-SEO-EROJAN-2026-10-26.md`. Rancangan keyword serta 15 judul dan 4 deskripsi: `EROJAN-ADS-KEYWORD-PLAN-2026-10-26.md`.
- Bukti pembacaan tersimpan lokal di `.local-state/audit-2026-10-26/` dan tidak masuk Git.
