// AdCuan+: memuat kode pelacak chat. Kode ini sendiri mengganti tautan WhatsApp agar chat bisa
// dikaitkan ke iklan. Hanya di eroforza.com (domain terdaftar); di host lain dan bila AdCuan
// gagal dimuat, tombol tetap langsung ke WhatsApp.
(() => {
  const host = location.hostname;
  if (host !== 'eroforza.com' && host !== 'www.eroforza.com') return;
  const s = document.createElement('script');
  s.src = 'https://plus.adcuan.com/code.js';
  s.setAttribute('nomor', '1');
  s.async = true;
  document.head.appendChild(s);
})();
