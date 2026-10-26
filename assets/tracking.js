(() => {
  'use strict';
  const config = window.EROJAN_PUBLIC_CONFIG || {};
  const ga4 = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || '') ? config.ga4MeasurementId : '';
  const ads = /^AW-\d+$/.test(config.googleAdsConversionId || '') ? config.googleAdsConversionId : '';
  const label = /^[A-Za-z0-9_-]+$/.test(config.googleAdsConversionLabel || '') ? config.googleAdsConversionLabel : '';
  const configured = Boolean(ga4 || (ads && label));
  const storageKey = 'erojan_measurement_choice';
  const validFor = 180 * 24 * 60 * 60 * 1000;
  const safePage = location.origin + location.pathname;
  let choice = 'denied';
  let initialized = false;
  let lastClick = 0;
  let banner;

  document.documentElement.dataset.measurementState = configured ? 'awaiting-consent' : 'unconfigured';
  if (!configured) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function consent(value) {
    window.gtag('consent', value === 'default' ? 'default' : 'update', {
      analytics_storage: value === 'granted' ? 'granted' : 'denied',
      ad_storage: value === 'granted' ? 'granted' : 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
  consent('default');

  function initialize() {
    if (initialized) return;
    initialized = true;
    window.gtag('js', new Date());
    if (ga4) {
      window.gtag('config', ga4, {send_page_view: false, page_location: safePage, page_referrer: '', allow_google_signals: false, allow_ad_personalization_signals: false});
      window.gtag('event', 'page_view', {send_to: ga4, page_location: safePage, page_referrer: '', page_title: document.title});
    }
    if (ads && label) window.gtag('config', ads, {allow_ad_personalization_signals: false});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4 || ads);
    document.head.appendChild(script);
  }

  function choose(value) {
    choice = value;
    try { localStorage.setItem(storageKey, JSON.stringify({value, time: Date.now()})); } catch (_) {}
    document.documentElement.dataset.measurementState = value;
    if (ga4) window['ga-disable-' + ga4] = value !== 'granted';
    consent(value);
    if (value === 'granted') initialize();
    if (banner) banner.hidden = true;
  }

  function showChoice() {
    if (!banner) {
      banner = document.createElement('section');
      banner.className = 'measurement-banner';
      banner.setAttribute('aria-label', 'Pilihan pengukuran');
      banner.innerHTML = '<strong>Izinkan pengukuran kunjungan?</strong><p>Dengan izin Anda, Google dapat mengukur kunjungan dan klik WhatsApp untuk mengevaluasi halaman dan iklan. Isi chat tidak dikirim. Pilihan ini tidak mengaktifkan personalisasi iklan. <a href="kebijakan-privasi.html">Baca privasi</a>.</p><div class="measurement-actions"><button type="button" data-measurement-choice="granted">Izinkan pengukuran</button><button type="button" data-measurement-choice="denied">Tolak</button></div>';
      banner.addEventListener('click', event => {
        const button = event.target.closest('[data-measurement-choice]');
        if (button) choose(button.dataset.measurementChoice);
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  document.querySelectorAll('[data-consent-settings]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', showChoice);
  });
  const explanation = document.getElementById('measurementExplanation');
  if (explanation) explanation.textContent = 'Pengukuran Google hanya dimuat setelah Anda mengizinkan. Pilihan dapat diubah melalui Pengaturan pengukuran. Personalisasi iklan dan pengiriman isi chat tidak diaktifkan.';

  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch (_) {}
  if (saved && ['granted', 'denied'].includes(saved.value) && Date.now() - saved.time < validFor) choose(saved.value);
  else showChoice();

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor || choice !== 'granted') return;
    let destination;
    try { destination = new URL(anchor.href); } catch (_) { return; }
    if (destination.hostname !== 'wa.me' || destination.pathname !== '/6281391939099') return;
    const now = Date.now();
    if (lastClick && now - lastClick < 1000) return;
    lastClick = now;
    const section = anchor.closest('section[id]');
    const allowed = ['atas', 'komposisi', 'tentang', 'legalitas', 'faq', 'pemesanan', 'tanya-eza'];
    let placement = section && allowed.includes(section.id) ? section.id : 'page';
    if (anchor.id === 'waFloat') placement = 'floating';
    else if (anchor.closest('header')) placement = 'header';
    else if (anchor.closest('footer')) placement = 'footer';
    else if (anchor.closest('#chatCard')) placement = 'chat';
    if (ga4) window.gtag('event', 'whatsapp_click', {send_to: ga4, cta_location: placement, page_location: safePage, transport_type: 'beacon'});
    if (ads && label) window.gtag('event', 'conversion', {send_to: ads + '/' + label, transport_type: 'beacon'});
  });
})();
