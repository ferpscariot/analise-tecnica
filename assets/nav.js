/* nav.js — menu suspenso "Indicadores" do cabeçalho (independente do tema) */
(function () {
  var dd = document.querySelector('.tab-dropdown');
  var menu = document.getElementById('indMenu');
  var nav = document.querySelector('.site-tabs');
  if (!dd || !menu || !nav) return;
  var trigger = dd.querySelector('.tab-trigger');
  if (!trigger) return;

  function place() {
    // menu é filho do <nav> (fora da barra rolável): posiciona relativo a ele
    var tr = trigger.getBoundingClientRect(), nr = nav.getBoundingClientRect();
    var vw = window.innerWidth || document.documentElement.clientWidth || 400;
    var vh = window.innerHeight || document.documentElement.clientHeight || 700;
    var mw = menu.offsetWidth;
    var left = Math.min(tr.left, vw - mw - 10);
    menu.style.left = Math.max(10, left - nr.left) + 'px';
    menu.style.maxHeight = Math.max(180, vh - tr.bottom - 16) + 'px';
  }
  function isOpen() { return !menu.hidden; }
  function open() {
    menu.hidden = false;
    place();
    dd.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    menu.hidden = true;
    dd.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen()) close(); else open();
  });

  // fechar ao tocar/clicar fora. iOS não propaga "click" de elementos não interativos,
  // por isso ouvimos também pointerdown/touchstart.
  function outside(e) {
    if (!isOpen()) return;
    var t = e.target;
    if (dd.contains(t) || menu.contains(t)) return;
    close();
  }
  document.addEventListener('click', outside);
  document.addEventListener('pointerdown', outside);
  document.addEventListener('touchstart', outside, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { close(); trigger.focus(); }
  });

  // Ao rolar, reposiciona em vez de fechar: no celular o menor toque na barra
  // rolável gera scroll, e fechar aqui fazia o menu "não abrir".
  window.addEventListener('scroll', function () { if (isOpen()) place(); }, true);
  window.addEventListener('resize', function () { if (isOpen()) place(); });
})();
