/**
 * ROUTER.JS - SPA Router sans librairie (VERSION CORRIGEE)
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '/';
        this.publicRoutes = new Set([
            '/',
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
        let { replaceState = false } = options;

        // Nettoyer le chemin
        path = path.split('?')[0];
        path = path.startsWith('/') ? path : '/' + path;

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

            if (!fromPopState) {
                if (replaceState) {
                    window.history.replaceState({ path }, '', path);
                } else {
                    window.history.pushState({ path }, '', path);
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
            const path = e.state?.path || window.location.pathname || '/';
            this.navigate(path, { fromPopState: true });
        });

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (href.startsWith('http') || href.startsWith('#')) return;

            e.preventDefault();
            this.navigate(href);
        });

        const path = window.location.pathname || '/';
        this.navigate(path, { replaceState: true });
    }
}

// Instance globale
const router = new Router();
window.router = router;
