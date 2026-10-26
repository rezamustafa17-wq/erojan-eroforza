(() => {
  'use strict';
  const card = document.getElementById('chatCard');
  const close = document.getElementById('chatClose');
  const floating = document.getElementById('waFloat');
  if (!card || !close || !floating) return;

  let dismissed = false;
  let hideTimer;
  const showTimer = setTimeout(() => {
    if (dismissed) return;
    card.hidden = false;
    hideTimer = setTimeout(dismissChat, 6000);
  }, 2500);

  function dismissChat() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    const restoreFocus = card.contains(document.activeElement);
    card.hidden = true;
    floating.classList.add('is-bouncing');
    if (restoreFocus) floating.focus({preventScroll: true});
  }

  close.addEventListener('click', dismissChat);
  document.addEventListener('pointerdown', (event) => {
    if (!card.hidden && !close.contains(event.target)) dismissChat();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !card.hidden) dismissChat();
  });
  floating.addEventListener('click', dismissChat);
})();
