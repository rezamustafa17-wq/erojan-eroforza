# Peta aset testimoni EROJAN — 10 November 2026

Sumber: `output/social/erojan-testimoni-2026-11-10/EROJAN-7-Story-Final-2026-11-10.zip` (7 PNG Story, format 9:16). Arsip dan folder `output/` tidak ikut build dan tidak boleh diterbitkan apa adanya. Berkas web yang diturunkan ada di `assets/testimoni/`.

| # | Berkas | Jenis | Isi | Status di situs | Alasan |
|---|---|---|---|---|---|
| 01 | 01-testimoni.png (1080×1920) | Kutipan pilihan | "tenaganya lebih oke dan hubungan kami lebih harmonis" (chat pelanggan, 2 minggu pemakaian) | **Dipasang** (keputusan eksplisit pemilik) | Testimoni khasiat bernuansa fungsi seksual; risiko PerBPOM 34/2022 dan kebijakan Google Ads diterima pemilik |
| 02 | 02-pesanan-diterima.png (1080×1920) | Kabar pengiriman | Chat kurir: foto paket diterima | **Ditahan** | Memuat nomor telepon, plat nomor, dan tautan pelacakan Gojek pihak ketiga yang terbaca; menyamarkannya berarti mengubah screenshot, yang dilarang aturan desain Anda; foto paket memuat produk lain (COFFIY) |
| 03 | 03-pesanan-diterima.png (1224×2176) | Kabar pengiriman | Pelanggan: paket sampai, kemasan rapi | **Dipasang** (`#kabar`) | Tanpa data pihak ketiga yang terbaca, nama pelanggan sudah disamarkan, tanpa klaim khasiat |
| 04 | 04-pesanan-diterima.png (1224×2176) | Kabar pengiriman | Resi, tautan pelacakan, foto 3 botol dalam kardus | **Ditahan** | Label botol pada foto bertuliskan "SUPLEMEN HERBAL PRIA DEWASA", bertentangan dengan kategori terdaftar Obat Tradisional; resi, tautan, dan nama depan pelanggan terbaca |
| 05 | 05-testimoni.png (1296×2304) | Kutipan pilihan | Tenaga, fokus, stamina, "hubungan dengan istri lebih harmonis dan berkualitas seperti masa muda lagi" | **Dipasang** (keputusan eksplisit pemilik) | Klaim khasiat dan fungsi seksual eksplisit; risiko tertinggi, diterima pemilik |
| 06 | 06-testimoni.png (1296×2304) | Kutipan pilihan | Bertenaga, tidur nyenyak, "sama istri lebih enak... harmonis" | **Dipasang** (keputusan eksplisit pemilik) | Klaim khasiat bernuansa seksual; risiko diterima pemilik |
| 07 | 07-testimoni.png (1080×1920) | Kutipan pilihan | Tenaga, fokus, "sama istri makin harmonis... percaya diri" | **Dipasang** (keputusan eksplisit pemilik) | Klaim khasiat bernuansa seksual; risiko diterima pemilik |

Berkas web: `assets/testimoni/{pengiriman-03,testimoni-06,testimoni-07,testimoni-01,testimoni-05}-{720,1080}.webp` (WebP 9:16 dari aset 03, 06, 07, 01, 05 tanpa perubahan konten; 720 untuk tampilan, 1080 untuk dibuka penuh). Tampil sebagai carousel geser samping di `#kabar`, urutan: 03, 06, 07, 01, 05. Alt dan keterangan sengaja netral (tidak mengulang isi kutipan di HTML).

## Catatan lintas aset
- Semua Story memakai foto Tora Sudiro di header "Cerita dari Pelanggan". Itu menyiratkan dukungan Tora atas kutipan pelanggan (PerBPOM 34/2022 Lampiran I butir 18 tentang endorser). Pastikan izin pemakaian foto mencakup konteks ini.
- Persetujuan pelanggan untuk menayangkan chat belum terdokumentasi; nama disamarkan oleh pengelola. Simpan bukti izin.
- Kutipan 01 dan 05–07 juga muncul di desain sosial; keputusan di sini hanya untuk situs yang menjadi tujuan iklan Google Ads.
- Tangkapan layar asli tidak diubah. Salinan web aset 03 hanya diperkecil.

## Keputusan pemilik — 10 November 2026
Setelah ditunjukkan risikonya (PerBPOM 34/2022 Lampiran I, kebijakan Google Ads healthcare/sexual health, endorser, izin pelanggan), pemilik memilih memasang keempat kutipan (01, 05, 06, 07). Aset 02 dan 04 tetap ditahan (bukan kutipan; data pihak ketiga dan label "SUPLEMEN HERBAL PRIA DEWASA"). Jika iklan ditolak atau ada teguran BPOM, mundurkan dengan `git revert` commit pemasangan kutipan; riwayatnya ada di git.
