(() => {
  'use strict';
  const consent = window.EROJANConsent;
  if (!consent || !consent.getState().configured) return;
  const main = document.querySelector('main');
  if (!main) return;
  const panel = document.createElement('section');
  panel.className = 'measurement-preferences'; panel.id = 'pengaturan-privasi';
  panel.setAttribute('aria-label', 'Pilihan privasi');
  panel.innerHTML = '<div class="measurement-inner"><div><strong>Privasi, sesuai pilihan Anda.</strong><p>Google Analytics dan Google Ads memakai cookie untuk mengukur kunjungan, kampanye, dan klik WhatsApp. Isi chat tidak dikirim. <a href="kebijakan-privasi.html">Detail privasi</a>.</p></div><div class="measurement-actions"><button type="button" data-choice="all" aria-label="Izinkan pengukuran">Izinkan</button><button type="button" data-choice="none" aria-label="Tolak pengukuran">Tolak</button><button type="button" class="measurement-detail-toggle" aria-expanded="false" aria-controls="measurement-options">Atur pilihan</button></div><div id="measurement-options" hidden><label><input type="checkbox" name="measurement-analytics"> Statistik kunjungan (Google Analytics)</label><label><input type="checkbox" name="measurement-advertising"> Pengukuran iklan dan klik WhatsApp (Google Ads)</label><p>Pengukuran iklan mencakup penyimpanan cookie iklan dan pengiriman data pengukuran ke Google. Anda bisa menarik izin kapan saja.</p><button type="button" data-choice="save">Simpan pilihan</button></div><p class="measurement-status" role="status" aria-live="polite"></p></div>';
  main.prepend(panel);
  const options = panel.querySelector('#measurement-options');
  const toggle = panel.querySelector('.measurement-detail-toggle');
  const analytics = panel.querySelector('[name="measurement-analytics"]');
  const advertising = panel.querySelector('[name="measurement-advertising"]');
  const status = panel.querySelector('.measurement-status');
  function render() {
    const state = consent.getState();
    analytics.checked = state.analytics; advertising.checked = state.advertising;
    panel.hidden = state.decided;
    status.textContent = state.decided ? 'Pilihan tersimpan. Ubah kapan saja melalui Pengaturan pengukuran.' : '';
    if (!state.persisted) status.textContent += ' Browser tidak dapat menyimpan pilihan; pilihan hanya berlaku selama halaman ini terbuka.';
  }
  panel.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    const action = button.dataset.choice;
    consent.set({analytics: action === 'all' || (action === 'save' && analytics.checked), advertising: action === 'all' || (action === 'save' && advertising.checked)});
    options.hidden = true; toggle.setAttribute('aria-expanded', 'false');
  });
  toggle.addEventListener('click', () => { options.hidden = !options.hidden; toggle.setAttribute('aria-expanded', String(!options.hidden)); });
  document.querySelectorAll('[data-consent-settings]').forEach(button => {
    button.hidden = false; button.setAttribute('aria-controls', panel.id);
    button.addEventListener('click', () => {
      panel.hidden = false; options.hidden = false; toggle.setAttribute('aria-expanded', 'true');
      panel.scrollIntoView({block: 'start', behavior: 'instant'}); toggle.focus({preventScroll: true});
    });
  });
  document.addEventListener('erojan:consent', render);
  render();
})();
