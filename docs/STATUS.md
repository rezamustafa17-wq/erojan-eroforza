# Status proyek EROJAN

## Pembaruan 10 November 2026 (malam) — GA4 dan perbaikan teknis

- GA4: empat dimensi kustom berlingkup peristiwa didaftarkan: Kode sumber WA (`wa_ref`), Posisi CTA (`cta_location`), Persen scroll atau video (`percent`), Pertanyaan FAQ (`question`). Data baru muncul di laporan setelah 24-48 jam. Eksplorasi "EROJAN - Konversi dan Bounce Rate" (bentuk bebas, 28 hari): baris halaman landing dan sumber/media, kolom kategori perangkat, nilai pengguna aktif, sesi, rasio pentalan, rasio engagement, waktu interaksi rata-rata, rasio peristiwa utama sesi, jumlah peristiwa.
- Situs: preload dua font Barlow, preconnect ke Google Tag Manager dan Analytics, nomor WhatsApp terlihat di baris hero, dan `404.html` bermerek (noindex) dengan tombol kembali dan WhatsApp.
- Ukuran produksi (jaringan sandbox, bukan skor resmi): CLS 0, LCP 2,66 detik (elemen H1), 776 KB dalam 24 permintaan.

## Pembaruan 10 November 2026 (malam) — carousel testimoni otomatis

- `#kabar` kini bergeser otomatis pelan (28 px/detik, loop mulus dengan salinan kartu). Berhenti saat disentuh, di-hover, atau difokus keyboard; lanjut 3,5 detik setelah pengguna berhenti; berhenti saat bagian tidak terlihat atau tab tersembunyi. Tetap bisa digeser manual. Tombol "Jeda geser otomatis" tersedia (aksesibilitas), dan `prefers-reduced-motion` menonaktifkan geser otomatis sejak awal. Logika di `assets/redesign.js`.

## Pembaruan 10 November 2026 (malam, testimoni) — section "Kabar dari pelanggan"

- Tujuh Story testimoni dipetakan di docs/TESTIMONI-EROJAN-2026-11-10.md. Terpasang lima (carousel `#kabar`): kabar pengiriman 03 dan kutipan 06, 07, 01, 05 atas keputusan eksplisit pemilik setelah risiko dijelaskan. Aset 02 dan 04 ditahan.
- Risiko diterima pemilik: testimoni khasiat bernuansa fungsi seksual pada halaman tujuan iklan (PerBPOM 34/2022, kebijakan Google Ads). Pantau status iklan; bila bermasalah, revert commit pemasangan kutipan.

## Pembaruan 10 November 2026 (malam) — paket P0/P1 dari audit panjang, kenyamanan, konversi

- Struktur beranda: bagian kepercayaan ("Anda beli di tempat yang terpercaya") naik ke tepat setelah hero; `#manfaat` dihapus; foto botol kedua disembunyikan di ponsel; CTA ketiga di bawah video. Tinggi ponsel turun dari 7.418 px ke sekitar 6.440 px (7,6 layar); CTA di isi halaman pertama kini di sekitar 2,5 layar (sebelumnya 5,8).
- Keterbacaan: tombol utama 14 px, paragraf 15 px, lantai teks informasi 12 px (kecuali label merek dekoratif 10 px), tap target footer dan tautan kecil diperbesar, hero tablet dan tombol mengambang diperbaiki.
- Kepatuhan: pemberitahuan mencolok "Baca aturan pakai, peringatan, dan perhatian pada label Indonesia" dengan NIE dan pendaftar OUS Nusantara Indonesia sebelum footer. Wording chip hero "Herbal Berstandar BPOM", label "TESTIMONI", dan surat pernyataan Tora masih menunggu keputusan pemilik.
- Atribusi: `assets/wa-ref.js` menambahkan "(kode: X-Y)" di akhir pesan WhatsApp (X = G dari iklan Google, W lainnya; Y = posisi: H header, A hero, E kepercayaan, V video, O pemesanan, B bar mobile, F mengambang, T footer, L lain). Tidak memuat gclid. Event baru `faq_open`, `video_progress`, dan parameter `wa_ref` pada `whatsapp_click`.
- Subhalaman: warna zaitun, "JAN" emas, tombol krem seperti beranda; `pemesanan.html` diselaraskan dengan gratis ongkir dan COD.

