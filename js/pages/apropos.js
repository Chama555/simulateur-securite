/**
 * PAGES/APROPOS.JS - Page À propos du projet CDG 2026
 * Présentation, équipe, partenaires, mentions légales
 */

pages.Apropos = {
    activeTab: 'presentation',

    async render() {
        return `
            <div class="apropos-wrapper">
                <!-- Hero Section -->
                <section class="apropos-hero">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1>
                                <span class="material-symbols-outlined">flight_takeoff</span>
                                CDG 2026
                            </h1>
                            <p class="hero-subtitle">Safety Management System</p>
                            <p class="hero-description">
                                Une plateforme innovante pour optimiser la sécurité aéroportuaire 
                                et réduire les accidents d'engins de piste.
                            </p>
                        </div>
                        <div class="hero-stats">
                            <div class="stat-badge">
                                <span class="stat-number">61</span>
                                <span class="stat-label">Pistes d'amélioration</span>
                            </div>
                            <div class="stat-badge">
                                <span class="stat-number">5</span>
                                <span class="stat-label">Dimensions</span>
                            </div>
                            <div class="stat-badge">
                                <span class="stat-number">2026</span>
                                <span class="stat-label">Objectif zéro accident</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-background">
                        <div class="orb orb-1"></div>
                        <div class="orb orb-2"></div>
                    </div>
                </section>

                <!-- Navigation par onglets -->
                <div class="apropos-tabs">
                    <button class="tab-btn ${this.activeTab === 'presentation' ? 'active' : ''}" onclick="pages.Apropos.switchTab('presentation')">
                        <span class="material-symbols-outlined">info</span>
                        Présentation
                    </button>
                    <button class="tab-btn ${this.activeTab === 'equipe' ? 'active' : ''}" onclick="pages.Apropos.switchTab('equipe')">
                        <span class="material-symbols-outlined">group</span>
                        Équipe
                    </button>
                    <button class="tab-btn ${this.activeTab === 'partenaires' ? 'active' : ''}" onclick="pages.Apropos.switchTab('partenaires')">
                        <span class="material-symbols-outlined">handshake</span>
                        Partenaires
                    </button>
                    <button class="tab-btn ${this.activeTab === 'legal' ? 'active' : ''}" onclick="pages.Apropos.switchTab('legal')">
                        <span class="material-symbols-outlined">gavel</span>
                        Mentions légales
                    </button>
                    <button class="tab-btn ${this.activeTab === 'versions' ? 'active' : ''}" onclick="pages.Apropos.switchTab('versions')">
                        <span class="material-symbols-outlined">history</span>
                        Versions
                    </button>
                </div>

                <!-- Contenu principal -->
                <main class="apropos-main">
                    ${this.renderTabContent()}
                </main>

                <!-- Footer -->
                <footer class="apropos-footer">
                    <div class="footer-content">
                        <div class="footer-copyright">
                            © 2026 CDG 2026 Safety Management System. Tous droits réservés.
                        </div>
                        <div class="footer-links">
                            <a href="#/documentation">Documentation</a>
                            <a href="#/support">Support</a>
                            <a href="#/confidentialite">Confidentialité</a>
                            <a href="#/cookies">Cookies</a>
                        </div>
                    </div>
                </footer>
            </div>

            ${this.getStyles()}
        `;
    },

    renderTabContent() {
        switch(this.activeTab) {
            case 'presentation':
                return this.renderPresentationTab();
            case 'equipe':
                return this.renderEquipeTab();
            case 'partenaires':
                return this.renderPartenairesTab();
            case 'legal':
                return this.renderLegalTab();
            case 'versions':
                return this.renderVersionsTab();
            default:
                return this.renderPresentationTab();
        }
    },

    renderPresentationTab() {
        return `
            <div class="presentation-container">
                <!-- Notre mission -->
                <div class="mission-section">
                    <h2>Notre mission</h2>
                    <div class="mission-card">
                        <div class="mission-icon">
                            <span class="material-symbols-outlined">target</span>
                        </div>
                        <div class="mission-text">
                            <p class="mission-statement">
                                "Réduire à zéro les accidents corporels d'engins de piste 
                                sur la plateforme de Paris-Charles de Gaulle d'ici 2028."
                            </p>
                            <p>
                                Face à l'augmentation critique des accidents (+100% en 2024-2025), 
                                le CSAE a lancé ce projet innovant pour doter les décideurs d'outils 
                                d'aide à la décision performants.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Le contexte -->
                <div class="contexte-section">
                    <h2>Pourquoi ce projet ?</h2>
                    <div class="contexte-grid">
                        <div class="contexte-item">
                            <span class="material-symbols-outlined">trending_up</span>
                            <h3>+100%</h3>
                            <p>d'accidents corporels entre 2023 et 2025</p>
                        </div>
                        <div class="contexte-item">
                            <span class="material-symbols-outlined">groups</span>
                            <h3>40%</h3>
                            <p>d'embauches récentes sur la plateforme</p>
                        </div>
                        <div class="contexte-item">
                            <span class="material-symbols-outlined">warning</span>
                            <h3>61</h3>
                            <p>pistes d'amélioration identifiées</p>
                        </div>
                        <div class="contexte-item">
                            <span class="material-symbols-outlined">schedule</span>
                            <h3>2028</h3>
                            <p>objectif zéro accident corporel</p>
                        </div>
                    </div>
                </div>

                <!-- La solution -->
                <div class="solution-section">
                    <h2>Notre solution</h2>
                    <div class="solution-grid">
                        <div class="solution-card">
                            <div class="card-icon">
                                <span class="material-symbols-outlined">explore</span>
                            </div>
                            <h3>Explorer</h3>
                            <p>Inventaire complet des 61 pistes d'amélioration avec filtres avancés</p>
                        </div>
                        <div class="solution-card">
                            <div class="card-icon">
                                <span class="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <h3>Simuler</h3>
                            <p>Optimisation multicritères selon budget, dimensions et durée</p>
                        </div>
                        <div class="solution-card">
                            <div class="card-icon">
                                <span class="material-symbols-outlined">compare_arrows</span>
                            </div>
                            <h3>Comparer</h3>
                            <p>Analyse comparative de scénarios avec visualisation radar</p>
                        </div>
                        <div class="solution-card">
                            <div class="card-icon">
                                <span class="material-symbols-outlined">check_circle</span>
                            </div>
                            <h3>Décider</h3>
                            <p>Validation et export de plans d'action professionnels</p>
                        </div>
                    </div>
                </div>

                <!-- Les dimensions -->
                <div class="dimensions-section">
                    <h2>Les 5 dimensions Balancing</h2>
                    <div class="dimensions-showcase">
                        <div class="dimension-show" style="--color: #FF6B35">
                            <span class="dimension-icon">🌍</span>
                            <h4>Culture</h4>
                            <p>Valeurs, comportements collectifs, culture sécurité</p>
                        </div>
                        <div class="dimension-show" style="--color: #003D82">
                            <span class="dimension-icon">⚙️</span>
                            <h4>Technique</h4>
                            <p>Équipements, automatisation, solutions technologiques</p>
                        </div>
                        <div class="dimension-show" style="--color: #10B981">
                            <span class="dimension-icon">🧑‍🤝‍🧑</span>
                            <h4>Humain</h4>
                            <p>Formation, compétences, facteurs humains</p>
                        </div>
                        <div class="dimension-show" style="--color: #F59E0B">
                            <span class="dimension-icon">📋</span>
                            <h4>Organisationnel</h4>
                            <p>Processus, procédures, management</p>
                        </div>
                        <div class="dimension-show" style="--color: #8B5CF6">
                            <span class="dimension-icon">💰</span>
                            <h4>Économique</h4>
                            <p>ROI, économies, impact financier</p>
                        </div>
                    </div>
                </div>

                <!-- Timeline -->
                <div class="timeline-section">
                    <h2>Notre histoire</h2>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-date">Janvier 2026</div>
                            <div class="timeline-content">
                                <h4>Lancement du projet</h4>
                                <p>Création du groupe de travail CSAE-ENAC</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">Mars 2026</div>
                            <div class="timeline-content">
                                <h4>Recueil des données</h4>
                                <p>Analyse des accidents 2022-2025 sur CDG</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">Février 2026</div>
                            <div class="timeline-content">
                                <h4>Développement prototype</h4>
                                <p>Première version du simulateur</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">Juin 2026</div>
                            <div class="timeline-content">
                                <h4>Tests utilisateurs</h4>
                                <p>Validation avec les parties prenantes</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-date">Septembre 2026</div>
                            <div class="timeline-content">
                                <h4>Lancement officiel</h4>
                                <p>Mise à disposition sur la plateforme CDG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderEquipeTab() {
        return `
            <div class="equipe-container">
                <h2>L'équipe projet</h2>
                
                <!-- Direction -->
                <div class="team-section">
                    <h3>Direction du projet</h3>
                    <div class="team-grid">
                        <div class="team-card leader">
                            <div class="member-photo" style="background: linear-gradient(135deg, #FF6B35, #e55a2b);">
                                <span>MR</span>
                            </div>
                            <h4>Michel RAGOT</h4>
                            <p class="member-role">Responsable projet</p>
                            <p class="member-desc">Expert en sécurité aéroportuaire, 25 ans d'expérience chez Air France et ADP</p>
                            <div class="member-contact">
                                <a href="mailto:michel.ragot@cdg2026.fr">
                                    <span class="material-symbols-outlined">mail</span>
                                </a>
                                <a href="https://linkedin.com/in/michelragot" target="_blank">
                                    <span class="material-symbols-outlined">linkedin</span>
                                </a>
                            </div>
                        </div>

                        <div class="team-card leader">
                            <div class="member-photo" style="background: linear-gradient(135deg, #003D82, #002a5c);">
                                <span>CD</span>
                            </div>
                            <h4>Claude DEORESTIS</h4>
                            <p class="member-role">Expert technique</p>
                            <p class="member-desc">Spécialiste en analyse de données et optimisation multicritères</p>
                            <div class="member-contact">
                                <a href="mailto:claude.deorestis@cdg2026.fr">
                                    <span class="material-symbols-outlined">mail</span>
                                </a>
                                <a href="https://linkedin.com/in/claudedeorestis" target="_blank">
                                    <span class="material-symbols-outlined">linkedin</span>
                                </a>
                            </div>
                        </div>

                        <div class="team-card leader">
                            <div class="member-photo" style="background: linear-gradient(135deg, #10B981, #059669);">
                                <span>CEL</span>
                            </div>
                            <h4>Chama EL KHEMSANI</h4>
                            <p class="member-role">Coordinatrice</p>
                            <p class="member-desc">Developpement et déploiement opérationnel</p>
                            <div class="member-contact">
                                <a href="mailto:chama.elkhemsani@cdg2026.fr">
                                    <span class="material-symbols-outlined">mail</span>
                                </a>
                                <a href="https://linkedin.com/in/chamaelkhemsani" target="_blank">
                                    <span class="material-symbols-outlined">linkedin</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Équipe technique >
                <div class="team-section">
                    <h3>Équipe technique</h3>
                    <div class="team-grid">
                        <div class="team-card">
                            <div class="member-photo" style="background: #64748b;">
                                <span>xx</span>
                            </div>
                            <h4>xxxx xxxx</h4>
                            <p class="member-role">Lead développeur</p>
                            <p class="member-desc">Architecture et développement front-end</p>
                        </div>

                        <div class="team-card">
                            <div class="member-photo" style="background: #64748b;">
                                <span>yy</span>
                            </div>
                            <h4>yyyy yyyy</h4>
                            <p class="member-role">Data scientist</p>
                            <p class="member-desc">Algorithmes d'optimisation et modélisation</p>
                        </div>

                        <div class="team-card">
                            <div class="member-photo" style="background: #64748b;">
                                <span>zz</span>
                            </div>
                            <h4>zzzz zzzz</h4>
                            <p class="member-role">UX/UI Designer</p>
                            <p class="member-desc">Design d'interface et expérience utilisateur</p>
                        </div>
                    </div>
                </div-->

                <!-- Comité de pilotage >
                <div class="team-section">
                    <h3>Comité de pilotage</h3>
                    <div class="steering-committee">
                        <div class="committee-member">
                            <span class="material-symbols-outlined">account_circle</span>
                            <div>
                                <strong>Nicolas LAMBALLE</strong>
                                <p>ENAC - Directeur des études</p>
                            </div>
                        </div>
                        <div class="committee-member">
                            <span class="material-symbols-outlined">account_circle</span>
                            <div>
                                <strong>Ludovic VIDOT</strong>
                                <p>ENAC - Responsable exploitation aéroportuaire</p>
                            </div>
                        </div>
                        <div class="committee-member">
                            <span class="material-symbols-outlined">account_circle</span>
                            <div>
                                <strong>Marie-Claire DUBOIS</strong>
                                <p>ADP - Directrice sécurité</p>
                            </div>
                        </div>
                        <div class="committee-member">
                            <span class="material-symbols-outlined">account_circle</span>
                            <div>
                                <strong>François BERNARD</strong>
                                <p>GTA - Commandant de brigade</p>
                            </div>
                        </div>
                    </div>
                </div-->

                <!-- Nous rejoindre -->
                <div class="join-section">
                    <h3>Vous souhaitez nous rejoindre ?</h3>
                    <p>Nous recherchons des talents passionnés par la sécurité aéroportuaire.</p>
                    <a href="#/contact" class="btn-join">
                        <span class="material-symbols-outlined">handshake</span>
                        Postuler
                    </a>
                </div>
            </div>
        `;
    },

    renderPartenairesTab() {
        return `
            <div class="partenaires-container">
                <h2>Nos partenaires</h2>

                <!-- Partenaires principaux -->
                <div class="partners-section">
                    <h3>Partenaires institutionnels</h3>
                    <div class="partners-grid">
                        <div class="partner-card">
                            <div class="partner-logo" style="background: #003D82; color: white;">
                                <span class="material-symbols-outlined">flight</span>
                            </div>
                            <h4>CSAE</h4>
                            <p>Comité Social Aéroportuaire</p>
                            <span class="partner-role">Porteur du projet</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #10B981; color: white;">
                                <span class="material-symbols-outlined">school</span>
                            </div>
                            <h4>ENAC</h4>
                            <p>École Nationale de l'Aviation Civile</p>
                            <span class="partner-role">Expertise académique</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #2563eb; color: white;">
                                <span class="material-symbols-outlined">location_airport</span>
                            </div>
                            <h4>ADP</h4>
                            <p>Aéroports de Paris</p>
                            <span class="partner-role">Données et infrastructure</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #64748b; color: white;">
                                <span class="material-symbols-outlined">gavel</span>
                            </div>
                            <h4>GTA</h4>
                            <p>Gendarmerie des Transports Aériens</p>
                            <span class="partner-role">Expertise sécurité</span>
                        </div>
                    </div>
                </div>

                <!-- Partenaires privés -->
                <div class="partners-section">
                    <h3>Partenaires privés</h3>
                    <div class="partners-grid">
                        <div class="partner-card">
                            <div class="partner-logo" style="background: #ef4444; color: white;">
                                <span class="material-symbols-outlined">local_shipping</span>
                            </div>
                            <h4>FedEx</h4>
                            <p>Transport et logistique</p>
                            <span class="partner-role">Retour d'expérience</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #f97316; color: white;">
                                <span class="material-symbols-outlined">engineering</span>
                            </div>
                            <h4>Vinci Construction</h4>
                            <p>BTP et infrastructures</p>
                            <span class="partner-role">Benchmark intersectoriel</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #8b5cf6; color: white;">
                                <span class="material-symbols-outlined">directions_bus</span>
                            </div>
                            <h4>RATP</h4>
                            <p>Transport urbain</p>
                            <span class="partner-role">Prévention routière</span>
                        </div>
                    </div>
                </div>

                <!-- Partenaires internationaux -->
                <div class="partners-section">
                    <h3>Partenaires internationaux</h3>
                    <div class="partners-grid">
                        <div class="partner-card">
                            <div class="partner-logo" style="background: #1e293b; color: white;">
                                <span>FRA</span>
                            </div>
                            <h4>Flughafen Frankfurt</h4>
                            <p>Aéroport de Francfort</p>
                            <span class="partner-role">Benchmark européen</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #1e293b; color: white;">
                                <span>LHR</span>
                            </div>
                            <h4>Heathrow Airport</h4>
                            <p>Londres Heathrow</p>
                            <span class="partner-role">Partage de données</span>
                        </div>

                        <div class="partner-card">
                            <div class="partner-logo" style="background: #1e293b; color: white;">
                                <span>AMS</span>
                            </div>
                            <h4>Schiphol Airport</h4>
                            <p>Amsterdam</p>
                            <span class="partner-role">Meilleures pratiques</span>
                        </div>
                    </div>
                </div>

                <!-- Devenir partenaire -->
                <div class="become-partner">
                    <h3>Devenir partenaire</h3>
                    <p>Vous souhaitez rejoindre l'aventure CDG 2026 ? Contactez-nous pour discuter des opportunités de collaboration.</p>
                    <a href="#/contact" class="btn-partner">
                        <span class="material-symbols-outlined">handshake</span>
                        Nous contacter
                    </a>
                </div>
            </div>
        `;
    },

    renderLegalTab() {
        return `
            <div class="legal-container">
                <h2>Mentions légales</h2>

                <!-- Éditeur -->
                <div class="legal-section">
                    <h3>Éditeur de la plateforme</h3>
                    <div class="legal-card">
                        <p>
                            <strong>CSAE - Comité Social Aéroportuaire</strong><br>
                            Aéroport Charles de Gaulle<br>
                            95700 Roissy-en-France<br>
                            SIRET : 123 456 789 00012<br>
                            N° TVA intracommunautaire : FR 12 345678901
                        </p>
                        <p>
                            Directeur de la publication : Michel RAGOT<br>
                            Responsable technique : Claude DEORESTIS
                        </p>
                    </div>
                </div>

                <!-- Hébergement -->
                <div class="legal-section">
                    <h3>Hébergement</h3>
                    <div class="legal-card">
                        <p>
                            <strong>Infrastructure ADP</strong><br>
                            Aéroport Charles de Gaulle<br>
                            95700 Roissy-en-France<br>
                            Tél. : +33 1 48 62 22 22
                        </p>
                        <p>L'application est hébergée sur les serveurs sécurisés d'ADP, dans l'enceinte de l'aéroport.</p>
                    </div>
                </div>

                <!-- Propriété intellectuelle -->
                <div class="legal-section">
                    <h3>Propriété intellectuelle</h3>
                    <div class="legal-card">
                        <p>
                            L'ensemble du contenu de cette plateforme (textes, graphismes, logos, icônes, 
                            données, algorithmes) est la propriété exclusive du CSAE et de ses partenaires, 
                            sauf mention contraire explicite.
                        </p>
                        <p>
                            Toute reproduction, distribution, modification ou utilisation non autorisée 
                            des contenus est interdite et pourra faire l'objet de poursuites.
                        </p>
                        <p>
                            © 2026 CSAE - Tous droits réservés.
                        </p>
                    </div>
                </div>

                <!-- Protection des données -->
                <div class="legal-section">
                    <h3>Protection des données personnelles</h3>
                    <div class="legal-card">
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD) et à 
                            la loi Informatique et Libertés, vous disposez d'un droit d'accès, de 
                            rectification et de suppression des données vous concernant.
                        </p>
                        <p>
                            <strong>Délégué à la protection des données :</strong><br>
                            Patricia FAVRET<br>
                            <a href="mailto:dpo@cdg2026.fr">dpo@cdg2026.fr</a>
                        </p>
                        <p>
                            Les données collectées sont exclusivement utilisées dans le cadre du projet 
                            CDG 2026 et ne sont pas transmises à des tiers.
                        </p>
                    </div>
                </div>

                <!-- Cookies -->
                <div class="legal-section">
                    <h3>Gestion des cookies</h3>
                    <div class="legal-card">
                        <p>
                            Cette plateforme utilise des cookies techniques nécessaires à son 
                            fonctionnement (authentification, sauvegarde locale). Aucun cookie 
                            publicitaire ou de tracking n'est utilisé.
                        </p>
                        <p>
                            Vous pouvez à tout moment paramétrer vos préférences via les options 
                            de votre navigateur.
                        </p>
                        <a href="#/cookies" class="btn-cookies">Gérer mes préférences</a>
                    </div>
                </div>

                <!-- Conditions d'utilisation -->
                <div class="legal-section">
                    <h3>Conditions générales d'utilisation</h3>
                    <div class="legal-card">
                        <p>
                            L'accès et l'utilisation de cette plateforme sont soumis aux présentes 
                            conditions générales. En utilisant la plateforme, vous acceptez ces 
                            conditions sans réserve.
                        </p>
                        <p>
                            <strong>Version en vigueur :</strong> Septembre 2026<br>
                            <strong>Dernière mise à jour :</strong> 15/09/2026
                        </p>
                        <a href="#/cgu" class="btn-cgu">Lire les CGU complètes</a>
                    </div>
                </div>

                <!-- Crédits -->
                <div class="legal-section">
                    <h3>Crédits</h3>
                    <div class="legal-card credits">
                        <p>
                            <strong>Icônes :</strong> Material Symbols by Google<br>
                            <strong>Polices :</strong> Inter, Public Sans<br>
                            <strong>Graphismes :</strong> Pierre LEROY<br>
                            <strong>Développement :</strong> Jean DUPONT, Sophie MARTIN
                        </p>
                        <p>
                            Remerciements à toutes les personnes ayant contribué au projet, 
                            ainsi qu'aux partenaires pour leur soutien et leur expertise.
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    renderVersionsTab() {
        return `
            <div class="versions-container">
                <h2>Historique des versions</h2>

                <!-- Version actuelle -->
                <div class="version-card current">
                    <div class="version-header">
                        <span class="version-badge">Version actuelle</span>
                        <span class="version-date">15 septembre 2026</span>
                    </div>
                    <h3>Version 2.0.0 - Lancement officiel</h3>
                    <div class="version-features">
                        <h4>Nouvelles fonctionnalités :</h4>
                        <ul>
                            <li>Interface utilisateur entièrement repensée</li>
                            <li>Nouveau simulateur avec optimisation multicritères</li>
                            <li>Page de comparaison avec radars interactifs</li>
                            <li>Export PDF professionnel</li>
                            <li>Page de documentation complète</li>
                        </ul>
                    </div>
                </div>

                <!-- Versions précédentes -->
                <h3>Versions précédentes</h3>
                
                <div class="version-card">
                    <div class="version-header">
                        <span class="version-tag">v1.5.0</span>
                        <span class="version-date">15 juillet 2026</span>
                    </div>
                    <h4>Version bêta publique</h4>
                    <ul class="version-changes">
                        <li>Ajout des filtres avancés</li>
                        <li>Système de notation des pistes</li>
                        <li>Correction de bugs d'affichage</li>
                    </ul>
                </div>

                <div class="version-card">
                    <div class="version-header">
                        <span class="version-tag">v1.0.0</span>
                        <span class="version-date">1er juin 2026</span>
                    </div>
                    <h4>Version alpha</h4>
                    <ul class="version-changes">
                        <li>Première version testable</li>
                        <li>Explorateur de pistes basique</li>
                        <li>Simulateur simple</li>
                    </ul>
                </div>

                <!-- Roadmap -->
                <div class="roadmap-section">
                    <h3>Feuille de route</h3>
                    <div class="roadmap">
                        <div class="roadmap-item future">
                            <div class="roadmap-marker">
                                <span class="material-symbols-outlined">schedule</span>
                            </div>
                            <div class="roadmap-content">
                                <h4>Version 2.1.0 - Novembre 2026</h4>
                                <ul>
                                    <li>API pour intégration externe</li>
                                    <li>Export Excel</li>
                                    <li>Tableaux de bord personnalisables</li>
                                </ul>
                            </div>
                        </div>

                        <div class="roadmap-item future">
                            <div class="roadmap-marker">
                                <span class="material-symbols-outlined">schedule</span>
                            </div>
                            <div class="roadmap-content">
                                <h4>Version 2.2.0 - Janvier 2027</h4>
                                <ul>
                                    <li>Intelligence artificielle pour suggestions</li>
                                    <li>Module de reporting automatisé</li>
                                    <li>Application mobile</li>
                                </ul>
                            </div>
                        </div>

                        <div class="roadmap-item future">
                            <div class="roadmap-marker">
                                <span class="material-symbols-outlined">schedule</span>
                            </div>
                            <div class="roadmap-content">
                                <h4>Version 3.0.0 - 2028</h4>
                                <ul>
                                    <li>Extension à d'autres aéroports</li>
                                    <li>Jumeau numérique de la plateforme</li>
                                    <li>Prédiction des risques en temps réel</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notes de version -->
                <div class="release-notes">
                    <h3>Notes de version détaillées</h3>
                    <p>Consultez les notes de version complètes pour plus de détails techniques.</p>
                    <a href="#/release-notes" class="btn-notes">
                        <span class="material-symbols-outlined">description</span>
                        Voir les notes de version
                    </a>
                </div>
            </div>
        `;
    },

    switchTab(tab) {
        this.activeTab = tab;
        this.rerender();
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
                .apropos-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    font-family: 'Inter', sans-serif;
                }

                /* Hero Section */
                .apropos-hero {
                    position: relative;
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    color: white;
                    padding: 80px 32px;
                    overflow: hidden;
                }

                .hero-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .hero-text h1 {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    font-size: 64px;
                    font-weight: 800;
                    margin: 0 0 16px 0;
                }

                .hero-text h1 .material-symbols-outlined {
                    font-size: 72px;
                    color: #FF6B35;
                }

                .hero-subtitle {
                    font-size: 24px;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 16px;
                }

                .hero-description {
                    font-size: 18px;
                    max-width: 600px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.8);
                }

                .hero-stats {
                    display: flex;
                    gap: 32px;
                    margin-top: 48px;
                }

                .stat-badge {
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 16px;
                    padding: 20px 32px;
                    text-align: center;
                }

                .stat-number {
                    display: block;
                    font-size: 36px;
                    font-weight: 800;
                    color: #FF6B35;
                }

                .stat-label {
                    font-size: 14px;
                    color: rgba(255,255,255,0.8);
                }

                .hero-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                }

                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: #FF6B35;
                    top: -200px;
                    right: -200px;
                }

                .orb-2 {
                    width: 400px;
                    height: 400px;
                    background: #00a3ff;
                    bottom: -100px;
                    left: -100px;
                }

                /* Tabs */
                .apropos-tabs {
                    display: flex;
                    gap: 8px;
                    max-width: 900px;
                    margin: 32px auto;
                    background: white;
                    padding: 8px;
                    border-radius: 60px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .tab-btn {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
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

                .tab-btn:hover {
                    color: #FF6B35;
                }

                .tab-btn.active {
                    background: #FF6B35;
                    color: white;
                }

                /* Main content */
                .apropos-main {
                    max-width: 1200px;
                    margin: 0 auto 48px;
                    padding: 0 32px;
                }

                h2 {
                    font-size: 32px;
                    font-weight: 700;
                    color: #003D82;
                    margin: 0 0 32px 0;
                    text-align: center;
                }

                h3 {
                    font-size: 24px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 40px 0 24px 0;
                }

                /* Presentation Tab */
                .mission-section {
                    margin-bottom: 60px;
                }

                .mission-card {
                    display: flex;
                    gap: 40px;
                    align-items: center;
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }

                .mission-icon {
                    flex-shrink: 0;
                    width: 80px;
                    height: 80px;
                    background: #FF6B35;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mission-icon .material-symbols-outlined {
                    font-size: 40px;
                    color: white;
                }

                .mission-statement {
                    font-size: 20px;
                    font-weight: 600;
                    color: #003D82;
                    font-style: italic;
                    margin-bottom: 16px;
                }

                .contexte-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin: 32px 0;
                }

                .contexte-item {
                    background: white;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .contexte-item .material-symbols-outlined {
                    font-size: 40px;
                    color: #FF6B35;
                    margin-bottom: 16px;
                }

                .contexte-item h3 {
                    font-size: 32px;
                    margin: 0 0 8px 0;
                    color: #003D82;
                }

                .solution-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin: 32px 0;
                }

                .solution-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: all 0.3s;
                }

                .solution-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px rgba(0,0,0,0.1);
                }

                .card-icon {
                    width: 64px;
                    height: 64px;
                    background: #f1f5f9;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                }

                .card-icon .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                }

                .dimensions-showcase {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 16px;
                    margin: 32px 0;
                }

                .dimension-show {
                    background: white;
                    border-radius: 12px;
                    padding: 24px 16px;
                    text-align: center;
                    border-top: 4px solid var(--color);
                }

                .dimension-icon {
                    font-size: 32px;
                    margin-bottom: 12px;
                    display: block;
                }

                .timeline {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    height: 100%;
                    background: #e2e8f0;
                }

                .timeline-item {
                    position: relative;
                    margin-bottom: 48px;
                }

                .timeline-item:nth-child(odd) {
                    padding-right: 50%;
                    text-align: right;
                }

                .timeline-item:nth-child(even) {
                    padding-left: 50%;
                }

                .timeline-date {
                    display: inline-block;
                    background: #FF6B35;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .timeline-content {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                /* Team Tab */
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin: 24px 0;
                }

                .team-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: all 0.3s;
                }

                .team-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }

                .team-card.leader {
                    border: 2px solid #FF6B35;
                }

                .member-photo {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    font-weight: 700;
                    color: white;
                }

                .member-role {
                    color: #FF6B35;
                    font-weight: 600;
                    margin: 8px 0;
                }

                .member-desc {
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }

                .member-contact {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }

                .member-contact a {
                    color: #64748b;
                    text-decoration: none;
                }

                .steering-committee {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 24px;
                }

                .committee-member {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 12px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .committee-member:last-child {
                    border-bottom: none;
                }

                .committee-member .material-symbols-outlined {
                    color: #FF6B35;
                    font-size: 24px;
                }

                .join-section {
                    text-align: center;
                    margin: 48px 0;
                    padding: 48px;
                    background: linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%);
                    border-radius: 24px;
                    color: white;
                }

                .btn-join {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: white;
                    color: #FF6B35;
                    border: none;
                    border-radius: 40px;
                    font-weight: 600;
                    text-decoration: none;
                    margin-top: 24px;
                }

                /* Partners Tab */
                .partners-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin: 24px 0;
                }

                .partner-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: all 0.3s;
                }

                .partner-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }

                .partner-logo {
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: 700;
                }

                .partner-role {
                    display: inline-block;
                    margin-top: 12px;
                    padding: 4px 12px;
                    background: #f1f5f9;
                    border-radius: 20px;
                    font-size: 11px;
                    color: #475569;
                }

                .become-partner {
                    text-align: center;
                    margin: 48px 0;
                    padding: 48px;
                    background: #f8fafc;
                    border-radius: 24px;
                }

                .btn-partner {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: #FF6B35;
                    color: white;
                    border: none;
                    border-radius: 40px;
                    font-weight: 600;
                    text-decoration: none;
                    margin-top: 24px;
                }

                /* Legal Tab */
                .legal-section {
                    margin-bottom: 40px;
                }

                .legal-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .legal-card p {
                    margin-bottom: 16px;
                    line-height: 1.8;
                }

                .legal-card a {
                    color: #FF6B35;
                    text-decoration: none;
                }

                .btn-cookies, .btn-cgu {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 40px;
                    text-decoration: none;
                    margin-top: 16px;
                }

                .credits {
                    background: #f8fafc;
                    font-style: italic;
                }

                /* Versions Tab */
                .version-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    margin-bottom: 24px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .version-card.current {
                    border: 2px solid #10b981;
                    background: #f0fdf4;
                }

                .version-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .version-badge {
                    background: #10b981;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .version-tag {
                    background: #003D82;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .version-date {
                    color: #64748b;
                    font-size: 14px;
                }

                .version-changes {
                    margin-top: 16px;
                    padding-left: 20px;
                }

                .roadmap {
                    margin: 32px 0;
                }

                .roadmap-item {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 24px;
                }

                .roadmap-marker {
                    flex-shrink: 0;
                }

                .roadmap-marker .material-symbols-outlined {
                    font-size: 32px;
                    color: #94a3b8;
                }

                .roadmap-content {
                    flex: 1;
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .release-notes {
                    text-align: center;
                    margin: 48px 0;
                }

                .btn-notes {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: #FF6B35;
                    color: white;
                    border-radius: 40px;
                    text-decoration: none;
                    margin-top: 16px;
                }

                /* Footer */
                .apropos-footer {
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    padding: 24px 32px;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #64748b;
                }

                .footer-links {
                    display: flex;
                    gap: 24px;
                }

                .footer-links a {
                    color: #64748b;
                    text-decoration: none;
                }

                .footer-links a:hover {
                    color: #FF6B35;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .contexte-grid,
                    .solution-grid,
                    .dimensions-showcase,
                    .team-grid,
                    .partners-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .apropos-tabs {
                        flex-direction: column;
                        border-radius: 24px;
                    }

                    .hero-text h1 {
                        font-size: 40px;
                    }

                    .hero-stats {
                        flex-direction: column;
                    }

                    .mission-card {
                        flex-direction: column;
                        text-align: center;
                    }

                    .contexte-grid,
                    .solution-grid,
                    .dimensions-showcase,
                    .team-grid,
                    .partners-grid {
                        grid-template-columns: 1fr;
                    }

                    .timeline::before {
                        left: 0;
                    }

                    .timeline-item:nth-child(odd),
                    .timeline-item:nth-child(even) {
                        padding: 0 0 0 30px;
                        text-align: left;
                    }

                    .footer-content {
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                    }

                    .footer-links {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.Apropos = pages.Apropos;