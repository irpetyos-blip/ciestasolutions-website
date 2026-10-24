(function () {
  var routes = { '': 'home', about: 'about', method: 'method', services: 'services', insights: 'insights', contact: 'contact' };
  var THEME_KEY = 'ciesta-theme';
  var THEME_ORDER = ['light', 'dark'];

  function getSavedTheme() {
    try {
      var value = localStorage.getItem(THEME_KEY);
      return value === 'light' || value === 'dark' ? value : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function applyTheme(mode, persist) {
    var theme = mode === 'light' || mode === 'dark' ? mode : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';

    var button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? 'Dark' : 'Light';
      button.setAttribute('data-theme-mode', theme);
      button.setAttribute('aria-label', 'Theme: ' + (theme === 'dark' ? 'Dark' : 'Light'));
    }

    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {}
    }
  }

  function cycleTheme() {
    var current = getSavedTheme();
    var index = THEME_ORDER.indexOf(current);
    var next = THEME_ORDER[(index + 1) % THEME_ORDER.length];
    applyTheme(next, true);
  }

  function show() {
    var pages = document.querySelectorAll('.page');
    var navLinks = document.querySelectorAll('nav a');
    var hash = (location.hash || '').replace(/^#\/?/, '');
    var id = Object.prototype.hasOwnProperty.call(routes, hash) ? routes[hash] : 'home';
    var targetId = 'p-' + id;

    pages.forEach(function (page) {
      page.classList.toggle('on', page.id === targetId);
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === '#/' + id) {
        link.setAttribute('aria-current', 'page');
      } else if (link.hasAttribute('aria-current')) {
        link.removeAttribute('aria-current');
      }
    });

    var active = document.getElementById(targetId);
    if (active && active.dataset && active.dataset.title) {
      document.title = active.dataset.title;
    }

    if (window.scrollY !== 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }

  function init() {
    var button = document.getElementById('theme-toggle');
    if (button) {
      button.addEventListener('click', cycleTheme);
    }

    applyTheme(getSavedTheme(), false);
    show();

    window.addEventListener('hashchange', function () {
      requestAnimationFrame(show);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
