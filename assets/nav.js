/* nav.js — menu suspenso "Indicadores" do cabeçalho (independente do tema) */
(function () {
  var dd = document.querySelector('.tab-dropdown');
  if (!dd) return;
  var trigger = dd.querySelector('.tab-trigger');
  var menu = dd.querySelector('.tab-menu');
  var nav = document.querySelector('.site-tabs');
  if (!trigger || !menu || !nav) return;

  function open() {
    var tr = trigger.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight || 700;
    var vw = window.innerWidth || document.documentElement.clientWidth || 400;
    // menu com position:fixed (imune ao clipping do overflow-x da barra)
    menu.style.top = Math.round(tr.bottom) + 'px';
    menu.style.maxHeight = Math.max(160, vh - tr.bottom - 12) + 'px';
    menu.hidden = false;
    // alinhar sob o gatilho sem estourar a viewport
    var mw = menu.offsetWidth;
    var left = Math.min(tr.left, vw - mw - 10);
    menu.style.left = Math.max(10, left) + 'px';
    dd.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    menu.hidden = true;
    dd.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.hidden) open(); else close();
  });
  document.addEventListener('click', function (e) {
    if (!dd.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); trigger.focus(); }
  });
  window.addEventListener('scroll', close, true);
})();