## Pembaruan 10 November 2026 (sore) — perbaikan konversi dan bounce

- Hasil kritik `impeccable` (skor 26/32) dieksekusi kecuali harga: harga tetap tidak ditampilkan, pemesanan lewat WhatsApp.
- Hero: H1 "Rawat stamina. EROJAN, 60 kapsul.", chip Obat Tradisional + BPOM TI223079121 (tautan Cek BPOM), tiga poin kepastian (tanya dulu tidak wajib membeli; harga/stok/ongkir tertulis di chat; rincian disepakati sebelum membayar), baris "Dilayani langsung oleh Eza". Pesan WhatsApp kini berkolom jumlah botol dan kota.
- Bagian "keseharian" (daftar gejala) diganti "Tanya dulu. Putuskan kemudian." dengan foto Eza dan empat jaminan faktual. Urutan FAQ: harga dan stok pertama, pertanyaan testosteron terakhir. Label CTA seragam "Tanya harga".
- Mobile: tombol header disembunyikan, bar tempel baru muncul setelah tombol hero lewat, botol lebih kecil. Gambar hero PNG 1 MB diganti WebP 23-86 KB (srcset). Teks kecil dan kontras footer/CTA diperbaiki. Bug override warna footer yang sempat saya buat sudah diperbaiki sebelum rilis.
- Pengukuran: event `video_play` dan `scroll_depth` (25/50/75/90); tag Google hanya berjalan di eroforza.com (localhost dan pratinjau tidak lagi mencemari GA4).
- Menunggu data dari pemilik: jam balas Eza dan konfirmasi klaim kemasan (mis. dikemas tanpa keterangan isi). Belum ditulis di situs.

## Pembaruan 10 November 2026 (siang) — SEO/GEO/AIO dan akun Google

- Situs: JSON-LD FAQPage dan Product (tanpa harga) di beranda, BreadcrumbList serta OG/Twitter di halaman lain, `llms.txt`, aturan crawler AI di `robots.txt`, `lastmod` sitemap diperbarui. Teks dan desain tidak berubah. Commit 450ba06 di main.
- GA4: `whatsapp_click` ditandai peristiwa utama; properti ditautkan ke Search Console; anotasi "Banner privasi dihapus" tertanggal 10 Nov 2026.
- Search Console: sitemap dibaca 10 Nov (6 halaman, 1 video); pengindeksan diminta untuk beranda, video.html, pemesanan.html.
- Google Ads: anggaran akun Rp6.000.000, terpakai Rp4.999.050 (83%); tidak diubah. Hasil konversi klik keluar 0 sebelum banner dihapus. Cloudflare: DNS-only ke GitHub Pages, tidak diubah.

## Pembaruan 10 November 2026 — banner privasi dihapus

- Banner/panel privasi dan tombol "Pengaturan pengukuran" dihapus dari enam halaman karena menaikkan bounce rate dan menurunkan konversi. `measurement-ui.js` dan `measurement.css` dihapus.
- `assets/measurement-consent.js` kini memberi consent default granted untuk statistik dan iklan; personalisasi iklan tetap denied. Pilihan "Tolak" lama di localStorage dihapus dan diabaikan. Pengukuran GA4 dan konversi klik WhatsApp tetap berjalan.
- Kebijakan privasi diperbarui agar sesuai. Bagian dokumen consent 3 November di bawah adalah riwayat dan tidak lagi berlaku. Perubahan ini baru lokal; belum di-commit atau dipublikasikan.
- Risiko diketahui: pengunjung EEA/UK/CH dan hukum PDP Indonesia umumnya mensyaratkan dasar hukum/persetujuan untuk cookie iklan. Keputusan ini ada pada pemilik.

