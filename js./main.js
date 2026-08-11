/**
 * Géoportail de Jacqueville — Chargement dynamique navbar + footer
 * Fonctionne sur GitHub Pages (root ou sous-dossier)
 */
(function () {
  'use strict';

  // Détecte le chemin de base (ex: /mon-repo/ ou /)
  const basePath = (function () {
    const path = window.location.pathname;
    // Si la page est à la racine (index.html) ou dans un sous-dossier /pages/
    const match = path.match(/^(\/(?:[^/]+\/)*)/); // capture jusqu'au dernier slash
    return match ? match[1] : '/';
  })();

  console.log('Base path détecté :', basePath);

  function loadComponent(url, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return Promise.reject('placeholder manquant : ' + placeholderId);

    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status} pour ${url}`);
        return response.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
        console.log('✅ ' + placeholderId + ' chargé');
      })
      .catch(err => {
        console.error('❌ Erreur chargement ' + url, err);
        placeholder.innerHTML = '<p style="color:red;text-align:center;">⚠️ Composant non chargé</p>';
      });
  }

  function initNavbar() {
    const burger = document.querySelector('.gp-nav-burger');
    const mobileMenu = document.querySelector('.gp-nav-mobile');
    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        const isOpen = burger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      });
    }

    // Lien actif
    const path = window.location.pathname;
    const current = path.split('/').pop().replace('.html', '') || 'accueil';
    document.querySelectorAll('[data-page]').forEach(link => {
      if (link.dataset.page === current) link.classList.add('active');
    });
  }

  function initFooter() {
    const yearSpan = document.querySelector('.js-current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const backBtn = document.querySelector('.js-back-to-top');
    if (backBtn) {
      backBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', () => {
        backBtn.classList.toggle('visible', window.scrollY > 400);
      });
    }
  }

  // Lancement
  const navbarURL = basePath + 'components/navbar.html';
  const footerURL = basePath + 'components/footer.html';

  Promise.all([
    loadComponent(navbarURL, 'navbar-placeholder'),
    loadComponent(footerURL, 'footer-placeholder')
  ]).then(() => {
    // Une fois les deux chargés, initialise les interactions
    setTimeout(initNavbar, 10);
    setTimeout(initFooter, 10);
  });
})();
