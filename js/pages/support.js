/**
 * PAGES/SUPPORT.JS - Page d'assistance et support utilisateur
 * Aide, FAQ, contact et signalement de bugs
 */

pages.Support = {
    activeTab: 'faq',
    searchQuery: '',
    ticketSubject: '',
    ticketMessage: '',
    ticketCategory: 'bug',

    async render() {
        return `
            <div class="support-wrapper">
                <!-- En-tête -->
                <header class="support-header">
                    <div class="header-content">
                        <h1><span class="material-symbols-outlined">support_agent</span>Centre d'aide et support</h1>
                    </div>
                </header>

                <!-- Navigation par onglets -->
                <div class="support-tabs">
                    <button class="tab-btn ${this.activeTab === 'faq' ? 'active' : ''}" onclick="pages.Support.switchTab('faq')">
                        <span class="material-symbols-outlined">help</span>
                        FAQ
                    </button>
                    <button class="tab-btn ${this.activeTab === 'guide' ? 'active' : ''}" onclick="pages.Support.switchTab('guide')">
                        <span class="material-symbols-outlined">menu_book</span>
                        Guides rapides
                    </button>
                    <button class="tab-btn ${this.activeTab === 'contact' ? 'active' : ''}" onclick="pages.Support.switchTab('contact')">
                        <span class="material-symbols-outlined">contact_support</span>
                        Contact & Support
                    </button>
                    <button class="tab-btn ${this.activeTab === 'ticket' ? 'active' : ''}" onclick="pages.Support.switchTab('ticket')">
                        <span class="material-symbols-outlined">bug_report</span>
                        Signaler un problème
                    </button>
                </div>

                <!-- Contenu principal -->
                <main class="support-main">
                    ${this.renderTabContent()}
                </main>

            </div>

            ${this.getStyles()}
        `;
    },

    renderTabContent() {
        switch(this.activeTab) {
            case 'faq':
                return this.renderFAQTab();
            case 'guide':
                return this.renderGuideTab();
            case 'contact':
                return this.renderContactTab();
            case 'ticket':
                return this.renderTicketTab();
            default:
                return this.renderFAQTab();
        }
    },

    renderFAQTab() {
        const faqs = [
            {
                category: 'Général',
                icon: 'info',
                questions: [
                    {
                        q: "Comment démarrer avec l'application ?",
                        a: "Rendez-vous sur la page d'accueil et cliquez sur 'Explorer les pistes' pour commencer. Vous pouvez aussi consulter le mode d'emploi pas à pas pour une introduction guidée."
                    },
                    {
                        q: "Les données sont-elles sauvegardées ?",
                        a: "Oui, toutes vos données sont automatiquement sauvegardées dans votre navigateur (IndexedDB). Elles persistent entre les sessions."
                    },
                    {
                        q: "Puis-je utiliser l'application hors ligne ?",
                        a: "Oui, l'application fonctionne entièrement hors ligne une fois chargée. Toutes les données sont stockées localement."
                    }
                ]
            },
            {
                category: 'Explorer',
                icon: 'explore',
                questions: [
                    {
                        q: "Comment filtrer les pistes ?",
                        a: "Utilisez le panneau latéral gauche : vous pouvez filtrer par catégorie, priorité, budget et notation. Les filtres s'appliquent en temps réel."
                    },
                    {
                        q: "À quoi servent les étoiles sur les cartes ?",
                        a: "Les étoiles permettent de noter les pistes selon leur pertinence pour vous. Ces notes sont sauvegardées localement et vous aident à retrouver vos pistes favorites."
                    },
                    {
                        q: "Comment voir les détails d'une piste ?",
                        a: "Cliquez sur le bouton 'Détails' sur la carte de la piste pour accéder à sa fiche complète avec toutes les informations."
                    }
                ]
            },
            {
                category: 'Simulateur',
                icon: 'auto_awesome',
                questions: [
                    {
                        q: "Comment fonctionne l'optimisation ?",
                        a: "Le simulateur utilise des algorithmes pour trouver les meilleures combinaisons de pistes selon vos contraintes (budget, dimensions, durée). Vous pouvez choisir entre plusieurs modes d'optimisation."
                    },
                    {
                        q: "Quelle est la différence entre les modes d'optimisation ?",
                        a: "Le mode 'Pondéré' combine toutes les contraintes, 'Pareto' trouve les meilleurs compromis budget/impact, et 'Budget d'abord' maximise l'impact dans la limite budgétaire."
                    },
                    {
                        q: "Comment interpréter le front de Pareto ?",
                        a: "Le front de Pareto montre les solutions où aucun critère ne peut être amélioré sans dégrader l'autre. Plus une solution est en haut à droite, meilleure elle est."
                    }
                ]
            },
            {
                category: 'Comparaison',
                icon: 'compare_arrows',
                questions: [
                    {
                        q: "Comment comparer plusieurs scénarios ?",
                        a: "Dans la page Comparaison, cochez les scénarios que vous souhaitez comparer. Ils apparaîtront côte à côte avec leurs radars de dimensions et leurs métriques."
                    },
                    {
                        q: "Que signifient les radars ?",
                        a: "Les radars visualisent l'équilibre entre les 5 dimensions (Culture, Technique, Humain, Organisationnel, Économique). Un radar équilibré indique une couverture complète."
                    }
                ]
            },
            {
                category: 'Export',
                icon: 'download',
                questions: [
                    {
                        q: "Quels formats d'export sont disponibles ?",
                        a: "Vous pouvez exporter en PDF (rapport professionnel formaté) ou en JSON (données brutes pour analyse externe)."
                    },
                    {
                        q: "Comment imprimer mon plan d'action ?",
                        a: "Dans la page Décision, utilisez le bouton 'Imprimer' pour obtenir une version optimisée pour l'impression avec espace pour signature."
                    }
                ]
            },
            {
                category: 'Administration',
                icon: 'admin_panel_settings',
                questions: [
                    {
                        q: "Comment sauvegarder mes données ?",
                        a: "Dans la page Administration, utilisez 'Exporter la base de données' pour télécharger une sauvegarde JSON complète."
                    },
                    {
                        q: "Puis-je importer des données personnalisées ?",
                        a: "Oui, utilisez la fonction 'Importer une sauvegarde' dans la page Administration pour charger vos propres fichiers JSON."
                    }
                ]
            }
        ];

        return `
            <div class="faq-container">
                <h2>Questions fréquentes</h2>
                
                ${faqs.map(category => `
                    <div class="faq-category">
                        <div class="category-header">
                            <span class="material-symbols-outlined">${category.icon}</span>
                            <h3>${category.category}</h3>
                        </div>
                        
                        <div class="faq-list">
                            ${category.questions.map((faq, index) => `
                                <div class="faq-item" onclick="pages.Support.toggleFAQ(this)">
                                    <div class="faq-question">
                                        <span>${faq.q}</span>
                                        <span class="material-symbols-outlined">expand_more</span>
                                    </div>
                                    <div class="faq-answer">
                                        <p>${faq.a}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <div class="faq-not-found">
                    <span class="material-symbols-outlined">help</span>
                    <p>Vous n'avez pas trouvé votre réponse ?</p>
                    <button class="btn-contact" onclick="pages.Support.switchTab('contact')">
                        Contactez-nous
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        `;
    },

    renderGuideTab() {
        const guides = [
            {
                title: "Premiers pas",
                icon: "start",
                color: "#10b981",
                steps: [
                    "Consultez la page d'accueil",
                    "Lisez la problématique pour comprendre le contexte",
                    "Explorez les pistes disponibles",
                    "Lancez votre première simulation"
                ],
                link: "/mode-emploi"
            },
            {
                title: "Explorer efficacement",
                icon: "explore",
                color: "#3b82f6",
                steps: [
                    "Utilisez les filtres par priorité (P1-P4)",
                    "Ajustez le curseur de budget",
                    "Recherchez par mot-clé",
                    "Notez les pistes pertinentes"
                ],
                link: "/explorer"
            },
            {
                title: "Simulation avancée",
                icon: "auto_awesome",
                color: "#8b5cf6",
                steps: [
                    "Définissez vos contraintes budgétaires",
                    "Ajustez les dimensions Balancing",
                    "Choisissez le mode d'optimisation",
                    "Analysez les résultats"
                ],
                link: "/simulateur"
            },
            {
                title: "Comparaison de scénarios",
                icon: "compare_arrows",
                color: "#f59e0b",
                steps: [
                    "Sélectionnez plusieurs scénarios",
                    "Comparez les radars de dimensions",
                    "Consultez le tableau de scoring",
                    "Exportez la comparaison"
                ],
                link: "/compare"
            },
            {
                title: "Décision et export",
                icon: "check_circle",
                color: "#ef4444",
                steps: [
                    "Vérifiez le résumé exécutif",
                    "Consultez le détail des pistes",
                    "Générez un PDF professionnel",
                    "Imprimez avec signature"
                ],
                link: "/decide"
            },
            {
                title: "Administration",
                icon: "admin_panel_settings",
                color: "#6b7280",
                steps: [
                    "Exportez vos données",
                    "Importez une sauvegarde",
                    "Nettoyez le cache",
                    "Consultez les logs"
                ],
                link: "/admin"
            }
        ];

        return `
            <div class="guides-container">
                <h2>Guides rapides</h2>
                
                <div class="guides-grid">
                    ${guides.map(guide => `
                        <div class="guide-card">
                            <div class="guide-header" style="background: ${guide.color}20; color: ${guide.color};">
                                <span class="material-symbols-outlined">${guide.icon}</span>
                                <h3>${guide.title}</h3>
                            </div>
                            <div class="guide-content">
                                <ol class="guide-steps">
                                    ${guide.steps.map(step => `<li>${step}</li>`).join('')}
                                </ol>
                                <a href="#${guide.link}" class="guide-link">
                                    Accéder
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="video-tutorials">
                    <h3>Tutoriels vidéo</h3>
                    <div class="videos-grid">
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <span class="material-symbols-outlined">play_circle</span>
                            </div>
                            <h4>Présentation générale</h4>
                            <p>5 min - Découvrez toutes les fonctionnalités</p>
                        </div>
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <span class="material-symbols-outlined">play_circle</span>
                            </div>
                            <h4>Comment simuler</h4>
                            <p>3 min - Guide pas à pas</p>
                        </div>
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <span class="material-symbols-outlined">play_circle</span>
                            </div>
                            <h4>Exporter en PDF</h4>
                            <p>2 min - Générer des rapports</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderContactTab() {
        return `
            <div class="contact-container">
                <h2>Contactez le support</h2>

                <div class="contact-grid">
                    <!-- Email -->
                    <div class="contact-card">
                        <div class="contact-icon" style="background: #dbeafe; color: #2563eb;">
                            <span class="material-symbols-outlined">mail</span>
                        </div>
                        <h3>Email</h3>
                        <p class="contact-detail">support@cdg2026.fr</p>
                        <p class="contact-note">Réponse sous 24h ouvrées</p>
                        <a href="mailto:support@cdg2026.fr" class="contact-action">
                            Envoyer un email
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>

                    <!-- Téléphone -->
                    <div class="contact-card">
                        <div class="contact-icon" style="background: #dcfce7; color: #16a34a;">
                            <span class="material-symbols-outlined">call</span>
                        </div>
                        <h3>Téléphone</h3>
                        <p class="contact-detail">+33 1 48 62 22 22</p>
                        <p class="contact-note">Lun-Ven, 9h-17h</p>
                        <a href="tel:+33148622222" class="contact-action">
                            Appeler
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>




                </div>

                <!-- Horaires et disponibilité -->
                <div class="availability-section">
                    <h3>Disponibilité du support</h3>
                    <div class="schedule-grid">
                        <div class="schedule-item">
                            <span class="day">Lundi - Vendredi</span>
                            <span class="hours">09:00 - 17:00</span>
                            <span class="status available">Disponible</span>
                        </div>
                        <div class="schedule-item">
                            <span class="day">Samedi</span>
                            <span class="hours">10:00 - 14:00</span>
                            <span class="status limited">Urgences uniquement</span>
                        </div>
                        <div class="schedule-item">
                            <span class="day">Dimanche</span>
                            <span class="hours">Fermé</span>
                            <span class="status closed">Fermé</span>
                        </div>
                    </div>
                </div>

                <!-- Équipe support -->
                <div class="team-section">
                    <h3>Notre équipe support</h3>
                    <div class="team-grid">
                        <div class="team-member">
                            <div class="member-avatar" style="background: #FF6B35;">MR</div>
                            <h4>Michel RAGOT</h4>
                            <p>Responsable support</p>

                        </div>
                        <div class="team-member">
                            <div class="member-avatar" style="background: #003D82;">CD</div>
                            <h4>Claude DEORESTIS</h4>
                            <p>Expert technique</p>

                        </div>
                        <div class="team-member">
                            <div class="member-avatar" style="background: #10b981;">PF</div>
                            <h4>Chama ELKHEMSANI</h4>
                            <p>Support plateforme</p>

                        </div>
                        <div class="team-member">
                            <div class="member-avatar" style="background: #8b5cf6;">NL</div>
                            <h4>Nicolas LAMBALLE</h4>
                            <p>Contact ENAC</p>
                        </div>
                    </div>
                </div>

                <!-- Adresse -->
                <div class="address-section">
                    <span class="material-symbols-outlined">location_on</span>
                    <div>
                        <h4>Adresse postale</h4>
                        <p>
                            CSAE - Comité Social Aéroportuaire<br>
                            Aéroport Charles de Gaulle<br>
                            95700 Roissy-en-France
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    renderTicketTab() {
        const categories = [
            { value: 'bug', label: 'Bug / Problème technique', icon: 'bug_report' },
            { value: 'question', label: 'Question sur l\'utilisation', icon: 'help' },
            { value: 'suggestion', label: 'Suggestion d\'amélioration', icon: 'lightbulb' },
            { value: 'data', label: 'Problème de données', icon: 'database' },
            { value: 'account', label: 'Compte utilisateur', icon: 'account_circle' },
            { value: 'other', label: 'Autre', icon: 'more_horiz' }
        ];

        return `
            <div class="ticket-container">
                <h2>Signaler un problème</h2>
                <p class="ticket-subtitle">Remplissez ce formulaire pour nous aider à traiter votre demande rapidement</p>

                <form class="ticket-form" onsubmit="event.preventDefault(); pages.Support.submitTicket()">
                    <!-- Catégorie -->
                    <div class="form-group">
                        <label for="ticket-category">
                            <span class="material-symbols-outlined">category</span>
                            Catégorie
                        </label>
                        <div class="category-grid">
                            ${categories.map(cat => `
                                <label class="category-option ${this.ticketCategory === cat.value ? 'selected' : ''}">
                                    <input 
                                        type="radio" 
                                        name="category" 
                                        value="${cat.value}" 
                                        ${this.ticketCategory === cat.value ? 'checked' : ''}
                                        onchange="pages.Support.setTicketCategory('${cat.value}')"
                                    >
                                    <span class="material-symbols-outlined">${cat.icon}</span>
                                    <span>${cat.label}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sujet -->
                    <div class="form-group">
                        <label for="ticket-subject">
                            <span class="material-symbols-outlined">title</span>
                            Sujet
                        </label>
                        <input 
                            type="text" 
                            id="ticket-subject" 
                            placeholder="Résumez votre problème en quelques mots"
                            value="${this.ticketSubject}"
                            onkeyup="pages.Support.setTicketSubject(this.value)"
                        >
                    </div>

                    <!-- Description -->
                    <div class="form-group">
                        <label for="ticket-message">
                            <span class="material-symbols-outlined">description</span>
                            Description détaillée
                        </label>
                        <textarea 
                            id="ticket-message" 
                            rows="6" 
                            placeholder="Décrivez votre problème en détail. Incluez les étapes pour le reproduire, ce que vous attendiez et ce qui s'est produit."
                            onkeyup="pages.Support.setTicketMessage(this.value)"
                        >${this.ticketMessage}</textarea>
                    </div>

                    <!-- Pièce jointe -->
                    <div class="form-group">
                        <label>
                            <span class="material-symbols-outlined">attach_file</span>
                            Pièces jointes (optionnel)
                        </label>
                        <div class="file-upload-area" onclick="document.getElementById('file-input').click()">
                            <span class="material-symbols-outlined">cloud_upload</span>
                            <p>Cliquez pour ajouter des fichiers</p>
                            <p class="file-hint">Captures d'écran, fichiers, logs (max 10 Mo)</p>
                            <input type="file" id="file-input" multiple style="display: none;" onchange="pages.Support.handleFiles(this)">
                        </div>
                        <div class="file-list" id="file-list"></div>
                    </div>

                    <!-- Priorité -->
                    <div class="form-group">
                        <label>
                            <span class="material-symbols-outlined">priority_high</span>
                            Priorité
                        </label>
                        <div class="priority-options">
                            <label class="priority-option low">
                                <input type="radio" name="priority" value="low" checked>
                                <span>Basse</span>
                                <small>Question simple, suggestion</small>
                            </label>
                            <label class="priority-option medium">
                                <input type="radio" name="priority" value="medium">
                                <span>Moyenne</span>
                                <small>Problème bloquant une fonctionnalité</small>
                            </label>
                            <label class="priority-option high">
                                <input type="radio" name="priority" value="high">
                                <span>Haute</span>
                                <small>Application inutilisable</small>
                            </label>
                        </div>
                    </div>

                    <!-- Informations système (auto) -->
                    <div class="system-info">
                        <div class="system-info-header" onclick="pages.Support.toggleSystemInfo()">
                            <span class="material-symbols-outlined">info</span>
                            <span>Informations système (automatique)</span>
                            <span class="material-symbols-outlined expand">expand_more</span>
                        </div>
                        <div class="system-info-content">
                            <pre>Navigateur: ${navigator.userAgent}
Version application: 2.0.0
Date: ${new Date().toLocaleString()}
Résolution: ${window.screen.width}x${window.screen.height}
Stockage: ${this.getStorageInfo()}</pre>
                        </div>
                    </div>

                    <!-- Boutons -->
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" onclick="pages.Support.resetTicketForm()">
                            Annuler
                        </button>
                        <button type="submit" class="btn-submit">
                            <span class="material-symbols-outlined">send</span>
                            Envoyer le ticket
                        </button>
                    </div>
                </form>

                <!-- Tickets récents -->
                <div class="recent-tickets">
                    <h3>Vos tickets récents</h3>
                    <div class="tickets-list">
                        <div class="ticket-item">
                            <div class="ticket-status status-resolved"></div>
                            <div class="ticket-info">
                                <span class="ticket-id">#T2026-0215</span>
                                <span class="ticket-title">Problème d'export PDF</span>
                            </div>
                            <span class="ticket-date">15/02/2026</span>
                            <span class="ticket-badge resolved">Résolu</span>
                        </div>
                        <div class="ticket-item">
                            <div class="ticket-status status-progress"></div>
                            <div class="ticket-info">
                                <span class="ticket-id">#T2026-0214</span>
                                <span class="ticket-title">Filtre par catégorie ne fonctionne pas</span>
                            </div>
                            <span class="ticket-date">14/02/2026</span>
                            <span class="ticket-badge progress">En cours</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    toggleFAQ(element) {
        element.classList.toggle('expanded');
    },

    toggleSystemInfo() {
        const content = document.querySelector('.system-info-content');
        const icon = document.querySelector('.system-info-header .expand');
        if (content && icon) {
            content.classList.toggle('expanded');
            icon.textContent = content.classList.contains('expanded') ? 'expand_less' : 'expand_more';
        }
    },

    searchHelp(query) {
        this.searchQuery = query;
        // Implémentation recherche
        console.log('Recherche:', query);
    },

    clearSearch() {
        this.searchQuery = '';
        const input = document.getElementById('support-search');
        if (input) input.value = '';
        this.searchHelp('');
    },

    switchTab(tab) {
        this.activeTab = tab;
        this.rerender();
    },

    setTicketCategory(category) {
        this.ticketCategory = category;
        // Mettre à jour l'affichage
        document.querySelectorAll('.category-option').forEach(opt => {
            if (opt.querySelector('input').value === category) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    },

    setTicketSubject(subject) {
        this.ticketSubject = subject;
    },

    setTicketMessage(message) {
        this.ticketMessage = message;
    },

    handleFiles(input) {
        const fileList = document.getElementById('file-list');
        if (fileList && input.files.length > 0) {
            fileList.innerHTML = '';
            Array.from(input.files).forEach(file => {
                fileList.innerHTML += `
                    <div class="file-item">
                        <span class="material-symbols-outlined">description</span>
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${(file.size / 1024).toFixed(0)} Ko</span>
                        <span class="file-remove" onclick="this.parentElement.remove()">&times;</span>
                    </div>
                `;
            });
        }
    },

    submitTicket() {
        if (!this.ticketSubject || !this.ticketMessage) {
            alert('Veuillez remplir le sujet et la description');
            return;
        }

        // Simuler l'envoi
        alert(`Ticket envoyé avec succès !\n\nRéférence: T2026-${Math.floor(Math.random() * 10000)}\nUn email de confirmation a été envoyé.`);
        
        // Réinitialiser le formulaire
        this.resetTicketForm();
    },

    resetTicketForm() {
        this.ticketSubject = '';
        this.ticketMessage = '';
        this.ticketCategory = 'bug';
        this.rerender();
    },

    openChat() {
        alert('Chat en direct - Fonctionnalité à venir. Veuillez utiliser le formulaire de contact pour l\'instant.');
    },

    getStorageInfo() {
        try {
            const storage = window.localStorage;
            let total = 0;
            for (let key in storage) {
                if (storage.hasOwnProperty(key)) {
                    total += (storage[key].length * 2) / 1024 / 1024; // Approximation
                }
            }
            return `${total.toFixed(1)} Mo utilisés`;
        } catch (e) {
            return 'Non disponible';
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
                .support-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    font-family: 'Inter', sans-serif;
                    padding: 32px;
                    position: relative;
                }

                .support-header {
                    max-width: 1200px;
                    margin: 0 auto 40px;
                    text-align: center;
                }

                .header-content h1 {
                    display: inline-flex;
                    align-items: center;
                    gap: 16px;
                    font-size: 42px;
                    font-weight: 800;
                    color: #003D82;
                    margin: 0 0 16px 0;
                    background: white;
                    padding: 20px 40px;
                    border-radius: 60px;
                    box-shadow: 0 10px 25px rgba(0,61,130,0.1);
                }

                .header-content h1 .material-symbols-outlined {
                    font-size: 48px;
                    color: #FF6B35;
                }

                .header-subtitle {
                    font-size: 18px;
                    color: #475569;
                }

                .search-container {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .search-box {
                    position: relative;
                }

                .search-box .material-symbols-outlined {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                .search-box input {
                    width: 100%;
                    padding: 16px 16px 16px 56px;
                    border: none;
                    border-radius: 40px;
                    font-size: 16px;
                    background: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .search-box input:focus {
                    outline: none;
                    box-shadow: 0 4px 16px rgba(255,107,53,0.2);
                }

                .clear-search {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                }

                .support-tabs {
                    display: flex;
                    gap: 8px;
                    max-width: 900px;
                    margin: 0 auto 32px;
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

                .support-main {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* FAQ */
                .faq-container {
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }

                .faq-container h2 {
                    font-size: 28px;
                    color: #003D82;
                    margin: 0 0 32px 0;
                }

                .faq-category {
                    margin-bottom: 32px;
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .category-header .material-symbols-outlined {
                    font-size: 24px;
                    color: #FF6B35;
                }

                .category-header h3 {
                    font-size: 20px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                }

                .faq-list {
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .faq-item {
                    border-bottom: 1px solid #e2e8f0;
                    cursor: pointer;
                }

                .faq-item:last-child {
                    border-bottom: none;
                }

                .faq-question {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    background: white;
                    font-weight: 500;
                    color: #1e293b;
                }

                .faq-question .material-symbols-outlined {
                    transition: transform 0.3s;
                }

                .faq-item.expanded .faq-question .material-symbols-outlined {
                    transform: rotate(180deg);
                }

                .faq-answer {
                    display: none;
                    padding: 0 20px 20px;
                    color: #64748b;
                    line-height: 1.6;
                }

                .faq-item.expanded .faq-answer {
                    display: block;
                }

                .faq-not-found {
                    text-align: center;
                    padding: 40px;
                    background: #f8fafc;
                    border-radius: 16px;
                    margin-top: 40px;
                }

                .faq-not-found .material-symbols-outlined {
                    font-size: 48px;
                    color: #94a3b8;
                    margin-bottom: 16px;
                }

                .btn-contact {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: #FF6B35;
                    color: white;
                    border: none;
                    border-radius: 40px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 16px;
                }

                /* Guides */
                .guides-container {
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                }

                .guides-container h2 {
                    font-size: 28px;
                    color: #003D82;
                    margin: 0 0 32px 0;
                }

                .guides-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .guide-card {
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s;
                }

                .guide-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }

                .guide-header {
                    padding: 24px;
                    text-align: center;
                }

                .guide-header .material-symbols-outlined {
                    font-size: 40px;
                    margin-bottom: 12px;
                }

                .guide-header h3 {
                    margin: 0;
                }

                .guide-content {
                    padding: 24px;
                    background: #f8fafc;
                }

                .guide-steps {
                    margin: 0 0 20px 0;
                    padding-left: 20px;
                }

                .guide-steps li {
                    margin-bottom: 8px;
                    color: #475569;
                }

                .guide-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    color: #FF6B35;
                    text-decoration: none;
                    font-weight: 600;
                }

                .video-tutorials h3 {
                    font-size: 20px;
                    color: #1e293b;
                    margin: 0 0 20px 0;
                }

                .videos-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .video-card {
                    background: #f8fafc;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                }

                .video-thumbnail {
                    background: #e2e8f0;
                    height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .video-thumbnail .material-symbols-outlined {
                    font-size: 48px;
                    color: #FF6B35;
                    opacity: 0.7;
                }

                .video-card h4 {
                    padding: 16px 16px 4px;
                    margin: 0;
                }

                .video-card p {
                    padding: 0 16px 16px;
                    color: #64748b;
                    font-size: 13px;
                    margin: 0;
                }

                /* Contact */
                .contact-container {
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                }

                .contact-container h2 {
                    font-size: 28px;
                    color: #003D82;
                    margin: 0 0 32px 0;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .contact-card {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 32px 24px;
                    text-align: center;
                    transition: all 0.3s;
                }

                .contact-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }

                .contact-card.highlight {
                    background: linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%);
                    color: white;
                }

                .contact-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                }

                .contact-icon .material-symbols-outlined {
                    font-size: 32px;
                }

                .contact-card h3 {
                    margin: 0 0 8px 0;
                }

                .contact-detail {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .contact-note {
                    font-size: 12px;
                    color: #64748b;
                    margin-bottom: 20px;
                }

                .contact-card.highlight .contact-note {
                    color: rgba(255,255,255,0.8);
                }

                .contact-action {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 8px 16px;
                    border-radius: 40px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                }

                .contact-card:not(.highlight) .contact-action {
                    color: #FF6B35;
                }

                .contact-card.highlight .contact-action {
                    background: white;
                    color: #FF6B35;
                }

                .availability-section {
                    margin-bottom: 48px;
                }

                .availability-section h3 {
                    margin-bottom: 20px;
                }

                .schedule-grid {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 24px;
                }

                .schedule-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .schedule-item:last-child {
                    border-bottom: none;
                }

                .day {
                    font-weight: 600;
                    color: #1e293b;
                }

                .hours {
                    color: #475569;
                }

                .status {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .status.available {
                    background: #d1fae5;
                    color: #065f46;
                }

                .status.limited {
                    background: #fef3c7;
                    color: #92400e;
                }

                .status.closed {
                    background: #fee2e2;
                    color: #b91c1c;
                }

                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin: 20px 0 48px;
                }

                .team-member {
                    text-align: center;
                }

                .member-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                }

                .member-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .online .status-dot {
                    background: #10b981;
                }

                .offline .status-dot {
                    background: #94a3b8;
                }

                .busy .status-dot {
                    background: #f97316;
                }

                .address-section {
                    display: flex;
                    gap: 20px;
                    padding: 24px;
                    background: #f8fafc;
                    border-radius: 16px;
                }

                /* Ticket */
                .ticket-container {
                    background: white;
                    border-radius: 24px;
                    padding: 40px;
                }

                .ticket-container h2 {
                    font-size: 28px;
                    color: #003D82;
                    margin: 0 0 8px 0;
                }

                .ticket-subtitle {
                    color: #64748b;
                    margin-bottom: 32px;
                }

                .ticket-form {
                    max-width: 800px;
                }

                .form-group {
                    margin-bottom: 32px;
                }

                .form-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 12px;
                }

                .category-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .category-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px;
                    background: #f8fafc;
                    border: 2px solid transparent;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .category-option:hover {
                    border-color: #FF6B35;
                }

                .category-option.selected {
                    border-color: #FF6B35;
                    background: #fff7ed;
                }

                .category-option input[type="radio"] {
                    display: none;
                }

                .category-option .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                }

                .form-group input[type="text"],
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 14px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 15px;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #FF6B35;
                    box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
                }

                .file-upload-area {
                    border: 2px dashed #e2e8f0;
                    border-radius: 12px;
                    padding: 32px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .file-upload-area:hover {
                    border-color: #FF6B35;
                    background: #fff7ed;
                }

                .file-upload-area .material-symbols-outlined {
                    font-size: 40px;
                    color: #FF6B35;
                    margin-bottom: 8px;
                }

                .file-hint {
                    font-size: 12px;
                    color: #64748b;
                    margin-top: 8px;
                }

                .file-list {
                    margin-top: 16px;
                }

                .file-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: #f8fafc;
                    border-radius: 8px;
                    margin-bottom: 8px;
                }

                .file-name {
                    flex: 1;
                    font-size: 13px;
                }

                .file-size {
                    color: #64748b;
                    font-size: 12px;
                }

                .file-remove {
                    cursor: pointer;
                    color: #ef4444;
                }

                .priority-options {
                    display: flex;
                    gap: 16px;
                }

                .priority-option {
                    flex: 1;
                    padding: 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                }

                .priority-option.low { border-left: 4px solid #10b981; }
                .priority-option.medium { border-left: 4px solid #f59e0b; }
                .priority-option.high { border-left: 4px solid #ef4444; }

                .priority-option input[type="radio"] {
                    display: none;
                }

                .priority-option span {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .system-info {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 16px;
                    margin: 32px 0;
                }

                .system-info-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }

                .system-info-header .expand {
                    margin-left: auto;
                }

                .system-info-content {
                    display: none;
                    padding: 16px 0 0;
                }

                .system-info-content.expanded {
                    display: block;
                }

                .system-info-content pre {
                    background: #1e293b;
                    color: #e2e8f0;
                    padding: 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    overflow-x: auto;
                }

                .form-actions {
                    display: flex;
                    gap: 16px;
                    justify-content: flex-end;
                }

                .btn-cancel,
                .btn-submit {
                    padding: 14px 28px;
                    border: none;
                    border-radius: 40px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .btn-cancel {
                    background: #f1f5f9;
                    color: #475569;
                }

                .btn-submit {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #FF6B35;
                    color: white;
                }

                .recent-tickets {
                    margin-top: 48px;
                    padding-top: 32px;
                    border-top: 1px solid #e2e8f0;
                }

                .tickets-list {
                    margin-top: 20px;
                }

                .ticket-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                    margin-bottom: 12px;
                }

                .ticket-status {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .ticket-status.status-resolved { background: #10b981; }
                .ticket-status.status-progress { background: #f59e0b; }

                .ticket-info {
                    flex: 1;
                }

                .ticket-id {
                    font-weight: 600;
                    color: #003D82;
                    margin-right: 12px;
                }

                .ticket-badge {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                }

                .ticket-badge.resolved {
                    background: #d1fae5;
                    color: #065f46;
                }

                .ticket-badge.progress {
                    background: #fef3c7;
                    color: #92400e;
                }

                /* Chat flottant */
                .chat-button {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 24px;
                    background: #FF6B35;
                    color: white;
                    border: none;
                    border-radius: 60px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 8px 20px rgba(255,107,53,0.4);
                    transition: all 0.3s;
                }

                .chat-button:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 28px rgba(255,107,53,0.5);
                }

                .chat-notification {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 24px;
                    height: 24px;
                    background: #ef4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                    border: 2px solid white;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .guides-grid,
                    .videos-grid,
                    .contact-grid,
                    .team-grid,
                    .category-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .priority-options {
                        flex-direction: column;
                    }
                }

                @media (max-width: 768px) {
                    .support-wrapper {
                        padding: 16px;
                    }

                    .header-content h1 {
                        font-size: 28px;
                        padding: 16px 24px;
                    }

                    .support-tabs {
                        flex-direction: column;
                        border-radius: 24px;
                    }

                    .guides-grid,
                    .videos-grid,
                    .contact-grid,
                    .team-grid,
                    .category-grid {
                        grid-template-columns: 1fr;
                    }

                    .schedule-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }

                    .chat-text {
                        display: none;
                    }

                    .chat-button {
                        padding: 16px;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.Support = pages.Support;