## Audit sore 6 November 2026 — penayangan, relevansi dan perbaikan

- Snapshot 18.04 WIB: DVN 135 impresi/13 klik/Rp88.310; EROJAN 18 impresi/0 klik/Rp0. Pengguna melaporkan 0 chat keduanya.
- Teks RSA DVN diperbaiki dan final URL tetap /dvn sesuai penegasan menjaga gambar/desain. RSA pemesanan EROJAN tidak lagi memuat harga nominal, sesuai pilihan harga via WA. Edit direview Google; pembatasan EROJAN belum selesai.
- Layanan DVN diselaraskan dengan konfirmasi aktif pemilik; PR DVN #6, CI/deploy success. Semua aset gambar dipertahankan. Budget/bidding/status campaign tetap.
- Laporan lengkap dan lampiran 104 query: output/google-ads/2026-11-06-sore/AUDIT-LENGKAP-DVN-EROJAN.md. Lokasi putus funnel diketahui; motif tiap pengunjung belum dibuktikan.


## Pembaruan 6 November 2026 — CTA pemesanan dan negatif DVN

- CTA beranda dan pemesanan EROJAN diperjelas untuk harga/stok/ongkir; PR #1 merged, GitHub Pages success pada commit 0d8c4f9. Nomor WA, desain, video, bahan dan pengukuran dipertahankan.
- 12 negatif pertanyaan pembeli DVN dicabut dan 9 frasa perekrutan ditambahkan; readback daftar 2509. Budget/bidding/status tetap.
- Keyword/lokasi/negatif EROJAN dan sitelink masih dibatasi konektor; pembatasan kebijakan EROJAN belum terselesaikan. Hasil penjualan belum dapat dinilai tanpa rekap pembayaran.
- Bukti dan paket tindak lanjut: output/google-ads/2026-11-06/HASIL-PENERAPAN-PERFORMA.md.


## Pembaruan terbaru — kontrol privasi sudah terbit 3 November 2026

- Pemilik menyetujui versi staging dan meminta eksekusi; commit produksi `37802b8a7229f637e7bf9042fbf6c36bd676b186` sudah di main dan GitHub Pages built.
- Panel privasi berada dalam alur halaman, CTA tidak tertutup, pilihan statistik/iklan terpisah. Advanced/cookieless tetap nonaktif; nomor WA dan video Tora dipertahankan.
- Check/build/diff check dan 13 tes consent lulus. Lima belas berkas publik HTTP 200 dan cocok dengan berkas rilis lokal. Batas QA Chrome/perangkat fisik/performa tetap dicatat, tidak dianggap selesai oleh persetujuan rilis.
- [Hasil publikasi consent dan rollback](HASIL-PUBLIKASI-CONSENT-EROJAN-2026-11-03.md).

## Pembaruan terbaru — landing page baru 3 November 2026

- Landing page baru sudah terbit di https://eroforza.com/ melalui commit `fa89888949ba161947087cec390b5a52c4fc7538`; main dan GitHub Pages cocok, status built.
- Video Tora Sudiro dipakai kembali atas permintaan pemilik; nominal harga dihapus dan pemesanan diarahkan ke WhatsApp 0813-9193-9099. Ini menggantikan pilihan video pada catatan historis 1 November di bawah.
- Pengukuran dengan izin pengunjung dipertahankan. Check, build, diff check, tes tracking dan pemeriksaan sintaks lulus. Sembilan berkas publik HTTP 200 dan identik dengan hasil uji.
- Perubahan sitelink **belum diterapkan**: konektor Composio membatasi mutasi aset. Enam sitelink telah dibaca dan tujuan pengganti disiapkan; tidak ada budget, bidding, status, goal, atau resource DVN diubah.
- [Hasil publikasi dan batas pekerjaan](HASIL-PUBLIKASI-LANDING-EROJAN-2026-11-03.md) · [Daftar tujuan sitelink](SITELINK-LANDING-BARU-EROJAN-2026-11-03.md).

