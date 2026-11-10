// Menambahkan kode sumber singkat di akhir pesan WhatsApp agar chat yang masuk bisa diatribusikan.
// Kode hanya berisi huruf sumber dan posisi tombol; tidak memuat gclid atau data pribadi.
(() => {
  'use strict';
  const BASE = 'https://wa.me/6281391939099';
  const DEFAULT_TEXT = 'Halo Eza, saya mau tanya harga dan stok EROJAN 60 kapsul.\n\nJumlah botol: \nKota/kecamatan tujuan: \n\nTerima kasih.';
  let query;
  try { query = new URLSearchParams(location.search); } catch (_) { return; }
  const fromAds = query.has('gclid') || query.has('gbraid') || query.has('wbraid') || query.get('utm_source') === 'google';
  const source = fromAds ? 'G' : 'W';
  // Posisi: H header, A hero, E bagian kepercayaan, V video, O pemesanan, B bar mobile, F tombol mengambang, T footer, L lainnya.
  const place = a => a.id === 'waFloat' ? 'F' : a.closest('.mobile-order') ? 'B' : a.closest('header') ? 'H' :
    a.closest('footer') ? 'T' : a.closest('.hero') ? 'A' : a.closest('#kenapa-eza') ? 'E' : a.closest('#video') ? 'V' :
    a.closest('#pemesanan') ? 'O' : 'L';
  document.querySelectorAll('a[href^="' + BASE + '"]').forEach(a => {
    const raw = a.getAttribute('href') || '';
    let text = DEFAULT_TEXT;
    const at = raw.indexOf('text=');
    if (at !== -1) { try { text = decodeURIComponent(raw.slice(at + 5)); } catch (_) { return; } }
    if (/\(kode: [A-Z]-[A-Z]\)/.test(text)) return;
    const ref = source + '-' + place(a);
    a.setAttribute('href', BASE + '?text=' + encodeURIComponent(text + '\n\n(kode: ' + ref + ')'));
    a.dataset.waRef = ref;
  });
})();
