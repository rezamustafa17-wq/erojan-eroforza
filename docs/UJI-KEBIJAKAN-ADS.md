# Uji status kebijakan Google Ads: halaman atau kata kunci?

Dibuat 11 November 2026. Tujuannya menjawab satu pertanyaan: status "terbatas" pada iklan EROJAN berasal dari **halaman tujuan** atau dari **kata kunci**.

## Latar belakang

Data akun Google Ads 973-306-3009 (kampanye `EROJAN LP 1 28 OKT 26`) menunjukkan:

- Semua kata kunci berstatus `APPROVED`.
- Dua iklan ke `https://eroforza.com/` kena `UNAPPROVED_SUBSTANCES` (terbatas). Bukti yang dicantumkan Google adalah teks halaman tujuan ("Horny Goat Weed", "Tongkat Ali").
- Satu iklan ke `pemesanan.html` kena `NON_FAMILY_SAFE` (terbatas), penyebabnya belum diketahui.
- Di tingkat aset, batasan `UNAPPROVED_SUBSTANCES` hanya berlaku di AS dan Inggris, dan `NON_FAMILY_SAFE` di 21 negara lain. Indonesia tidak termasuk, jadi status ini kemungkinan besar tidak mengurangi jangkauan di Indonesia. Uji ini bertujuan membuktikan penyebabnya, bukan menjanjikan jangkauan lebih besar.

## Halaman uji

| Halaman | Isi | Yang diuji |
|---|---|---|
| `/erojan/1/` | Beranda apa adanya, hanya bagian komposisi yang tidak lagi memuat nama bahan (diganti pernyataan bahwa komposisi lengkap ada pada label dan data registrasi BPOM) | Apakah nama bahan saja yang memicu `UNAPPROVED_SUBSTANCES` |
| `/erojan/2/` | Struktur satu halaman: produk, keaslian dan registrasi, pemesanan, FAQ. Tanpa nama bahan, tanpa klaim manfaat, tanpa video atau testimoni, tanpa kalimat "dikemas tanpa keterangan isi" | Apakah halaman bersih memberi iklan berstatus bersih, dan apa pemicu `NON_FAMILY_SAFE` |

Kontrol adalah `https://eroforza.com/` (beranda sekarang). Ketiga halaman dipakai oleh iklan dengan **teks identik dan netral** serta kata kunci yang sama. Hanya URL akhirnya yang berbeda. Iklan uji dibuat `PAUSED`, lalu `policy_summary` tiap iklan dibaca setelah Google meninjau.

Konten kedua halaman hanya memakai data yang sudah ada di `docs/CONTENT.md` (NIE `TI223079121`, kategori Obat Tradisional, BPJPH `REG RI HL MY000017890124`, COD, ongkir gratis, WhatsApp Eza). Tidak ada klaim baru. Struktur `/erojan/2/` terinspirasi urutan bagian halaman penjualan satu halaman pada umumnya, tanpa menyalin teks, gambar, atau nomor registrasi pihak lain.

## Aturan teknis

- Kedua halaman `noindex,nofollow`, tidak ada di `sitemap.xml`, dan tidak ditautkan dari halaman lain.
- `python3 scripts/project.py check` kini memeriksa halaman uji: wajib `noindex`, tidak boleh memuat nama bahan yang diuji, aset dan anchor harus ada, nomor WhatsApp harus `6281391939099`, canonical harus sesuai, dan sitemap tidak boleh memuatnya.
- `python3 scripts/project.py build` menyalin `erojan/` ke `dist/`.
- Pelacakan GA4 dan konversi Google Ads memakai berkas yang sama dengan beranda, dan pesan WhatsApp tetap memuat kode sumber dari `assets/wa-ref.js`.

## Cara membaca hasil

1. Buat iklan uji (`PAUSED`) dengan teks identik ke tiga URL.
2. Tunggu tinjauan Google, lalu baca `ad_group_ad.policy_summary` setiap iklan.
3. Jika `/erojan/1/` tidak lagi memuat `UNAPPROVED_SUBSTANCES`, penyebabnya adalah nama bahan di halaman. Jika masih, ada pemicu lain di halaman.
4. Jika `/erojan/2/` tidak memuat `NON_FAMILY_SAFE`, pemicunya ada di bagian yang dibuang (klaim stamina pria atau kalimat kemasan). Bandingkan dengan `/erojan/1/`.
5. Jika status tetap "dalam peninjauan" selama iklan `PAUSED`, iklan perlu aktif sebentar. Hati-hati dengan sisa anggaran akun.

## Pembatalan

Hapus folder `erojan/` (atau, untuk halaman pemenang, pindahkan ke jalur permanen) dan kembalikan `scripts/project.py` ke versi sebelum perubahan ini (`git revert` pada commit yang menambahkannya). Tidak ada perubahan pada halaman publik yang sudah ada.

## Yang tidak boleh dilakukan

Jangan menampilkan isi berbeda kepada perayap Google dibanding pengunjung, jangan menyembunyikan teks agar tidak terbaca, dan jangan menampilkan nama bahan hanya sebagai gambar agar lolos. Itu melanggar kebijakan Google dan berisiko pada akun.
