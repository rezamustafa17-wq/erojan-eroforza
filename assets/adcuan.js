// AdCuan+: arahkan tombol WhatsApp lewat tautan AdConfig; code.js AdCuan lalu mengubahnya menjadi
// api.whatsapp.com dengan ID kunjungan. Hanya di eroforza.com (domain terdaftar). Tautan wa.me baru
// diganti setelah code.js berhasil dimuat; bila AdCuan gagal atau diblokir, tombol tetap langsung ke WhatsApp.
(() => {
  const host = location.hostname;
  if (host !== 'eroforza.com' && host !== 'www.eroforza.com') return;
  const BASE = 'https://wa.me/6289682110081';
  const CTA = 'https://plus.adcuan.com/ctawa/1057-1';
  const s = document.createElement('script');
  s.src = 'https://plus.adcuan.com/code.js';
  s.setAttribute('nomor', '1');
  s.async = true;
  s.onload = () => document.querySelectorAll('a[href^="' + BASE + '"]').forEach(a => { a.setAttribute('href', CTA); a.dataset.adcuan = '1'; });
  document.head.appendChild(s);
})();
