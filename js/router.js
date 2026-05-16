/**
 * ROUTER.JS - SPA Router sans librairie (VERSION CORRIGEE)
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '/';
        this.baseUrl = this.resolveBaseUrl();
        this.publicRoutes = new Set([
            '/connexion',
            '/documentation',
            '/modeemploie',
            '/modeemploi',
            '/problematique',
            '/support',
            '/apropos'
        ]);
        this.adminRoutes = new Set(['/admin', '/edition']);
    }

    resolveBaseUrl() {
        const siteBaseUrl = '/site/index.html';
        const pathname = window.location.pathname || '/';
        if (pathname === '/' || pathname.startsWith('/site/')) {
            return siteBaseUrl;
        }

        if (pathname.endsWith('.html')) {
            return pathname;
        }

        const routerScript = document.querySelector('script[src*="js/router.js"]');
        if (routerScript?.src) {
            const scriptUrl = new URL(routerScript.src, window.location.href);
            return scriptUrl.pathname.replace(/js\/router\.js$/, 'index.html');
        }

        return pathname.endsWith('/') ? `${pathname}index.html` : `${pathname}/index.html`;
    }

    normalizePath(path) {
        path = String(path || '/').split('?')[0].split('#')[0];
        path = path.startsWith('/') ? path : '/' + path;

        if (path === this.baseUrl) {
            return '/';
        }

        const baseDirectory = this.baseUrl.replace(/\/[^/]*$/, '');
        if (baseDirectory && path.startsWith(`${baseDirectory}/`)) {
            path = path.slice(baseDirectory.length) || '/';
        }

        if (path === '/index.html') {
            return '/';
        }

        return path;
    }

    getBrowserUrl(path) {
        return path === '/' ? this.baseUrl : `${this.baseUrl}#${path}`;
    }

    /**
     * Enregistrer une route
     */
    register(path, pageComponent) {
        this.routes[path] = pageComponent;
    }

    /**
     * Naviguer vers une route
     */
    async navigate(path, options = {}) {
        const { fromPopState = false } = options;
        const { skipHistory = false } = options;
        let { replaceState = false } = options;

        // Nettoyer le chemin
        path = this.normalizePath(path);

        const accessControl = this.enforceAccess(path);
        if (accessControl.redirectPath) {
            path = accessControl.redirectPath;
            replaceState = true;
        }

        console.log('Navigation vers:', path);

        // Trouver le composant de page
        let page = this.routes[path];

        // Routes dynamiques
        if (!page) {
            if (path.startsWith('/piste-detail/')) {
                page = pages.PisteDetail;
            } else if (path.startsWith('/scenario-detail/')) {
                page = pages.ScenarioDetail;
            } else if (path.startsWith('/piste-')) {
                page = pages.PisteDetail;
            }
        }

        // Fallback a la page d'accueil
        if (!page) {
            page = pages.Home;
            path = '/';
        }

        try {
            const spinner = document.getElementById('loading-spinner');
            if (spinner) spinner.style.display = 'flex';

            this.currentPath = path;

            if (window.appActions) {
                appActions.goToPage(path);
            }

            // Rendre la page
            const content = await page.render();
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = content;
                if (page.setup) await page.setup();
                if (page.setupEventListeners) page.setupEventListeners();
            }

            // Rafraichir le header pour afficher l'onglet actif
            const header = document.getElementById('app-header');
            if (header && window.Header) {
                header.innerHTML = Header.render();
                if (Header.setupEventListeners) Header.setupEventListeners();
            }

            if (!fromPopState && !skipHistory) {
                const browserUrl = this.getBrowserUrl(path);
                if (replaceState) {
                    window.history.replaceState({ path }, '', browserUrl);
                } else {
                    window.history.pushState({ path }, '', browserUrl);
                }
            }

            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Erreur navigation:', error);
            document.getElementById('page-content').innerHTML = `
                <div class="error-page">
                    <h2>Erreur de chargement</h2>
                    <p>${error.message}</p>
                    <button onclick="router.navigate('/')">Retour a l'accueil</button>
                </div>
            `;
        } finally {
            const spinner = document.getElementById('loading-spinner');
            if (spinner) spinner.style.display = 'none';
        }
    }

    getStoredPostLoginRedirect() {
        try {
            return window.sessionStorage.getItem('postLoginRedirect') || null;
        } catch (error) {
            return null;
        }
    }

    clearStoredPostLoginRedirect() {
        try {
            window.sessionStorage.removeItem('postLoginRedirect');
        } catch (error) {
            // Ignore storage errors
        }
    }

    enforceAccess(path) {
        const state = window.appStore?.getState?.() || {};
        const isAuthenticated = Boolean(state.isAuthenticated && state.user);

        if (isAuthenticated) {
            const expiry = Date.parse(state.sessionExpiresAt || '');
            const isExpired = Number.isNaN(expiry) || Date.now() >= expiry;
            if (isExpired) {
                if (window.appActions?.logout) {
                    window.appActions.logout();
                }
                if (path !== '/connexion') {
                    if (window.appActions?.showNotification) {
                        window.appActions.showNotification('Session expirée, reconnectez-vous.', 'warning');
                    }
                    return { redirectPath: '/connexion' };
                }
            }
        }

        if (this.publicRoutes.has(path)) {
            return { redirectPath: null };
        }

        if (!isAuthenticated) {
            if (path !== '/connexion') {
                try {
                    window.sessionStorage.setItem('postLoginRedirect', path);
                } catch (error) {
                    // Ignore storage errors
                }
            }
            return { redirectPath: '/connexion' };
        }

        const role = String(state.user?.role || '').toLowerCase();
        if (this.adminRoutes.has(path) && role !== 'admin') {
            if (window.appActions?.showNotification) {
                window.appActions.showNotification('Accès refusé: droits administrateur requis.', 'error');
            }
            return { redirectPath: '/' };
        }

        return { redirectPath: null };
    }

    /**
     * Initialiser le router
     */
    init() {
        window.addEventListener('popstate', (e) => {
            const hashPath = this.getRoutePathFromHash();
            const path = e.state?.path || hashPath || window.location.pathname || '/';
            this.navigate(path, { fromPopState: true });
        });

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (
                href.startsWith('http') ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:')
            ) return;

            e.preventDefault();
            this.navigate(href);
        });

        const hashPath = this.getRoutePathFromHash();
        if (window.location.hash && !hashPath) {
            const anchor = window.location.hash.slice(1);
            if (window.pages?.Documentation?.applyHashNavigation) {
                window.pages.Documentation.applyHashNavigation(anchor);
            }
            this.navigate('/documentation', { replaceState: true, skipHistory: true });
            return;
        }

        const path = hashPath || window.location.pathname || '/';
        const normalizedPath = this.normalizePath(path);
        this.navigate(normalizedPath, { replaceState: true });
    }

    getRoutePathFromHash() {
        const hash = window.location.hash.slice(1);
        return hash.startsWith('/') ? hash : '';
    }
}

// Instance globale
const router = new Router();
window.router = router;