## Hasil terbaru — koreksi materi 1 November 2026

- Kampanye 24401417000 kini ENABLED, budget Rp100.000/hari dan MAXIMIZE_CONVERSIONS. Catatan PAUSED di bawah adalah riwayat sebelum pemilik mengaktifkannya pada 31 Oktober pukul 21.19 WIB.
- Data BPOM diperiksa ulang: Obat Tradisional, TI223079121, botol 60 kapsul, kegunaan membantu memelihara stamina pria dan enam ekstrak. Nama umum bahan tidak disamarkan.
- Tiga RSA diperbaiki dan dibaca ulang; klaim testosteron, kategori suplemen, official store, gratis ongkir/COD dan jaminan tanpa bukti pada iklan pemesanan diganti informasi faktual.
- Koreksi situs dan video informasi tanpa testimoni terbit pada commit b51a8c27a6868fb4e443c7476b603525f7e8e7ea setelah persetujuan pemilik. GitHub Pages built; tujuh berkas publik HTTP 200 dan identik dengan hasil uji.
- Google mengonfirmasi dua banding berhasil diajukan untuk grup Brand dan Harga/Pemesanan. Hasil akhir belum tersedia; jangan menyebut sudah bebas pembatasan.
- Snapshot API setelah banding: RSA 829623996927 dan 829670428221 REVIEW_IN_PROGRESS/UNKNOWN, RSA 829670584290 masih REVIEWED/APPROVED_LIMITED; konfirmasi pengajuan grup tetap tersimpan.
- Label Indonesia lengkap seluruh sisi masih diperlukan untuk pemeriksaan aturan pakai dan peringatan menyeluruh. Lihat [laporan koreksi](HASIL-KOREKSI-KEBIJAKAN-EROJAN-2026-11-01.md).

## Hasil terbaru - eksekusi 28 Oktober 2026

Struktur penuh EROJAN sudah diterapkan: campaign 24401417000, dua grup, delapan Exact keyword, dua RSA baru, delapan callout, empat sitelink dan 19 negatif. MAXIMIZE_CONVERSIONS tanpa tCPA, budget tetap Rp100.000/hari; campaign PAUSED karena review dan kelayakan materi belum lengkap. Tracking publik terverifikasi; tidak ada penjualan/atribusi iklan palsu. Audit 35/35 lengkap, konfigurasi DVN/default goals yang dibandingkan tetap sama; Quality Score keluaran Google pada satu keyword DVN berubah 5 -> 7 dan dicatat terpisah. Website kategori/harga sudah terbit melalui commit dcbd30f0817c6aba87224aa88f4066ba2c644d2e. Skrip AUDIT/PLAN tanpa jadwal. Lihat [laporan pelaksanaan lengkap](HASIL-EKSEKUSI-MAX-KONVERSI-EROJAN-2026-10-28.md). Bagian lama berikut adalah riwayat dan dapat berisi kondisi sebelum tindak lanjut ini.


Diperbarui: 27 Oktober 2026, WIB.

## Pengaitan custom goal dan tracking EROJAN — sudah diuji nyata

