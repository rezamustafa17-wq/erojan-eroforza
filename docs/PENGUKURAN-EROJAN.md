# Pengukuran EROJAN

Diperbarui 26 Oktober 2026. Identitas berikut adalah ID pengukuran publik, bukan token API.

## Properti yang dibuat

- Akun Google Analytics: EROJAN - Eroforza, ID 413424920.
- Properti: EROJAN · eroforza.com, ID 560814305.
- Aliran web: EROJAN Web, ID 16206738784, https://eroforza.com.
- Measurement ID: G-RWTJBMGCLL.
- Zona waktu Jakarta (UTC+7), mata uang IDR, kategori Belanja, ukuran 1–10 orang sesuai jawaban pemilik.
- Persyaratan Layanan wilayah Indonesia dan Persyaratan Pemrosesan Data diterima setelah persetujuan eksplisit pemilik dalam percakapan.
- Opsi berbagi tambahan saat pembuatan akun tidak diaktifkan. Email promosi opsional tidak dipilih.
- Enhanced measurement dinonaktifkan dan status switch 0 telah diperiksa pada detail stream. Ini menghindari pengumpulan klik keluar otomatis selain event yang dikontrol situs.

## Perilaku situs

Konfigurasi hanya menyimpan ID publik di assets/site-config.js. Kode ada di assets/tracking.js dan digunakan pada lima halaman.

1. Sebelum pilihan pengunjung, tidak ada script Google yang dimuat.
2. Menolak tidak memuat pengukuran.
3. Mengizinkan memuat satu gtag.js dengan ID properti yang benar; page_view dikirim secara eksplisit.
4. Tombol Pengaturan pengukuran di footer memungkinkan perubahan pilihan. Pilihan disimpan di perangkat paling lama 180 hari.
5. Penarikan izin menonaktifkan pengiriman berikutnya dari kode situs. Script yang sudah dimuat tidak berarti cookie lama dihapus; pengunjung dapat menghapus cookie dari pengaturan browser.

Default consent: analytics_storage/ad_storage denied. Setelah izin, pengukuran diperbolehkan; ad_user_data dan ad_personalization tetap denied. Google signals dan personalisasi iklan tidak diaktifkan lewat konfigurasi situs.

## Peristiwa dan arti data

| Event | Pemicu | Parameter situs | Arti |
| --- | --- | --- | --- |
| page_view | Setelah izin pengukuran | page_location tanpa query/fragment, page_referrer kosong, judul halaman | Kunjungan yang mengizinkan pengukuran |
| whatsapp_click | Klik tautan wa.me ke nomor Eza setelah izin | cta_location dari daftar tetap, page_location tanpa query/fragment | Klik menuju WhatsApp, belum membuktikan pesan dikirim, lead valid, atau transaksi |

cta_location dapat berupa atas, komposisi, tentang, legalitas, faq, pemesanan, tanya-eza, floating, header, footer, chat, atau page. Klik ganda dalam 1 detik tidak dihitung dua kali oleh adapter. Tautan nomor lain tidak diukur.

Isi chat, nama pelanggan, data kesehatan, nomor pelanggan, query URL, serta teks pesan pada tujuan WhatsApp tidak dimasukkan dalam parameter event. page_location dan page_referrer juga diatur pada konfigurasi umum tag agar event otomatis dasar memakai lokasi yang sudah dibersihkan.

Tidak ada nilai penjualan yang dikarang. Konversi Google Ads belum dibuat; conversion ID/label tetap kosong. Jangan memasukkan klik ini sebagai penjualan atau qualified lead. Bila nanti diimpor ke Ads, gunakan sebagai tindakan awal/sekunder dan buat proses lead berkualitas yang terpisah.

## Pemeriksaan yang dapat diulang

- Jalankan node scripts/test-tracking.cjs memakai Node yang tersedia.
- Sembilan batas perilaku diuji: tanpa ID, tanpa izin, penolakan, izin, sanitasi URL, deduplikasi, pencabutan izin, nomor tujuan dan kedaluwarsa pilihan.
- Pada browser situs aktif: measurementState awal awaiting-consent dengan 0 script Google; sesudah Izinkan, state granted dan satu script dengan G-RWTJBMGCLL.
- Penerimaan aktual diperiksa pada Realtime properti 560814305: 1 pengguna aktif, page_view 1, whatsapp_click 1, first_visit 1, session_start 1. Ini traffic uji, bukan hasil penjualan. Parameter cta_location terlihat pada detail whatsapp_click. Bukti lokal: .local-state/qa/analytics-whatsapp-received.png dan measurement-result.json.
- Kebijakan privasi situs menjelaskan cookie/pengenal, pilihan izin, WhatsApp dan kontak data. Tinjau kembali jika proses bisnis atau layanan pengukuran berubah.

## Batas laporan

Pengunjung yang menolak, pemblokir iklan, dan pembatasan browser dapat mengurangi data yang terukur. Data baru tidak mengisi histori sebelum pemasangan. Laporan standar dapat terlambat; gunakan Realtime untuk pengujian awal. Tidak ada informasi Analytics yang membuktikan Quality Score Ads meningkat.
