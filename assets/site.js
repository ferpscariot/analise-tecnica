/* site.js — tema claro/escuro compartilhado.
   Padrão: segue a preferência do sistema. Só grava escolha quando o usuário clica. */
(function () {
  var themeIcons = {
    dark: '<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
    light: '<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>'
  };
  function saved() {
    try { return localStorage.getItem('vxd-theme'); } catch (e) { return null; }
  }
  function setTheme(theme, persist) {
    var next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    // só persiste em escolha explícita — assim quem nunca clicou continua seguindo o sistema
    if (persist) { try { localStorage.setItem('vxd-theme', next); } catch (e) {} }
    var toggle = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');
    var label = document.getElementById('themeLabel');
    if (toggle) {
      toggle.setAttribute('aria-pressed', next === 'dark');
      toggle.setAttribute('title', next === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    }
    if (icon) icon.innerHTML = next === 'dark' ? themeIcons.dark : themeIcons.light;
    if (label) label.textContent = next === 'dark' ? 'Tema claro' : 'Tema escuro';
  }
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark', true);
    });
  }
  setTheme(document.documentElement.getAttribute('data-theme') || 'light', false);

  // se o sistema mudar de tema e o visitante nunca escolheu manualmente, acompanha
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (!saved()) setTheme(e.matches ? 'dark' : 'light', false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
  window.vxdSetTheme = function (t) { setTheme(t, true); };
})();
