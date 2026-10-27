# Pengukuran EROJAN

Diperbarui 27 Oktober 2026. Identitas berikut adalah ID pengukuran publik, bukan token API.

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

Default consent: analytics_storage, ad_storage, ad_user_data dan ad_personalization denied. Pada versi izin 2, setelah pengunjung menyetujui penjelasan Google Analytics/Google Ads, analytics_storage, ad_storage dan ad_user_data granted untuk pengukuran; ad_personalization tetap denied. Pilihan granted versi lama diminta ulang, bukan diperluas otomatis; penolakan lama tetap dihormati. Google signals dan personalisasi iklan tidak diaktifkan lewat konfigurasi situs.

## Peristiwa dan arti data

| Event | Pemicu | Parameter situs | Arti |
| --- | --- | --- | --- |
| page_view | Setelah izin pengukuran | page_location tanpa query/fragment, page_referrer kosong, judul halaman | Kunjungan yang mengizinkan pengukuran |
| whatsapp_click | Klik tautan wa.me ke nomor Eza setelah izin | cta_location dari daftar tetap, page_location tanpa query/fragment | Klik menuju WhatsApp, belum membuktikan pesan dikirim, lead valid, atau transaksi |

cta_location dapat berupa atas, komposisi, tentang, legalitas, faq, pemesanan, tanya-eza, floating, header, footer, chat, atau page. Klik ganda dalam 1 detik tidak dihitung dua kali oleh adapter. Tautan nomor lain tidak diukur.

Isi chat, nama pelanggan, data kesehatan, nomor pelanggan, query URL, serta teks pesan pada tujuan WhatsApp tidak dimasukkan dalam parameter event. page_location dan page_referrer juga diatur pada konfigurasi umum tag agar event otomatis dasar memakai lokasi yang sudah dibersihkan.

Tidak ada nilai penjualan yang dikarang. Action Google Ads EROJAN sudah dibuat sebagai klik WhatsApp secondary, nilai event 0 IDR. Conversion ID AW-18414837888, label MseCCPOOn6sdEIDB8MxE berasal dari snippet resmi action 7875315571. Jangan memasukkan klik ini sebagai penjualan atau qualified lead. Bila nanti diimpor ke Ads, gunakan sebagai tindakan awal/sekunder dan buat proses lead berkualitas yang terpisah.

## Pemeriksaan yang dapat diulang

- Jalankan node scripts/test-tracking.cjs memakai Node yang tersedia.
- Sembilan batas perilaku diuji: tanpa ID, tanpa izin, penolakan, izin, sanitasi URL, deduplikasi, pencabutan izin, nomor tujuan dan kedaluwarsa pilihan.
- Pada browser situs aktif: measurementState awal awaiting-consent dengan 0 script Google; sesudah Izinkan, state granted dan satu script dengan G-RWTJBMGCLL.
- Penerimaan aktual diperiksa pada Realtime properti 560814305: 1 pengguna aktif, page_view 1, whatsapp_click 1, first_visit 1, session_start 1. Ini traffic uji, bukan hasil penjualan. Parameter cta_location terlihat pada detail whatsapp_click. Bukti lokal: .local-state/qa/analytics-whatsapp-received.png dan measurement-result.json.
- Kebijakan privasi situs menjelaskan cookie/pengenal, pilihan izin, WhatsApp dan kontak data. Tinjau kembali jika proses bisnis atau layanan pengukuran berubah.

## Batas laporan

Pengunjung yang menolak, pemblokir iklan, dan pembatasan browser dapat mengurangi data yang terukur. Data baru tidak mengisi histori sebelum pemasangan. Laporan standar dapat terlambat; gunakan Realtime untuk pengujian awal. Tidak ada informasi Analytics yang membuktikan Quality Score Ads meningkat.

## Implementasi Google Ads dan pengaitan goal nyata — 27 Oktober 2026

- Akun Ads 973-306-3009; campaign 24401417000, **PAUSED**, budget tersendiri 15982575306 sebesar Rp100.000/hari. Tidak ada penayangan yang diaktifkan.
- Kampanye dibuat untuk validasi dengan satu ad group EROJAN Brand, satu keyword Exact erojan dan satu RSA berisi tiga headline serta dua deskripsi informasi netral. Ini belum menerapkan rancangan riset dua ad group/delapan keyword; jangan menyebutnya peluncuran rancangan riset penuh.
- Conversion action **7875315571**, EROJAN - Klik WhatsApp - eroforza.com, WEBPAGE/OUTBOUND_CLICK, secondary, ONE_PER_CLICK, click window 30 hari dan view window 1 hari.
- Custom goal **6459649144**, EROJAN - WhatsApp - eroforza.com, hanya berisi action EROJAN tersebut. Sudah dikaitkan ke campaign 24401417000 pada goal config CAMPAIGN; dua standard goal EROJAN (OUTBOUND_CLICK/WEBSITE dan MESSAGE_LEAD/GOOGLE_HOSTED) dinonaktifkan setelah pengguna mendelegasikan pilihan paling aman pada pertanyaan spesifik tersebut.
- Pembacaan ulang Ads Scripts memverifikasi link nyata, primaryForGoal=false, kampanye PAUSED, serta campaign/budget/action/goal DVN yang diperiksa tidak berubah. Audit 35 laporan OK, tidak terpotong, complete=true. Biaya/impresi/klik EROJAN saat audit nol.
- Tracking menunggu izin versi 2. URL halaman/referrer pada config Ads dan event dibersihkan; klik dikirim ke AW-18414837888/MseCCPOOn6sdEIDB8MxE dengan value=0 dan currency=IDR. Pilihan lama granted meminta persetujuan baru agar cakupan Ads tidak berubah diam-diam.
- Pengujian browser lokal menolak izin tanpa event konversi; sesudah izin, event conversion yang benar tercatat dan Safari mengirim permintaan ke www.googleadservices.com/pagead/conversion/18414837888/ dan googleads.g.doubleclick.net/pagead/viewthroughconversion/18414837888/ dengan label yang benar. Status resource lintas origin tidak diekspos (0); ini bukti pengiriman request, bukan laporan atribusi.
- Pengujian adalah traffic uji. Kampanye belum berjalan sehingga konversi teratribusi dari klik iklan nyata belum dapat dibuktikan; tidak membuat GCLID atau penjualan palsu.
- Bukti dan cadangan lokal: .local-state/google-ads/live-goal-tracking-2026-10-27/.
