(() => {
  'use strict';
  const video = document.getElementById('productVideo');
  if (!video) return;
  const localVideo = video.getAttribute('src');
  let remoteInUse = false;
  video.addEventListener('error', () => {
    if (remoteInUse) {
      remoteInUse = false;
      video.src = localVideo;
      video.load();
      // Keep playback under the visitor's control after switching sources.
    } else {
      document.getElementById('videoHelp').hidden = false;
    }
  });
  fetch('config/media.json')
    .then((response) => {
      if (!response.ok) throw new Error('media config unavailable');
      return response.json();
    })
    .then((config) => {
      if (!config.publicVideoUrl || !video.paused || video.currentTime > 0) return;
      const url = new URL(config.publicVideoUrl);
      if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return;
      remoteInUse = true;
      video.src = url.href;
      video.load();
    })
    .catch(() => { /* Local video stays available when configuration cannot load. */ });
})();
