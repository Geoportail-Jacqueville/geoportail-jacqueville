/**
 * Géoportail de Jacqueville – Injection directe navbar + footer
 * Aucun fetch, fonctionne sur toutes les pages.
 */
(function () {
  'use strict';

  console.log('🟢 main.js – injection directe');

  // ===== HTML DE LA NAVBAR =====
  const navbarHTML = `
<nav class="gp-nav" role="navigation" aria-label="Navigation principale">
  <div class="gp-nav-inner">
    <a href="index.html" class="gp-nav-logo" aria-label="Accueil">
      <img src="https://github.com/Geoportail-Jacqueville/open-data/blob/main/Logo/Logo%20Geoportail.jpg?raw=true" alt="Logo" loading="lazy">
    </a>
    <ul class="gp-nav-links">
      <li><a href="index.html" data-page="accueil">Accueil</a></li>
      <li><a href="cartes-thematiques.html" data-page="cartes-thematiques">Cartes thématiques</a></li>
      <li><a href="visualisation-croisee.html" data-page="visualisation-croisee">Visualisation croisée</a></li>
      <li><a href="alertes-risques.html" data-page="alertes-risques">Alerte & Risques</a></li>
      <li><a href="donnees.html" data-page="donnees">Données</a></li>
      <li><a href="observatoire.html" data-page="observatoire">Observatoire</a></li>
      <li><a href="patrimoine.html" data-page="patrimoine">Patrimoine</a></li>
    </ul>
    <button class="gp-nav-burger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="gp-nav-mobile" aria-hidden="true">
    <ul>
      <li><a href="index.html" data-page="accueil">Accueil</a></li>
      <li><a href="cartes-thematiques.html" data-page="cartes-thematiques">Cartes thématiques</a></li>
      <li><a href="visualisation-croisee.html" data-page="visualisation-croisee">Visualisation croisée</a></li>
      <li><a href="alertes-risques.html" data-page="alertes-risques">Alerte & Risques</a></li>
      <li><a href="donnees.html" data-page="donnees">Données</a></li>
      <li><a href="observatoire.html" data-page="observatoire">Observatoire</a></li>
      <li><a href="patrimoine.html" data-page="patrimoine">Patrimoine</a></li>
    </ul>
  </div>
</nav>
<style>
.gp-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:#70C7FD;box-shadow:0 2px 12px rgba(26,44,62,0.15);font-family:'Inter',sans-serif;}
.gp-nav-inner{max-width:1280px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.gp-nav-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none;}
.gp-nav-logo img{height:44px;width:auto;object-fit:contain;border-radius:6px;}
.gp-nav-links{display:flex;align-items:center;gap:2px;list-style:none;margin:0;flex-wrap:nowrap;}
.gp-nav-links>li>a{display:inline-flex;align-items:center;padding:8px 14px;border-radius:8px;font-size:15px;font-weight:500;color:#fff;text-decoration:none;transition:background 0.18s;white-space:nowrap;cursor:pointer;background:transparent;position:relative;}
.gp-nav-links>li>a:hover{background:rgba(255,255,255,0.2);}
.gp-nav-links>li>a.active{font-weight:600;}
.gp-nav-links>li>a.active::after{content:'';position:absolute;bottom:4px;left:14px;right:14px;height:2px;background:#fff;border-radius:2px;}
.gp-nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:1010;}
.gp-nav-burger span{display:block;width:26px;height:3px;background:#fff;border-radius:3px;transition:0.3s;pointer-events:none;}
.gp-nav-burger.open span:nth-child(1){transform:translateY(8px) rotate(45deg);}
.gp-nav-burger.open span:nth-child(2){opacity:0;}
.gp-nav-burger.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg);}
.gp-nav-mobile{display:none;background:#70C7FD;border-top:1px solid rgba(255,255,255,0.3);padding:12px 16px 20px;max-height:calc(100vh - 64px);overflow-y:auto;}
.gp-nav-mobile.open{display:block;}
.gp-nav-mobile ul{list-style:none;padding:0;margin:0;}
.gp-nav-mobile li a{display:block;padding:12px 16px;font-size:15px;font-weight:500;color:#fff;text-decoration:none;border-radius:8px;transition:background 0.15s;}
.gp-nav-mobile li a:hover{background:rgba(255,255,255,0.2);}
.gp-nav-mobile li a.active{font-weight:600;background:rgba(255,255,255,0.15);}
.gp-nav-mobile li a.active::after{content:'';position:absolute;bottom:6px;left:16px;right:16px;height:2px;background:#fff;border-radius:2px;}
@media(max-width:1100px){.gp-nav-links>li>a{padding:7px 10px;font-size:14px;}.gp-nav-inner{gap:16px;}}
@media(max-width:900px){.gp-nav-links{display:none;}.gp-nav-burger{display:flex;}.gp-nav-inner{gap:12px;}}
</style>`;

  // ===== HTML DU FOOTER =====
  const footerHTML = `
<footer class="footer-module" role="contentinfo">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-col">
        <h5>Explorer le territoire</h5>
        <ul>
          <li><a href="https://geoportail-jacqueville-ird.opendata.arcgis.com/apps/6fc97807bfba4a8082eeb779e2557431">Occupation du sol</a></li>
          <li><a href="https://geoportail-jacqueville-ird.opendata.arcgis.com/apps/7db3c65fdc804d8e8adcaf0acb798aa0">Relief et topographie</a></li>
          <li><a href="cartes-thematiques.html">Cartes thématiques</a></li>
          <li><a href="https://geoportail-jacqueville-ird.opendata.arcgis.com/apps/c6bccab68f044bb2b01c3fe08fbd4017">Patrimoine & découverte</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Outils & analyses</h5>
        <ul>
          <li><a href="visualisation-croisee.html">Visualisation croisée</a></li>
          <li><a href="https://www.arcgis.com/apps/dashboards/a310e03a6ae74279bbf89ea7332e7f6e">Tableau de bord</a></li>
          <li><a href="alertes-risques.html">Alerte & risques</a></li>
          <li><a href="donnees.html">Données territoriales</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Projet & ressources</h5>
        <ul>
          <li><a href="observatoire.html">Observatoire</a></li>
          <li><a href="actualites.html">Actualité</a></li>
          <li><a href="methodologie.html">Méthodologie & sources</a></li>
          <li><a href="Politique-de-confidentialite.html">Politique de confidentialité</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <p>📧 <a href="mailto:gestionterritoriale@gmail.com">gestionterritoriale@gmail.com</a></p>
        <p>📞 +225 00 00 00 00</p>
        <p>📍 Jacqueville, Côte d'Ivoire</p>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-social">
      <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
      <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
    </div>
    <div class="footer-copyright">
      © <span class="js-current-year">2025</span> Jacqueville · Géoportail Territorial · Tous droits réservés
    </div>
  </div>
  <button class="js-back-to-top gp-back-to-top" aria-label="Retour en haut" title="Retour en haut">↑</button>
</footer>
<style>
.footer-module{font-family:'Inter',sans-serif;width:100%;background:#FFF;border-top:1px solid rgba(112,199,253,0.2);}
.footer-container{max-width:1200px;margin:0 auto;padding:48px 40px 32px;}
.footer-grid{display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between;}
.footer-col{flex:1;min-width:220px;}
.footer-col h5{font-size:14px;font-weight:600;color:#1A2C3E;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:20px;font-family:'Space Mono',monospace;}
.footer-col ul{list-style:none;padding:0;margin:0;}
.footer-col li{margin-bottom:12px;}
.footer-col a{color:#4A627A;text-decoration:none;font-size:13px;transition:all 0.2s ease;display:inline-block;}
.footer-col a:hover{color:#70C7FD;transform:translateX(4px);}
.footer-col p{color:#4A627A;font-size:13px;margin:8px 0;display:flex;align-items:center;gap:8px;}
.footer-col p a{color:#4A627A;}
.footer-col p a:hover{color:#70C7FD;transform:none;}
.footer-divider{border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(112,199,253,0.3),transparent);margin:32px 0 24px;}
.footer-social{display:flex;justify-content:center;gap:24px;margin-bottom:24px;}
.footer-social a{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(112,199,253,0.1);color:#70C7FD;transition:all 0.2s ease;}
.footer-social a:hover{background:#70C7FD;color:#FFF;transform:translateY(-3px);}
.footer-copyright{text-align:center;font-size:11px;color:#64748B;font-family:'Space Mono',monospace;}
.gp-back-to-top{position:fixed;bottom:30px;right:30px;width:44px;height:44px;background:#70C7FD;color:#1A2C3E;border:none;border-radius:50%;font-size:20px;font-weight:700;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.2);z-index:999;display:flex;align-items:center;justify-content:center;}
.gp-back-to-top.visible{opacity:1;visibility:visible;}
.gp-back-to-top:hover{background:#4BB3F0;transform:translateY(-3px);}
@media(max-width:768px){.footer-container{padding:32px 20px 24px;}.footer-grid{flex-direction:column;gap:28px;}.footer-col{text-align:center;}.footer-col p{justify-content:center;}.footer-col a:hover{transform:none;}.gp-back-to-top{bottom:20px;right:20px;width:40px;height:40px;}}
</style>`;

  // ===== INJECTION IMMÉDIATE =====
  function inject() {
    const nb = document.getElementById('navbar-placeholder');
    const fb = document.getElementById('footer-placeholder');
    if (nb) {
      nb.innerHTML = navbarHTML;
      console.log('✅ Navbar injectée');
    } else {
      console.error('❌ #navbar-placeholder manquant');
    }
    if (fb) {
      fb.innerHTML = footerHTML;
      console.log('✅ Footer injecté');
    } else {
      console.error('❌ #footer-placeholder manquant');
    }

    // Initialisation immédiate du burger et lien actif
    setTimeout(() => {
      const burger = document.querySelector('.gp-nav-burger');
      const mobileMenu = document.querySelector('.gp-nav-mobile');
      if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
          const open = burger.classList.toggle('open');
          mobileMenu.classList.toggle('open', open);
          burger.setAttribute('aria-expanded', open);
          mobileMenu.setAttribute('aria-hidden', !open);
          document.body.style.overflow = open ? 'hidden' : '';
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
      let current = path.split('/').pop().replace('.html', '');
      if (!current || current === 'index') current = 'accueil';
      document.querySelectorAll('[data-page]').forEach(link => {
        if (link.dataset.page === current) link.classList.add('active');
      });

      // Année footer
      const yearSpan = document.querySelector('.js-current-year');
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();

      // Bouton back-to-top
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
    }, 10);
  }

  // Lancement au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