- Google Ads Scripts membuat campaign EROJAN 24401417000 PAUSED, budget terpisah Rp100.000/hari, action klik WhatsApp 7875315571 secondary, dan custom goal 6459649144. Goal sudah dikaitkan dengan ID nyata dan dua standard goal EROJAN dinonaktifkan untuk isolasi. Snapshot DVN/account goals yang dibandingkan identik.
- Audit akhir 35/35 laporan OK, tidak terpotong, complete=true; biaya/klik/impresi EROJAN nol. Ini setup minimal validasi satu keyword/satu grup/satu RSA, bukan penerapan rancangan riset penuh dan bukan aktivasi penayangan.
- Tracking AW-18414837888 / MseCCPOOn6sdEIDB8MxE dipublikasikan pada commit main 4e74170f54f7def7db4d10fe9e5c303211a6b560. GitHub Pages built; dua aset publik HTTP 200 dan identik dengan sumber teruji.
- Tag Assistant Google di Safari terhubung ke situs publik dan menampilkan event conversion dengan Hit Dikirim ke action EROJAN, label benar, value 0 IDR. Consent versi 2 meminta ulang izin granted lama; personalisasi tetap denied. Tidak ada chat dikirim atau atribusi klik iklan palsu.
- Skrip tersimpan kembali pada AUDIT/PLAN dan identik setelah reload. Belum ada uji atribusi dari iklan berbayar karena kampanye tetap PAUSED.
- Laporan lengkap: [HASIL-GOAL-TRACKING-EROJAN-2026-10-27.md](HASIL-GOAL-TRACKING-EROJAN-2026-10-27.md). Bagian lama yang menyatakan belum dibuat/ditautkan digantikan hasil ini untuk resource yang sama.


## Riset arsitektur Google Ads EROJAN — 27 Oktober 2026

- Riset baru membaca Google Ads Keyword Planner, daftar kampanye akun tujuan, Google Trends Indonesia melalui DataForSEO, situs publik, portal BPOM/BPJPH, serta kebijakan resmi Google dan PerBPOM 34/2022. Tidak ada perubahan akun iklan atau website publik dalam riset ini.
- Pengguna mengoreksi angka: budget Rp100.000 per hari, harga Rp769.000 dan **HPP Rp423.000** per botol. Laba kotor Rp346.000 (44,99%), sebelum iklan dan biaya lain. Sasaran CPA Rp200.000 menyisakan Rp146.000 sebelum biaya lain; masih usulan sementara. Batas CPA impas maksimal Rp346.000 sebelum biaya lain, ROAS impas minimal 2,22x. Laporan, PDF dan paket unduhan telah dikoreksi.
- BPOM live menampilkan kategori **Obat Tradisional**, NIE TI223079121, botol 60 kapsul, dan kegunaan “Membantu memelihara stamina pria”. Copy website “suplemen”/“Suplemen bukan obat” perlu diselaraskan sebelum aktivasi; belum diubah oleh riset ini. Label Indonesia lengkap dan audio/video belum diaudit menyeluruh.
- Pilihan uji terbaru sesuai arahan pemilik: **Maksimalkan konversi setelah tracking publik berfungsi dan lulus QA**, budget rata-rata Rp100.000/hari, tanpa target CPA pada awal uji. Batas CPC Rp3.000 dari rancangan Max Klik tidak dipakai pada strategi Search ini. Sasaran bisnis Rp200.000 tetap per pesanan selesai, bukan per klik WA.
- Rancangan struktur tetap satu Search campaign PAUSED, dua ad group, delapan keyword Exact, dua RSA (30 headline/8 deskripsi), delapan callout, empat sitelink dan daftar negatif. Pemeriksaan akun lanjutan menemukan kampanye EROJAN ID 24401417000 sudah ada, Paused dan masih Max Klik; struktur rinci rancangan belum dianggap sudah terpasang. Jangan membuat kampanye duplikat.
- Custom goal EROJAN ID 6459649144 sudah terhubung ke kampanye, hanya berisi action klik WA ID 7875315571. Action Secondary dipakai untuk bidding melalui custom goal; ini belum chat nyata atau penjualan. Pemeriksaan publik terakhir sebelum revisi menemukan ID/label kosong sementara lokal sudah terisi; revisi dokumen tidak menerbitkan atau menguji ulang tracking.
- Forecast API Max Klik lama untuk 28 Oktober–3 November (7,52 klik/Rp12.679 pada batas Rp3.000; 11,32 klik/Rp32.437 pada batas Rp4.500) dipertahankan sebagai pembanding historis. **Bukan forecast Maksimalkan konversi** dan bukan janji traffic, biaya atau penjualan strategi baru.
- Panduan lengkap: [RISET-KAMPANYE-EROJAN-RP100000-2026-10-27.md](RISET-KAMPANYE-EROJAN-RP100000-2026-10-27.md). Aset terstruktur: `campaigns/erojan-research-2026-10-27/ASET-DAN-STRUKTUR.json`. PDF tersedia di `output/pdf/`. Bukti baca tetap di `.local-state/ads-research-2026-10-27/`.
- Laporan Markdown/PDF, JSON, teks aset dan ZIP diselaraskan dengan pilihan bidding baru. JSON adalah referensi input manual, bukan file impor Editor. Paket impor lama di bawah tidak memuat pilihan bidding/goal terbaru; jangan mengimpor dua versi sekaligus. Peran hukum pengiklan menentukan jalur persetujuan/pengecualian sesuai pasal 8 dan 23. Revisi dokumen ini tidak mengubah akun maupun website publik.

