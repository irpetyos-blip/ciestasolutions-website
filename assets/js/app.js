(function () {
  var routes = { '': 'home', about: 'about', method: 'method', services: 'services', insights: 'insights', contact: 'contact' };
  var THEME_KEY = 'ciesta-theme';

  function applyTheme(persist) {
    var theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;

    var button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = 'Dark';
      button.setAttribute('data-theme-mode', theme);
      button.setAttribute('aria-label', 'Theme: Dark');
    }

    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
  }

  function installContactLayout() {
    var style = document.createElement('style');
    style.id = 'contact-download-layout';
    style.textContent = [
      '.crow { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 32px; }',
      '.crow strong { margin-left: auto; text-align: right; }',
      '.next { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 48px; padding: 22px 18px; background: var(--pan); }',
      '.next > div:first-child { flex: 1 1 auto; }',
      '.next-links { display: flex; flex: 0 0 auto; justify-content: flex-end; align-items: center; gap: 12px; margin-left: auto; }',
      '@media (max-width: 640px) { .crow { align-items: stretch; flex-direction: column; } .crow strong { align-self: flex-end; } .next { align-items: flex-start; flex-direction: column; } .next-links { width: 100%; flex-wrap: wrap; justify-content: flex-end; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function installLinkedInLink() {
    var contact = document.querySelector('#p-contact .d');
    if (!contact) return;

    var line = Array.prototype.find.call(contact.children, function (item) {
      return item.textContent.trim().indexOf('linkedin.com/company/') === 0;
    });
    if (!line || line.tagName.toLowerCase() === 'a') return;

    var link = document.createElement('a');
    link.href = 'https://www.linkedin.com/company/ciestasolutions';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = line.textContent;
    line.replaceWith(link);
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
    // Always use dark mode, regardless of a saved preference or system setting.
    applyTheme(true);
    installContactLayout();
    installLinkedInLink();
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
