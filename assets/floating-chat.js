(() => {
  'use strict';
  const card = document.getElementById('chatCard');
  const close = document.getElementById('chatClose');
  const floating = document.getElementById('waFloat');
  const typing = document.getElementById('chatTyping');
  const first = document.getElementById('messageOne');
  const second = document.getElementById('messageTwo');
  if (!card || !close || !floating || !typing || !first || !second) return;

  let dismissed = false;
  const timers = [];
  function later(delay, action) {
    timers.push(setTimeout(() => { if (!dismissed) action(); }, delay));
  }
  later(2500, () => {
    card.hidden = false;
    later(850, () => { typing.hidden = true; first.hidden = false; });
    later(1700, () => { typing.hidden = false; });
    later(2900, () => { typing.hidden = true; second.hidden = false; });
    later(6500, dismissChat);
  });

  function dismissChat() {
    if (dismissed) return;
    dismissed = true;
    timers.forEach(clearTimeout);
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
