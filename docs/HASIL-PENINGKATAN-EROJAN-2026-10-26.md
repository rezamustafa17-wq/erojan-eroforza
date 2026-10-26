# Hasil pelaksanaan peningkatan EROJAN

Tanggal 26 Oktober 2026 (WIB). Domain https://eroforza.com/. Dokumen ini melanjutkan audit awal; hasil sebelum dan sesudah tidak dicampur.

## Ringkasan status

| Area | Hasil yang sudah dilakukan | Batas atau tindak lanjut |
| --- | --- | --- |
| Fokus keyword EROJAN | Judul, H1, pembuka, komposisi, kemasan dan jalur WhatsApp dipertegas | Tidak ada janji posisi Google atau skor Ads tertentu |
| Klaim dan chat | Pesan bantuan keluhan seksual diganti menjadi informasi produk; dua pesan awal dan dua pesan lanjutan tetap tersedia | Kelayakan produk sebenarnya tetap tunduk pada kebijakan Google dan label asli |
| Informasi pengelola | Halaman Tentang Eza, nomor WhatsApp dan peran informasi produk | Tidak mengarang kredensial, status distributor, alamat atau jam layanan |
| Pembelian | Halaman alur pemesanan, permintaan rincian tertulis sebelum pembayaran, kontak kendala | Pemilik menolak mengisi harga, stok, ongkir, pembayaran dan ketentuan pengembalian; data tersebut tidak dibuat-buat |
| Privasi dan ketentuan | Dua halaman publik dengan navigasi footer, data teknis, WhatsApp, pengukuran dan kontak | Dokumen disesuaikan pada proses situs yang tersedia; perlu diperbarui bila bisnis berubah |
| SEO teknis | robots.txt, sitemap lima URL, canonical tiap halaman, judul/description, satu H1, alt dan tautan internal | Indeks dan hasil penelusuran ditentukan Google |
| Data terstruktur | WebSite, WebPage dan kontak Person Eza; Product/FAQPage yang tidak sesuai tujuan dihapus | Tidak memakai harga, review, rating atau Offer fiktif |
| Search Console | Properti URL-prefix https://eroforza.com/ diverifikasi melalui tag HTML; sitemap Sukses, 5 halaman ditemukan | Data Performa/Indeks/CWV properti baru masih diproses |
| Inspeksi Google | Salinan lama sudah diindeks dengan peringatan cuplikan produk; uji langsung versi baru tersedia dan dapat diindeks | Pengindeksan ulang berhasil diminta; salinan lama tidak langsung berubah |
| Analytics | Akun/properti/aliran web dibuat, ID asli dipasang dengan pilihan izin | Realtime menerima 1 page_view dan 1 whatsapp_click dari uji; lihat PENGUKURAN-EROJAN.md |
| Google Ads | Rancangan lokal kampanye PAUSED, keyword dan 15 judul/4 deskripsi tersedia | Alat tulis Google Ads dibatasi layanan; kampanye serta konversi belum dibuat |
| Media/R2 | Sumber video dan konfigurasi lokal disimpan | R2 tetap ditunda sesuai keputusan pemilik; video belum dipublikasikan oleh pekerjaan ini |

## Perubahan halaman

Homepage menjawab pencarian brand dengan foto botol EROJAN, nama produk, kemasan, komposisi, tautan registrasi, dan tombol WhatsApp. Materi hormon/keluhan yang mengalihkan fokus produk tidak lagi ditampilkan pada halaman utama. Versi sebelumnya tetap tersimpan melalui Git dan snapshot lokal.

Tombol utama pada pengujian ponsel 460 × 804 px berpindah dari sekitar y=785 ke y=361. Ini ukuran posisi pada perangkat uji, bukan metrik Core Web Vitals. Kelima halaman tidak memiliki luapan horizontal pada ukuran tersebut.

Chat tetap menampilkan dua pesan bertahap, menutup setelah tidak ada aktivitas, menjadi ikon bundar dengan badge merah 2, lalu menampilkan dua pesan tambahan ketika dibuka. Label konsultan yang diminta pemilik tetap melekat pada tombol WhatsApp. Label online/balas cepat adalah teks layanan statis, bukan pemeriksaan status kehadiran; pemilik perlu memastikan kesesuaiannya dengan layanan nyata.

Harga/stok diarahkan ke percakapan Eza. Keyword [harga erojan] tidak dimasukkan dalam rancangan awal karena halaman tidak menawarkan harga aktual yang dapat dibaca langsung. Tidak ada Product Offer atau jaminan pengembalian baru.

## Optimasi aset

- Font Barlow Condensed 700/800 memakai WOFF2 lokal sekitar 14,9 KB/14,8 KB per file, menggantikan TTF sekitar 87 KB per file.
- Foto acara dipindahkan ke halaman Tentang dengan varian 640 px: 227.700 → 88.014 byte.
- Varian botol kecil: 14.212 → 7.794 byte.
- Enam varian ilustrasi bahan 360 px: 561.158 → 302.046 byte secara total; varian 240 px tetap dipakai sesuai lebar layar.
- CSS utama dipisahkan dari HTML agar dapat disimpan cache dan dipakai ulang pada halaman pendukung.
- Ukuran HTML utama turun dari sekitar 51,9 KB menjadi sekitar 22,5 KB. Ukuran berkas bukan ukuran total transfer halaman.
- File TTF, video dan media sumber tetap di folder lokal. Paket dist tidak menyertakan video yang belum ditinjau, TTF yang tidak dirujuk, .env, referensi atau dokumen internal.

PageSpeed mobile diuji ulang sesudah publikasi dan tetap HTTP 429 (kuota). Skor Lighthouse, LCP, INP dan CLS belum diperoleh. Tidak ada angka performa rekaan.

