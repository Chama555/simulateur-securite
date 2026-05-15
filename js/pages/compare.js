/**
 * PAGES/COMPARE.JS - Page de comparaison des scénarios (VERSION DYNAMIQUE AVEC RADARS)
 */

pages.Compare = {
    selectedScenarios: [], // IDs des scénarios sélectionnés
    chartInstances: {},    // Stockage des instances de graphiques

    async render() {
        const state = appStore.getState();
        const scenarios = state.scenarios || [];
        const currentScenario = state.currentScenario || [];

        // Construire la liste de tous les scénarios disponibles
        let allScenarios = [];
        
        // Ajouter le scénario courant comme premier élément si présent
        /*
        if (currentScenario.length > 0) {
            allScenarios.push({
                id: 'current',
                name: 'Scénario en cours',
                pistes: currentScenario,
                createdAt: new Date().toISOString(),
                isCurrent: true
            });
        }
        */
        // Ajouter les scénarios sauvegardés
        allScenarios = [...allScenarios, ...scenarios];

        // Si toujours vide, utiliser les scénarios par défaut
        if (allScenarios.length === 0) {
            allScenarios = this.getDefaultScenarios(state.allPistes || []);
        }

        // Initialiser la sélection par défaut (premiers scénarios)
        if (this.selectedScenarios.length === 0 && allScenarios.length > 0) {
            this.selectedScenarios = allScenarios.slice(0, Math.min(3, allScenarios.length)).map(s => s.id);
        }

        return `
            <div class="compare-wrapper">
                <div class="compare-header">
                    <div>
                        <h1>
                            <span class="material-symbols-outlined">compare_arrows</span>
                            Comparaison des Scénarios
                        </h1>
                        <p class="header-subtitle">Sélectionnez les scénarios à comparer (2-4 recommandé)</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn-export" onclick="pages.Compare.exportToPDF()" ${this.selectedScenarios.length === 0 ? 'disabled' : ''}>
                            <span class="material-symbols-outlined">picture_as_pdf</span>
                            Exporter en PDF
                        </button>
                    </div>
                </div>

                <!-- Sélecteur de scénarios -->
                <div class="scenario-selector">
                    <h3>Scénarios disponibles</h3>
                    <div class="selector-grid">
                        ${allScenarios.map(scenario => `
                            <label class="scenario-checkbox ${scenario.isCurrent ? 'current' : ''}">
                                <input 
                                    type="checkbox" 
                                    value="${scenario.id}" 
                                    ${this.selectedScenarios.includes(scenario.id) ? 'checked' : ''}
                                    onchange="pages.Compare.toggleScenario('${scenario.id}')"
                                >
                                <div class="checkbox-content">
                                    <span class="scenario-name">${scenario.name}</span>
                                    <span class="scenario-count">${scenario.pistes.length} pistes</span>
                                    <span class="scenario-date">${new Date(scenario.createdAt).toLocaleDateString('fr-FR')}</span>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                    <div class="selection-info">
                        <span class="material-symbols-outlined">info</span>
                        <span>${this.selectedScenarios.length} scénario(s) sélectionné(s) pour comparaison</span>
                    </div>
                </div>

                <!-- Tableau de scoring comparatif -->
                <div class="scoring-table-container">
                    <h3>Tableau de scoring comparatif</h3>
                    <table class="scoring-table">
                        <thead>
                            <tr>
                                <th>Métrique</th>
                                ${allScenarios.filter(s => this.selectedScenarios.includes(s.id)).map(s => `
                                    <th class="scenario-header-cell">
                                        <div class="scenario-header-title">
                                            <span class="scenario-name">${s.name}</span>
                                            ${s.isCurrent ? '<span class="current-badge">Actuel</span>' : ''}
                                        </div>
                                    </th>
                                `).join('')}
                                <th class="best-score">Meilleur</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderScoringRows(allScenarios)}
                        </tbody>
                    </table>
                </div>

                <!-- Grille de comparaison avec radars -->
                <div class="compare-container" id="compare-content">
                    ${allScenarios.filter(s => this.selectedScenarios.includes(s.id)).map((scenario, idx) => {
                        const metrics = this.calculateDetailedMetrics(scenario.pistes);
                        const dimensions = this.calculateAggregatedDimensions(scenario.pistes);
                        return `
                            <div class="scenario-column ${scenario.isCurrent ? 'current' : ''}">
                                <div class="scenario-header">
                                    <div class="scenario-title">
                                        <h3>${scenario.name}</h3>
                                        ${scenario.isCurrent ? '<span class="badge-current">Actuel</span>' : ''}
                                    </div>
                                    <p class="scenario-date">Créé le ${new Date(scenario.createdAt).toLocaleDateString('fr-FR')}</p>
                                    <button class="btn-remove" onclick="pages.Compare.removeScenario('${scenario.id}')" title="Retirer de la comparaison">
                                        <span class="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                
                                <!-- Radar des dimensions -->
                                <div class="dimension-radar-container">
                                    <h4>Distribution dimensionnelle</h4>
                                    <canvas id="radar-${scenario.id}" width="250" height="250" class="dimension-radar"></canvas>
                                    <div class="dimension-legend">
                                        ${Object.entries(dimensions).map(([key, value]) => `
                                            <div class="legend-item">
                                                <span class="legend-color" style="background-color: ${this.getDimensionColor(key)}"></span>
                                                <span class="legend-label">${this.getDimensionLabel(key)}</span>
                                                <span class="legend-value">${Math.round(value)}%</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <!-- KPIs principaux -->
                                <div class="scenario-metrics">
                                    ${metrics.map(metric => `
                                        <div class="metric-card" title="${metric.tooltip || ''}">
                                            <span class="metric-label">${metric.label}</span>
                                            <span class="metric-value ${metric.class}">${metric.value}</span>
                                            ${metric.trend ? `<span class="metric-trend ${metric.trendClass}">${metric.trend}</span>` : ''}
                                        </div>
                                    `).join('')}
                                </div>

                                <!-- Liste des pistes -->
                                <div class="pistes-list">
                                    <h4>
                                        <span class="material-symbols-outlined">list</span>
                                        Pistes incluses (${scenario.pistes.length})
                                    </h4>
                                    <div class="pistes-scroll">
                                        ${scenario.pistes.map(p => `
                                            <div class="piste-item-compare" onclick="pages.Compare.viewPisteDetails('${p.numero}')">
                                                <span class="piste-id">${p.numero}</span>
                                                <span class="piste-title">${p.titre || 'Sans titre'}</span>
                                                <span class="priority-dot priority-${this.getPriorityClass(p.priorite)}" title="Priorité ${p.priorite}"></span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Si aucun scénario sélectionné -->
                ${this.selectedScenarios.length === 0 ? `
                    <div class="no-selection">
                        <span class="material-symbols-outlined">info</span>
                        <h3>Aucun scénario sélectionné</h3>
                        <p>Cochez des scénarios ci-dessus pour les comparer.</p>
                    </div>
                ` : ''}
            </div>

            ${this.getStyles()}
        `;
    },

    renderScoringRows(allScenarios) {
        const selected = allScenarios.filter(s => this.selectedScenarios.includes(s.id));
        if (selected.length === 0) return '';

        const metrics = [
            { key: 'budget', label: 'Budget total', format: 'currency', higher: false },
            { key: 'impact', label: 'Impact moyen', format: 'number', higher: true, suffix: '/100' },
            { key: 'accidents', label: 'Accidents évités/an', format: 'number', higher: true },
            { key: 'pistes', label: 'Nombre de pistes', format: 'number', higher: false },
            { key: 'roi', label: 'ROI moyen', format: 'months', higher: false },
            { key: 'duree', label: 'Durée moyenne', format: 'months', higher: false },
            { key: 'equilibre', label: 'Équilibre dimensions', format: 'percent', higher: true }
        ];

        return metrics.map(metric => {
            const values = selected.map(s => this.getMetricValue(s.pistes, metric.key));
            const bestValue = metric.higher ? Math.max(...values) : Math.min(...values);
            
            return `
                <tr>
                    <td class="metric-label-cell">${metric.label}</td>
                    ${selected.map(s => {
                        const value = this.getMetricValue(s.pistes, metric.key);
                        const isBest = value === bestValue;
                        return `
                            <td class="metric-value-cell ${isBest ? 'best-value' : ''}">
                                ${this.formatMetricValue(value, metric.format)}
                                ${isBest ? '<span class="best-badge">Meilleur</span>' : ''}
                            </td>
                        `;
                    }).join('')}
                    <td class="best-score-cell">${this.formatMetricValue(bestValue, metric.format)}</td>
                </tr>
            `;
        }).join('');
    },

    getMetricValue(pistes, metricKey) {
        switch(metricKey) {
            case 'budget':
                return pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
            case 'impact':
                return pistes.length > 0 
                    ? Math.round(pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0) / pistes.length)
                    : 0;
            case 'accidents':
                return pistes.reduce((sum, p) => sum + (p.impact_accidents_evites || 0), 0);
            case 'pistes':
                return pistes.length;
            case 'roi':
                return pistes.length > 0
                    ? Math.round(pistes.reduce((sum, p) => sum + (p.roi_mois || 0), 0) / pistes.length)
                    : 0;
            case 'duree':
                return pistes.length > 0
                    ? Math.round(pistes.reduce((sum, p) => sum + (p.delai_mois || 0), 0) / pistes.length)
                    : 0;
            case 'equilibre':
                const dims = this.calculateAggregatedDimensions(pistes);
                const values = Object.values(dims);
                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                const variance = values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / values.length;
                const equilibre = Math.max(0, 100 - variance * 2);
                return Math.round(equilibre);
            default:
                return 0;
        }
    },

    formatMetricValue(value, format) {
        switch(format) {
            case 'currency':
                return Utils.formatCurrency(value);
            case 'months':
                return value + ' mois';
            case 'percent':
                return value + '%';
            default:
                return value.toString();
        }
    },

    calculateDetailedMetrics(pistes) {
        const totalBudget = pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
        const avgImpact = pistes.length > 0 
            ? Math.round(pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0) / pistes.length)
            : 0;
        const totalAccidents = pistes.reduce((sum, p) => sum + (p.impact_accidents_evites || 0), 0);
        const totalEco = pistes.reduce((sum, p) => sum + (p.impact_economies || 0), 0);
        const avgRoi = pistes.length > 0
            ? Math.round(pistes.reduce((sum, p) => sum + (p.roi_mois || 0), 0) / pistes.length)
            : 0;
        const avgDuree = pistes.length > 0
            ? Math.round(pistes.reduce((sum, p) => sum + (p.delai_mois || 0), 0) / pistes.length)
            : 0;

        return [
            { 
                label: 'Budget total', 
                value: Utils.formatCurrency(totalBudget), 
                class: '',
                tooltip: 'Budget total sur 3 ans'
            },
            { 
                label: 'Impact moyen', 
                value: avgImpact + '/100', 
                class: 'impact',
                tooltip: 'Score d\'impact moyen des pistes'
            },
            { 
                label: 'Accidents évités', 
                value: totalAccidents, 
                class: 'success',
                tooltip: 'Nombre total d\'accidents évités par an'
            },
            { 
                label: 'Économies', 
                value: Utils.formatCurrency(totalEco), 
                class: 'success',
                tooltip: 'Économies annuelles estimées'
            },
            { 
                label: 'ROI moyen', 
                value: avgRoi + ' mois', 
                class: '',
                tooltip: 'Retour sur investissement moyen'
            },
            { 
                label: 'Durée moyenne', 
                value: avgDuree + ' mois', 
                class: '',
                tooltip: 'Durée de déploiement moyenne'
            }
        ];
    },

    calculateAggregatedDimensions(pistes) {
        const dims = {
            culture: 0,
            technique: 0,
            humain: 0,
            organisationnel: 0,
            economique: 0
        };
        
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
        
        // Normaliser à 100%
        const total = Object.values(dims).reduce((a, b) => a + b, 0);
        if (total > 0) {
            Object.keys(dims).forEach(key => {
                dims[key] = (dims[key] / total) * 100;
            });
        }
        
        return dims;
    },

    toggleScenario(scenarioId) {
        if (this.selectedScenarios.includes(scenarioId)) {
            this.selectedScenarios = this.selectedScenarios.filter(id => id !== scenarioId);
        } else {
            this.selectedScenarios.push(scenarioId);
        }
        this.rerender();
    },

    removeScenario(scenarioId) {
        this.selectedScenarios = this.selectedScenarios.filter(id => id !== scenarioId);
        this.rerender();
    },

    viewPisteDetails(pisteId) {
        if (window.router) {
            window.router.navigate(`/piste-detail/${pisteId}`);
        }
    },

    duplicateScenario(scenarioId) {
        const state = appStore.getState();
        const scenarios = state.scenarios || [];
        const scenario = scenarios.find(s => s.id === scenarioId);
        
        if (scenario && window.appActions) {
            const newScenario = {
                ...scenario,
                id: 'scenario-' + Date.now(),
                name: scenario.name + ' (copie)',
                createdAt: new Date().toISOString()
            };
            appActions.addScenario(newScenario);
            
            if (window.Notifications) {
                Notifications.success('Scénario dupliqué avec succès');
            }
        }
    },

    editScenario(scenarioId) {
        // Navigation vers l'éditeur de scénario (à implémenter)
        console.log('Edit scenario:', scenarioId);
    },

    getDefaultScenarios(allPistes) {
        if (allPistes.length === 0) return [];

        return [
            {
                id: 'default-quick-wins',
                name: 'Quick Wins',
                pistes: allPistes.filter(p => p.priorite === 'P1').slice(0, 4),
                createdAt: new Date().toISOString()
            },
            {
                id: 'default-balanced',
                name: 'Équilibré',
                pistes: allPistes.filter(p => ['P1', 'P2'].includes(p.priorite)).slice(0, 6),
                createdAt: new Date().toISOString()
            },
            {
                id: 'default-impact-max',
                name: 'Impact Maximum',
                pistes: [...allPistes]
                    .sort((a, b) => (b.impact_score || 0) - (a.impact_score || 0))
                    .slice(0, 5),
                createdAt: new Date().toISOString()
            },
            {
                id: 'default-budget',
                name: 'Économique',
                pistes: [...allPistes]
                    .sort((a, b) => (a.budget?.cout_3_ans || 0) - (b.budget?.cout_3_ans || 0))
                    .slice(0, 8),
                createdAt: new Date().toISOString()
            }
        ];
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

    getDimensionLabel(dimension) {
        const labels = {
            culture: 'CULTURE',
            technique: 'TECH',
            humain: 'HUMAIN',
            organisationnel: 'ORG',
            economique: 'ECO'
        };
        return labels[dimension] || dimension.toUpperCase();
    },

    initRadarCharts() {
        if (!window.Chart) return;
        
        // Détruire les anciennes instances
        Object.values(this.chartInstances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.chartInstances = {};
        
        const state = appStore.getState();
        const scenarios = state.scenarios || [];
        const currentScenario = state.currentScenario || [];
        
        let allScenarios = [];
        if (currentScenario.length > 0) {
            allScenarios.push({
                id: 'current',
                pistes: currentScenario
            });
        }
        allScenarios = [...allScenarios, ...scenarios];
        
        if (allScenarios.length === 0) {
            allScenarios = this.getDefaultScenarios(state.allPistes || []);
        }
        
        allScenarios.filter(s => this.selectedScenarios.includes(s.id)).forEach(scenario => {
            const canvas = document.getElementById(`radar-${scenario.id}`);
            if (!canvas) return;
            
            const dimensions = this.calculateAggregatedDimensions(scenario.pistes);
            const ctx = canvas.getContext('2d');
            
            this.chartInstances[scenario.id] = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['CULTURE', 'TECH', 'HUMAIN', 'ORG', 'ECO'],
                    datasets: [{
                        label: 'Distribution',
                        data: [
                            dimensions.culture || 0,
                            dimensions.technique || 0,
                            dimensions.humain || 0,
                            dimensions.organisationnel || 0,
                            dimensions.economique || 0
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
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: context => context.raw.toFixed(1) + '%'
                            }
                        }
                    }
                }
            });
        });
    },

    async loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    async exportToPDF() {
        try {
            // Vérifier qu'il y a des scénarios sélectionnés
            if (this.selectedScenarios.length === 0) {
                if (window.Notifications) {
                    Notifications.warning('Aucun scénario sélectionné à exporter');
                }
                return;
            }

            // Afficher un indicateur de chargement
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'pdf-loading';
            loadingMsg.innerHTML = `
                <div class="pdf-loading-content">
                    <div class="spinner"></div>
                    <p>Génération du PDF en cours...</p>
                </div>
            `;
            document.body.appendChild(loadingMsg);

            // Vérifier si html2pdf est chargé, sinon le charger dynamiquement
            if (typeof window.html2pdf === 'undefined') {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
            }

            // Récupérer les éléments à exporter
            const state = appStore.getState();
            const allScenarios = state.scenarios || [];
            const currentScenario = state.currentScenario || [];
            
            let allScenariosList = [];
            if (currentScenario.length > 0) {
                allScenariosList.push({
                    id: 'current',
                    name: 'Scénario en cours',
                    pistes: currentScenario,
                    createdAt: new Date().toISOString(),
                    isCurrent: true
                });
            }
            allScenariosList = [...allScenariosList, ...allScenarios];
            
            const selectedScenariosData = allScenariosList.filter(s => this.selectedScenarios.includes(s.id));

            // Créer un conteneur temporaire pour le PDF
            const pdfContainer = document.createElement('div');
            pdfContainer.className = 'pdf-export-container';
            pdfContainer.style.padding = '20px';
            pdfContainer.style.fontFamily = 'Public Sans, sans-serif';
            pdfContainer.style.background = 'white';

            // Titre du PDF
            pdfContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #003D82; font-size: 24px; margin-bottom: 8px;">Comparaison des Scénarios</h1>
                    <p style="color: #64748b; font-size: 14px;">Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 18px; border-bottom: 2px solid #FF6B35; padding-bottom: 8px;">Scénarios comparés</h2>
                    <ul style="list-style: none; padding: 0;">
                        ${selectedScenariosData.map(s => `
                            <li style="margin: 8px 0; padding: 8px; background: #f8fafc; border-radius: 6px;">
                                <strong style="color: #FF6B35;">${s.name}</strong> - ${s.pistes.length} pistes
                                ${s.isCurrent ? ' <span style="background: #003D82; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Actuel</span>' : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 18px; border-bottom: 2px solid #FF6B35; padding-bottom: 8px;">Tableau de scoring</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="padding: 10px; text-align: left; border: 1px solid #e2e8f0;">Métrique</th>
                                ${selectedScenariosData.map(s => `
                                    <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">${s.name}</th>
                                `).join('')}
                                <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">Meilleur</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderPDFScoringRows(selectedScenariosData)}
                        </tbody>
                    </table>
                </div>

                <div style="margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 18px; border-bottom: 2px solid #FF6B35; padding-bottom: 8px;">Détail des scénarios</h2>
                    ${selectedScenariosData.map(s => {
                        const metrics = this.calculateDetailedMetrics(s.pistes);
                        const dimensions = this.calculateAggregatedDimensions(s.pistes);
                        return `
                            <div style="margin-bottom: 30px; page-break-inside: avoid;">
                                <h3 style="color: #FF6B35; font-size: 16px; margin-bottom: 12px;">${s.name}</h3>
                                
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                                    ${metrics.map(m => `
                                        <div style="background: #f8fafc; padding: 10px; border-radius: 6px;">
                                            <div style="font-size: 11px; color: #64748b;">${m.label}</div>
                                            <div style="font-size: 16px; font-weight: 700; color: #1e293b;">${m.value}</div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                    <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #475569;">Distribution dimensionnelle</h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                                        ${Object.entries(dimensions).map(([key, value]) => `
                                            <div style="flex: 1; min-width: 100px;">
                                                <div style="font-size: 11px; color: #64748b;">${this.getDimensionLabel(key)}</div>
                                                <div style="height: 6px; background: #e2e8f0; border-radius: 3px; margin: 5px 0;">
                                                    <div style="height: 100%; width: ${value}%; background: ${this.getDimensionColor(key)}; border-radius: 3px;"></div>
                                                </div>
                                                <div style="font-size: 12px; font-weight: 600; color: #1e293b;">${Math.round(value)}%</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                
                                <div style="margin-top: 15px;">
                                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #475569;">Pistes incluses (${s.pistes.length})</h4>
                                    <ul style="list-style: none; padding: 0; margin: 0;">
                                        ${s.pistes.slice(0, 10).map(p => `
                                            <li style="padding: 6px; border-bottom: 1px solid #f1f5f9; display: flex; gap: 8px;">
                                                <span style="font-family: monospace; color: #FF6B35; min-width: 45px;">${p.numero}</span>
                                                <span style="color: #334155;">${p.titre || 'Sans titre'}</span>
                                                <span style="margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: ${this.getPriorityColor(p.priorite)};"></span>
                                            </li>
                                        `).join('')}
                                        ${s.pistes.length > 10 ? `<li style="padding: 6px; color: #64748b; font-style: italic;">... et ${s.pistes.length - 10} autres pistes</li>` : ''}
                                    </ul>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <div style="text-align: center; margin-top: 40px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                    <p>Document généré automatiquement - CDG 2026 Safety Management System</p>
                </div>
            `;

            // Ajouter au body temporairement
            document.body.appendChild(pdfContainer);

            // Options pour le PDF
            const opt = {
                margin:        [0.5, 0.5, 0.5, 0.5],
                filename:      `comparaison-scenarios-${new Date().toISOString().slice(0,10)}.pdf`,
                image:         { type: 'jpeg', quality: 0.98 },
                html2canvas:   {
                    scale: 2,
                    letterRendering: true,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                },
                jsPDF:         { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Générer le PDF
            await html2pdf().set(opt).from(pdfContainer).save();

            // Nettoyer
            document.body.removeChild(pdfContainer);
            document.body.removeChild(loadingMsg);

            if (window.Notifications) {
                Notifications.success('PDF généré avec succès !');
            }

        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            
            const loadingMsg = document.querySelector('.pdf-loading');
            if (loadingMsg) document.body.removeChild(loadingMsg);

            if (window.Notifications) {
                Notifications.error('Erreur lors de la génération du PDF');
            } else {
                alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
            }
        }
    },

    renderPDFScoringRows(selectedScenarios) {
        const metrics = [
            { key: 'budget', label: 'Budget total', format: 'currency', higher: false },
            { key: 'impact', label: 'Impact moyen', format: 'number', higher: true, suffix: '/100' },
            { key: 'accidents', label: 'Accidents évités/an', format: 'number', higher: true },
            { key: 'pistes', label: 'Nombre de pistes', format: 'number', higher: false },
            { key: 'roi', label: 'ROI moyen', format: 'months', higher: false },
            { key: 'duree', label: 'Durée moyenne', format: 'months', higher: false },
            { key: 'equilibre', label: 'Équilibre dimensions', format: 'percent', higher: true }
        ];

        return metrics.map(metric => {
            const values = selectedScenarios.map(s => this.getMetricValue(s.pistes, metric.key));
            const bestValue = metric.higher ? Math.max(...values) : Math.min(...values);
            
            return `
                <tr>
                    <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: 500;">${metric.label}</td>
                    ${selectedScenarios.map(s => {
                        const value = this.getMetricValue(s.pistes, metric.key);
                        const isBest = value === bestValue;
                        return `
                            <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; ${isBest ? 'background: #f0fdf4; font-weight: 600;' : ''}">
                                ${this.formatMetricValue(value, metric.format)}
                                ${isBest ? ' ★' : ''}
                            </td>
                        `;
                    }).join('')}
                    <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; background: #eff6ff; color: #003D82;">
                        ${this.formatMetricValue(bestValue, metric.format)}
                    </td>
                </tr>
            `;
        }).join('');
    },

    getPriorityColor(priority) {
        const colors = { 'P1': '#dc2626', 'P2': '#f97316', 'P3': '#eab308', 'P4': '#3b82f6' };
        return colors[priority] || '#94a3b8';
    },

    rerender() {
        this.render().then(html => {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = html;
                setTimeout(() => this.initRadarCharts(), 100);
            }
        });
    },

    setup() {
        setTimeout(() => this.initRadarCharts(), 100);
    },

    getStyles() {
        return `<style>
            .compare-wrapper {
                padding: 32px;
                background: #f8fafc;
                min-height: 100vh;
                font-family: 'Public Sans', sans-serif;
            }

            .compare-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 32px;
                background: white;
                padding: 24px 32px;
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .compare-header h1 {
                display: flex;
                align-items: center;
                gap: 12px;
                margin: 0 0 8px 0;
                font-size: 24px;
                color: #1e293b;
            }

            .compare-header h1 .material-symbols-outlined {
                font-size: 32px;
                color: #FF6B35;
            }

            .header-subtitle {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }

            .btn-export {
                background: #003D82;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }

            .btn-export:hover:not(:disabled) {
                background: #002a5c;
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0,61,130,0.2);
            }

            .btn-export:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .scenario-selector {
                background: white;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .scenario-selector h3 {
                margin: 0 0 20px 0;
                color: #1e293b;
                font-size: 18px;
            }

            .selector-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 16px;
                margin-bottom: 20px;
            }

            .scenario-checkbox {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .scenario-checkbox:hover {
                border-color: #FF6B35;
                background: #fff7ed;
            }

            .scenario-checkbox.current {
                border-color: #003D82;
                background: #eff6ff;
            }

            .scenario-checkbox input[type=checkbox] {
                margin-top: 3px;
                accent-color: #FF6B35;
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .checkbox-content {
                flex: 1;
            }

            .scenario-name {
                display: block;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 4px;
            }

            .scenario-count {
                display: inline-block;
                font-size: 12px;
                color: #64748b;
                background: #f1f5f9;
                padding: 2px 8px;
                border-radius: 999px;
                margin-right: 8px;
            }

            .scenario-date {
                font-size: 11px;
                color: #94a3b8;
            }

            .selection-info {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 16px;
                background: #f8fafc;
                border-radius: 8px;
                color: #475569;
                font-size: 14px;
            }

            .selection-info .material-symbols-outlined {
                font-size: 18px;
                color: #FF6B35;
            }

            .scoring-table-container {
                background: white;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .scoring-table-container h3 {
                margin: 0 0 20px 0;
                color: #1e293b;
                font-size: 18px;
            }

            .scoring-table {
                width: 100%;
                border-collapse: collapse;
            }

            .scoring-table th {
                padding: 12px;
                background: #f8fafc;
                font-weight: 600;
                color: #475569;
                text-align: center;
            }

            .scoring-table td {
                padding: 10px 12px;
                border-bottom: 1px solid #f1f5f9;
            }

            .metric-label-cell {
                font-weight: 500;
                color: #1e293b;
            }

            .metric-value-cell {
                text-align: center;
                position: relative;
            }

            .metric-value-cell.best-value {
                background: #f0fdf4;
                color: #166534;
                font-weight: 600;
            }

            .best-badge {
                display: inline-block;
                margin-left: 6px;
                padding: 2px 6px;
                background: #10b981;
                color: white;
                font-size: 10px;
                border-radius: 999px;
            }

            .best-score-cell {
                text-align: center;
                font-weight: 700;
                color: #003D82;
                background: #eff6ff;
            }

            .scenario-header-cell {
                min-width: 200px;
            }

            .scenario-header-title {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }

            .current-badge {
                font-size: 10px;
                padding: 2px 6px;
                background: #003D82;
                color: white;
                border-radius: 999px;
            }

            .compare-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 24px;
                margin-top: 24px;
            }

            .scenario-column {
                background: white;
                border-radius: 12px;
                padding: 24px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                position: relative;
                transition: all 0.3s;
                display: flex;
                flex-direction: column;
            }

            .scenario-column:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px rgba(0,0,0,0.1);
            }

            .scenario-column.current {
                border: 2px solid #003D82;
            }

            .scenario-header {
                position: relative;
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid #e2e8f0;
            }

            .scenario-title {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;
            }

            .scenario-title h3 {
                margin: 0;
                font-size: 18px;
                color: #1e293b;
                flex: 1;
            }

            .badge-current {
                font-size: 10px;
                padding: 2px 8px;
                background: #003D82;
                color: white;
                border-radius: 999px;
            }

            .btn-remove {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                background: #fee2e2;
                color: #dc2626;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: all 0.2s;
            }

            .scenario-column:hover .btn-remove {
                opacity: 1;
            }

            .btn-remove:hover {
                background: #dc2626;
                color: white;
                transform: scale(1.1);
            }

            .dimension-radar-container {
                text-align: center;
                margin-bottom: 24px;
                padding: 16px;
                background: #f8fafc;
                border-radius: 8px;
            }

            .dimension-radar-container h4 {
                margin: 0 0 16px 0;
                font-size: 14px;
                color: #475569;
            }

            .dimension-radar {
                max-width: 250px;
                max-height: 250px;
                margin: 0 auto;
            }

            .dimension-legend {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 12px;
                margin-top: 16px;
            }

            .legend-item {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 11px;
            }

            .legend-color {
                width: 10px;
                height: 10px;
                border-radius: 2px;
            }

            .legend-label {
                color: #64748b;
            }

            .legend-value {
                font-weight: 600;
                color: #1e293b;
            }

            .scenario-metrics {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
                margin-bottom: 24px;
            }

            .metric-card {
                background: #f8fafc;
                padding: 12px;
                border-radius: 8px;
                text-align: center;
                position: relative;
                transition: all 0.2s;
            }

            .metric-card:hover {
                background: #f1f5f9;
            }

            .metric-label {
                font-size: 11px;
                color: #64748b;
                display: block;
                margin-bottom: 4px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
            }

            .metric-value {
                font-size: 18px;
                font-weight: 700;
                color: #1e293b;
                display: block;
            }

            .metric-value.impact {
                color: #003D82;
            }

            .metric-value.success {
                color: #10b981;
            }

            .metric-trend {
                position: absolute;
                top: 4px;
                right: 4px;
                font-size: 10px;
                padding: 2px 4px;
                border-radius: 4px;
            }

            .metric-trend.positive {
                background: #d1fae5;
                color: #065f46;
            }

            .metric-trend.negative {
                background: #fee2e2;
                color: #b91c1c;
            }

            .pistes-list {
                flex: 1;
                margin-bottom: 20px;
            }

            .pistes-list h4 {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                margin: 0 0 12px 0;
                color: #475569;
            }

            .pistes-list h4 .material-symbols-outlined {
                font-size: 18px;
                color: #FF6B35;
            }

            .pistes-scroll {
                max-height: 250px;
                overflow-y: auto;
                border: 1px solid #f1f5f9;
                border-radius: 6px;
            }

            .piste-item-compare {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-bottom: 1px solid #f1f5f9;
                cursor: pointer;
                transition: all 0.2s;
            }

            .piste-item-compare:hover {
                background: #fff7ed;
            }

            .piste-item-compare:last-child {
                border-bottom: none;
            }

            .piste-id {
                font-family: monospace;
                font-size: 11px;
                font-weight: 700;
                color: #FF6B35;
                min-width: 45px;
            }

            .piste-title {
                flex: 1;
                font-size: 12px;
                color: #334155;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .priority-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .priority-dot.priority-critical { background: #dc2626; }
            .priority-dot.priority-high { background: #f97316; }
            .priority-dot.priority-medium { background: #eab308; }
            .priority-dot.priority-low { background: #3b82f6; }

            .scenario-footer {
                display: flex;
                gap: 8px;
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid #e2e8f0;
            }

            .btn-duplicate, .btn-edit {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 8px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                background: white;
                color: #475569;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-duplicate:hover, .btn-edit:hover {
                border-color: #FF6B35;
                color: #FF6B35;
            }

            .no-selection {
                text-align: center;
                padding: 60px 20px;
                background: white;
                border-radius: 12px;
                color: #64748b;
            }

            .no-selection .material-symbols-outlined {
                font-size: 48px;
                color: #94a3b8;
                margin-bottom: 16px;
            }

            .no-selection h3 {
                margin: 0 0 8px 0;
                color: #1e293b;
            }

            .no-selection p {
                margin: 0;
            }

            /* Styles pour le chargement PDF */
            .pdf-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(5px);
            }
            
            .pdf-loading-content {
                background: white;
                padding: 30px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f1f5f9;
                border-top: 4px solid #FF6B35;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 1024px) {
                .compare-container {
                    grid-template-columns: 1fr;
                }
                
                .selector-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 640px) {
                .compare-wrapper {
                    padding: 16px;
                }
                
                .selector-grid {
                    grid-template-columns: 1fr;
                }
                
                .scoring-table {
                    font-size: 12px;
                }
            }
        </style>`;
    }
};

// Exporter pour usage global
window.pages = window.pages || {};
window.pages.Compare = pages.Compare;
