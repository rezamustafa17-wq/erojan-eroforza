(() => {
  'use strict';
  const card = document.getElementById('chatCard');
  const close = document.getElementById('chatClose');
  const floating = document.getElementById('waFloat');
  const launcher = document.getElementById('chatLauncher');
  const unread = document.getElementById('chatUnread');
  const typing = document.getElementById('chatTyping');
  const messages = ['messageOne', 'messageTwo', 'messageThree', 'messageFour'].map(id => document.getElementById(id));
  const consultation = document.getElementById('chatConsultation');
  if (!card || !close || !floating || !launcher || !unread || !typing || !consultation || messages.some(message => !message)) return;

  const timers = [];
  let idleTimer;
  let introRunning = true;
  let initialMessagesComplete = false;
  let extraMessagesRead = false;

  function later(delay, action) {
    timers.push(setTimeout(() => { if (introRunning) action(); }, delay));
  }
  function stopIntro() {
    introRunning = false;
    timers.forEach(clearTimeout);
    clearTimeout(idleTimer);
  }
  function engage() {
    clearTimeout(idleTimer);
    if (introRunning && initialMessagesComplete && !card.hidden) {
      idleTimer = setTimeout(collapseChat, 5000);
    }
  }
  function collapseChat() {
    stopIntro();
    const restoreFocus = card.contains(document.activeElement);
    card.hidden = true;
    typing.hidden = true;
    launcher.hidden = false;
    launcher.setAttribute('aria-expanded', 'false');
    unread.hidden = extraMessagesRead;
    launcher.setAttribute('aria-label', extraMessagesRead ? 'Buka percakapan Eza' : 'Buka percakapan Eza, 2 pesan baru');
    floating.classList.add('is-bouncing');
    if (restoreFocus) launcher.focus({preventScroll: true});
  }
  function expandChat() {
    stopIntro();
    engage();
    extraMessagesRead = true;
    messages.forEach(message => { message.hidden = false; });
    typing.hidden = true;
    consultation.hidden = false;
    unread.hidden = true;
    launcher.hidden = true;
    launcher.setAttribute('aria-expanded', 'true');
    card.hidden = false;
    card.focus({preventScroll: true});
    const body = card.querySelector('.chat-preview-body');
    body.scrollTop = body.scrollHeight;
  }

  later(2500, () => {
    card.hidden = false;
    later(850, () => { typing.hidden = true; messages[0].hidden = false; });
    later(1700, () => { typing.hidden = false; });
    later(2900, () => {
      typing.hidden = true;
      messages[1].hidden = false;
      initialMessagesComplete = true;
      engage();
    });
  });

  close.addEventListener('click', collapseChat);
  launcher.addEventListener('click', expandChat);
  card.addEventListener('pointerdown', engage);
  card.addEventListener('focusin', engage);
  card.addEventListener('scroll', engage, true);
  document.addEventListener('wheel', engage, {passive: true});
  document.addEventListener('touchmove', engage, {passive: true});
  document.addEventListener('pointerdown', event => {
    if (!card.hidden && !card.contains(event.target) && !launcher.contains(event.target)) collapseChat();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !card.hidden) collapseChat();
    else engage();
  });
  floating.addEventListener('click', collapseChat);
})();