## Hasil pengujian akhir

- check dan build lulus; git diff --check bersih untuk perubahan ini.
- Sembilan pengujian batas privasi/peristiwa lulus tanpa permintaan eksternal.
- 21 dari 21 berkas daftar publikasi merespons HTTP 200 dan SHA-256 isinya cocok dengan versi lokal akhir.
- Tampilan ponsel kelima halaman 460 × 804 px tanpa luapan horizontal atau gambar rusak yang terdeteksi. Desktop beranda 1280 px juga tidak meluap.
- Animasi dua pesan awal, auto-close, ikon badge 2 dan pembukaan empat pesan diperiksa pada browser lokal; kode floating-chat.js tetap memakai alur yang sudah diuji sebelumnya.
- Di situs aktif, sebelum pilihan izin: 0 script Google. Sesudah izin: satu tag ID asli. Klik WhatsApp uji tidak mengirim pesan.
- Di Analytics Realtime: 1 pengguna aktif, page_view 1, whatsapp_click 1, first_visit 1, session_start 1. Angka ini snapshot traffic pengujian dan bukan statistik kampanye.
- Sitemap Search Console: Sukses, 5 halaman, 0 video. Uji langsung beranda: dapat diindeks. Permintaan pengindeksan ulang: diterima dalam antrean crawl.
- Tidak ada berkas terlacak yang dihapus. Perubahan dari pekerjaan akses API yang muncul bersamaan tetap disimpan dan tidak ikut dipublikasikan oleh daftar situs ini.

## Riwayat publikasi

| Commit main | Isi |
| --- | --- |
| 9f45a129c7bc97ba89b3015b5d3ae9916596f84f | Tag verifikasi Search Console |
| 7122228de257cb18d0bfbc0edbbdcb22b2c09bba | Halaman produk, empat halaman informasi, aset, robots dan sitemap |
| 5a135d41345ba84e5536748963a0b2dfc1bea62e | Konfigurasi GA4 asli, pilihan izin dan informasi cookie |
| 9c90f1b867fa2176b766e6c18b6b8ebea65c6f4a | Perapian format CSS bersama tanpa perubahan tampilan |

Publikasi memakai pembaruan branch dengan pemeriksaan commit dasar, tanpa force push. Tidak ada token, bahan referensi pribadi, atau video lokal yang dimasukkan ke commit publikasi ini.

## Data audit keyword yang dipertahankan

Data Keyword Planner Indonesia/Indonesian/Google Search, Oktober 2025–September 2026:

| Keyword | Pencarian rata-rata/bulan | Kisaran bid top-of-page historis |
| --- | ---: | ---: |
| erojan | 2.400 | Rp1.126–Rp5.215 |
| harga erojan | 320 | Rp370–Rp3.597 |
| erojan wellous | 260 | Rp1.105–Rp5.027 |
| erojan bpom | 10 | Tidak dikembalikan |
| erojan by wellous | Tidak dikembalikan | Tidak dikembalikan |

Ini estimasi historis; bukan traffic aktual, CPC pasti, volume unik, atau skor kesulitan SEO. Akun Ads yang dibaca 973-306-3009 hanya menemukan kampanye DVN yang tidak dihapus, dan query keyword EROJAN menghasilkan nol baris. Karena itu Quality Score EROJAN belum tersedia. Rancangan kampanye disimpan di config/ads-plan.json dan docs/EROJAN-ADS-KEYWORD-PLAN-2026-10-26.md; keduanya bukan bukti kampanye sudah dibuat.

## Lokasi data lengkap

- Audit awal: docs/AUDIT-GOOGLE-ADS-SEO-EROJAN-2026-10-26.md.
- Rancangan aset iklan: docs/EROJAN-ADS-KEYWORD-PLAN-2026-10-26.md.
- Detail pengukuran: docs/PENGUKURAN-EROJAN.md.
- Status proyek lintas sesi: docs/STATUS.md.
- Respons audit dan Keyword Planner: .local-state/audit-2026-10-26/ (lokal).
- Perbandingan aset: .local-state/asset-improvement.json (lokal).
- Daftar file publikasi beserta SHA-256: .local-state/seo-deploy-manifest.json (lokal).
- Pemeriksaan HTTP dan kecocokan isi publik: .local-state/seo-public-verification.json (lokal).
- Screenshot dan hasil pemeriksaan halaman: .local-state/qa/ (lokal).
- Snapshot sebelum perubahan: .local-state/before-seo-improvements/ dan .local-state/checkpoints/seo-before-publication/ (lokal, tanpa .env).
- Sumber/referensi pemulihan: references/ dan riwayat Git lokal, dipertahankan.

## Pekerjaan yang belum dapat dinyatakan selesai

1. Pembuatan kampanye/budget/ad group Ads dan conversion action: alat mutasi dibatasi layanan terhubung. Tidak dicoba melalui jalur lain untuk melewati batas ini. Anggaran baru tidak ditetapkan.
2. Hasil bisnis dan Quality Score: menunggu kampanye sah, traffic dan data nyata.
3. Laporan Performance/Search Console serta salinan indeks terbaru: diproses Google; permintaan crawl bukan jaminan waktu atau peringkat.
4. Harga, stok, alamat, jam layanan, dan rincian transaksi: hanya data yang telah tersedia digunakan; keputusan pemilik tidak mengisi bagian harga dihormati.
5. BPOM/BPJPH: tanggal pemeriksaan 25 Oktober berasal dari laporan terdahulu, bukan verifikasi regulator baru dalam pelaksanaan ini.
6. R2/video: ditunda sesuai instruksi pemilik; tidak ada aktivasi atau checkout berbayar.