## Pemulihan video dan SEO — 27 Oktober 2026 (sudah terbit)

- Situs publik diperiksa: beranda HTTP 200 tanpa elemen video; `/assets/video/erojan-product.mp4` HTTP 404.
- Pemutar asli dikembalikan ke beranda, sesudah ringkasan produk; halaman utama khusus menonton tersedia di `video.html`.
- Build kini menyertakan video 5.297.391 byte dan thumbnail JPEG dari frame asli. R2 tidak diaktifkan atau diubah.
- `VideoObject`, canonical halaman video, izin pratinjau video, dan entri sitemap video ditambahkan. Durasi media 52,033 detik di browser; kontainer 52,034 detik. Tanggal metadata menggunakan tanggal publikasi pemulihan yang direncanakan, 27 Oktober 2026; belum ada bukti video pernah terbit sebelumnya.
- Check memeriksa kesesuaian konfigurasi, pemutar, metadata dan sitemap. Check, build serta git diff --check lulus.
- QA dari dist: video berhasil diputar (currentTime meningkat, readyState 4, tanpa media error); desktop 1280 px dan ponsel 390 px tanpa luapan horizontal. Tidak dilakukan audit baru atas semua klaim audio/video.
- Bukti lokal di `.local-state/video-repair/`. Commit publikasi terbatas disiapkan: `6864db13dbc157f31ce1a60b82ddc87cc39396c0`, berbasis main `9c90f1b867fa2176b766e6c18b6b8ebea65c6f4a`. Staging kampanye yang sudah ada tetap dipertahankan.
- Setelah pemilik memberi persetujuan eksplisit “oke terbitkan”, commit `6864db13dbc157f31ce1a60b82ddc87cc39396c0` berhasil didorong ke main tanpa force. GitHub Pages berstatus built untuk commit tersebut. Penolakan publikasi awal terselesaikan oleh persetujuan ini.
- Verifikasi publik: beranda dan video.html HTTP 200 dengan pemutar serta VideoObject; thumbnail HTTP 200; sitemap HTTP 200 dengan entri video. MP4 utuh HTTP 200, SHA-256 sama dengan sumber lokal (5.297.391 byte); range/seek HTTP 206.
- Pemutaran di browser publik berhasil: currentTime 25,308 detik, durasi 52,033 detik, paused false, readyState 4, tanpa media error pada pembacaan terakhir. Bukti: `.local-state/video-repair/video-live.png` dan `live-verification.json`.
- Penambahan markup tidak menjamin indeks maupun tampilan hasil video Google.


## Kampanye EROJAN: paket impor Rp100.000 per hari

