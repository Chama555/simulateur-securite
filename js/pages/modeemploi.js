/**
 * PAGES/MODE_EMPLOI.JS - Page de mode d'emploi simplifié
 * Guide pas à pas pour les utilisateurs
 */

pages.ModeEmploi = {
    activeStep: 1,
    totalSteps: 6,

    async render() {
        return `
            <div class="mode-emploi-wrapper">
                <!-- En-tête -->
                <header class="mode-emploi-header">
                    <div class="header-content">
                        <h1>
                            <span class="material-symbols-outlined">school</span>
                            Mode d'emploi
                        </h1>
                        <p class="header-subtitle">Guide pas à pas pour utiliser le simulateur de sécurité CDG 2026</p>
                    </div>
                </header>

                <!-- Barre de progression -->
                <div class="progress-container">
                    <div class="progress-steps">
                        ${[1, 2, 3, 4, 5, 6].map(step => `
                            <div class="progress-step ${step === this.activeStep ? 'active' : ''} ${step < this.activeStep ? 'completed' : ''}" onclick="pages.ModeEmploi.goToStep(${step})">
                                <div class="step-indicator">
                                    ${step < this.activeStep ? '<span class="material-symbols-outlined">check</span>' : step}
                                </div>
                                <span class="step-label">${this.getStepLabel(step)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Contenu principal -->
                <main class="mode-emploi-main">
                    ${this.renderCurrentStep()}
                </main>

                <!-- Navigation entre étapes -->
                <div class="step-navigation">
                    <button class="nav-btn prev" onclick="pages.ModeEmploi.prevStep()" ${this.activeStep === 1 ? 'disabled' : ''}>
                        <span class="material-symbols-outlined">arrow_back</span>
                        Étape précédente
                    </button>
                    
                    <div class="step-dots">
                        ${[1, 2, 3, 4, 5, 6].map(step => `
                            <span class="dot ${step === this.activeStep ? 'active' : ''}" onclick="pages.ModeEmploi.goToStep(${step})"></span>
                        `).join('')}
                    </div>
                    
                    <button class="nav-btn next" onclick="pages.ModeEmploi.nextStep()" ${this.activeStep === 6 ? 'disabled' : ''}>
                        Étape suivante
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                <!-- Actions rapides -->
                <div class="quick-actions">
                    <h3>Actions rapides</h3>
                    <div class="actions-grid">
                        <a href="#/explorer" class="action-card">
                            <span class="material-symbols-outlined">explore</span>
                            <span>Explorer les pistes</span>
                        </a>
                        <a href="#/simulateur" class="action-card">
                            <span class="material-symbols-outlined">auto_awesome</span>
                            <span>Lancer une simulation</span>
                        </a>
                        <a href="#/problematique" class="action-card">
                            <span class="material-symbols-outlined">info</span>
                            <span>Comprendre le contexte</span>
                        </a>
                        <a href="#/documentation" class="action-card">
                            <span class="material-symbols-outlined">menu_book</span>
                            <span>Documentation complète</span>
                        </a>
                    </div>
                </div>
            </div>

            ${this.getStyles()}
        `;
    },

    getStepLabel(step) {
        const labels = {
            1: 'Découvrir',
            2: 'Explorer',
            3: 'Simuler',
            4: 'Comparer',
            5: 'Décider',
            6: 'Exporter'
        };
        return labels[step] || `Étape ${step}`;
    },

    renderCurrentStep() {
        switch(this.activeStep) {
            case 1:
                return this.renderStep1();
            case 2:
                return this.renderStep2();
            case 3:
                return this.renderStep3();
            case 4:
                return this.renderStep4();
            case 5:
                return this.renderStep5();
            case 6:
                return this.renderStep6();
            default:
                return this.renderStep1();
        }
    },

    renderStep1() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 1/6</span>
                    <h2>Découvrir le contexte</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            Avant de commencer, prenez quelques minutes pour comprendre le contexte 
                            et les enjeux du projet de sécurité en piste.
                        </p>

                        <div class="info-box">
                            <span class="material-symbols-outlined">info</span>
                            <div>
                                <h4>Pourquoi c'est important ?</h4>
                                <p>Comprendre la situation actuelle vous aidera à mieux évaluer la pertinence des différentes pistes d'amélioration.</p>
                            </div>
                        </div>

                        <h3>Ce que vous allez apprendre</h3>
                        <ul class="check-list">
                            <li>
                                <span class="material-symbols-outlined">check_circle</span>
                                L'augmentation critique des accidents (+100% en 2024-2025)
                            </li>
                            <li>
                                <span class="material-symbols-outlined">check_circle</span>
                                Les causes principales : renouvellement des effectifs, nouveaux comportements
                            </li>
                            <li>
                                <span class="material-symbols-outlined">check_circle</span>
                                Les objectifs du projet : zéro accident corporel d'ici 2028
                            </li>
                        </ul>
                    </div>

                    <div class="step-visual">
                        <div class="visual-card">
                            <span class="material-symbols-outlined">warning</span>
                            <h4>Urgence sécuritaire</h4>
                            <p>+100% d'accidents corporels</p>
                        </div>
                        <div class="visual-card">
                            <span class="material-symbols-outlined">groups</span>
                            <h4>Renouvellement</h4>
                            <p>40% d'embauches récentes</p>
                        </div>
                        <div class="visual-card">
                            <span class="material-symbols-outlined">flag</span>
                            <h4>Objectif</h4>
                            <p>Zéro accident en 2028</p>
                        </div>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/problematique" class="btn-primary">
                        Voir la problématique détaillée
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="tip-box">
                    <span class="material-symbols-outlined">lightbulb</span>
                    <p>La page "Problématique" contient toutes les informations détaillées sur le contexte et les enjeux.</p>
                </div>
            </div>
        `;
    },

    renderStep2() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 2/6</span>
                    <h2>Explorer les pistes</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            Consultez l'inventaire complet des 61 pistes d'amélioration. Utilisez les filtres 
                            pour trouver rapidement celles qui vous intéressent.
                        </p>

                        <h3>Comment faire ?</h3>
                        
                        <div class="instruction-step">
                            <div class="instruction-number">1</div>
                            <div class="instruction-text">
                                <strong>Filtrez par catégorie</strong>
                                <p>Dans le panneau de gauche, cochez les catégories qui vous intéressent : Humain, Technique, Organisationnel...</p>
                            </div>
                        </div>

                        <div class="instruction-step">
                            <div class="instruction-number">2</div>
                            <div class="instruction-text">
                                <strong>Filtrez par priorité</strong>
                                <p>Sélectionnez les niveaux de priorité (P1 à P4) pour voir les actions critiques en premier.</p>
                            </div>
                        </div>

                        <div class="instruction-step">
                            <div class="instruction-number">3</div>
                            <div class="instruction-text">
                                <strong>Utilisez la recherche</strong>
                                <p>Tapez un mot-clé ou un ID de piste dans la barre de recherche.</p>
                            </div>
                        </div>

                        <div class="instruction-step">
                            <div class="instruction-number">4</div>
                            <div class="instruction-text">
                                <strong>Ajustez le budget</strong>
                                <p>Utilisez le curseur pour définir un budget maximum et voir les pistes abordables.</p>
                            </div>
                        </div>
                    </div>

                    <div class="step-visual">
                        <div class="demo-card">
                            <div class="demo-header">
                                <span class="demo-badge">P1</span>
                                <span class="demo-category">Technique</span>
                            </div>
                            <h4>Éthylotests connectés</h4>
                            <div class="demo-meta">
                                <span>Budget: 285k€</span>
                                <span>Impact: 85/100</span>
                            </div>
                        </div>
                        
                        <div class="demo-card">
                            <div class="demo-header">
                                <span class="demo-badge">P2</span>
                                <span class="demo-category">Humain</span>
                            </div>
                            <h4>Formation VR</h4>
                            <div class="demo-meta">
                                <span>Budget: 150k€</span>
                                <span>Impact: 78/100</span>
                            </div>
                        </div>

                        <div class="filter-preview">
                            <span class="material-symbols-outlined">filter_alt</span>
                            <span>Filtres actifs: Technique, P1, Budget < 500k€</span>
                        </div>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/explorer" class="btn-primary">
                        Aller dans Explorer
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="tip-box">
                    <span class="material-symbols-outlined">star</span>
                    <p>Vous pouvez noter les pistes avec les étoiles pour marquer vos préférées. Les notes sont sauvegardées automatiquement.</p>
                </div>
            </div>
        `;
    },

    renderStep3() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 3/6</span>
                    <h2>Lancer une simulation</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            Le simulateur vous aide à trouver la meilleure combinaison de pistes selon vos contraintes.
                        </p>

                        <h3>Définissez vos contraintes</h3>

                        <div class="constraint-demo">
                            <div class="constraint-item">
                                <span class="material-symbols-outlined">payments</span>
                                <div class="constraint-detail">
                                    <strong>Budget maximum</strong>
                                    <div class="slider-preview">
                                        <div class="slider-track">
                                            <div class="slider-fill" style="width: 60%"></div>
                                        </div>
                                        <span>1,2 M€</span>
                                    </div>
                                </div>
                            </div>

                            <div class="constraint-item">
                                <span class="material-symbols-outlined">donut_large</span>
                                <div class="constraint-detail">
                                    <strong>Dimensions</strong>
                                    <div class="dimensions-mini">
                                        <span class="dim-dot" style="background: #FF6B35"></span> Culture 20%
                                        <span class="dim-dot" style="background: #003D82"></span> Tech 30%
                                    </div>
                                </div>
                            </div>

                            <div class="constraint-item">
                                <span class="material-symbols-outlined">schedule</span>
                                <div class="constraint-detail">
                                    <strong>Durée maximum</strong>
                                    <span>24 mois</span>
                                </div>
                            </div>
                        </div>

                        <h3>Choisissez un mode d'optimisation</h3>
                        
                        <div class="mode-selector-preview">
                            <div class="mode-option active">
                                <strong>Pondéré</strong>
                                <small>Combine toutes les contraintes</small>
                            </div>
                            <div class="mode-option">
                                <strong>Pareto</strong>
                                <small>Meilleurs compromis</small>
                            </div>
                            <div class="mode-option">
                                <strong>Budget d'abord</strong>
                                <small>Maximise l'impact</small>
                            </div>
                        </div>
                    </div>

                    <div class="step-visual">
                        <div class="result-preview">
                            <h4>Résultat simulation</h4>
                            <div class="result-stats">
                                <div>Budget: 1,05 M€</div>
                                <div>Impact: 82/100</div>
                                <div>Pistes: 5 sélectionnées</div>
                            </div>
                            <div class="result-list">
                                <div>P001 - Éthylotests connectés</div>
                                <div>P023 - Formation VR</div>
                                <div>P045 - Rotation des zones</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/simulateur" class="btn-primary">
                        Lancer une simulation
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="tip-box">
                    <span class="material-symbols-outlined">tips_and_updates</span>
                    <p>Essayez différents modes d'optimisation pour voir des résultats complémentaires. Le mode Pareto est idéal pour explorer les compromis.</p>
                </div>
            </div>
        `;
    },

    renderStep4() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 4/6</span>
                    <h2>Comparer les scénarios</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            Comparez plusieurs scénarios côte à côte pour identifier la meilleure stratégie.
                        </p>

                        <h3>Visualisation comparative</h3>

                        <div class="comparison-preview">
                            <div class="scenario-preview">
                                <h4>Scénario A - Quick Wins</h4>
                                <div class="radar-mini">
                                    <div class="radar-line" style="transform: rotate(0deg) scale(0.8)"></div>
                                    <div class="radar-line" style="transform: rotate(72deg) scale(0.6)"></div>
                                    <div class="radar-line" style="transform: rotate(144deg) scale(0.9)"></div>
                                    <div class="radar-line" style="transform: rotate(216deg) scale(0.7)"></div>
                                    <div class="radar-line" style="transform: rotate(288deg) scale(0.5)"></div>
                                </div>
                                <div class="scenario-stats">
                                    <span>Budget: 850k€</span>
                                    <span>Impact: 78/100</span>
                                </div>
                            </div>

                            <div class="scenario-preview">
                                <h4>Scénario B - Équilibré</h4>
                                <div class="radar-mini">
                                    <div class="radar-line" style="transform: rotate(0deg) scale(0.7)"></div>
                                    <div class="radar-line" style="transform: rotate(72deg) scale(0.8)"></div>
                                    <div class="radar-line" style="transform: rotate(144deg) scale(0.7)"></div>
                                    <div class="radar-line" style="transform: rotate(216deg) scale(0.8)"></div>
                                    <div class="radar-line" style="transform: rotate(288deg) scale(0.6)"></div>
                                </div>
                                <div class="scenario-stats">
                                    <span>Budget: 1,2M€</span>
                                    <span>Impact: 85/100</span>
                                </div>
                            </div>
                        </div>

                        <h3>Tableau de scoring</h3>
                        <table class="mini-table">
                            <tr>
                                <th>Métrique</th>
                                <th>Scénario A</th>
                                <th>Scénario B</th>
                            </tr>
                            <tr>
                                <td>Budget total</td>
                                <td>850k€</td>
                                <td class="best">1,2M€</td>
                            </tr>
                            <tr>
                                <td>Impact moyen</td>
                                <td>78</td>
                                <td class="best">85</td>
                            </tr>
                            <tr>
                                <td>Accidents évités</td>
                                <td>12/an</td>
                                <td class="best">18/an</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/compare" class="btn-primary">
                        Aller dans Comparaison
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="tip-box">
                    <span class="material-symbols-outlined">visibility</span>
                    <p>Les radars vous montrent l'équilibre entre les 5 dimensions. Un radar équilibré indique une couverture complète.</p>
                </div>
            </div>
        `;
    },

    renderStep5() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 5/6</span>
                    <h2>Prendre une décision</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            La page de décision présente votre plan d'action final avec tous les détails nécessaires à la validation.
                        </p>

                        <h3>Ce que vous trouverez</h3>

                        <div class="decision-features">
                            <div class="feature-preview">
                                <span class="material-symbols-outlined">payments</span>
                                <div>
                                    <strong>Résumé financier</strong>
                                    <p>Budget total, répartition Capex/Opex</p>
                                </div>
                            </div>

                            <div class="feature-preview">
                                <span class="material-symbols-outlined">analytics</span>
                                <div>
                                    <strong>Indicateurs d'impact</strong>
                                    <p>Accidents évités, économies, ROI</p>
                                </div>
                            </div>

                            <div class="feature-preview">
                                <span class="material-symbols-outlined">donut_large</span>
                                <div>
                                    <strong>Dimensions</strong>
                                    <p>Distribution sur les 5 axes</p>
                                </div>
                            </div>

                            <div class="feature-preview">
                                <span class="material-symbols-outlined">list_alt</span>
                                <div>
                                    <strong>Détail des pistes</strong>
                                    <p>Liste complète avec métriques</p>
                                </div>
                            </div>
                        </div>

                        <div class="validation-note-preview">
                            <h4>Note de validation</h4>
                            <p>Ce plan inclut une marge de contingence de 10% et a été validé par l'équipe sécurité.</p>
                            <div class="signature-line">
                                <span>Validé par : _________________</span>
                                <span>Date : _________________</span>
                            </div>
                        </div>
                    </div>

                    <div class="step-visual">
                        <div class="kpi-preview">
                            <div class="kpi-item">
                                <span class="kpi-label">Budget total</span>
                                <span class="kpi-value">1,45 M€</span>
                            </div>
                            <div class="kpi-item">
                                <span class="kpi-label">Impact moyen</span>
                                <span class="kpi-value">82/100</span>
                            </div>
                            <div class="kpi-item">
                                <span class="kpi-label">Accidents évités</span>
                                <span class="kpi-value">24/an</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/decide" class="btn-primary">
                        Aller dans Décision
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="tip-box">
                    <span class="material-symbols-outlined">check_circle</span>
                    <p>Vérifiez bien tous les détails avant de passer à l'export. Vous pouvez encore ajuster votre sélection.</p>
                </div>
            </div>
        `;
    },

    renderStep6() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <span class="step-badge">Étape 6/6</span>
                    <h2>Exporter et partager</h2>
                </div>

                <div class="step-body">
                    <div class="step-description">
                        <p class="step-intro">
                            Exportez votre plan d'action au format de votre choix pour le partager avec les parties prenantes.
                        </p>

                        <h3>Formats disponibles</h3>

                        <div class="export-options">
                            <div class="export-card">
                                <span class="material-symbols-outlined">picture_as_pdf</span>
                                <h4>PDF</h4>
                                <p>Document professionnel formaté, idéal pour impression et présentation</p>
                                <ul>
                                    <li>✓ Mise en page optimisée</li>
                                    <li>✓ Tableaux et graphiques</li>
                                    <li>✓ Espace pour signature</li>
                                </ul>
                            </div>

                            <div class="export-card">
                                <span class="material-symbols-outlined">data_usage</span>
                                <h4>JSON</h4>
                                <p>Données brutes pour analyse externe ou intégration</p>
                                <ul>
                                    <li>✓ Format structuré</li>
                                    <li>✓ Compatible avec d'autres outils</li>
                                    <li>✓ Données complètes</li>
                                </ul>
                            </div>
                        </div>

                        <h3>Exemple de PDF généré</h3>
                        <div class="pdf-preview">
                            <div class="pdf-header">
                                <span>CDG 2026 - Plan d'action sécurité</span>
                                <span>24/02/2026</span>
                            </div>
                            <div class="pdf-content">
                                <div class="pdf-section">
                                    <strong>Résumé exécutif</strong>
                                    <p>Plan d'action comprenant 8 pistes pour un budget total de 1,45 M€...</p>
                                </div>
                                <div class="pdf-section">
                                    <strong>Pistes sélectionnées</strong>
                                    <div>P001 - Éthylotests connectés</div>
                                    <div>P023 - Formation VR</div>
                                    <div>P045 - Rotation des zones</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="step-visual">
                        <div class="export-icons">
                            <span class="material-symbols-outlined">file_download</span>
                            <span class="material-symbols-outlined">print</span>
                            <span class="material-symbols-outlined">share</span>
                        </div>
                        <p class="export-note">Les exports sont conformes aux standards de reporting CSCA</p>
                    </div>
                </div>

                <div class="step-action">
                    <a href="#/decide" class="btn-primary">
                        Exporter mon plan
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>

                <div class="success-box">
                    <span class="material-symbols-outlined">celebration</span>
                    <div>
                        <h4>Félicitations !</h4>
                        <p>Vous savez maintenant utiliser toutes les fonctionnalités du simulateur CDG 2026.</p>
                    </div>
                </div>
            </div>
        `;
    },

    goToStep(step) {
        this.activeStep = step;
        this.rerender();
    },

    nextStep() {
        if (this.activeStep < this.totalSteps) {
            this.activeStep++;
            this.rerender();
        }
    },

    prevStep() {
        if (this.activeStep > 1) {
            this.activeStep--;
            this.rerender();
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
                .mode-emploi-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    font-family: 'Inter', sans-serif;
                    padding: 32px;
                }

                .mode-emploi-header {
                    text-align: center;
                    margin-bottom: 48px;
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
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* Barre de progression */
                .progress-container {
                    max-width: 900px;
                    margin: 0 auto 48px;
                    background: white;
                    border-radius: 60px;
                    padding: 24px 32px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    position: relative;
                    flex: 1;
                }

                .progress-step:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: 20px;
                    right: -50%;
                    width: 100%;
                    height: 2px;
                    background: #e2e8f0;
                    z-index: 1;
                }

                .progress-step.completed:not(:last-child)::after {
                    background: #10b981;
                }

                .step-indicator {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: white;
                    border: 2px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #64748b;
                    position: relative;
                    z-index: 2;
                    transition: all 0.3s;
                }

                .progress-step.active .step-indicator {
                    background: #FF6B35;
                    border-color: #FF6B35;
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(255,107,53,0.3);
                }

                .progress-step.completed .step-indicator {
                    background: #10b981;
                    border-color: #10b981;
                    color: white;
                }

                .step-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                }

                .progress-step.active .step-label {
                    color: #FF6B35;
                    font-weight: 700;
                }

                /* Contenu principal */
                .mode-emploi-main {
                    max-width: 1000px;
                    margin: 0 auto 32px;
                    background: white;
                    border-radius: 24px;
                    padding: 48px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }

                .step-header {
                    margin-bottom: 32px;
                }

                .step-badge {
                    display: inline-block;
                    background: #f1f5f9;
                    color: #475569;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .step-header h2 {
                    font-size: 32px;
                    font-weight: 700;
                    color: #003D82;
                    margin: 0;
                }

                .step-body {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 40px;
                    margin-bottom: 32px;
                }

                .step-intro {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #334155;
                    margin-bottom: 24px;
                }

                h3 {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 24px 0 16px 0;
                }

                .info-box {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 20px;
                    background: #dbeafe;
                    border-radius: 12px;
                    margin-bottom: 24px;
                }

                .info-box .material-symbols-outlined {
                    color: #2563eb;
                    font-size: 24px;
                }

                .info-box h4 {
                    color: #1e40af;
                    margin: 0 0 4px 0;
                }

                .info-box p {
                    color: #1e3a8a;
                    margin: 0;
                }

                .check-list {
                    list-style: none;
                    padding: 0;
                }

                .check-list li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 0;
                    color: #475569;
                }

                .check-list .material-symbols-outlined {
                    color: #10b981;
                }

                .instruction-step {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 20px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                }

                .instruction-number {
                    width: 32px;
                    height: 32px;
                    background: #FF6B35;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .instruction-text {
                    flex: 1;
                }

                .instruction-text strong {
                    display: block;
                    margin-bottom: 4px;
                    color: #1e293b;
                }

                .instruction-text p {
                    margin: 0;
                    color: #64748b;
                    font-size: 14px;
                }

                .step-visual {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 24px;
                }

                .visual-card {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 16px;
                }

                .visual-card .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                    margin-bottom: 8px;
                }

                .visual-card h4 {
                    margin: 0 0 4px 0;
                    color: #1e293b;
                }

                .visual-card p {
                    color: #64748b;
                    margin: 0;
                }

                .demo-card {
                    background: white;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 12px;
                    border-left: 3px solid #FF6B35;
                }

                .demo-header {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 8px;
                }

                .demo-badge {
                    background: #fee2e2;
                    color: #dc2626;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .demo-category {
                    color: #64748b;
                    font-size: 11px;
                }

                .demo-meta {
                    display: flex;
                    gap: 12px;
                    font-size: 12px;
                    color: #475569;
                }

                .filter-preview {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px;
                    background: #f1f5f9;
                    border-radius: 8px;
                    font-size: 13px;
                    color: #475569;
                }

                .constraint-demo {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 24px;
                }

                .constraint-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .constraint-item:last-child {
                    border-bottom: none;
                }

                .constraint-item .material-symbols-outlined {
                    color: #FF6B35;
                }

                .constraint-detail {
                    flex: 1;
                }

                .slider-preview {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .slider-track {
                    flex: 1;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    position: relative;
                }

                .slider-fill {
                    height: 100%;
                    background: #FF6B35;
                    border-radius: 3px;
                }

                .dimensions-mini {
                    display: flex;
                    gap: 8px;
                    font-size: 12px;
                }

                .dim-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 4px;
                }

                .mode-selector-preview {
                    display: flex;
                    gap: 8px;
                    margin: 16px 0;
                }

                .mode-option {
                    flex: 1;
                    padding: 12px;
                    background: #f1f5f9;
                    border-radius: 8px;
                    text-align: center;
                    cursor: pointer;
                }

                .mode-option.active {
                    background: #FF6B35;
                    color: white;
                }

                .mode-option small {
                    display: block;
                    font-size: 10px;
                    margin-top: 4px;
                }

                .result-preview {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                }

                .result-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin: 12px 0;
                    padding: 12px 0;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .result-list {
                    font-size: 13px;
                    color: #475569;
                }

                .result-list div {
                    padding: 4px 0;
                }

                .comparison-preview {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin: 20px 0;
                }

                .scenario-preview {
                    background: #f8fafc;
                    padding: 16px;
                    border-radius: 12px;
                }

                .radar-mini {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 16px;
                }

                .radar-line {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 2px;
                    height: 50%;
                    background: #FF6B35;
                    transform-origin: top;
                }

                .scenario-stats {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #475569;
                }

                .mini-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: #f8fafc;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .mini-table th {
                    background: #e2e8f0;
                    padding: 8px;
                    font-size: 12px;
                }

                .mini-table td {
                    padding: 8px;
                    border-bottom: 1px solid #cbd5e1;
                }

                .best {
                    font-weight: 700;
                    color: #10b981;
                }

                .decision-features {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin: 20px 0;
                }

                .feature-preview {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 8px;
                }

                .feature-preview .material-symbols-outlined {
                    color: #FF6B35;
                }

                .validation-note-preview {
                    background: #f1f5f9;
                    padding: 20px;
                    border-radius: 8px;
                    border-left: 4px solid #003D82;
                }

                .signature-line {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    font-size: 14px;
                }

                .kpi-preview {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                }

                .kpi-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #f1f5f9;
                }

                .kpi-label {
                    color: #64748b;
                }

                .kpi-value {
                    font-weight: 700;
                    color: #003D82;
                }

                .export-options {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin: 24px 0;
                }

                .export-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 24px;
                    transition: all 0.3s;
                }

                .export-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                }

                .export-card .material-symbols-outlined {
                    font-size: 40px;
                    color: #FF6B35;
                    margin-bottom: 12px;
                }

                .export-card h4 {
                    margin: 0 0 8px 0;
                }

                .export-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 16px 0 0;
                }

                .export-card li {
                    padding: 4px 0;
                    color: #475569;
                    font-size: 13px;
                }

                .pdf-preview {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    overflow: hidden;
                    margin: 20px 0;
                }

                .pdf-header {
                    background: #003D82;
                    color: white;
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                }

                .pdf-content {
                    padding: 20px;
                }

                .pdf-section {
                    margin-bottom: 16px;
                }

                .export-icons {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    margin: 24px 0;
                }

                .export-icons .material-symbols-outlined {
                    font-size: 48px;
                    color: #003D82;
                }

                .export-note {
                    text-align: center;
                    color: #64748b;
                    font-style: italic;
                }

                .step-action {
                    text-align: center;
                    margin: 32px 0;
                }

                .btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 32px;
                    background: #FF6B35;
                    color: white;
                    border: none;
                    border-radius: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(255,107,53,0.3);
                }

                .btn-primary:hover {
                    background: #e55a2b;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255,107,53,0.4);
                }

                .tip-box {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 20px;
                    background: #fef3c7;
                    border-radius: 12px;
                }

                .tip-box .material-symbols-outlined {
                    color: #d97706;
                    font-size: 24px;
                }

                .tip-box p {
                    color: #92400e;
                    margin: 0;
                }

                .success-box {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 24px;
                    background: #d1fae5;
                    border-radius: 16px;
                    margin-top: 32px;
                }

                .success-box .material-symbols-outlined {
                    font-size: 40px;
                    color: #059669;
                }

                .success-box h4 {
                    color: #065f46;
                    margin: 0 0 4px 0;
                }

                .success-box p {
                    color: #047857;
                    margin: 0;
                }

                /* Navigation entre étapes */
                .step-navigation {
                    max-width: 600px;
                    margin: 0 auto 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border: none;
                    background: white;
                    border-radius: 40px;
                    font-weight: 600;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .nav-btn:hover:not(:disabled) {
                    background: #FF6B35;
                    color: white;
                }

                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .step-dots {
                    display: flex;
                    gap: 8px;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #cbd5e1;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .dot.active {
                    background: #FF6B35;
                    transform: scale(1.3);
                }

                /* Actions rapides */
                .quick-actions {
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .quick-actions h3 {
                    text-align: center;
                    margin-bottom: 24px;
                }

                .actions-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }

                .action-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    padding: 24px;
                    background: white;
                    border-radius: 16px;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s;
                }

                .action-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
                    background: #FF6B35;
                    color: white;
                }

                .action-card .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                }

                .action-card:hover .material-symbols-outlined {
                    color: white;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .mode-emploi-wrapper {
                        padding: 16px;
                    }

                    .header-content h1 {
                        font-size: 28px;
                        padding: 16px 24px;
                    }

                    .progress-steps {
                        flex-direction: column;
                        gap: 16px;
                    }

                    .progress-step:not(:last-child)::after {
                        display: none;
                    }

                    .step-body {
                        grid-template-columns: 1fr;
                    }

                    .step-navigation {
                        flex-direction: column;
                        gap: 16px;
                    }

                    .actions-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .export-options,
                    .decision-features,
                    .comparison-preview {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.ModeEmploi = pages.ModeEmploi;