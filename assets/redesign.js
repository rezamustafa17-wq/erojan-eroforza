(() => {
  'use strict';
  const video = document.getElementById('product-video');
  const button = document.getElementById('video-play');
  const status = document.getElementById('video-status');
  if (!video || !button || !status) return;
  button.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => { status.textContent = 'Gunakan tombol putar pada pemutar video.'; });
      video.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center'});
    } else video.pause();
  });
  video.addEventListener('play', () => {
    button.querySelector('span').textContent = 'Jeda video';
    button.setAttribute('aria-pressed', 'true');
    status.textContent = 'Video sedang diputar';
  });
  video.addEventListener('pause', () => {
    button.querySelector('span').textContent = video.currentTime > 0 ? 'Lanjutkan video' : 'Putar video produk';
    button.setAttribute('aria-pressed', 'false');
    status.textContent = '52 detik · dengan audio';
  });
  video.addEventListener('ended', () => {
    button.querySelector('span').textContent = 'Putar ulang video';
    button.setAttribute('aria-pressed', 'false');
    status.textContent = 'Video selesai · putar kembali kapan saja';
  });
  video.addEventListener('error', () => {
    status.textContent = 'Video belum dapat dimuat. Buka halaman video melalui tautan di bawah.';
  });
})();

// Sitelink ke pertanyaan tertentu langsung memperlihatkan jawabannya.
(() => {
  const reveal = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (target && target.tagName === 'DETAILS') target.open = true;
  };
  window.addEventListener('hashchange', reveal);
  reveal();
})();

// Bar WhatsApp mobile baru tampil setelah tombol utama di hero tidak terlihat, agar layar pertama tidak berisi tiga tombol sama.
(() => {
  const cta = document.querySelector('.hero-actions .button-light');
  if (!cta || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  root.classList.add('sticky-ready');
  new IntersectionObserver(([entry]) => {
    const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    root.classList.toggle('show-sticky', passed);
  }, {threshold: 0}).observe(cta);
})();
