(() => {
  'use strict';
  const config = window.EROJAN_PUBLIC_CONFIG || {}, consent = window.EROJANConsent;
  const ga4 = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || '') ? config.ga4MeasurementId : '';
  const ads = /^AW-\d+$/.test(config.googleAdsConversionId || '') ? config.googleAdsConversionId : '';
  const label = /^[A-Za-z0-9_-]+$/.test(config.googleAdsConversionLabel || '') ? config.googleAdsConversionLabel : '';
  if (!consent || !consent.getState().configured) return;
  // Tag Google hanya berjalan di domain produksi agar pratinjau lokal dan pengujian tidak mencemari data.
  if (!/(^|\.)eroforza\.com$/.test(location.hostname)) return;
  // Cookieless requests require a separate, documented legal/configuration decision.
  const advanced = config.measurementPolicy?.advancedCookielessApproved === true;
  document.documentElement.dataset.measurementMode = advanced ? 'advanced' : 'basic';
  let initialized = false, gaConfigured = false, adsConfigured = false, lastClick = -Infinity;
  const locationFor = state => {
    const url = new URL(location.origin + location.pathname), query = new URLSearchParams(location.search);
    const keys = [...(state.analytics ? ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'] : []),
      ...(state.advertising ? ['gclid', 'gbraid', 'wbraid'] : [])];
    for (const key of keys) {
      const value = query.get(key);
      if (value && /^[A-Za-z0-9_.~-]{1,200}$/.test(value)) url.searchParams.set(key, value);
    }
    return url.href;
  };
  function synchronize() {
    const state = consent.getState();
    if (ga4) window['ga-disable-' + ga4] = !advanced && !state.analytics;
    window.gtag('set', {page_location: locationFor(state), page_referrer: '', allow_google_signals: false, allow_ad_personalization_signals: false});
    if (!(advanced || state.analytics || state.advertising)) return;
    if (!initialized) { window.gtag('js', new Date()); initialized = true; }
    if (ga4 && !gaConfigured && (advanced || state.analytics)) {
      gaConfigured = true;
      window.gtag('config', ga4, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false});
      window.gtag('event', 'page_view', {send_to: ga4, page_location: locationFor(state), page_referrer: '', page_title: document.title});
    }
    if (ads && label && !adsConfigured && (advanced || state.advertising)) {
      adsConfigured = true;
      window.gtag('config', ads, {allow_ad_personalization_signals: false});
    }
    if (!document.getElementById('erojan-google-tag')) {
      const script = document.createElement('script'); script.id = 'erojan-google-tag'; script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4 || ads);
      document.head.appendChild(script);
    }
  }
  // Diagnosis bounce: apakah pengunjung memutar video dan seberapa jauh membaca.
  const track = (name, params) => { if (ga4 && consent.getState().analytics) window.gtag('event', name, {...params, send_to: ga4}); };
  const video = document.getElementById('product-video');
  if (video) video.addEventListener('play', () => track('video_play', {video_title: 'Tora Sudiro'}), {once: true});
  if (video) {
    let half = false;
    video.addEventListener('timeupdate', () => { if (!half && video.duration > 0 && video.currentTime / video.duration >= 0.5) { half = true; track('video_progress', {percent: 50}); } });
    video.addEventListener('ended', () => track('video_progress', {percent: 100}), {once: true});
  }
  document.querySelectorAll('.faq-list details').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) track('faq_open', {question: (item.querySelector('summary')?.textContent || '').trim().slice(0, 80)});
  }));
  if (typeof window.addEventListener === 'function') {
    const marks = [25, 50, 75, 90], seen = new Set();
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (!(max > 0)) return;
      const pct = window.scrollY / max * 100;
      for (const mark of marks) if (pct >= mark && !seen.has(mark)) { seen.add(mark); track('scroll_depth', {percent: mark}); }
    }, {passive: true});
  }
  document.addEventListener('erojan:consent', synchronize);
  synchronize();
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    const state = consent.getState();
    if (!advanced && !state.analytics && !state.advertising) return;
    let destination;
    try { destination = new URL(anchor.href); } catch (_) { return; }
    if (destination.protocol !== 'https:' || destination.hostname !== 'wa.me' || destination.pathname !== '/6289682110081') return;
    const now = performance.now(); if (now - lastClick < 1000) return; lastClick = now;
    const section = anchor.closest('section[id]');
    const allowed = ['atas', 'kenapa-eza', 'manfaat', 'video', 'kabar', 'komposisi', 'keseharian', 'tentang', 'legalitas', 'faq', 'pemesanan', 'tanya-eza'];
    let placement = section && allowed.includes(section.id) ? section.id : 'page';
    if (anchor.id === 'waFloat' || anchor.closest('.mobile-order')) placement = 'floating';
    else if (anchor.closest('header')) placement = 'header';
    else if (anchor.closest('footer')) placement = 'footer';
    else if (anchor.closest('#chatCard')) placement = 'chat';
    const params = {page_location: locationFor(state), page_referrer: '', transport_type: 'beacon'};
    if (ga4 && (advanced || state.analytics)) window.gtag('event', 'whatsapp_click', {...params, send_to: ga4, cta_location: placement, wa_ref: anchor.dataset?.waRef || ''});
    if (ads && label && (advanced || state.advertising)) window.gtag('event', 'conversion', {...params, send_to: ads + '/' + label, value: 0, currency: 'IDR'});
    // Native navigation is immediate. No preventDefault, timer, or automatic conversion.
  });
})();
