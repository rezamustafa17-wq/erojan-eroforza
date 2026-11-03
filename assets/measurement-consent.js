// Consent state is independent of presentation. No geolocation request or inferred grant.
(() => {
  'use strict';
  const config = window.EROJAN_PUBLIC_CONFIG || {};
  const configured = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || '') ||
    (/^AW-\d+$/.test(config.googleAdsConversionId || '') && /^[A-Za-z0-9_-]+$/.test(config.googleAdsConversionLabel || ''));
  const key = 'erojan_measurement_choice', version = 3, ttl = 180 * 86400000;
  let state = {analytics: false, advertising: false, decided: false};
  let persisted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const signals = () => ({analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.advertising ? 'granted' : 'denied', ad_user_data: state.advertising ? 'granted' : 'denied',
    ad_personalization: 'denied'});
  // Global fail-closed rule covers ID, EEA, UK, CH and unknown regions. No country is exempted.
  window.gtag('consent', 'default', {...signals(), wait_for_update: 500});
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);
  function parse(raw) {
    try {
      const saved = JSON.parse(raw || 'null');
      if (!saved || !Number.isFinite(saved.time) || saved.time > Date.now() || Date.now() - saved.time >= ttl) return null;
      if (saved.value === 'denied') return {analytics: false, advertising: false, decided: true};
      if (saved.version !== version || typeof saved.analytics !== 'boolean' || typeof saved.advertising !== 'boolean') return null;
      return {analytics: saved.analytics, advertising: saved.advertising, decided: true};
    } catch (_) { return null; }
  }
  function publish() {
    document.documentElement.dataset.measurementState = !configured ? 'unconfigured' : !state.decided ? 'awaiting-consent' :
      state.analytics && state.advertising ? 'granted' : !state.analytics && !state.advertising ? 'denied' : 'custom';
    window.gtag('consent', 'update', signals());
    document.dispatchEvent(new CustomEvent('erojan:consent', {detail: {...state}}));
  }
  function clearMeasurementCookies(previous) {
    const names = document.cookie.split(';').map(item => item.trim().split('=')[0]).filter(name =>
      (previous.analytics && !state.analytics && /^_ga(?:_|$)/.test(name)) ||
      (previous.advertising && !state.advertising && /^_gcl_/.test(name)));
    const hostParts = location.hostname.split('.');
    const paths = location.pathname.split('/').map((_, i, parts) => parts.slice(0, i + 1).join('/') || '/');
    for (const name of names) for (const path of new Set(['/', ...paths])) {
      document.cookie = name + '=; Max-Age=0; Path=' + path + '; SameSite=Lax';
      for (let i = 0; i < hostParts.length - 1; i++) document.cookie = name + '=; Max-Age=0; Path=' + path + '; Domain=' + hostParts.slice(i).join('.') + '; SameSite=Lax';
    }
  }
  function apply(next, save) {
    const previous = {...state};
    const withdrawing = (state.analytics && !next.analytics) || (state.advertising && !next.advertising);
    state = {...next};
    if (save) {
      try { localStorage.setItem(key, JSON.stringify({...state, version, time: Date.now()})); }
      catch (_) { persisted = false; }
    }
    publish();
    if (withdrawing) clearMeasurementCookies(previous);
  }
  window.EROJANConsent = Object.freeze({
    getState: () => ({...state, persisted, configured}),
    set: values => apply({analytics: values.analytics === true, advertising: values.advertising === true, decided: true}, true)
  });
  let saved;
  try { saved = parse(localStorage.getItem(key)); } catch (_) { persisted = false; }
  if (saved) apply(saved, false);
  else document.documentElement.dataset.measurementState = configured ? 'awaiting-consent' : 'unconfigured';
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    apply(parse(event.newValue) || {analytics: false, advertising: false, decided: false}, false);
  });
})();