- Pemilik menetapkan anggaran rata-rata harian Rp100.000 pada 27 Oktober 2026.
- Paket Google Ads Editor tersedia di exports/erojan-google-ads-100000-2026-10-27.zip. Salinan sumber CSV dan hasil validasi disimpan di campaigns/erojan-search-2026-10-27/.
- Nama kampanye baru: EROJAN Search Brand Indonesia 2026-10-27, domain eroforza.com, akun tujuan 973-306-3009, status awal Paused.
- Jaringan Google Search, lokasi Indonesia (2360), bahasa id, empat keyword Exact, satu RSA dengan 15 judul dan 4 deskripsi. Bidding Maximize clicks merupakan usulan untuk tinjauan impor.
- Validasi lokal dan pembacaan ulang CSV lulus. Impor langsung Google Ads Editor dan posting akun belum dilakukan. Tidak ada kampanye, budget, konversi, atau pengaturan DVN diubah.
- Izin aplikasi Composio telah diperiksa dan Allow all actions; fungsi mutasi tetap dibatasi layanan. Pembuatan paket ini hanya mengerjakan file lokal.
- Panduan: [IMPOR-KAMPANYE-EROJAN-2026-10-27.md](IMPOR-KAMPANYE-EROJAN-2026-10-27.md), termasuk pemeriksaan lokasi Presence, budget tersendiri, sasaran konversi, serta daftar perubahan sebelum Post.
- Rp100.000 adalah rata-rata harian: untuk kebanyakan kampanye Google dapat membelanjakan Rp200.000 pada hari tertentu, dengan batas bulanan Rp3.040.000 bila budget tetap sepanjang bulan. Kampanye tetap dijeda saat diposting untuk ditinjau.


## Perbaikan Google Ads Scripts — 27 Oktober 2026

- Tanpa Composio. Versi 2026-10-27.2 memperbaiki builder Search (bahasa otomatis, referensi lokasi include/exclude), memisahkan CREATE_CUSTOM_GOAL dan LINK_CUSTOM_GOAL dengan ID nyata, serta menambahkan batch conversion action dan ekspor tag terfilter.
- 30 tes lokal lulus. Preview Google: 17 skenario positif lulus dan dua kontrol negatif ditolak sesuai harapan, termasuk empat bidding Search dan lima tipe conversion action. Pengaitan custom goal memakai ID nyata telah diuji lokal; belum diuji live karena belum ada goal tersimpan dan tidak dibuat objek produksi untuk pengujian.
- Task ekspor tag diuji nyata pada action lama: dua laporan OK dan complete=true, tanpa mengubah action. Tidak ada APPLY campaign/budget/konversi/goal dalam perbaikan ini.
- Akun 973-306-3009 dan URL Sheets yang sudah terpasang dipertahankan. Batas laporan menjadi 12.000 untuk katalog Indonesia yang saat audit memuat 10.670 baris.
- Panduan: integrations/google-ads-scripts/RECIPES.md; bukti dan keterbatasan: integrations/google-ads-scripts/VALIDATION.md. Bagian pemasangan awal di bawah adalah riwayat sebelum audit dan perbaikan.

## Google Ads: jalur Google Ads Scripts

- Pengguna memilih tidak melanjutkan Google Cloud/OAuth client pribadi dan meminta konfigurasi melalui skrip Google.
- Paket lokal tersedia di `integrations/google-ads-scripts/`: Code.js, README, contoh konfigurasi dan pengujian offline.
- Pengguna mengonfirmasi akun tujuan `973-306-3009` yang juga berisi DVN; account guard sudah diisi. Default konversi baru secondary dan perubahan campaign memakai ID spesifik.
- Runtime yang digunakan adalah Google Ads Scripts di akun Ads, bukan editor Apps Script biasa. Authorize bawaan Google tetap diperlukan; tidak memerlukan token dari Composio.
- Paket mencakup builder Search campaign PAUSED, update campaign/budget, create/update konversi, goals/custom goals, generic mutate dan laporan Sheets. Mode default PLAN/AUDIT.
- Status awal 26 Oktober: 22 tes mock lulus sebelum pemasangan. Status ini digantikan hasil audit dan perbaikan 27 Oktober di atas.
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
