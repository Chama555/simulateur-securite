/**
 * PAGES/DECIDE.JS - Page de validation et export (Design professionnel)
 * ENRICHIE: Sélecteur de simulations, récapitulatif détaillé et impression
 */

pages.Decide = {
    selectedTracks: [],
    totalBudget: 0,
    totalImpact: 0,
    selectedSimulationId: 'current',
    simulations: [],
    expandedPistes: [], // IDs des pistes dépliées pour les détails

    async render() {
        const state = appStore ? appStore.getState() : {};
        const currentTracks = state.currentScenario || [];
        const allPistes = state.allPistes || [];
        const scenarios = state.scenarios || [];
        
        // Construire la liste des simulations disponibles
        this.simulations = [
            { id: 'current', name: 'Scénario en cours', pistes: currentTracks, createdAt: new Date() },
            ...scenarios.map(s => ({ id: s.id, name: s.name, pistes: s.pistes, createdAt: new Date(s.createdAt) }))
        ].filter(s => s.pistes.length > 0);

        // Simulation sélectionnée
        const selectedSim = this.simulations.find(s => s.id === this.selectedSimulationId) || this.simulations[0];
        const tracksToShow = selectedSim ? selectedSim.pistes : currentTracks;

        // Calculer les métriques
        const totalBudget = tracksToShow.reduce((sum, t) => sum + (t.budget?.cout_3_ans || 0), 0);
        const totalImpact = tracksToShow.length > 0 
            ? Math.round(tracksToShow.reduce((sum, t) => sum + (t.impact_score || 0), 0) / tracksToShow.length)
            : 0;

        // Pistes à afficher (les 5 premières + indication des autres)
        const displayedTracks = tracksToShow.slice(0, 5);
        const remainingCount = Math.max(0, tracksToShow.length - 5);

        // Statistiques par priorité
        const priorityStats = this.calculatePriorityStats(tracksToShow);
        
        // Distribution dimensionnelle
        const dimensionScores = this.calculateAggregatedDimensions(tracksToShow);

        return `
            <div class="decide-wrapper">
                <!-- Header avec sélecteur de simulation -->
                <header class="decide-header">
                    <div class="header-inner">
                        <div class="header-left">
                            <div class="logo-box">
                                <span class="material-symbols-outlined">shield</span>
                            </div>
                            <div>
                             </div>
                        </div>
                        
                        <div class="simulation-selector">
                            <label for="simulation-select" class="selector-label">
                                <span class="material-symbols-outlined">playlist_play</span>
                                Simulation :
                            </label>
                            <select id="simulation-select" class="simulation-select" onchange="pages.Decide.changeSimulation(this.value)">
                                ${this.simulations.map(s => `
                                    <option value="${s.id}" ${s.id === this.selectedSimulationId ? 'selected' : ''}>
                                        ${s.name} (${s.pistes.length} pistes - ${new Date(s.createdAt).toLocaleDateString('fr-FR')})
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <div class="header-actions">
                            <button class="btn-print" onclick="window.print()">
                                <span class="material-symbols-outlined">print</span>
                                Imprimer
                            </button>
                        </div>
                    </div>
                </header>

                <main class="decide-main">
                    <!-- Titre et badge -->
                    <div class="title-section">
                        <div class="title-left">
                            <h2 class="main-title">Validation finale du plan d'action</h2>
                            <p class="main-subtitle">
                                ${selectedSim ? selectedSim.name : 'Scénario en cours'} - 
                                ${tracksToShow.length} pistes sélectionnées
                            </p>
                        </div>
                        <div class="validation-badge ${tracksToShow.length > 0 ? 'ready' : 'empty'}">
                            <span class="material-symbols-outlined">${tracksToShow.length > 0 ? 'check_circle' : 'info'}</span>
                            <span>${tracksToShow.length > 0 ? 'PRÊT POUR VALIDATION' : 'AUCUNE PISTE SÉLECTIONNÉE'}</span>
                        </div>
                    </div>

                    <!-- Statistiques clés -->
                    <div class="key-stats">
                        <div class="stat-card">
                            <span class="stat-icon material-symbols-outlined">payments</span>
                            <div class="stat-content">
                                <span class="stat-label">Budget total</span>
                                <span class="stat-value">${this.formatCurrency(totalBudget)}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon material-symbols-outlined">analytics</span>
                            <div class="stat-content">
                                <span class="stat-label">Impact moyen</span>
                                <span class="stat-value">${totalImpact}/100</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon material-symbols-outlined">priority_high</span>
                            <div class="stat-content">
                                <span class="stat-label">Priorité P1</span>
                                <span class="stat-value">${priorityStats.P1 || 0}</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <span class="stat-icon material-symbols-outlined">trending_down</span>
                            <div class="stat-content">
                                <span class="stat-label">Accidents évités</span>
                                <span class="stat-value">${tracksToShow.reduce((sum, t) => sum + (t.impact_accidents_evites || 0), 0)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Distribution dimensionnelle -->
                    <div class="dimensions-section">
                        <h3 class="section-title">
                            <span class="material-symbols-outlined">donut_large</span>
                            Distribution dimensionnelle du plan
                        </h3>
                        <div class="dimensions-bars">
                            ${Object.entries(dimensionScores).map(([key, value]) => `
                                <div class="dimension-bar-item">
                                    <div class="dimension-bar-label">
                                        <span class="dimension-color" style="background-color: ${this.getDimensionColor(key)}"></span>
                                        <span class="dimension-name">${this.getDimensionLabel(key)}</span>
                                        <span class="dimension-value">${Math.round(value)}%</span>
                                    </div>
                                    <div class="dimension-bar-container">
                                        <div class="dimension-bar-fill" style="width: ${value}%; background-color: ${this.getDimensionColor(key)}"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Tableau des pistes avec détails expansibles -->
                    <div class="tracks-table-section">
                        <div class="table-header">
                            <h3 class="table-title">
                                <span class="material-symbols-outlined">list_alt</span>
                                Détail des pistes sélectionnées
                            </h3>
                            <span class="table-count">${tracksToShow.length} PISTE(S) SÉLECTIONNÉE(S)</span>
                        </div>

                        <div class="table-wrapper">
                            <table class="tracks-table" id="tracks-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Titre</th>
                                        <th>Priorité</th>
                                        <th>Budget (3 ans)</th>
                                        <th>Impact</th>
                                        <th>ROI</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tracksToShow.map((track, idx) => `
                                        <tr class="track-main-row ${this.expandedPistes.includes(track.numero) ? 'expanded' : ''}">
                                            <td class="expand-cell">
                                                <button class="btn-expand" onclick="pages.Decide.togglePisteDetails('${track.numero}')">
                                                    <span class="material-symbols-outlined">
                                                        ${this.expandedPistes.includes(track.numero) ? 'expand_less' : 'expand_more'}
                                                    </span>
                                                </button>
                                            </td>
                                            <td class="id-cell">${track.numero}</td>
                                            <td class="title-cell">${track.titre || 'Sans titre'}</td>
                                            <td class="priority-cell">
                                                <span class="priority-badge priority-${this.getPriorityClass(track.priorite)}">
                                                    ${track.priorite || 'P3'}
                                                </span>
                                            </td>
                                            <td class="budget-cell">${this.formatCurrency(track.budget?.cout_3_ans || 0)}</td>
                                            <td class="impact-cell">
                                                <span class="impact-badge impact-${this.getImpactLevel(track.impact_score || 0)}">
                                                    ${track.impact_score || 0}/100
                                                </span>
                                            </td>
                                            <td class="roi-cell">${track.roi_mois || '?'} mois</td>
                                            <td class="actions-cell">
                                                <button class="btn-icon" onclick="pages.Decide.viewPisteDetails('${track.numero}')" title="Voir détails">
                                                    <span class="material-symbols-outlined">visibility</span>
                                                </button>
                                                <button class="btn-icon" onclick="pages.Decide.removeFromScenario('${track.numero}')" title="Retirer">
                                                    <span class="material-symbols-outlined">close</span>
                                                </button>
                                            </td>
                                        </tr>
                                        ${this.expandedPistes.includes(track.numero) ? `
                                            <tr class="track-details-row">
                                                <td colspan="8">
                                                    <div class="track-details">
                                                        <div class="details-grid">
                                                            <div class="details-section">
                                                                <h4>Description</h4>
                                                                <p>${track.description_longue || track.description || 'Aucune description disponible'}</p>
                                                            </div>
                                                            
                                                            <div class="details-section">
                                                                <h4>Métriques détaillées</h4>
                                                                <div class="metrics-grid">
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Budget 2026</span>
                                                                        <span class="metric-detail-value">${this.formatCurrency(track.budget?.cout_2026 || 0)}</span>
                                                                    </div>
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Budget 2027</span>
                                                                        <span class="metric-detail-value">${this.formatCurrency(track.budget?.cout_2027 || 0)}</span>
                                                                    </div>
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Budget 2028</span>
                                                                        <span class="metric-detail-value">${this.formatCurrency(track.budget?.cout_2028 || 0)}</span>
                                                                    </div>
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Coût récurrent</span>
                                                                        <span class="metric-detail-value">${this.formatCurrency(track.budget?.cout_recurrent_annuel || 0)}/an</span>
                                                                    </div>
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Accidents évités</span>
                                                                        <span class="metric-detail-value">${track.impact_accidents_evites || 0}/an</span>
                                                                    </div>
                                                                    <div class="metric-detail">
                                                                        <span class="metric-detail-label">Économies</span>
                                                                        <span class="metric-detail-value">${this.formatCurrency(track.impact_economies || 0)}/an</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            ${track.dimensions ? `
                                                                <div class="details-section">
                                                                    <h4>Dimensions</h4>
                                                                    <div class="dimensions-mini">
                                                                        ${Object.entries(track.dimensions).map(([key, value]) => `
                                                                            <div class="dimension-mini-item">
                                                                                <span class="dimension-mini-label">${this.getDimensionLabel(key)}</span>
                                                                                <div class="dimension-mini-bar">
                                                                                    <div class="dimension-mini-fill" style="width: ${value}%; background-color: ${this.getDimensionColor(key)}"></div>
                                                                                </div>
                                                                                <span class="dimension-mini-value">${value}%</span>
                                                                            </div>
                                                                        `).join('')}
                                                                    </div>
                                                                </div>
                                                            ` : ''}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ` : ''}
                                    `).join('')}
                                    
                                    ${remainingCount > 0 ? `
                                        <tr class="other-tracks-row">
                                            <td colspan="8" class="text-center">
                                                ... et ${remainingCount} autres pistes sélectionnées
                                                <button class="btn-show-all" onclick="pages.Decide.showAllTracks()">
                                                    Voir tout
                                                </button>
                                            </td>
                                        </tr>
                                    ` : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Résumé Exécutif -->
                    <div class="summary-section">
                        <div class="executive-summary">
                            <h3 class="summary-title">
                                <span class="material-symbols-outlined">analytics</span>
                                Résumé Exécutif
                            </h3>

                            <div class="summary-grid">
                                <div class="summary-box">
                                    <p class="summary-label">INVESTISSEMENT TOTAL (2026-2028)</p>
                                    <div class="summary-value">
                                        <span class="amount">${(totalBudget / 1000000).toFixed(1)}</span>
                                        <span class="currency">M €</span>
                                    </div>

                                    <div class="budget-breakdown">
                                        <div class="breakdown-item">
                                            <span class="breakdown-label">Investissement initial</span>
                                            <span class="breakdown-value">${this.formatCurrency(totalBudget * 0.7)}</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: 70%"></div>
                                        </div>

                                        <div class="breakdown-item">
                                            <span class="breakdown-label">Coûts récurrents (3 ans)</span>
                                            <span class="breakdown-value">${this.formatCurrency(totalBudget * 0.3)}</span>
                                        </div>
                                        <div class="progress-bar opex">
                                            <div class="progress-fill" style="width: 30%"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="summary-box">
                                    <p class="summary-label">GAINS SÉCURITÉ ATTENDUS</p>
                                    <div class="summary-value gain">
                                        <span class="amount">-${(totalImpact * 0.34).toFixed(1)}</span>
                                        <span class="currency">%</span>
                                    </div>
                                    <p class="gain-subtitle">Réduction estimée des accidents corporels</p>

                                    <div class="gain-items">
                                        <div class="gain-item">
                                            <span class="material-symbols-outlined">trending_down</span>
                                            <span><strong>${tracksToShow.reduce((sum, t) => sum + (t.impact_accidents_evites || 0), 0)}</strong> accidents évités / an</span>
                                        </div>
                                        <div class="gain-item">
                                            <span class="material-symbols-outlined">savings</span>
                                            <span><strong>${this.formatCurrency(tracksToShow.reduce((sum, t) => sum + (t.impact_economies || 0), 0))}</strong> d'économies / an</span>
                                        </div>
                                        <div class="gain-item">
                                            <span class="material-symbols-outlined">schedule</span>
                                            <span><strong>ROI moyen: ${Math.round(tracksToShow.reduce((sum, t) => sum + (t.roi_mois || 0), 0) / tracksToShow.length)} mois</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tableau récapitulatif des pistes -->
                            <div class="summary-tracks">
                                <h4>Récapitulatif des pistes</h4>
                                <table class="summary-tracks-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Titre</th>
                                            <th>Priorité</th>
                                            <th>Budget</th>
                                            <th>Impact</th>
                                            <th>ROI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tracksToShow.map(track => `
                                            <tr>
                                                <td>${track.numero}</td>
                                                <td>${track.titre}</td>
                                                <td><span class="priority-dot priority-${this.getPriorityClass(track.priorite)}"></span> ${track.priorite || 'P3'}</td>
                                                <td>${this.formatCurrency(track.budget?.cout_3_ans || 0)}</td>
                                                <td>${track.impact_score || 0}</td>
                                                <td>${track.roi_mois || '?'} mois</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Note de Validation -->
                        <div class="validation-note">
                            <div class="note-header">
                                <span class="material-symbols-outlined">info</span>
                                <span>Note de Validation</span>
                            </div>
                            <p class="note-content">
                                Ce plan d'action a été consolidé sur la base des simulations multicritères. 
                                Les budgets incluent une marge de contingence de 10%. Les scores d'impact sont basés 
                                sur les données historiques CDG 2024-2025.
                            </p>
                            <div class="note-footer">
                                <p class="note-footer-label">ID DE CONFIGURATION</p>
                                <p class="note-footer-value">SEC-2026-${this.selectedSimulationId.toUpperCase().slice(0,8)}-${new Date().toISOString().slice(0,10).replace(/-/g, '')}</p>
                            </div>
                            <div class="note-footer">
                                <p class="note-footer-label">DATE DE GÉNÉRATION</p>
                                <p class="note-footer-value">${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div class="note-signature">
                                <p>Validé par : _________________________</p>
                                <p>Date : _________________________</p>
                            </div>
                        </div>
                    </div>

                    <!-- Actions d'Export -->
                    <div class="export-section">
                        <button class="btn-export-pdf" onclick="pages.Decide.exportPDF()">
                            <span class="material-symbols-outlined">picture_as_pdf</span>
                            Exporter en PDF (Plan détaillé)
                        </button>
                    </div>
                    
                </main>

                <!-- Footer avec signature -->
                <footer class="decide-footer print-only">
                    <div class="footer-inner">
                        <div class="footer-left">
                            <span class="material-symbols-outlined">description</span>
                            Document généré le ${new Date().toLocaleDateString('fr-FR')}
                        </div>
                        <div class="footer-right">
                            <span>CDG 2026 - Safety Management System</span>
                        </div>
                    </div>
                </footer>
            </div>

            ${this.getStyles()}
            
            <!-- Styles d'impression -->
            <style media="print">
                @page {
                    size: A4;
                    margin: 1.5cm;
                }
                
                .decide-header, .export-section, .btn-expand, .btn-icon, .btn-show-all, 
                .simulation-selector, .header-actions, .btn-print {
                    display: none !important;
                }
                
                .print-only {
                    display: block !important;
                }
                
                .decide-wrapper {
                    background: white;
                    padding: 0;
                }
                
                .track-details {
                    display: block !important;
                    page-break-inside: avoid;
                }
                
                .tracks-table {
                    page-break-inside: auto;
                }
                
                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }
                
                thead {
                    display: table-header-group;
                }
                
                tfoot {
                    display: table-footer-group;
                }
                
                .validation-note {
                    border: 1px solid #000;
                    page-break-inside: avoid;
                }
                
                .note-signature {
                    margin-top: 40px;
                }
            </style>
        `;
    },

    calculatePriorityStats(tracks) {
        const stats = {};
        tracks.forEach(t => {
            const priority = t.priorite || 'P3';
            stats[priority] = (stats[priority] || 0) + 1;
        });
        return stats;
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
        
        const total = Object.values(dims).reduce((a, b) => a + b, 0);
        if (total > 0) {
            Object.keys(dims).forEach(key => {
                dims[key] = (dims[key] / total) * 100;
            });
        }
        
        return dims;
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

    changeSimulation(simulationId) {
        this.selectedSimulationId = simulationId;
        this.expandedPistes = []; // Replier toutes les pistes
        this.rerender();
    },

    togglePisteDetails(pisteId) {
        if (this.expandedPistes.includes(pisteId)) {
            this.expandedPistes = this.expandedPistes.filter(id => id !== pisteId);
        } else {
            this.expandedPistes.push(pisteId);
        }
        this.rerender();
    },

    viewPisteDetails(pisteId) {
        if (window.router) {
            window.router.navigate(`/piste-detail/${pisteId}`);
        }
    },

    removeFromScenario(pisteId) {
        const state = appStore.getState();
        const currentTracks = state.currentScenario || [];
        const updatedTracks = currentTracks.filter(t => t.numero !== pisteId);
        
        if (window.appActions) {
            appActions.setCurrentScenario(updatedTracks);
        }
        
        if (window.Notifications) {
            Notifications.success(`Piste ${pisteId} retirée du scénario`);
        }
        
        this.rerender();
    },

    showAllTracks() {
        // Dans une version améliorée, on pourrait afficher toutes les pistes
        // Pour l'instant, on peut simplement étendre la table
        alert('Fonctionnalité à venir : affichage de toutes les pistes');
    },

    getImpactLevel(impact) {
        if (impact >= 85) return 'high';
        if (impact >= 70) return 'medium';
        if (impact >= 50) return 'low';
        return 'minimal';
    },

    getPriorityClass(priority) {
        const map = { 'P1': 'critical', 'P2': 'high', 'P3': 'medium', 'P4': 'low' };
        return map[priority] || 'medium';
    },

    formatCurrency(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + ' M€';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' k€';
        }
        return amount + ' €';
    },

    async exportPDF() {
        try {
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

            // Charger html2pdf si nécessaire
            if (typeof window.html2pdf === 'undefined') {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
            }

            const element = document.querySelector('.decide-wrapper');
            
            // Options pour le PDF
            const opt = {
                margin:        [0.5, 0.5, 0.5, 0.5],
                filename:      `plan-action-${this.selectedSimulationId}-${new Date().toISOString().slice(0,10)}.pdf`,
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
            await html2pdf().set(opt).from(element).save();

            document.body.removeChild(loadingMsg);

            if (window.Notifications) {
                Notifications.success('PDF généré avec succès !');
            }

        } catch (error) {
            console.error('Erreur PDF:', error);
            const loadingMsg = document.querySelector('.pdf-loading');
            if (loadingMsg) document.body.removeChild(loadingMsg);
            
            if (window.Notifications) {
                Notifications.error('Erreur lors de la génération du PDF');
            }
        }
    },

    exportJSON() {
        const state = appStore.getState();
        const selectedSim = this.simulations.find(s => s.id === this.selectedSimulationId);
        
        const exportData = {
            generatedAt: new Date().toISOString(),
            simulation: {
                id: selectedSim.id,
                name: selectedSim.name,
                createdAt: selectedSim.createdAt
            },
            metrics: {
                totalBudget: selectedSim.pistes.reduce((sum, t) => sum + (t.budget?.cout_3_ans || 0), 0),
                averageImpact: selectedSim.pistes.length > 0 
                    ? Math.round(selectedSim.pistes.reduce((sum, t) => sum + (t.impact_score || 0), 0) / selectedSim.pistes.length)
                    : 0,
                totalAccidents: selectedSim.pistes.reduce((sum, t) => sum + (t.impact_accidents_evites || 0), 0),
                totalEconomies: selectedSim.pistes.reduce((sum, t) => sum + (t.impact_economies || 0), 0)
            },
            tracks: selectedSim.pistes.map(t => ({
                numero: t.numero,
                titre: t.titre,
                priorite: t.priorite,
                categorie: t.categorie,
                budget: t.budget,
                impact_score: t.impact_score,
                delai_mois: t.delai_mois,
                roi_mois: t.roi_mois,
                dimensions: t.dimensions
            }))
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plan-action-${this.selectedSimulationId}-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);

        if (window.Notifications) {
            Notifications.success('JSON exporté avec succès');
        }
    },

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    setupEventListeners() {
        console.log('Setup event listeners - Decide');
        
        // Ajouter un écouteur pour l'impression
        window.addEventListener('beforeprint', () => {
            // Préparer l'affichage pour l'impression
            document.querySelectorAll('.track-details').forEach(el => {
                el.style.display = 'block';
            });
        });
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

    getStyles() {
        return `<style>
            * { margin: 0; padding: 0; box-sizing: border-box; }

            .decide-wrapper {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background: var(--gray-50);
                font-family: 'Inter', sans-serif;
                color: var(--gray-900);
            }

            .decide-header {
                background: white;
                border-bottom: 1px solid var(--gray-200);
                padding: 16px 32px;
                position: sticky;
                top: 0;
                z-index: 40;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }

            .header-inner {
                max-width: 1280px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
            }

            .header-left {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            .logo-box {
                width: 40px;
                height: 40px;
                background: var(--cdg-navy);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .header-title {
                font-size: 18px;
                font-weight: 700;
                color: var(--gray-800);
            }

            .header-subtitle {
                font-size: 12px;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: 600;
            }

            .simulation-selector {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
                max-width: 500px;
            }

            .selector-label {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 14px;
                color: var(--gray-600);
            }

            .simulation-select {
                flex: 1;
                padding: 10px 12px;
                border: 1px solid var(--gray-300);
                border-radius: 8px;
                font-size: 14px;
                color: var(--gray-900);
                background: white;
                cursor: pointer;
            }

            .simulation-select:focus {
                outline: none;
                border-color: var(--cdg-orange);
                box-shadow: 0 0 0 3px rgba(255,107,53,0.1);
            }

            .header-actions {
                display: flex;
                gap: 8px;
            }

            .btn-print {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                background: white;
                color: var(--gray-700);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-print:hover {
                background: var(--gray-50);
                border-color: var(--cdg-orange);
                color: var(--cdg-orange);
            }

            .decide-main {
                flex: 1;
                max-width: 1280px;
                margin: 0 auto;
                width: 100%;
                padding: 40px 32px;
            }

            .title-section {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 32px;
            }

            .title-left {
                flex: 1;
            }

            .main-title {
                font-size: 32px;
                font-weight: 700;
                color: var(--gray-900);
                margin-bottom: 8px;
            }

            .main-subtitle {
                font-size: 16px;
                color: var(--gray-600);
            }

            .validation-badge {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .validation-badge.ready {
                background: #d1fae5;
                color: #065f46;
            }

            .validation-badge.empty {
                background: #fee2e2;
                color: #b91c1c;
            }

            .key-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin-bottom: 32px;
            }

            .stat-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px;
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }

            .stat-icon {
                font-size: 32px;
                color: var(--cdg-orange);
            }

            .stat-content {
                flex: 1;
            }

            .stat-label {
                display: block;
                font-size: 12px;
                color: var(--gray-500);
                margin-bottom: 4px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
            }

            .stat-value {
                display: block;
                font-size: 24px;
                font-weight: 700;
                color: var(--gray-900);
            }

            .dimensions-section {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 32px;
            }

            .section-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                font-weight: 700;
                color: var(--gray-900);
                margin-bottom: 20px;
            }

            .section-title .material-symbols-outlined {
                color: var(--cdg-orange);
            }

            .dimensions-bars {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .dimension-bar-item {
                width: 100%;
            }

            .dimension-bar-label {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;
                font-size: 13px;
            }

            .dimension-color {
                width: 12px;
                height: 12px;
                border-radius: 3px;
            }

            .dimension-name {
                flex: 1;
                color: var(--gray-700);
                font-weight: 500;
            }

            .dimension-value {
                font-weight: 600;
                color: var(--gray-900);
            }

            .dimension-bar-container {
                width: 100%;
                height: 8px;
                background: var(--gray-100);
                border-radius: 4px;
                overflow: hidden;
            }

            .dimension-bar-fill {
                height: 100%;
                transition: width 0.3s ease;
            }

            .tracks-table-section {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                margin-bottom: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                overflow: hidden;
            }

            .table-header {
                padding: 16px 24px;
                border-bottom: 1px solid var(--gray-200);
                background: var(--gray-50);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .table-title {
                font-weight: 700;
                color: var(--gray-800);
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16px;
            }

            .table-count {
                font-size: 12px;
                font-weight: 700;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .table-wrapper {
                overflow-x: auto;
            }

            .tracks-table {
                width: 100%;
                text-align: left;
                border-collapse: collapse;
            }

            .tracks-table th {
                padding: 16px 12px;
                font-size: 12px;
                font-weight: 600;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                background: var(--gray-50);
                border-bottom: 1px solid var(--gray-200);
            }

            .tracks-table td {
                padding: 12px;
                font-size: 14px;
                border-bottom: 1px solid var(--gray-200);
                vertical-align: middle;
            }

            .track-main-row.expanded {
                background: #fff7ed;
            }

            .expand-cell {
                width: 40px;
                text-align: center;
            }

            .btn-expand {
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 6px;
                background: transparent;
                color: var(--gray-500);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .btn-expand:hover {
                background: var(--gray-100);
                color: var(--cdg-orange);
            }

            .id-cell {
                font-family: 'Courier New', monospace;
                font-weight: 600;
                color: var(--cdg-orange);
            }

            .title-cell {
                font-weight: 500;
                color: var(--gray-800);
                max-width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .priority-badge {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 700;
            }

            .priority-badge.priority-critical { background: #fee2e2; color: #dc2626; }
            .priority-badge.priority-high { background: #ffedd5; color: #ea580c; }
            .priority-badge.priority-medium { background: #fef9c3; color: #a16207; }
            .priority-badge.priority-low { background: #dbeafe; color: #2563eb; }

            .budget-cell {
                color: var(--gray-700);
                font-weight: 500;
            }

            .impact-badge {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 700;
            }

            .impact-high { background: #dcfce7; color: #166534; }
            .impact-medium { background: #dbeafe; color: #1e40af; }
            .impact-low { background: #fed7aa; color: #9a3412; }
            .impact-minimal { background: #f1f5f9; color: #475569; }

            .roi-cell {
                color: var(--gray-600);
            }

            .actions-cell {
                white-space: nowrap;
            }

            .btn-icon {
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 6px;
                background: transparent;
                color: var(--gray-500);
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin: 0 2px;
            }

            .btn-icon:hover {
                background: var(--gray-100);
                color: var(--cdg-orange);
            }

            .track-details-row td {
                padding: 0;
                background: #f8fafc;
            }

            .track-details {
                padding: 24px;
                border-top: 1px solid var(--gray-200);
                background: #f8fafc;
            }

            .details-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
            }

            .details-section h4 {
                font-size: 14px;
                font-weight: 700;
                color: var(--gray-700);
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--gray-200);
            }

            .details-section p {
                font-size: 13px;
                color: var(--gray-600);
                line-height: 1.6;
            }

            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }

            .metric-detail {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }

            .metric-detail-label {
                color: var(--gray-500);
            }

            .metric-detail-value {
                font-weight: 600;
                color: var(--gray-800);
            }

            .dimensions-mini {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .dimension-mini-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .dimension-mini-label {
                width: 60px;
                font-size: 11px;
                color: var(--gray-500);
            }

            .dimension-mini-bar {
                flex: 1;
                height: 6px;
                background: var(--gray-200);
                border-radius: 3px;
                overflow: hidden;
            }

            .dimension-mini-fill {
                height: 100%;
            }

            .dimension-mini-value {
                width: 40px;
                font-size: 11px;
                font-weight: 600;
                color: var(--gray-700);
                text-align: right;
            }

            .other-tracks-row td {
                padding: 16px;
                text-align: center;
                color: var(--gray-500);
                font-style: italic;
            }

            .btn-show-all {
                margin-left: 12px;
                padding: 4px 12px;
                border: 1px solid var(--cdg-orange);
                border-radius: 6px;
                background: white;
                color: var(--cdg-orange);
                font-size: 12px;
                cursor: pointer;
            }

            .btn-show-all:hover {
                background: var(--cdg-orange);
                color: white;
            }

            .summary-section {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 32px;
                margin-bottom: 40px;
            }

            .executive-summary {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                padding: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }

            .summary-title {
                font-size: 20px;
                font-weight: 700;
                color: var(--gray-900);
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .summary-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 32px;
                margin-bottom: 32px;
            }

            .summary-box {
                flex: 1;
            }

            .summary-label {
                font-size: 12px;
                font-weight: 600;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 8px;
                display: block;
            }

            .summary-value {
                display: flex;
                align-items: baseline;
                gap: 8px;
                margin-bottom: 16px;
            }

            .summary-value .amount {
                font-size: 48px;
                font-weight: 900;
                color: var(--cdg-navy);
            }

            .summary-value .currency {
                font-size: 24px;
                font-weight: 700;
                color: var(--cdg-navy);
            }

            .summary-value.gain .amount {
                color: #10b981;
            }

            .gain-subtitle {
                font-size: 14px;
                color: var(--gray-600);
                font-style: italic;
                margin-bottom: 16px;
            }

            .budget-breakdown {
                padding: 16px;
                background: var(--gray-50);
                border-radius: 8px;
                border: 1px solid var(--gray-200);
            }

            .breakdown-item {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                margin-bottom: 8px;
            }

            .breakdown-label {
                color: var(--gray-500);
            }

            .breakdown-value {
                font-weight: 700;
                color: var(--gray-800);
            }

            .progress-bar {
                width: 100%;
                height: 6px;
                background: var(--gray-200);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 12px;
            }

            .progress-fill {
                height: 100%;
                background: var(--cdg-navy);
                border-radius: 3px;
            }

            .progress-bar.opex .progress-fill {
                background: var(--gray-400);
            }

            .gain-items {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .gain-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: var(--gray-700);
            }

            .summary-tracks {
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid var(--gray-200);
            }

            .summary-tracks h4 {
                font-size: 16px;
                font-weight: 700;
                color: var(--gray-800);
                margin-bottom: 16px;
            }

            .summary-tracks-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }

            .summary-tracks-table th {
                padding: 8px;
                background: var(--gray-50);
                font-weight: 600;
                color: var(--gray-600);
                text-align: left;
            }

            .summary-tracks-table td {
                padding: 8px;
                border-bottom: 1px solid var(--gray-200);
            }

            .priority-dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 4px;
            }

            .priority-dot.priority-critical { background: #dc2626; }
            .priority-dot.priority-high { background: #f97316; }
            .priority-dot.priority-medium { background: #eab308; }
            .priority-dot.priority-low { background: #3b82f6; }

            .validation-note {
                background: var(--gray-50);
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 32px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                height: fit-content;
            }

            .note-header {
                font-weight: 700;
                color: var(--cdg-navy);
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 12px;
            }

            .note-content {
                font-size: 14px;
                color: var(--gray-700);
                line-height: 1.6;
                margin-bottom: 24px;
            }

            .note-footer {
                padding: 12px 0;
                border-bottom: 1px solid var(--gray-200);
            }

            .note-footer:last-child {
                border-bottom: none;
            }

            .note-footer-label {
                font-size: 10px;
                font-weight: 700;
                color: var(--info);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 4px;
            }

            .note-footer-value {
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: var(--gray-700);
                margin: 0;
            }

            .note-signature {
                margin-top: 32px;
                padding-top: 16px;
                border-top: 2px dashed var(--gray-300);
            }

            .note-signature p {
                margin: 8px 0;
                font-size: 14px;
                color: var(--gray-600);
            }

            .export-section {
                display: flex;
                gap: 16px;
                justify-content: center;
                padding: 32px 0;
                border-top: 1px solid var(--gray-200);
            }

            .btn-export-pdf,
            .btn-export-json {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                padding: 16px 32px;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
                min-width: 280px;
            }

            .btn-export-pdf {
                background: var(--cdg-navy);
                color: white;
                box-shadow: 0 4px 6px rgba(0,61,130,0.3);
            }

            .btn-export-pdf:hover {
                background: #002a5c;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,61,130,0.4);
            }

            .btn-export-json {
                background: white;
                color: var(--gray-600);
                border: 2px solid var(--gray-200);
            }

            .btn-export-json:hover {
                border-color: var(--gray-400);
                transform: translateY(-2px);
            }

            .export-notice {
                text-align: center;
                font-size: 12px;
                color: var(--gray-400);
            }

            .decide-footer {
                border-top: 1px solid var(--gray-200);
                padding: 24px 32px;
                background: white;
            }

            .footer-inner {
                max-width: 1280px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--gray-500);
                font-size: 12px;
            }

            .print-only {
                display: none;
            }

            /* Loading PDF */
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
                padding: 40px;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }

            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--gray-200);
                border-top: 4px solid var(--cdg-orange);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 1024px) {
                .key-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .summary-section {
                    grid-template-columns: 1fr;
                }
                
                .summary-grid {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .decide-main {
                    padding: 24px 16px;
                }
                
                .title-section {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                }
                
                .header-inner {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .key-stats {
                    grid-template-columns: 1fr;
                }
                
                .details-grid {
                    grid-template-columns: 1fr;
                }
                
                .export-section {
                    flex-direction: column;
                    align-items: center;
                }
                
                .btn-export-pdf,
                .btn-export-json {
                    width: 100%;
                }
            }
        </style>`;
    }
};

window.pages = window.pages || {};
window.pages.Decide = pages.Decide;