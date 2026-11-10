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

// Tombol mengambang disembunyikan saat bagian yang sudah memuat CTA sendiri terlihat, agar tidak menutupi teks.
(() => {
  if (!('IntersectionObserver' in window)) return;
  const targets = [document.getElementById('pemesanan'), document.getElementById('kenapa-eza')].filter(Boolean);
  if (!targets.length) return;
  const visible = new Set();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
    document.documentElement.classList.toggle('float-hidden', visible.size > 0);
  }, {threshold: 0.25});
  targets.forEach(t => io.observe(t));
})();

// Carousel "Kabar dari pelanggan": geser otomatis pelan, berhenti saat disentuh/di-hover/difokus,
// tetap bisa digeser manual, dan menghormati prefers-reduced-motion. Tombol jeda tersedia.
(() => {
  const track = document.querySelector('.kabar-track');
  if (!track || !('IntersectionObserver' in window)) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const originals = Array.from(track.children);
  originals.forEach(li => {
    const clone = li.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); clone.setAttribute('inert', ''); clone.dataset.clone = 'true';
    clone.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
    track.appendChild(clone);
  });
  const section = track.closest('.kabar');
  section.classList.add('kabar-auto');
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.className = 'kabar-toggle'; toggle.setAttribute('aria-pressed', 'false');
  const hint = section.querySelector('.kabar-hint');
  if (hint) hint.insertAdjacentElement('afterend', toggle); else track.insertAdjacentElement('afterend', toggle);
  const SPEED = 28;               // piksel per detik: pelan
  const RESUME_DELAY = 3500;      // jeda setelah pengguna berhenti menyentuh
  let pos = 0, last = 0, raf = 0, visible = false, userPaused = reduce.matches, holdUntil = 0, programmatic = 0;
  const loopWidth = () => { const first = originals[0], clone = track.querySelector('[data-clone]'); return clone.offsetLeft - first.offsetLeft; };
  const label = () => { toggle.textContent = userPaused ? 'Putar geser otomatis' : 'Jeda geser otomatis'; toggle.setAttribute('aria-pressed', String(userPaused)); };
  const hold = (ms = RESUME_DELAY) => { holdUntil = performance.now() + ms; };
  const running = () => visible && !userPaused && !document.hidden && performance.now() >= holdUntil;
  function frame(now) {
    raf = 0;
    const dt = Math.min(64, now - (last || now)); last = now;
    if (running()) {
      if (Math.abs(track.scrollLeft - programmatic) > 2) pos = track.scrollLeft; // pengguna menggeser: ikuti posisinya
      pos += SPEED * dt / 1000;
      const lw = loopWidth();
      if (lw > 0 && pos >= lw) pos -= lw;
      const next = Math.round(pos);
      if (next !== Math.round(track.scrollLeft)) { track.scrollLeft = next; }
      programmatic = track.scrollLeft;
    } else { pos = track.scrollLeft; programmatic = pos; }
    schedule();
  }
  function schedule() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = 0; if (visible) schedule(); }, {threshold: 0.2}).observe(track);
  document.addEventListener('visibilitychange', () => { last = 0; schedule(); });
  ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(ev => track.addEventListener(ev, () => hold(), {passive: true}));
  track.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hold(1e9); });
  track.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hold(1500); });
  track.addEventListener('focusin', () => hold(1e9));
  track.addEventListener('focusout', () => hold(1500));
  // Loop ke belakang: geser melewati awal memunculkan akhir daftar tanpa lompatan terlihat.
  track.addEventListener('scroll', () => {
    const lw = loopWidth();
    if (lw > 0 && track.scrollLeft <= 0 && performance.now() < holdUntil) { track.scrollLeft = lw; pos = lw; programmatic = lw; }
  }, {passive: true});
  toggle.addEventListener('click', () => { userPaused = !userPaused; label(); last = 0; schedule(); });
  reduce.addEventListener?.('change', () => { if (reduce.matches) { userPaused = true; label(); } });
  label();
})();
