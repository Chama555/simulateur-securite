/**
 * PAGES/SIMULATEUR.JS - Page d'aide à la sélection de pistes
 * L'utilisateur définit des contraintes et obtient une combinaison optimale
 */

pages.Simulateur = {
    // Contraintes utilisateur
    constraints: {
        budget: {
            enabled: false,
            value: 1000000, // 1M€ par défaut
            max: 5000000     // 5M€ max
        },
        dimensions: {
            enabled: false,
            culture: 20,
            technique: 20,
            humain: 20,
            organisationnel: 20,
            economique: 20
        },
        duree: {
            enabled: false,
            value: 12,       // 12 mois par défaut
            max: 60          // 60 mois max
        },
        reductionAccidents: {
            enabled: false,
            value: 20,       // 20% par défaut
            max: 100
        }
    },

    // Résultats de simulation
    results: {
        selectedPistes: [],
        totalBudget: 0,
        totalImpact: 0,
        averageDuree: 0,
        totalReduction: 0,
        dimensionScores: {
            culture: 0,
            technique: 0,
            humain: 0,
            organisationnel: 0,
            economique: 0
        },
        paretoFront: [] // Front de Pareto pour les visualisations
    },

    activeTab: 'contraintes', // contraintes, resultats, comparaison
    optimizationMode: 'weighted', // weighted, pareto, budget_first

    async render() {
        const state = appStore ? appStore.getState() : {};
        const allPistes = state.allPistes || [];

        return `
            <div class="simulateur-wrapper">
                <!-- Header avec titre et description -->
                <header class="simulateur-header">
                    <div class="header-content">
                        <h1>
                            <span class="material-symbols-outlined">auto_awesome</span>
                            Simulateur de sélection de pistes
                        </h1>
                        <p class="header-description">
                            Définissez vos contraintes budgétaires, temporelles et stratégiques pour obtenir 
                            une combinaison optimale de pistes de sécurité.
                        </p>
                    </div>
                    <div class="header-actions">
                        <button class="btn-reset" onclick="pages.Simulateur.resetConstraints()">
                            <span class="material-symbols-outlined">refresh</span>
                            Réinitialiser
                        </button>
                        <button class="btn-simulate" onclick="pages.Simulateur.runSimulation()">
                            <span class="material-symbols-outlined">play_arrow</span>
                            Lancer la simulation
                        </button>
                    </div>
                </header>

                <!-- Navigation par onglets -->
                <div class="simulateur-tabs">
                    <button class="tab-btn ${this.activeTab === 'contraintes' ? 'active' : ''}" onclick="pages.Simulateur.setActiveTab('contraintes')">
                        <span class="material-symbols-outlined">tune</span>
                        Contraintes
                    </button>
                    <button class="tab-btn ${this.activeTab === 'resultats' ? 'active' : ''}" onclick="pages.Simulateur.setActiveTab('resultats')">
                        <span class="material-symbols-outlined">format_list_bulleted</span>
                        Résultats
                    </button>
                    <button class="tab-btn ${this.activeTab === 'comparaison' ? 'active' : ''}" onclick="pages.Simulateur.setActiveTab('comparaison')">
                        <span class="material-symbols-outlined">compare_arrows</span>
                        Comparaison
                    </button>
                </div>

                <!-- Contenu principal -->
                <main class="simulateur-main">
                    ${this.activeTab === 'contraintes' ? this.renderConstraintsTab(allPistes) : ''}
                    ${this.activeTab === 'resultats' ? this.renderResultsTab() : ''}
                    ${this.activeTab === 'comparaison' ? this.renderComparaisonTab() : ''}
                </main>
            </div>

            ${this.getStyles()}
        `;
    },

    renderConstraintsTab(allPistes) {
        // Statistiques globales pour aider l'utilisateur
        const stats = this.calculateStats(allPistes);
        
        return `
            <div class="constraints-container">
                <!-- Section Budget -->
                <div class="constraint-card">
                    <div class="constraint-header">
                        <div class="constraint-title">
                            <span class="material-symbols-outlined">payments</span>
                            <h3>Contrainte budgétaire</h3>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="toggle-budget" ${this.constraints.budget.enabled ? 'checked' : ''} onchange="pages.Simulateur.toggleConstraint('budget')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="constraint-content ${!this.constraints.budget.enabled ? 'disabled' : ''}">
                        <p class="constraint-info">
                            Budget total disponible pour l'ensemble des pistes sélectionnées.
                            <span class="stats-hint">Budget total disponible: ${this.formatCurrency(stats.totalBudget)}</span>
                        </p>
                        
                        <div class="slider-container">
                            <label>Budget maximum (€)</label>
                            <input type="range" 
                                id="budget-slider" 
                                min="0" 
                                max="${this.constraints.budget.max}" 
                                step="100000" 
                                value="${this.constraints.budget.value}"
                                ${!this.constraints.budget.enabled ? 'disabled' : ''}
                                oninput="pages.Simulateur.updateConstraint('budget', 'value', this.value)">
                            <div class="slider-values">
                                <span>0 €</span>
                                <span id="budget-value-display">${this.formatCurrency(this.constraints.budget.value)}</span>
                                <span>${this.formatCurrency(this.constraints.budget.max)}</span>
                            </div>
                        </div>
                        
                        <div class="quick-presets">
                            <button class="preset-btn" onclick="pages.Simulateur.setBudgetPreset(500000)">500k€</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setBudgetPreset(1000000)">1M€</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setBudgetPreset(2000000)">2M€</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setBudgetPreset(5000000)">5M€</button>
                        </div>
                    </div>
                </div>

                <!-- Section Dimensions Balancing -->
                <div class="constraint-card">
                    <div class="constraint-header">
                        <div class="constraint-title">
                            <span class="material-symbols-outlined">donut_large</span>
                            <h3>Dimensions Balancing</h3>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="toggle-dimensions" ${this.constraints.dimensions.enabled ? 'checked' : ''} onchange="pages.Simulateur.toggleConstraint('dimensions')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="constraint-content ${!this.constraints.dimensions.enabled ? 'disabled' : ''}">
                        <p class="constraint-info">
                            Répartissez l'importance relative des différentes dimensions (total = 100%)
                        </p>
                        
                        <div class="dimensions-grid">
                            <div class="dimension-item">
                                <label>CULTURE</label>
                                <div class="dimension-control">
                                    <input type="range" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.culture}" 
                                        id="dim-culture"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        oninput="pages.Simulateur.updateDimension('culture', this.value)">
                                    <input type="number" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.culture}" 
                                        class="dimension-input"
                                        data-dim="culture"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        onchange="pages.Simulateur.updateDimension('culture', this.value)">
                                    <span>%</span>
                                </div>
                            </div>
                            
                            <div class="dimension-item">
                                <label>TECHNIQUE</label>
                                <div class="dimension-control">
                                    <input type="range" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.technique}" 
                                        id="dim-technique"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        oninput="pages.Simulateur.updateDimension('technique', this.value)">
                                    <input type="number" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.technique}" 
                                        class="dimension-input"
                                        data-dim="technique"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        onchange="pages.Simulateur.updateDimension('technique', this.value)">
                                    <span>%</span>
                                </div>
                            </div>
                            
                            <div class="dimension-item">
                                <label>HUMAIN</label>
                                <div class="dimension-control">
                                    <input type="range" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.humain}" 
                                        id="dim-humain"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        oninput="pages.Simulateur.updateDimension('humain', this.value)">
                                    <input type="number" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.humain}" 
                                        class="dimension-input"
                                        data-dim="humain"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        onchange="pages.Simulateur.updateDimension('humain', this.value)">
                                    <span>%</span>
                                </div>
                            </div>
                            
                            <div class="dimension-item">
                                <label>ORGANISATIONNEL</label>
                                <div class="dimension-control">
                                    <input type="range" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.organisationnel}" 
                                        id="dim-organisationnel"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        oninput="pages.Simulateur.updateDimension('organisationnel', this.value)">
                                    <input type="number" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.organisationnel}" 
                                        class="dimension-input"
                                        data-dim="organisationnel"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        onchange="pages.Simulateur.updateDimension('organisationnel', this.value)">
                                    <span>%</span>
                                </div>
                            </div>
                            
                            <div class="dimension-item">
                                <label>ÉCONOMIQUE</label>
                                <div class="dimension-control">
                                    <input type="range" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.economique}" 
                                        id="dim-economique"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        oninput="pages.Simulateur.updateDimension('economique', this.value)">
                                    <input type="number" min="0" max="100" step="5" 
                                        value="${this.constraints.dimensions.economique}" 
                                        class="dimension-input"
                                        data-dim="economique"
                                        ${!this.constraints.dimensions.enabled ? 'disabled' : ''}
                                        onchange="pages.Simulateur.updateDimension('economique', this.value)">
                                    <span>%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dimension-total">
                            <span>Total: </span>
                            <span id="dimension-total" class="${this.calculateDimensionsTotal() !== 100 ? 'warning' : ''}">
                                ${this.calculateDimensionsTotal()}%
                            </span>
                            ${this.calculateDimensionsTotal() !== 100 ? 
                                '<span class="total-hint">Le total doit être égal à 100%</span>' : ''}
                        </div>
                    </div>
                </div>

                <!-- Section Durée -->
                <div class="constraint-card">
                    <div class="constraint-header">
                        <div class="constraint-title">
                            <span class="material-symbols-outlined">schedule</span>
                            <h3>Durée de déploiement</h3>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="toggle-duree" ${this.constraints.duree.enabled ? 'checked' : ''} onchange="pages.Simulateur.toggleConstraint('duree')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="constraint-content ${!this.constraints.duree.enabled ? 'disabled' : ''}">
                        <p class="constraint-info">
                            Durée maximale de déploiement pour l'ensemble des pistes.
                            <span class="stats-hint">Durée moyenne des pistes: ${stats.avgDuree} mois</span>
                        </p>
                        
                        <div class="slider-container">
                            <label>Durée maximum (mois)</label>
                            <input type="range" 
                                id="duree-slider" 
                                min="0" 
                                max="${this.constraints.duree.max}" 
                                step="1" 
                                value="${this.constraints.duree.value}"
                                ${!this.constraints.duree.enabled ? 'disabled' : ''}
                                oninput="pages.Simulateur.updateConstraint('duree', 'value', this.value)">
                            <div class="slider-values">
                                <span>0 mois</span>
                                <span id="duree-value-display">${this.constraints.duree.value} mois</span>
                                <span>${this.constraints.duree.max} mois</span>
                            </div>
                        </div>
                        
                        <div class="quick-presets">
                            <button class="preset-btn" onclick="pages.Simulateur.setDureePreset(6)">6 mois</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setDureePreset(12)">1 an</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setDureePreset(24)">2 ans</button>
                            <button class="preset-btn" onclick="pages.Simulateur.setDureePreset(36)">3 ans</button>
                        </div>
                    </div>
                </div>

                <!-- Section Réduction d'accidents -->
                <div class="constraint-card">
                    <div class="constraint-header">
                        <div class="constraint-title">
                            <span class="material-symbols-outlined">trending_down</span>
                            <h3>Réduction d'accidents</h3>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="toggle-reduction" ${this.constraints.reductionAccidents.enabled ? 'checked' : ''} onchange="pages.Simulateur.toggleConstraint('reductionAccidents')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="constraint-content ${!this.constraints.reductionAccidents.enabled ? 'disabled' : ''}">
                        <p class="constraint-info">
                            Pourcentage minimum de réduction d'accidents souhaité.
                        </p>
                        
                        <div class="slider-container">
                            <label>Réduction minimum (%)</label>
                            <input type="range" 
                                id="reduction-slider" 
                                min="0" 
                                max="100" 
                                step="1" 
                                value="${this.constraints.reductionAccidents.value}"
                                ${!this.constraints.reductionAccidents.enabled ? 'disabled' : ''}
                                oninput="pages.Simulateur.updateConstraint('reductionAccidents', 'value', this.value)">
                            <div class="slider-values">
                                <span>0%</span>
                                <span id="reduction-value-display">${this.constraints.reductionAccidents.value}%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mode d'optimisation -->
                <div class="constraint-card">
                    <div class="constraint-header">
                        <div class="constraint-title">
                            <span class="material-symbols-outlined">tune</span>
                            <h3>Mode d'optimisation</h3>
                        </div>
                    </div>
                    
                    <div class="constraint-content">
                        <div class="optimization-modes">
                            <label class="radio-option">
                                <input type="radio" name="optimization-mode" value="weighted" ${this.optimizationMode === 'weighted' ? 'checked' : ''} onchange="pages.Simulateur.setOptimizationMode('weighted')">
                                <div>
                                    <strong>Pondéré</strong>
                                    <small>Optimise selon un score pondéré combinant toutes les contraintes</small>
                                </div>
                            </label>
                            
                            <label class="radio-option">
                                <input type="radio" name="optimization-mode" value="pareto" ${this.optimizationMode === 'pareto' ? 'checked' : ''} onchange="pages.Simulateur.setOptimizationMode('pareto')">
                                <div>
                                    <strong>Pareto</strong>
                                    <small>Trouve le front de Pareto (meilleurs compromis)</small>
                                </div>
                            </label>
                            
                            <label class="radio-option">
                                <input type="radio" name="optimization-mode" value="budget_first" ${this.optimizationMode === 'budget_first' ? 'checked' : ''} onchange="pages.Simulateur.setOptimizationMode('budget_first')">
                                <div>
                                    <strong>Budget d'abord</strong>
                                    <small>Maximise l'impact dans la limite du budget</small>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Résumé des contraintes -->
                <div class="constraint-summary">
                    <h4>Résumé des contraintes</h4>
                    <div class="summary-items">
                        <div class="summary-item ${!this.constraints.budget.enabled ? 'inactive' : ''}">
                            <span class="summary-label">Budget:</span>
                            <span class="summary-value">${this.constraints.budget.enabled ? this.formatCurrency(this.constraints.budget.value) : 'Non contraint'}</span>
                        </div>
                        <div class="summary-item ${!this.constraints.dimensions.enabled ? 'inactive' : ''}">
                            <span class="summary-label">Dimensions:</span>
                            <span class="summary-value">${this.constraints.dimensions.enabled ? 'Activées' : 'Non contraintes'}</span>
                        </div>
                        <div class="summary-item ${!this.constraints.duree.enabled ? 'inactive' : ''}">
                            <span class="summary-label">Durée max:</span>
                            <span class="summary-value">${this.constraints.duree.enabled ? this.constraints.duree.value + ' mois' : 'Non contrainte'}</span>
                        </div>
                        <div class="summary-item ${!this.constraints.reductionAccidents.enabled ? 'inactive' : ''}">
                            <span class="summary-label">Réduction min:</span>
                            <span class="summary-value">${this.constraints.reductionAccidents.enabled ? this.constraints.reductionAccidents.value + '%' : 'Non contrainte'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderResultsTab() {
        if (!this.results.selectedPistes || this.results.selectedPistes.length === 0) {
            return `
                <div class="no-results">
                    <span class="material-symbols-outlined">info</span>
                    <h3>Aucune simulation effectuée</h3>
                    <p>Définissez vos contraintes dans l'onglet "Contraintes" puis lancez une simulation.</p>
                    <button class="btn-primary" onclick="pages.Simulateur.setActiveTab('contraintes')">
                        Aller aux contraintes
                    </button>
                </div>
            `;
        }

        return `
            <div class="results-container">
                <!-- KPIs principaux -->
                <div class="results-kpi">
                    <div class="kpi-card">
                        <span class="material-symbols-outlined">payments</span>
                        <div class="kpi-content">
                            <span class="kpi-label">Budget total</span>
                            <span class="kpi-value">${this.formatCurrency(this.results.totalBudget)}</span>
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <span class="material-symbols-outlined">analytics</span>
                        <div class="kpi-content">
                            <span class="kpi-label">Impact moyen</span>
                            <span class="kpi-value">${Math.round(this.results.totalImpact / this.results.selectedPistes.length)}/100</span>
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <span class="material-symbols-outlined">schedule</span>
                        <div class="kpi-content">
                            <span class="kpi-label">Durée moyenne</span>
                            <span class="kpi-value">${Math.round(this.results.averageDuree)} mois</span>
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <span class="material-symbols-outlined">trending_down</span>
                        <div class="kpi-content">
                            <span class="kpi-label">Réduction accidents</span>
                            <span class="kpi-value">${Math.round(this.results.totalReduction)}%</span>
                        </div>
                    </div>
                </div>

                <!-- Radar des dimensions -->
                <div class="results-dimensions">
                    <h3>Distribution dimensionnelle</h3>
                    <div class="radar-container">
                        <canvas id="dimensions-radar" width="400" height="400"></canvas>
                    </div>
                    <div class="dimension-legend">
                        ${Object.entries(this.results.dimensionScores).map(([key, value]) => `
                            <div class="legend-item">
                                <span class="legend-color" style="background-color: ${this.getDimensionColor(key)}"></span>
                                <span class="legend-label">${key.toUpperCase()}</span>
                                <span class="legend-value">${Math.round(value)}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Liste des pistes sélectionnées -->
                <div class="selected-pistes">
                    <h3>Pistes sélectionnées (${this.results.selectedPistes.length})</h3>
                    <div class="pistes-list">
                        ${this.results.selectedPistes.map((piste, index) => `
                            <div class="piste-result-card">
                                <div class="piste-rank">#${index + 1}</div>
                                <div class="piste-info">
                                    <div class="piste-header">
                                        <span class="piste-id">${piste.numero}</span>
                                        <span class="priority-badge priority-${this.getPriorityClass(piste.priorite)}">${piste.priorite}</span>
                                    </div>
                                    <h4 class="piste-title">${piste.titre}</h4>
                                    <div class="piste-metrics">
                                        <div class="metric">
                                            <span class="material-symbols-outlined">payments</span>
                                            <span>${this.formatCurrency(piste.budget?.cout_3_ans || 0)}</span>
                                        </div>
                                        <div class="metric">
                                            <span class="material-symbols-outlined">analytics</span>
                                            <span>Impact: ${piste.impact_score || 0}/100</span>
                                        </div>
                                        <div class="metric">
                                            <span class="material-symbols-outlined">schedule</span>
                                            <span>${piste.delai_mois || '?'} mois</span>
                                        </div>
                                    </div>
                                    <div class="piste-dimensions">
                                        ${piste.dimensions ? this.renderDimensionMiniBars(piste.dimensions) : ''}
                                    </div>
                                </div>
                                <div class="piste-actions">
                                    <button class="btn-icon" onclick="pages.Simulateur.viewPisteDetails('${piste.numero}')" title="Voir détails">
                                        <span class="material-symbols-outlined">visibility</span>
                                    </button>
                                    <button class="btn-icon" onclick="pages.Simulateur.removeFromSelection('${piste.numero}')" title="Retirer">
                                        <span class="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Actions sur les résultats -->
                <div class="results-actions">
                    <button class="btn-secondary" onclick="pages.Simulateur.exportResults()">
                        <span class="material-symbols-outlined">download</span>
                        Exporter
                    </button>
                    <button class="btn-secondary" onclick="pages.Simulateur.addToScenario()">
                        <span class="material-symbols-outlined">add_circle</span>
                        Ajouter au scénario
                    </button>
                    <button class="btn-primary" onclick="pages.Simulateur.runSimulation()">
                        <span class="material-symbols-outlined">refresh</span>
                        Recalculer
                    </button>
                </div>
            </div>
        `;
    },

    renderComparaisonTab() {
        if (!this.results.paretoFront || this.results.paretoFront.length === 0) {
            return `
                <div class="no-results">
                    <span class="material-symbols-outlined">info</span>
                    <h3>Mode Pareto non activé</h3>
                    <p>Sélectionnez le mode d'optimisation "Pareto" pour voir les comparaisons.</p>
                </div>
            `;
        }

        return `
            <div class="comparaison-container">
                <h3>Front de Pareto - Meilleurs compromis</h3>
                <p class="comparaison-description">
                    Ces solutions représentent les meilleurs compromis entre budget et impact.
                    Aucune solution n'est meilleure à la fois sur les deux critères.
                </p>

                <div class="pareto-chart-container">
                    <canvas id="pareto-chart" width="800" height="400"></canvas>
                </div>

                <div class="pareto-solutions">
                    ${this.results.paretoFront.map((solution, index) => `
                        <div class="solution-card" onclick="pages.Simulateur.loadSolution(${index})">
                            <div class="solution-header">
                                <span class="solution-name">Solution ${String.fromCharCode(65 + index)}</span>
                                <span class="solution-badge">${solution.pistes.length} pistes</span>
                            </div>
                            <div class="solution-metrics">
                                <div class="solution-metric">
                                    <span class="metric-label">Budget:</span>
                                    <span class="metric-value">${this.formatCurrency(solution.budget)}</span>
                                </div>
                                <div class="solution-metric">
                                    <span class="metric-label">Impact:</span>
                                    <span class="metric-value">${Math.round(solution.impact)}/100</span>
                                </div>
                                <div class="solution-metric">
                                    <span class="metric-label">Efficacité:</span>
                                    <span class="metric-value">${(solution.impact / (solution.budget / 1000000)).toFixed(1)} pts/M€</span>
                                </div>
                            </div>
                            <button class="btn-select-solution" onclick="event.stopPropagation(); pages.Simulateur.selectSolution(${index})">
                                Choisir cette solution
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    renderDimensionMiniBars(dimensions) {
        const total = (dimensions.culture || 0) + (dimensions.technique || 0) + 
                     (dimensions.humain || 0) + (dimensions.organisationnel || 0) + 
                     (dimensions.economique || 0);
        
        return `
            <div class="mini-bars">
                <div class="mini-bar" style="width: ${(dimensions.culture || 0) / total * 100}%; background-color: #FF6B35;" title="Culture: ${dimensions.culture || 0}%"></div>
                <div class="mini-bar" style="width: ${(dimensions.technique || 0) / total * 100}%; background-color: #003D82;" title="Technique: ${dimensions.technique || 0}%"></div>
                <div class="mini-bar" style="width: ${(dimensions.humain || 0) / total * 100}%; background-color: #10B981;" title="Humain: ${dimensions.humain || 0}%"></div>
                <div class="mini-bar" style="width: ${(dimensions.organisationnel || 0) / total * 100}%; background-color: #F59E0B;" title="Organisationnel: ${dimensions.organisationnel || 0}%"></div>
                <div class="mini-bar" style="width: ${(dimensions.economique || 0) / total * 100}%; background-color: #8B5CF6;" title="Économique: ${dimensions.economique || 0}%"></div>
            </div>
        `;
    },

    calculateStats(pistes) {
        const totalBudget = pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
        const avgDuree = Math.round(pistes.reduce((sum, p) => sum + (p.delai_mois || 0), 0) / pistes.length) || 0;
        const avgImpact = Math.round(pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0) / pistes.length) || 0;
        
        return { totalBudget, avgDuree, avgImpact };
    },

    toggleConstraint(constraint) {
        this.constraints[constraint].enabled = !this.constraints[constraint].enabled;
        this.rerender();
    },

    updateConstraint(constraint, field, value) {
        this.constraints[constraint][field] = parseFloat(value);
        
        // Mettre à jour l'affichage
        if (constraint === 'budget') {
            document.getElementById('budget-value-display').textContent = this.formatCurrency(value);
        } else if (constraint === 'duree') {
            document.getElementById('duree-value-display').textContent = value + ' mois';
        } else if (constraint === 'reductionAccidents') {
            document.getElementById('reduction-value-display').textContent = value + '%';
        }
    },

    updateDimension(dimension, value) {
        const dims = this.constraints.dimensions;
        const requestedValue = Number.parseInt(value, 10);
        const currentValue = Number(dims[dimension] || 0);
        const normalizedValue = Number.isNaN(requestedValue) ? currentValue : requestedValue;
        const finalValue = Math.max(0, Math.min(100, normalizedValue));

        dims[dimension] = finalValue;
        this.normalizeDimensionsTo100(dimension);
        this.syncDimensionControls(dimension, dims[dimension]);
        this.updateDimensionTotalUI();
    },

    calculateDimensionsTotal() {
        const dims = this.constraints.dimensions;
        return dims.culture + dims.technique + dims.humain + dims.organisationnel + dims.economique;
    },

    syncDimensionControls(dimension, value) {
        const slider = document.getElementById(`dim-${dimension}`);
        if (slider) slider.value = value;

        const input = document.querySelector(`.dimension-input[data-dim="${dimension}"]`);
        if (input) input.value = value;
    },

    normalizeDimensionsTo100(changedDimension) {
        const dims = this.constraints.dimensions;
        const keys = ['culture', 'technique', 'humain', 'organisationnel', 'economique'];
        const otherKeys = keys.filter(key => key !== changedDimension);
        const changedValue = Number(dims[changedDimension] || 0);
        const targetOtherSum = Math.max(0, 100 - changedValue);

        const currentOtherValues = otherKeys.map(key => Number(dims[key] || 0));
        const currentOtherSum = currentOtherValues.reduce((sum, v) => sum + v, 0);

        let normalizedOthers;
        if (currentOtherSum === 0) {
            // Répartition homogène si toutes les autres dimensions sont à 0
            const base = Math.floor(targetOtherSum / otherKeys.length);
            let remainder = targetOtherSum - (base * otherKeys.length);
            normalizedOthers = otherKeys.map(() => {
                const add = remainder > 0 ? 1 : 0;
                remainder = Math.max(0, remainder - 1);
                return base + add;
            });
        } else {
            // Conserver les proportions relatives
            const raw = currentOtherValues.map(v => (v / currentOtherSum) * targetOtherSum);
            normalizedOthers = raw.map(v => Math.floor(v));
            let remainder = targetOtherSum - normalizedOthers.reduce((sum, v) => sum + v, 0);

            const order = raw
                .map((v, idx) => ({ idx, frac: v - Math.floor(v) }))
                .sort((a, b) => b.frac - a.frac);

            for (let i = 0; i < order.length && remainder > 0; i += 1) {
                normalizedOthers[order[i].idx] += 1;
                remainder -= 1;
            }
        }

        otherKeys.forEach((key, idx) => {
            dims[key] = Math.max(0, Math.min(100, normalizedOthers[idx]));
            this.syncDimensionControls(key, dims[key]);
        });
    },

    updateDimensionTotalUI() {
        const total = this.calculateDimensionsTotal();
        const totalElement = document.getElementById('dimension-total');
        if (totalElement) {
            totalElement.textContent = `${total}%`;
            totalElement.className = total !== 100 ? 'warning' : '';
        }

        const hint = document.querySelector('.dimension-total .total-hint');
        if (total !== 100) {
            if (!hint) {
                const totalWrapper = document.querySelector('.dimension-total');
                if (totalWrapper) {
                    const hintEl = document.createElement('span');
                    hintEl.className = 'total-hint';
                    hintEl.textContent = 'Le total doit être égal à 100%';
                    totalWrapper.appendChild(hintEl);
                }
            }
        } else if (hint) {
            hint.remove();
        }
    },

    setBudgetPreset(value) {
        this.constraints.budget.value = value;
        if (!this.constraints.budget.enabled) {
            this.constraints.budget.enabled = true;
            document.getElementById('toggle-budget').checked = true;
        }
        
        const slider = document.getElementById('budget-slider');
        if (slider) {
            slider.value = value;
            slider.disabled = false;
        }
        
        document.getElementById('budget-value-display').textContent = this.formatCurrency(value);
    },

    setDureePreset(value) {
        this.constraints.duree.value = value;
        if (!this.constraints.duree.enabled) {
            this.constraints.duree.enabled = true;
            document.getElementById('toggle-duree').checked = true;
        }
        
        const slider = document.getElementById('duree-slider');
        if (slider) {
            slider.value = value;
            slider.disabled = false;
        }
        
        document.getElementById('duree-value-display').textContent = value + ' mois';
    },

    setOptimizationMode(mode) {
        this.optimizationMode = mode;
    },

    setActiveTab(tab) {
        this.activeTab = tab;
        this.rerender();
        
        // Initialiser les graphiques si nécessaire
        if (tab === 'resultats' && this.results.selectedPistes.length > 0) {
            setTimeout(() => this.initRadarChart(), 100);
        } else if (tab === 'comparaison' && this.results.paretoFront.length > 0) {
            setTimeout(() => this.initParetoChart(), 100);
        }
    },

    runSimulation() {
        const state = appStore ? appStore.getState() : {};
        const allPistes = state.allPistes || [];
        
        // Vérifier que les contraintes sont valides
        if (this.constraints.dimensions.enabled && this.calculateDimensionsTotal() !== 100) {
            alert('Les dimensions doivent totaliser 100%');
            return;
        }
        
        // Exécuter l'optimisation selon le mode choisi
        switch(this.optimizationMode) {
            case 'weighted':
                this.runWeightedOptimization(allPistes);
                break;
            case 'pareto':
                this.runParetoOptimization(allPistes);
                break;
            case 'budget_first':
                this.runBudgetFirstOptimization(allPistes);
                break;
        }
        
        // Basculer vers l'onglet résultats
        this.activeTab = 'resultats';
        this.rerender();
        
        // Initialiser le graphique radar après le rendu
        setTimeout(() => this.initRadarChart(), 100);
    },

    runWeightedOptimization(allPistes) {
        // Calculer un score pondéré pour chaque piste
        const scoredPistes = allPistes.map(piste => {
            let score = 0;
            let weights = 0;
            
            // Score d'impact (toujours pris en compte)
            score += (piste.impact_score || 0) * 2;
            weights += 2;
            
            // Contrainte budget
            if (this.constraints.budget.enabled) {
                const budgetScore = Math.max(0, 1 - (piste.budget?.cout_3_ans || 0) / this.constraints.budget.value);
                score += budgetScore * 100;
                weights += 1;
            }
            
            // Contrainte dimensions
            if (this.constraints.dimensions.enabled && piste.dimensions) {
                const dimScore = this.calculateDimensionSimilarity(piste.dimensions);
                score += dimScore * 50;
                weights += 1;
            }
            
            // Contrainte durée
            if (this.constraints.duree.enabled) {
                const dureeScore = Math.max(0, 1 - (piste.delai_mois || 0) / this.constraints.duree.value);
                score += dureeScore * 50;
                weights += 1;
            }
            
            // Contrainte réduction accidents
            if (this.constraints.reductionAccidents.enabled) {
                const reduction = (piste.impact_score || 0) / 100; // Approximation
                if (reduction * 100 >= this.constraints.reductionAccidents.value) {
                    score += 100;
                }
                weights += 1;
            }
            
            return {
                ...piste,
                _score: score / weights
            };
        });
        
        // Trier par score et sélectionner les meilleures
        const sorted = scoredPistes.sort((a, b) => b._score - a._score);
        this.results.selectedPistes = sorted.slice(0, Math.min(10, sorted.length));
        
        // Calculer les métriques agrégées
        this.calculateAggregatedMetrics();
    },

    runParetoOptimization(allPistes) {
        // Algorithme simple pour trouver le front de Pareto
        // On considère budget vs impact
        const solutions = [];
        
        // Générer des combinaisons (simplifié - dans un vrai système on utiliserait un algo plus sophistiqué)
        const sortedByEfficiency = [...allPistes].sort((a, b) => {
            const effA = (a.impact_score || 0) / (a.budget?.cout_3_ans || 1);
            const effB = (b.impact_score || 0) / (b.budget?.cout_3_ans || 1);
            return effB - effA;
        });
        
        // Construire le front de Pareto
        let currentBudget = 0;
        let currentImpact = 0;
        const selected = [];
        
        for (const piste of sortedByEfficiency) {
            const budget = piste.budget?.cout_3_ans || 0;
            
            if (this.constraints.budget.enabled && currentBudget + budget > this.constraints.budget.value) {
                continue;
            }
            
            if (this.constraints.duree.enabled && (piste.delai_mois || 0) > this.constraints.duree.value) {
                continue;
            }
            
            selected.push(piste);
            currentBudget += budget;
            currentImpact += piste.impact_score || 0;
            
            solutions.push({
                pistes: [...selected],
                budget: currentBudget,
                impact: currentImpact / selected.length
            });
        }
        
        this.results.paretoFront = solutions;
        
        // Par défaut, sélectionner la dernière solution (celle avec le plus d'impact)
        if (solutions.length > 0) {
            this.results.selectedPistes = solutions[solutions.length - 1].pistes;
            this.calculateAggregatedMetrics();
        }
    },

    runBudgetFirstOptimization(allPistes) {
        if (!this.constraints.budget.enabled) {
            alert('Le mode "Budget d\'abord" nécessite une contrainte budgétaire');
            return;
        }
        
        // Calculer l'efficacité (impact par euro)
        const withEfficiency = allPistes.map(piste => ({
            ...piste,
            _efficiency: (piste.impact_score || 0) / (piste.budget?.cout_3_ans || 1)
        }));
        
        // Trier par efficacité
        const sorted = withEfficiency.sort((a, b) => b._efficiency - a._efficiency);
        
        // Sélectionner les meilleures dans la limite du budget
        let budgetLeft = this.constraints.budget.value;
        const selected = [];
        
        for (const piste of sorted) {
            const cost = piste.budget?.cout_3_ans || 0;
            
            if (cost <= budgetLeft) {
                // Vérifier les autres contraintes
                if (this.constraints.duree.enabled && (piste.delai_mois || 0) > this.constraints.duree.value) {
                    continue;
                }
                
                if (this.constraints.reductionAccidents.enabled) {
                    const reduction = (piste.impact_score || 0) / 100;
                    if (reduction * 100 < this.constraints.reductionAccidents.value) {
                        continue;
                    }
                }
                
                selected.push(piste);
                budgetLeft -= cost;
            }
        }
        
        this.results.selectedPistes = selected;
        this.calculateAggregatedMetrics();
    },

    calculateDimensionSimilarity(pisteDims) {
        if (!pisteDims) return 0;
        
        const target = this.constraints.dimensions;
        const total = this.calculateDimensionsTotal();
        
        // Normaliser les dimensions de la piste
        const pisteTotal = (pisteDims.culture || 0) + (pisteDims.technique || 0) + 
                          (pisteDims.humain || 0) + (pisteDims.organisationnel || 0) + 
                          (pisteDims.economique || 0);
        
        if (pisteTotal === 0) return 0;
        
        // Calculer la similarité (1 - distance normalisée)
        let distance = 0;
        distance += Math.abs((pisteDims.culture || 0) / pisteTotal * 100 - target.culture);
        distance += Math.abs((pisteDims.technique || 0) / pisteTotal * 100 - target.technique);
        distance += Math.abs((pisteDims.humain || 0) / pisteTotal * 100 - target.humain);
        distance += Math.abs((pisteDims.organisationnel || 0) / pisteTotal * 100 - target.organisationnel);
        distance += Math.abs((pisteDims.economique || 0) / pisteTotal * 100 - target.economique);
        
        // Distance maximale possible: 500 (5 dimensions * 100)
        return Math.max(0, 1 - distance / 500);
    },

    calculateAggregatedMetrics() {
        const pistes = this.results.selectedPistes;
        
        if (!pistes || pistes.length === 0) {
            this.results.totalBudget = 0;
            this.results.totalImpact = 0;
            this.results.averageDuree = 0;
            this.results.totalReduction = 0;
            this.results.dimensionScores = {
                culture: 0, technique: 0, humain: 0, organisationnel: 0, economique: 0
            };
            return;
        }
        
        // Budget total
        this.results.totalBudget = pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
        
        // Impact moyen
        this.results.totalImpact = pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0);
        
        // Durée moyenne
        const totalDuree = pistes.reduce((sum, p) => sum + (p.delai_mois || 0), 0);
        this.results.averageDuree = totalDuree / pistes.length;
        
        // Réduction totale (approximation - on prend le max)
        this.results.totalReduction = Math.max(...pistes.map(p => p.impact_score || 0)) / 100 * 100;
        
        // Scores dimensionnels pondérés
        const dims = { culture: 0, technique: 0, humain: 0, organisationnel: 0, economique: 0 };
        let totalWeight = 0;
        
        pistes.forEach(p => {
            if (p.dimensions) {
                const weight = p.impact_score || 1;
                totalWeight += weight;
                
                dims.culture += (p.dimensions.culture || 0) * weight;
                dims.technique += (p.dimensions.technique || 0) * weight;
                dims.humain += (p.dimensions.humain || 0) * weight;
                dims.organisationnel += (p.dimensions.organisationnel || 0) * weight;
                dims.economique += (p.dimensions.economique || 0) * weight;
            }
        });
        
        if (totalWeight > 0) {
            Object.keys(dims).forEach(key => {
                dims[key] = dims[key] / totalWeight;
            });
        }
        
        this.results.dimensionScores = dims;
    },

    initRadarChart() {
        const canvas = document.getElementById('dimensions-radar');
        if (!canvas || !window.Chart) return;
        
        const ctx = canvas.getContext('2d');
        const dims = this.results.dimensionScores;
        
        new window.Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['CULTURE', 'TECHNIQUE', 'HUMAIN', 'ORGANISATIONNEL', 'ÉCONOMIQUE'],
                datasets: [{
                    label: 'Distribution',
                    data: [
                        dims.culture || 0,
                        dims.technique || 0,
                        dims.humain || 0,
                        dims.organisationnel || 0,
                        dims.economique || 0
                    ],
                    backgroundColor: 'rgba(255, 107, 53, 0.2)',
                    borderColor: '#FF6B35',
                    borderWidth: 2,
                    pointBackgroundColor: '#FF6B35',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FF6B35'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    },

    initParetoChart() {
        const canvas = document.getElementById('pareto-chart');
        if (!canvas || !window.Chart || this.results.paretoFront.length === 0) return;
        
        const ctx = canvas.getContext('2d');
        const front = this.results.paretoFront;
        
        new window.Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Front de Pareto',
                    data: front.map(s => ({
                        x: s.budget / 1000000, // en millions
                        y: s.impact
                    })),
                    backgroundColor: '#FF6B35',
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Budget (M€)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Impact moyen (/100)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: context => {
                                const point = context.raw;
                                return `Budget: ${point.x.toFixed(1)}M€, Impact: ${point.y.toFixed(1)}/100`;
                            }
                        }
                    }
                }
            }
        });
    },

    selectSolution(index) {
        if (index >= 0 && index < this.results.paretoFront.length) {
            this.results.selectedPistes = this.results.paretoFront[index].pistes;
            this.calculateAggregatedMetrics();
            this.activeTab = 'resultats';
            this.rerender();
            
            setTimeout(() => this.initRadarChart(), 100);
        }
    },

    loadSolution(index) {
        this.selectSolution(index);
    },

    viewPisteDetails(pisteId) {
        if (window.router) {
            window.router.navigate(`/piste-detail/${pisteId}`);
        }
    },

    removeFromSelection(pisteId) {
        this.results.selectedPistes = this.results.selectedPistes.filter(p => p.numero !== pisteId);
        this.calculateAggregatedMetrics();
        this.rerender();
        
        setTimeout(() => this.initRadarChart(), 100);
    },

    addToScenario() {
        if (this.results.selectedPistes.length === 0) {
            alert('Aucune piste sélectionnée');
            return;
        }
        
        // Ajouter chaque piste au scénario
        this.results.selectedPistes.forEach(piste => {
            if (window.appActions) {
                window.appActions.addPisteToScenario(piste);
            }
        });
        
        if (window.Notifications) {
            Notifications.success(`${this.results.selectedPistes.length} pistes ajoutées au scénario`);
        } else {
            alert(`${this.results.selectedPistes.length} pistes ajoutées au scénario`);
        }
    },

    exportResults() {
        // Créer un objet de résultats à exporter
        const exportData = {
            date: new Date().toISOString(),
            constraints: this.constraints,
            results: {
                selectedPistes: this.results.selectedPistes.map(p => ({
                    numero: p.numero,
                    titre: p.titre,
                    budget: p.budget?.cout_3_ans,
                    impact: p.impact_score,
                    duree: p.delai_mois
                })),
                totalBudget: this.results.totalBudget,
                averageImpact: this.results.totalImpact / this.results.selectedPistes.length,
                averageDuree: this.results.averageDuree
            }
        };
        
        // Télécharger en JSON
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `simulation_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    resetConstraints() {
        this.constraints = {
            budget: { enabled: false, value: 1000000, max: 5000000 },
            dimensions: { enabled: false, culture: 20, technique: 20, humain: 20, organisationnel: 20, economique: 20 },
            duree: { enabled: false, value: 12, max: 60 },
            reductionAccidents: { enabled: false, value: 20, max: 100 }
        };
        
        this.results = {
            selectedPistes: [],
            totalBudget: 0,
            totalImpact: 0,
            averageDuree: 0,
            totalReduction: 0,
            dimensionScores: { culture: 0, technique: 0, humain: 0, organisationnel: 0, economique: 0 },
            paretoFront: []
        };
        
        this.rerender();
    },

    formatCurrency(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + ' M€';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' k€';
        }
        return amount + ' €';
    },

    getPriorityClass(priority) {
        const map = { 'P1': 'critical', 'P2': 'high', 'P3': 'medium', 'P4': 'low' };
        return map[priority] || 'medium';
    },

    getDimensionColor(dimension) {
        const colors = {
            culture: '#FF6B35',
            technique: '#003D82',
            humain: '#10B981',
            organisationnel: '#F59E0B',
            economique: '#8B5CF6'
        };
        return colors[dimension] || '#64748B';
    },

    rerender() {
        this.render().then(html => {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = html;
                this.setupEventListeners();
            }
        });
    },

    setupEventListeners() {
        console.log('Setup event listeners - Simulateur');
    },

    getStyles() {
        return `
            <style>
                .simulateur-wrapper {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: 'Public Sans', sans-serif;
                }

                .simulateur-header {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 24px 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .header-content h1 {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 24px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 8px 0;
                }

                .header-content .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                }

                .header-description {
                    color: #64748b;
                    margin: 0;
                    max-width: 600px;
                }

                .header-actions {
                    display: flex;
                    gap: 12px;
                }

                .btn-reset, .btn-simulate {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-reset {
                    background: #f1f5f9;
                    color: #475569;
                }

                .btn-reset:hover {
                    background: #e2e8f0;
                }

                .btn-simulate {
                    background: #FF6B35;
                    color: white;
                }

                .btn-simulate:hover {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(255, 107, 53, 0.3);
                }

                .simulateur-tabs {
                    display: flex;
                    gap: 4px;
                    padding: 16px 32px 0;
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                }

                .tab-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-weight: 600;
                    cursor: pointer;
                    border-bottom: 3px solid transparent;
                    transition: all 0.2s;
                }

                .tab-btn:hover {
                    color: #FF6B35;
                }

                .tab-btn.active {
                    color: #FF6B35;
                    border-bottom-color: #FF6B35;
                }

                .simulateur-main {
                    flex: 1;
                    padding: 32px;
                    overflow-y: auto;
                }

                .constraints-container {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .constraint-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: all 0.2s;
                }

                .constraint-card:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                }

                .constraint-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                }

                .constraint-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .constraint-title .material-symbols-outlined {
                    color: #FF6B35;
                    font-size: 24px;
                }

                .constraint-title h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                }

                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 24px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #cbd5e1;
                    transition: .3s;
                    border-radius: 24px;
                }

                .toggle-slider:before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    transition: .3s;
                    border-radius: 50%;
                }

                input:checked + .toggle-slider {
                    background-color: #FF6B35;
                }

                input:checked + .toggle-slider:before {
                    transform: translateX(26px);
                }

                .constraint-content {
                    padding: 20px;
                    transition: opacity 0.2s;
                }

                .constraint-content.disabled {
                    opacity: 0.5;
                    pointer-events: none;
                }

                .constraint-info {
                    margin: 0 0 20px 0;
                    color: #475569;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .stats-hint {
                    display: inline-block;
                    margin-left: 8px;
                    padding: 2px 8px;
                    background: #f1f5f9;
                    border-radius: 999px;
                    font-size: 12px;
                    color: #64748b;
                }

                .slider-container {
                    margin-bottom: 20px;
                }

                .slider-container label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                }

                .slider-container input[type=range] {
                    width: 100%;
                    height: 8px;
                    border-radius: 4px;
                    background: #e2e8f0;
                    outline: none;
                    -webkit-appearance: none;
                }

                .slider-container input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #FF6B35;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .slider-values {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 8px;
                    font-size: 12px;
                    color: #64748b;
                }

                .slider-values span:first-child {
                    text-align: left;
                }

                .slider-values span:last-child {
                    text-align: right;
                }

                .slider-values span:nth-child(2) {
                    font-weight: 600;
                    color: #FF6B35;
                }

                .quick-presets {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .preset-btn {
                    padding: 6px 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    background: white;
                    color: #475569;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .preset-btn:hover {
                    background: #f8fafc;
                    border-color: #FF6B35;
                    color: #FF6B35;
                }

                .dimensions-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .dimension-item {
                    background: #f8fafc;
                    padding: 12px;
                    border-radius: 8px;
                }

                .dimension-item label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                }

                .dimension-control {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .dimension-control input[type=range] {
                    flex: 1;
                    height: 6px;
                }

                .dimension-input {
                    width: 60px;
                    padding: 4px 6px;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    text-align: right;
                }

                .dimension-total {
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 2px solid #e2e8f0;
                    text-align: right;
                    font-weight: 600;
                }

                .dimension-total .warning {
                    color: #dc2626;
                }

                .total-hint {
                    display: block;
                    font-size: 12px;
                    color: #dc2626;
                    margin-top: 4px;
                }

                .optimization-modes {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .radio-option {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .radio-option:hover {
                    background: #f8fafc;
                }

                .radio-option input[type=radio] {
                    margin-top: 3px;
                    accent-color: #FF6B35;
                }

                .radio-option strong {
                    display: block;
                    margin-bottom: 4px;
                    color: #1e293b;
                }

                .radio-option small {
                    color: #64748b;
                    font-size: 12px;
                }

                .constraint-summary {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 16px;
                }

                .constraint-summary h4 {
                    margin: 0 0 12px 0;
                    font-size: 14px;
                    color: #475569;
                }

                .summary-items {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .summary-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 12px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 999px;
                    font-size: 13px;
                }

                .summary-item.inactive {
                    opacity: 0.5;
                }

                .summary-label {
                    color: #64748b;
                }

                .summary-value {
                    font-weight: 600;
                    color: #FF6B35;
                }

                /* Résultats */
                .results-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .results-kpi {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .kpi-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 20px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                }

                .kpi-card .material-symbols-outlined {
                    font-size: 32px;
                    color: #FF6B35;
                }

                .kpi-content {
                    flex: 1;
                }

                .kpi-label {
                    display: block;
                    font-size: 12px;
                    color: #64748b;
                    margin-bottom: 4px;
                }

                .kpi-value {
                    display: block;
                    font-size: 24px;
                    font-weight: 700;
                    color: #1e293b;
                }

                .results-dimensions {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 32px;
                    text-align: center;
                }

                .results-dimensions h3 {
                    margin: 0 0 20px 0;
                    color: #1e293b;
                }

                .radar-container {
                    max-width: 400px;
                    margin: 0 auto;
                }

                .dimension-legend {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 3px;
                }

                .selected-pistes {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 32px;
                }

                .selected-pistes h3 {
                    margin: 0 0 20px 0;
                    color: #1e293b;
                }

                .pistes-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .piste-result-card {
                    display: flex;
                    gap: 16px;
                    padding: 16px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .piste-result-card:hover {
                    border-color: #FF6B35;
                }

                .piste-rank {
                    width: 40px;
                    height: 40px;
                    background: #FF6B35;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .piste-info {
                    flex: 1;
                }

                .piste-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }

                .piste-id {
                    font-size: 12px;
                    font-weight: 700;
                    color: #FF6B35;
                }

                .piste-title {
                    margin: 0 0 8px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                }

                .piste-metrics {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 8px;
                }

                .metric {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    color: #64748b;
                }

                .metric .material-symbols-outlined {
                    font-size: 14px;
                }

                .piste-dimensions {
                    margin-top: 8px;
                }

                .mini-bars {
                    display: flex;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    overflow: hidden;
                }

                .mini-bar {
                    height: 100%;
                    transition: width 0.2s;
                }

                .piste-actions {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-shrink: 0;
                }

                .btn-icon {
                    width: 32px;
                    height: 32px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    background: white;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .btn-icon:hover {
                    border-color: #FF6B35;
                    color: #FF6B35;
                }

                .results-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                }

                .btn-primary, .btn-secondary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-primary {
                    background: #FF6B35;
                    color: white;
                }

                .btn-primary:hover {
                    filter: brightness(1.1);
                }

                .btn-secondary {
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #475569;
                }

                .btn-secondary:hover {
                    border-color: #FF6B35;
                    color: #FF6B35;
                }

                .no-results {
                    text-align: center;
                    padding: 60px 20px;
                    color: #64748b;
                }

                .no-results .material-symbols-outlined {
                    font-size: 48px;
                    color: #94a3b8;
                    margin-bottom: 16px;
                }

                .no-results h3 {
                    margin: 0 0 8px 0;
                    color: #1e293b;
                }

                .no-results p {
                    margin: 0 0 24px 0;
                }

                /* Comparaison */
                .comparaison-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .comparaison-container h3 {
                    margin: 0 0 8px 0;
                    color: #1e293b;
                }

                .comparaison-description {
                    color: #64748b;
                    margin-bottom: 32px;
                }

                .pareto-chart-container {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 32px;
                }

                .pareto-solutions {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }

                .solution-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .solution-card:hover {
                    border-color: #FF6B35;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .solution-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .solution-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #FF6B35;
                }

                .solution-badge {
                    padding: 4px 8px;
                    background: #f1f5f9;
                    border-radius: 999px;
                    font-size: 12px;
                    color: #64748b;
                }

                .solution-metrics {
                    margin-bottom: 16px;
                }

                .solution-metric {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 14px;
                }

                .metric-label {
                    color: #64748b;
                }

                .metric-value {
                    font-weight: 600;
                    color: #1e293b;
                }

                .btn-select-solution {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #FF6B35;
                    border-radius: 6px;
                    background: white;
                    color: #FF6B35;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-select-solution:hover {
                    background: #FF6B35;
                    color: white;
                }

                @media (max-width: 768px) {
                    .dimensions-grid {
                        grid-template-columns: 1fr;
                    }

                    .results-kpi {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .piste-result-card {
                        flex-direction: column;
                    }

                    .piste-actions {
                        justify-content: flex-end;
                    }
                }

                @media (max-width: 480px) {
                    .results-kpi {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }
};

// Exporter pour usage global
window.pages = window.pages || {};
window.pages.Simulateur = pages.Simulateur;
