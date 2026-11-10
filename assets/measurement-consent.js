// Pengukuran aktif otomatis untuk semua pengunjung. Tidak ada banner, tombol, atau prompt izin.
// Personalisasi iklan tetap nonaktif. Pilihan lama yang tersimpan di perangkat dihapus dan diabaikan.
(() => {
  'use strict';
  const config = window.EROJAN_PUBLIC_CONFIG || {};
  const configured = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || '') ||
    (/^AW-\d+$/.test(config.googleAdsConversionId || '') && /^[A-Za-z0-9_-]+$/.test(config.googleAdsConversionLabel || ''));
  const state = Object.freeze({analytics: true, advertising: true, decided: true});
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'granted',
    ad_user_data: 'granted', ad_personalization: 'denied'});
  window.gtag('set', 'ads_data_redaction', false);
  window.gtag('set', 'url_passthrough', false);
  // Visitor yang dulu menekan "Tolak" tidak boleh terus terkunci oleh pilihan lama.
  try { localStorage.removeItem('erojan_measurement_choice'); } catch (_) { /* penyimpanan diblokir: abaikan */ }
  document.documentElement.dataset.measurementState = configured ? 'granted' : 'unconfigured';
  window.EROJANConsent = Object.freeze({getState: () => ({...state, persisted: true, configured})});
  document.dispatchEvent(new CustomEvent('erojan:consent', {detail: {...state}}));
})();
