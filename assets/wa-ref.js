// Menyusun pesan WhatsApp sesuai tombol yang ditekan dan menambahkan kode sumber singkat di akhir pesan
// agar chat yang masuk bisa diatribusikan. Kode hanya berisi huruf sumber dan posisi tombol; tidak memuat gclid atau data pribadi.
// Pesan menanyakan manfaat EROJAN, harga, dan stok, dengan satu kolom alamat yang diisi pengirim sebelum mengirim.
(() => {
  'use strict';
  const BASE = 'https://wa.me/6281391939099';
  const MORE = 'Boleh sekalian info harga dan stoknya?';
  const SOURCE = 'Saya lihat dari website eroforza.com.';
  const ADDRESS = '\n\nAlamat pengiriman saya: ';
  // Pesan per posisi tombol. Kunci mengikuti kode posisi di bawah.
  const GENERAL = 'Halo Eza, saya mau tahu manfaat EROJAN 60 kapsul. ' + MORE + ' ' + SOURCE;
  const MESSAGE = {
    E: 'Halo Eza, saya mau tahu manfaat EROJAN 60 kapsul dan memastikan keaslian penjualnya. ' + MORE,
    V: 'Halo Eza, saya habis nonton videonya dan mau tahu manfaat EROJAN 60 kapsul. ' + MORE,
    K: 'Halo Eza, saya sudah lihat testimoninya dan mau tahu lebih jauh manfaat EROJAN 60 kapsul. ' + MORE
  };
  let query;
  try { query = new URLSearchParams(location.search); } catch (_) { return; }
  const fromAds = query.has('gclid') || query.has('gbraid') || query.has('wbraid') || query.get('utm_source') === 'google';
  const source = fromAds ? 'G' : 'W';
  // Posisi: H header, A hero, E bagian kepercayaan, V video, K kabar pelanggan, O pemesanan, B bar mobile, F tombol mengambang, T footer, L lainnya.
  const place = a => a.id === 'waFloat' ? 'F' : a.closest('.mobile-order') ? 'B' : a.closest('header') ? 'H' :
    a.closest('footer') ? 'T' : a.closest('.hero') ? 'A' : a.closest('#kenapa-eza') ? 'E' : a.closest('#video') ? 'V' : a.closest('#kabar') ? 'K' :
    a.closest('#pemesanan') ? 'O' : 'L';
  // Tombol paket (mis. "Minta info paket 2 botol") mempertahankan jumlah botolnya.
  const compose = (pos, text) => {
    const pack = /paket (\d+) botol/i.exec(text);
    if (pack) return 'Halo Eza, saya mau tahu manfaat EROJAN 60 kapsul dan paket ' + pack[1] + ' botolnya. ' + MORE + ' ' + SOURCE;
    return MESSAGE[pos] || GENERAL;
  };
  document.querySelectorAll('a[href^="' + BASE + '"]').forEach(a => {
    const raw = a.getAttribute('href') || '';
    let text = '';
    const at = raw.indexOf('text=');
    if (at !== -1) { try { text = decodeURIComponent(raw.slice(at + 5)); } catch (_) { return; } }
    if (/\(kode: [A-Z]-[A-Z]\)/.test(text)) return;
    const pos = place(a);
    const ref = source + '-' + pos;
    a.setAttribute('href', BASE + '?text=' + encodeURIComponent(compose(pos, text) + ADDRESS + '\n\n(kode: ' + ref + ')'));
    a.dataset.waRef = ref;
  });
})();
