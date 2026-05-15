/**
 * PAGES/CONNEXION.JS - Page de connexion et authentification
 * Interface moderne avec formulaire, options de connexion et design attrayant
 */

pages.Connexion = {
    activeForm: 'login', // 'login' ou 'register' ou 'forgot'
    rememberMe: false,
    showPassword: false,

    async render() {
        return `
            <div class="connexion-wrapper">
                <!-- Bannière latérale (visible sur desktop) -->
                <div class="connexion-sidebar">
                    <div class="sidebar-content">
                        <div class="logo-container">
                            <div class="logo-box">
                                <span class="material-symbols-outlined">shield</span>
                            </div>
                            <h1 class="logo-text">CDG 2026</h1>
                        </div>
                        
                        <h2 class="sidebar-title">Bienvenue sur la plateforme</h2>
                        <p class="sidebar-description">
                            Simulateur de sécurité aéroportuaire - Outil d'aide à la décision pour optimiser la prévention des accidents d'engins de piste.
                        </p>

                        <div class="features-mini">
                            <div class="feature-mini">
                                <span class="material-symbols-outlined">check_circle</span>
                                <span>Pistes d'amélioration</span>
                            </div>
                            <div class="feature-mini">
                                <span class="material-symbols-outlined">check_circle</span>
                                <span>Simulation multicritères</span>
                            </div>
                            <div class="feature-mini">
                                <span class="material-symbols-outlined">check_circle</span>
                                <span>Export PDF professionnel</span>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Formulaire principal -->
                <div class="connexion-main">
                    <div class="form-container">
                        <!-- Logo mobile (visible uniquement sur mobile) -->
                        <div class="mobile-logo">
                            <div class="logo-box">
                                <span class="material-symbols-outlined">shield</span>
                            </div>
                            <h1>CDG 2026</h1>
                        </div>

                        <!-- Navigation des formulaires -->


                        <!-- Formulaire de connexion -->
                        ${this.activeForm === 'login' ? this.renderLoginForm() : ''}
                        

                        <!-- Lien d'aide -->
                        <div class="help-link">
                            <span class="material-symbols-outlined">help</span>
                            <a href="/support">Besoin d'aide ?</a>
                        </div>
                    </div>
                </div>
            </div>

            ${this.getStyles()}
        `;
    },

    renderLoginForm() {
        return `
            <div class="form-box login-form">
                <h2>Connexion à votre compte</h2>
                
                <form onsubmit="event.preventDefault(); pages.Connexion.handleLogin()">
                    <!-- Email -->
                    <div class="form-group">
                        <label for="email">
                            <span class="material-symbols-outlined">mail</span>
                            Email professionnel
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="prenom.nom@entreprise.fr"
                            required
                        >
                    </div>

                    <!-- Mot de passe -->
                    <div class="form-group">
                        <label for="password">
                            <span class="material-symbols-outlined">lock</span>
                            Mot de passe
                        </label>
                        <div class="password-input">
                            <input 
                                type="${this.showPassword ? 'text' : 'password'}" 
                                id="password" 
                                placeholder="••••••••"
                                required
                            >
                            <button 
                                type="button" 
                                class="toggle-password"
                                onclick="pages.Connexion.togglePassword()"
                            >
                                <span class="material-symbols-outlined">
                                    ${this.showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Options -->
                    <div class="form-options">
                        <label class="checkbox">
                            <input 
                                type="checkbox" 
                                ${this.rememberMe ? 'checked' : ''} 
                                onchange="pages.Connexion.toggleRememberMe()"
                            >
                            <span>Se souvenir de moi</span>
                        </label>
                    </div>

                    <!-- Bouton de connexion -->
                    <button type="submit" class="btn-login">
                        <span class="material-symbols-outlined">login</span>
                        Se connecter
                    </button>
                </form>

                <!-- Informations de démonstration -->
                <div class="demo-info">
                    <p class="demo-title">Comptes de démonstration :</p>
                    <div class="demo-accounts">
                        <div class="demo-account" onclick="pages.Connexion.fillDemoAccount('admin@cdg2026.fr', 'admin123')">
                            <span class="material-symbols-outlined">admin_panel_settings</span>
                            <span>admin@cdg2026.fr</span>
                        </div>
                        <div class="demo-account" onclick="pages.Connexion.fillDemoAccount('user@cdg2026.fr', 'user123')">
                            <span class="material-symbols-outlined">person</span>
                            <span>user@cdg2026.fr</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderRegisterForm() {
        return `
            <div class="form-box register-form">
                <h2>Créer un compte</h2>
                
                <form onsubmit="event.preventDefault(); pages.Connexion.handleRegister()">
                    <!-- Nom complet -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstname">
                                <span class="material-symbols-outlined">badge</span>
                                Prénom
                            </label>
                            <input type="text" id="firstname" placeholder="Jean" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="lastname">
                                <span class="material-symbols-outlined">badge</span>
                                Nom
                            </label>
                            <input type="text" id="lastname" placeholder="DUPONT" required>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                        <label for="reg-email">
                            <span class="material-symbols-outlined">mail</span>
                            Email professionnel
                        </label>
                        <input 
                            type="email" 
                            id="reg-email" 
                            placeholder="jean.dupont@entreprise.fr"
                            required
                        >
                    </div>

                    <!-- Entreprise -->
                    <div class="form-group">
                        <label for="company">
                            <span class="material-symbols-outlined">business</span>
                            Entreprise / Organisation
                        </label>
                        <select id="company" required>
                            <option value="">Sélectionnez votre entreprise</option>
                            <option value="adp">ADP</option>
                            <option value="airfrance">Air France</option>
                            <option value="fedex">FedEx</option>
                            <option value="csa">CSA</option>
                            <option value="other">Autre (précisez)</option>
                        </select>
                    </div>

                    <!-- Rôle -->
                    <div class="form-group">
                        <label for="role">
                            <span class="material-symbols-outlined">work</span>
                            Fonction
                        </label>
                        <input 
                            type="text" 
                            id="role" 
                            placeholder="Responsable sécurité, Chef d'équipe, ..."
                            required
                        >
                    </div>

                    <!-- Mot de passe -->
                    <div class="form-group">
                        <label for="reg-password">
                            <span class="material-symbols-outlined">lock</span>
                            Mot de passe
                        </label>
                        <div class="password-input">
                            <input 
                                type="password" 
                                id="reg-password" 
                                placeholder="••••••••"
                                required
                            >
                        </div>
                        <div class="password-strength">
                            <div class="strength-bar" style="width: 0%"></div>
                        </div>
                        <p class="password-hint">8 caractères minimum, 1 majuscule, 1 chiffre</p>
                    </div>

                    <!-- Confirmation mot de passe -->
                    <div class="form-group">
                        <label for="confirm-password">
                            <span class="material-symbols-outlined">lock</span>
                            Confirmer le mot de passe
                        </label>
                        <div class="password-input">
                            <input 
                                type="password" 
                                id="confirm-password" 
                                placeholder="••••••••"
                                required
                            >
                        </div>
                    </div>

                    <!-- Conditions d'utilisation -->
                    <div class="form-group terms-group">
                        <label class="checkbox">
                            <input type="checkbox" id="terms" required>
                            <span>
                                J'accepte les 
                                <a href="#/cgu" target="_blank">conditions d'utilisation</a>
                                et la 
                                <a href="#/confidentialite" target="_blank">politique de confidentialité</a>
                            </span>
                        </label>
                    </div>

                    <!-- Newsletter -->
                    <div class="form-group">
                        <label class="checkbox">
                            <input type="checkbox" id="newsletter">
                            <span>Recevoir les actualités du projet</span>
                        </label>
                    </div>

                    <!-- Bouton d'inscription -->
                    <button type="submit" class="btn-register">
                        <span class="material-symbols-outlined">app_registration</span>
                        Créer mon compte
                    </button>
                </form>

                <p class="login-redirect">
                    Déjà un compte ? 
                    <button class="link-btn" onclick="pages.Connexion.switchForm('login')">
                        Se connecter
                    </button>
                </p>
            </div>
        `;
    },

    renderForgotForm() {
        return `
            <div class="form-box forgot-form">
                <h2>Réinitialisation du mot de passe</h2>
                
                <p class="forgot-description">
                    Saisissez votre adresse email professionnelle. Vous recevrez un lien pour réinitialiser votre mot de passe.
                </p>
                
                <form onsubmit="event.preventDefault(); pages.Connexion.handleForgotPassword()">
                    <!-- Email -->
                    <div class="form-group">
                        <label for="forgot-email">
                            <span class="material-symbols-outlined">mail</span>
                            Email professionnel
                        </label>
                        <input 
                            type="email" 
                            id="forgot-email" 
                            placeholder="prenom.nom@entreprise.fr"
                            required
                        >
                    </div>

                    <!-- Bouton d'envoi -->
                    <button type="submit" class="btn-forgot">
                        <span class="material-symbols-outlined">send</span>
                        Envoyer le lien
                    </button>
                </form>

                <p class="back-to-login">
                    <button class="link-btn" onclick="pages.Connexion.switchForm('login')">
                        <span class="material-symbols-outlined">arrow_back</span>
                        Retour à la connexion
                    </button>
                </p>
            </div>
        `;
    },

    switchForm(form) {
        this.activeForm = form;
        this.rerender();
    },

    toggleRememberMe() {
        this.rememberMe = !this.rememberMe;
    },

    togglePassword() {
        this.showPassword = !this.showPassword;
        this.rerender();
    },

    fillDemoAccount(email, password) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
    },

    handleLogin() {
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        if (!email || !password) {
            this.showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = this.resolveDemoUser(normalizedEmail, password);
        if (!user) {
            this.showNotification('Identifiants invalides', 'error');
            return;
        }

        if (window.appActions?.login) {
            window.appActions.login(user);
        }

        this.showNotification('Connexion réussie', 'success');

        const requestedPath = window.router?.getStoredPostLoginRedirect?.() || '/';
        if (window.router?.clearStoredPostLoginRedirect) {
            window.router.clearStoredPostLoginRedirect();
        }

        setTimeout(() => {
            if (window.router) {
                window.router.navigate(requestedPath || '/');
                return;
            }
            window.location.href = '/';
        }, 350);
    },

    resolveDemoUser(email, password) {
        if (email === 'admin@cdg2026.fr' && password === 'admin123') {
            return {
                name: 'Administrateur CDG',
                role: 'admin',
                permissions: ['read', 'write', 'export', 'admin']
            };
        }

        if (email === 'user@cdg2026.fr' && password === 'user123') {
            return {
                name: 'Utilisateur CDG',
                role: 'user',
                permissions: ['read']
            };
        }

        return null;
    },

    handleRegister() {
        // Simuler une inscription
        this.showNotification('Compte créé avec succès ! Vérifiez votre email pour activer votre compte.', 'success');
        
        setTimeout(() => {
            this.switchForm('login');
        }, 2000);
    },

    handleForgotPassword() {
        const email = document.getElementById('forgot-email')?.value;
        
        if (!email) {
            this.showNotification('Veuillez saisir votre email', 'error');
            return;
        }

        this.showNotification('Email envoyé ! Vérifiez votre boîte de réception.', 'success');
        
        setTimeout(() => {
            this.switchForm('login');
        }, 2000);
    },

    socialLogin(provider) {
        this.showNotification(`Connexion avec ${provider} - Fonctionnalité à venir`, 'info');
    },

    showNotification(message, type) {
        if (window.Notifications) {
            window.Notifications[type](message);
        } else {
            alert(message);
        }
    },

    rerender() {
        this.render().then(html => {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = html;
            }
        });
    },

    getStyles() {
        return `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .connexion-wrapper {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                }

                /* Sidebar */
                .connexion-sidebar {
                    flex: 1;
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    color: white;
                    padding: 48px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                }

                .connexion-sidebar::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .sidebar-content {
                    position: relative;
                    z-index: 2;
                    max-width: 480px;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 48px;
                }

                .logo-box {
                    width: 56px;
                    height: 56px;
                    background: #FF6B35;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo-box .material-symbols-outlined {
                    font-size: 32px;
                    color: white;
                }

                .logo-text {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                }

                .sidebar-title {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .sidebar-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.8);
                    margin-bottom: 32px;
                }

                .features-mini {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 48px;
                }

                .feature-mini {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .feature-mini .material-symbols-outlined {
                    color: #10b981;
                }

                .testimonial {
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 24px;
                    padding: 32px;
                    margin-bottom: 32px;
                }

                .testimonial-text {
                    font-size: 16px;
                    font-style: italic;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .author-avatar {
                    width: 48px;
                    height: 48px;
                    background: #FF6B35;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 18px;
                }

                .sidebar-footer {
                    border-top: 1px solid rgba(255,255,255,0.2);
                    padding-top: 24px;
                }

                .footer-stats {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                .footer-stats div {
                    flex: 1;
                }

                .stat-number {
                    display: block;
                    font-size: 24px;
                    font-weight: 700;
                    color: #FF6B35;
                }

                .stat-label {
                    font-size: 12px;
                    color: rgba(255,255,255,0.6);
                }

                /* Main content */
                .connexion-main {
                    flex: 1;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px;
                }

                .form-container {
                    max-width: 440px;
                    width: 100%;
                }

                .mobile-logo {
                    display: none;
                    text-align: center;
                    margin-bottom: 32px;
                }

                .mobile-logo .logo-box {
                    margin: 0 auto 16px;
                }

                .form-nav {
                    display: flex;
                    gap: 8px;
                    background: white;
                    padding: 6px;
                    border-radius: 60px;
                    margin-bottom: 32px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }

                .form-nav-btn {
                    flex: 1;
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    border-radius: 40px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .form-nav-btn:hover {
                    color: #FF6B35;
                }

                .form-nav-btn.active {
                    background: #FF6B35;
                    color: white;
                }

                .form-box {
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                    margin-bottom: 24px;
                }

                .form-box h2 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #003D82;
                    margin-bottom: 24px;
                    text-align: center;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                    color: #1e293b;
                    margin-bottom: 8px;
                }

                .form-group label .material-symbols-outlined {
                    color: #FF6B35;
                    font-size: 18px;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 14px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 15px;
                    transition: all 0.3s;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #FF6B35;
                    box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
                }

                .password-input {
                    position: relative;
                }

                .toggle-password {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                }

                .password-strength {
                    height: 4px;
                    background: #e2e8f0;
                    border-radius: 2px;
                    margin: 8px 0 4px;
                    overflow: hidden;
                }

                .strength-bar {
                    height: 100%;
                    background: #10b981;
                    transition: width 0.3s;
                }

                .password-hint {
                    font-size: 11px;
                    color: #64748b;
                }

                .form-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .checkbox {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }

                .checkbox input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                    accent-color: #FF6B35;
                }

                .forgot-link {
                    background: none;
                    border: none;
                    color: #FF6B35;
                    font-size: 14px;
                    cursor: pointer;
                }

                .btn-login, .btn-register, .btn-forgot {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 16px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .btn-login {
                    background: #FF6B35;
                    color: white;
                }

                .btn-login:hover {
                    background: #e55a2b;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(255,107,53,0.3);
                }

                .btn-register {
                    background: #003D82;
                    color: white;
                }

                .btn-register:hover {
                    background: #002a5c;
                    transform: translateY(-2px);
                }

                .btn-forgot {
                    background: #f1f5f9;
                    color: #475569;
                }

                .btn-forgot:hover {
                    background: #e2e8f0;
                }

                .demo-info {
                    margin-top: 24px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                }

                .demo-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #64748b;
                    margin-bottom: 12px;
                }

                .demo-accounts {
                    display: flex;
                    gap: 12px;
                }

                .demo-account {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .demo-account:hover {
                    border-color: #FF6B35;
                    background: #fff7ed;
                }

                .demo-account .material-symbols-outlined {
                    color: #FF6B35;
                    font-size: 18px;
                }

                .terms-group {
                    font-size: 14px;
                }

                .terms-group a {
                    color: #FF6B35;
                    text-decoration: none;
                }

                .login-redirect {
                    text-align: center;
                    margin-top: 20px;
                    color: #64748b;
                }

                .link-btn {
                    background: none;
                    border: none;
                    color: #FF6B35;
                    font-weight: 600;
                    cursor: pointer;
                }

                .forgot-description {
                    text-align: center;
                    color: #64748b;
                    margin-bottom: 24px;
                    line-height: 1.6;
                }

                .back-to-login {
                    text-align: center;
                    margin-top: 20px;
                }

                .separator {
                    position: relative;
                    text-align: center;
                    margin: 24px 0;
                }

                .separator::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: #e2e8f0;
                }

                .separator span {
                    position: relative;
                    background: white;
                    padding: 0 16px;
                    color: #64748b;
                    font-size: 13px;
                }

                .social-login {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    background: white;
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .social-btn:hover {
                    background: #f8fafc;
                    border-color: #FF6B35;
                }

                .social-icon {
                    width: 18px;
                    height: 18px;
                }

                .social-btn.google:hover {
                    border-color: #ea4335;
                }

                .social-btn.microsoft:hover {
                    border-color: #00a4ef;
                }

                .social-btn.linkedin:hover {
                    border-color: #0077b5;
                }

                .help-link {
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #64748b;
                }

                .help-link a {
                    color: #64748b;
                    text-decoration: none;
                }

                .help-link a:hover {
                    color: #FF6B35;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .connexion-sidebar {
                        display: none;
                    }

                    .mobile-logo {
                        display: block;
                    }

                    .connexion-main {
                        padding: 20px;
                    }

                    .form-container {
                        max-width: 100%;
                    }
                }

                @media (max-width: 640px) {
                    .form-box {
                        padding: 24px;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .demo-accounts {
                        flex-direction: column;
                    }

                    .social-login {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.Connexion = pages.Connexion;
