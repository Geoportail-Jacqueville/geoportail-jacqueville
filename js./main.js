/**
 * ============================================================
 * GÉOPORTAIL DE JACQUEVILLE — CHARGEMENT DYNAMIQUE
 * Fichier : js/main.js
 * Charge la navbar et le footer sur toutes les pages
 * ============================================================
 */

(function() {
  'use strict';

  // =============================================
  // CONFIGURATION
  // =============================================
  const CONFIG = {
    basePath: '',                    // Chemin de base (à adapter selon votre hébergement)
    navbarSelector: '#navbar-placeholder',
    footerSelector: '#footer-placeholder',
    navbarPath: 'components/navbar.html',
    footerPath: 'components/footer.html',
    activePageClass: 'active',
    debug: false                     // Passer à true pour voir les logs
  };

  // Détection automatique du chemin de base
  function detectBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length;
    
    if (depth === 0 || path.endsWith('index.html') || path === '/') {
      return './';
    } else if (path.includes('/pages/')) {
      return '../';
    } else {
      return './';
    }
  }

  CONFIG.basePath = detectBasePath();

  // =============================================
  // FONCTIONS UTILITAIRES
  // =============================================
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[GéoPortail]', ...args);
    }
  }

  function logError(...args) {
    console.error('[GéoPortail]', ...args);
  }

  /**
   * Charge un fichier HTML et l'insère dans un placeholder
   * @param {string} url - URL du composant à charger
   * @param {string} placeholderSelector - Sélecteur du conteneur cible
   * @returns {Promise<boolean>}
   */
  async function loadComponent(url, placeholderSelector) {
    const placeholder = document.querySelector(placeholderSelector);
    
    if (!placeholder) {
      log(`Placeholder "${placeholderSelector}" non trouvé sur cette page, ignoré.`);
      return false;
    }

    try {
      log(`Chargement de : ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} : ${response.statusText}`);
      }
      
      const html = await response.text();
      placeholder.innerHTML = html;
      
      log(`✅ "${placeholderSelector}" chargé avec succès`);
      return true;
      
    } catch (error) {
      logError(`❌ Erreur lors du chargement de "${url}" :`, error.message);
      
      // Afficher un message d'erreur discret dans le placeholder
      if (CONFIG.debug) {
        placeholder.innerHTML = `
          <div style="background:#ff4757;color:white;padding:8px 16px;text-align:center;font-size:13px;">
            ⚠️ Erreur de chargement : ${url}
          </div>`;
      }
      return false;
    }
  }

  /**
   * Ré-initialise les scripts de la navbar après chargement dynamique
   */
  function initNavbarScripts() {
    const burger = document.querySelector('.gp-nav-burger');
    const mobileMenu = document.querySelector('.gp-nav-mobile');

    if (!burger || !mobileMenu) {
      log('Navbar non trouvée, initialisation ignorée.');
      return;
    }

    // Burger menu
    burger.addEventListener('click', function() {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermer le menu mobile au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Marquer le lien actif
    const path = window.location.pathname;
    const current = path.split('/').pop().replace('.html', '') || 'accueil';
    
    document.querySelectorAll('[data-page]').forEach(function(link) {
      if (link.dataset.page === current) {
        link.classList.add(CONFIG.activePageClass);
      }
    });

    // Dropdown "Plus" si présent
    const moreBtn = document.querySelector('.gp-nav-more-btn');
    const moreMenu = document.querySelector('.gp-nav-more');
    
    if (moreBtn && moreMenu) {
      moreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = moreMenu.classList.toggle('open');
        moreBtn.setAttribute('aria-expanded', isOpen);
      });
      
      document.addEventListener('click', function() {
        moreMenu.classList.remove('open');
        if (moreBtn) moreBtn.setAttribute('aria-expanded', 'false');
      });
    }

    log('Scripts navbar initialisés');
  }

  /**
   * Ré-initialise les scripts du footer après chargement dynamique
   */
  function initFooterScripts() {
    const footer = document.querySelector('.gp-footer');
    
    if (!footer) {
      log('Footer non trouvé, initialisation ignorée.');
      return;
    }

    // Année dynamique pour le copyright
    const yearSpan = footer.querySelector('.js-current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    // Back to top button
    const backToTopBtn = footer.querySelector('.js-back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Afficher/cacher le bouton selon le scroll
      window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
    }

    log('Scripts footer initialisés');
  }

  /**
   * Ajuste les chemins relatifs dans les composants chargés
   */
  function adjustComponentPaths() {
    // Ajuster les liens de navigation
    document.querySelectorAll('.gp-nav [href]').forEach(function(el) {
      const href = el.getAttribute('href');
      
      // Ne pas toucher aux liens absolus ou ancres
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Si on est dans /pages/, on remonte d'un niveau
      if (window.location.pathname.includes('/pages/')) {
        if (!href.startsWith('../') && !href.startsWith('./')) {
          el.setAttribute('href', '../' + href);
        }
      }
    });

    // Ajuster les images
    document.querySelectorAll('.gp-nav img, .gp-footer img').forEach(function(img) {
      const src = img.getAttribute('src');
      
      if (!src || src.startsWith('http') || src.startsWith('data:')) {
        return;
      }

      if (window.location.pathname.includes('/pages/')) {
        if (!src.startsWith('../') && !src.startsWith('./')) {
          img.setAttribute('src', '../' + src);
        }
      }
    });

    log('Chemins ajustés');
  }

  // =============================================
  // INITIALISATION PRINCIPALE
  // =============================================
  async function init() {
    log('🚀 Initialisation du Géoportail...');
    log('Chemin de base détecté :', CONFIG.basePath);
    log('Page courante :', window.location.pathname);

    // 1. Charger la navbar
    const navbarLoaded = await loadComponent(
      CONFIG.basePath + CONFIG.navbarPath,
      CONFIG.navbarSelector
    );

    // 2. Charger le footer
    const footerLoaded = await loadComponent(
      CONFIG.basePath + CONFIG.footerPath,
      CONFIG.footerSelector
    );

    // 3. Ajuster les chemins si nécessaire
    if (navbarLoaded || footerLoaded) {
      adjustComponentPaths();
    }

    // 4. Initialiser les scripts après chargement
    if (navbarLoaded) {
      // Petit délai pour laisser le DOM se mettre à jour
      setTimeout(initNavbarScripts, 50);
    }

    if (footerLoaded) {
      setTimeout(initFooterScripts, 50);
    }

    log('✅ Initialisation terminée');
  }

  // Démarrer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();