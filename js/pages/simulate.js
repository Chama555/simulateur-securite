/**
 * PAGES/SIMULATE.JS - Page de simulation des scénarios avec gestion CRUD
 * AJOUT: Boutons pour visualiser le détail du scénario
 */

pages.Simulate = {
    currentScenario: {
        id: null,
        name: 'Nouveau scénario',
        tracks: [],
        createdAt: new Date().toISOString()
    },
    scenarios: [],

    async render() {
        // Charger les pistes depuis appStore
        const state = appStore ? appStore.getState() : {};
        let allPistes = state.allPistes || [];
        
        // Charger les scénarios depuis le store
        this.scenarios = state.scenarios || [];
        
        console.log('🔍 Simulate render - allPistes count:', allPistes.length);
        console.log('🔍 Scénarios chargés:', this.scenarios.length);
        
        // Récupérer le scénario courant
        const currentTracks = state.currentScenario || [];
        this.currentScenario.tracks = currentTracks;
        
        // IMPORTANT: Vérifier si un ID de scénario est stocké dans le state
        if (state.currentScenarioId) {
            const selectedScenario = this.scenarios.find(s => s.id === state.currentScenarioId);
            if (selectedScenario) {
                this.currentScenario.id = selectedScenario.id;
                this.currentScenario.name = selectedScenario.name;
                this.currentScenario.createdAt = selectedScenario.createdAt;
            }
        } else if (currentTracks.length > 0 && !this.currentScenario.id) {
            this.currentScenario.name = 'Scénario en cours';
        }
        
        // Calculer les métriques
        const totalBudget = currentTracks.reduce((sum, t) => sum + (t.budget?.cout_3_ans || 0), 0);
        const totalImpact = currentTracks.reduce((sum, t) => sum + (t.impact_score || 0), 0);
        const avgRoi = currentTracks.length > 0 
            ? Math.round(currentTracks.reduce((sum, t) => sum + (t.roi_mois || 0), 0) / currentTracks.length) 
            : 0;

        // Créer map des pistes sélectionnées
        const selectedMap = new Set(currentTracks.map(t => t.numero));

        // Générer HTML des pistes
        let pistesList = this.renderPistesList(allPistes, selectedMap);

        return `
            <div class="simulate-wrapper">
                <!-- Barre d'en-tête avec gestion CRUD -->
                <div class="simulate-header">
                    <div class="scenario-crud">
                        <label class="scenario-label">SCÉNARIO</label>
                        <div class="scenario-selector">
                            <select id="scenario-select" class="scenario-select" onchange="pages.Simulate.loadSelectedScenario(this.value)">
                                <option value="">-- Nouveau scénario --</option>
                                ${this.renderScenarioOptions()}
                            </select>
                            
                            <div class="scenario-actions">
                                <button class="crud-btn save-btn" onclick="pages.Simulate.saveCurrentScenario()" title="Sauvegarder">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                                <button class="crud-btn new-btn" onclick="pages.Simulate.createNewScenario()" title="Nouveau scénario">
                                    <span class="material-symbols-outlined">add_circle</span>
                                </button>
                                <button class="crud-btn delete-btn" onclick="pages.Simulate.deleteCurrentScenario()" title="Supprimer">
                                    <span class="material-symbols-outlined">delete</span>
                                </button>
                                <button class="crud-btn duplicate-btn" onclick="pages.Simulate.duplicateScenario()" title="Dupliquer">
                                    <span class="material-symbols-outlined">content_copy</span>
                                </button>
                                <button class="crud-btn simulator-btn" onclick="pages.Simulate.openSimulateur()" title="Ouvrir le simulateur">
                                    <span class="material-symbols-outlined">tune</span>
                                </button>
                                <button class="crud-btn view-detail-btn" onclick="pages.Simulate.viewScenarioDetail()" title="Voir le détail du scénario" ${!this.currentScenario.id && this.currentScenario.tracks.length === 0 ? 'disabled' : ''}>
                                    <span class="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="scenario-name-display">
                            <span id="current-scenario-name" class="scenario-name">${this.currentScenario.name}</span>
                            <button class="edit-name-btn" onclick="pages.Simulate.editScenarioName()">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                        </div>
                        
                        ${this.currentScenario.id ? `
                            <div class="scenario-meta">
                                <span class="scenario-id">ID: ${this.currentScenario.id}</span>
                                <span class="scenario-date">Créé: ${new Date(this.currentScenario.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                </div>

                <main class="simulate-main">
                    <!-- Métriques principales -->
                    <div class="metrics-grid">
                        ${this.renderMetrics(currentTracks, totalBudget, totalImpact, avgRoi)}
                    </div>

                    <div class="simulate-content">
                        <!-- Section Pistes Disponibles -->
                        <div class="tracks-section">
                            <div class="section-header">
                                <h2>Pistes Disponibles</h2>
                                <span class="track-count">${allPistes.length} Pistes</span>
                                <div class="section-controls">
                                    <button class="control-btn" onclick="pages.Simulate.selectAll()">
                                        <span class="material-symbols-outlined">done_all</span>
                                        Tout sélectionner
                                    </button>
                                    <button class="control-btn" onclick="pages.Simulate.deselectAll()">
                                        <span class="material-symbols-outlined">clear_all</span>
                                        Tout désélectionner
                                    </button>
                                </div>
                            </div>

                            <div class="tracks-list">
                                ${pistesList}
                            </div>
                        </div>

                        <!-- Section Résumé du Scénario -->
                        <div class="scenario-summary">
                            <h3 class="section-title">Résumé du scénario</h3>
                            
                            <div class="summary-stats">
                                <div class="summary-stat">
                                    <span class="summary-stat-label">Pistes sélectionnées</span>
                                    <span class="summary-stat-value">${currentTracks.length}</span>
                                </div>
                                <div class="summary-stat">
                                    <span class="summary-stat-label">Budget total</span>
                                    <span class="summary-stat-value">${this.formatBudget(totalBudget)}</span>
                                </div>
                                <div class="summary-stat">
                                    <span class="summary-stat-label">Impact moyen</span>
                                    <span class="summary-stat-value">${Math.round(totalImpact / (currentTracks.length || 1))}%</span>
                                </div>
                                <div class="summary-stat">
                                    <span class="summary-stat-label">ROI moyen</span>
                                    <span class="summary-stat-value">${avgRoi} mois</span>
                                </div>
                            </div>
                            
                            <div class="selected-tracks-list">
                                <h4>Pistes sélectionnées (${currentTracks.length})</h4>
                                ${currentTracks.length > 0 ? `
                                    <ul class="selected-tracks">
                                        ${currentTracks.map(track => `
                                            <li class="selected-track-item">
                                                <span class="selected-track-id">${track.numero}</span>
                                                <span class="selected-track-title">${track.titre}</span>
                                                <button class="remove-track-btn" onclick="pages.Simulate.togglePiste('${track.numero}')" title="Retirer">
                                                    <span class="material-symbols-outlined">close</span>
                                                </button>
                                            </li>
                                        `).join('')}
                                    </ul>
                                ` : `
                                    <p class="no-tracks">Aucune piste sélectionnée</p>
                                `}
                            </div>
                            
                            <div class="summary-actions">
                                <button class="btn-clear" onclick="pages.Simulate.clearScenario()">
                                    <span class="material-symbols-outlined">delete_sweep</span>
                                    Vider
                                </button>
                                <button class="btn-save-summary" onclick="pages.Simulate.saveCurrentScenario()">
                                    <span class="material-symbols-outlined">save</span>
                                    Enregistrer
                                </button>
                                <!-- NOUVEAU BOUTON: Visualiser le détail -->
                                <button class="btn-view-detail" onclick="pages.Simulate.viewScenarioDetail()" ${!this.currentScenario.id && this.currentScenario.tracks.length === 0 ? 'disabled' : ''}>
                                    <span class="material-symbols-outlined">visibility</span>
                                    Voir le détail
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <!-- Modal de confirmation pour la suppression -->
            <div id="delete-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <h3>Confirmer la suppression</h3>
                    <p>Êtes-vous sûr de vouloir supprimer le scénario "<span id="delete-scenario-name"></span>" ?</p>
                    <div class="modal-actions">
                        <button class="btn-cancel" onclick="pages.Simulate.hideDeleteModal()">Annuler</button>
                        <button class="btn-confirm-delete" onclick="pages.Simulate.confirmDelete()">Supprimer</button>
                    </div>
                </div>
            </div>

            ${this.getStyles()}
        `;
    },

    renderPistesList(allPistes, selectedMap) {
        if (allPistes.length === 0) {
            return `
                <div class="empty-state">
                    <span class="material-symbols-outlined empty-icon">inventory_2</span>
                    <p>Aucune piste disponible</p>
                    <p class="empty-hint">Les pistes se chargeront automatiquement</p>
                </div>
            `;
        }

        return allPistes.map(piste => {
            const isSelected = selectedMap.has(piste.numero);
            const priorityColor = this.getPriorityColor(piste.priorite);
            const budget = piste.budget?.cout_3_ans || 0;
            const impact = piste.impact_score || 0;
            
            return `
                <div class="piste-item ${isSelected ? 'selected' : ''}" onclick="pages.Simulate.togglePiste('${piste.numero}')">
                    <div class="piste-checkbox-wrapper">
                        <input type="checkbox" 
                               class="piste-checkbox" 
                               data-piste-id="${piste.numero}"
                               ${isSelected ? 'checked' : ''}
                               onchange="event.stopPropagation(); pages.Simulate.togglePiste('${piste.numero}')">
                        <label class="checkbox-label"></label>
                    </div>
                    <div class="piste-info">
                        <div class="piste-header">
                            <span class="priority-badge priority-${priorityColor}">${piste.priorite || 'P3'}</span>
                            <h3 class="piste-title">${piste.titre || 'Sans titre'}</h3>
                        </div>
                        <p class="piste-description">${piste.description || ''}</p>
                        <div class="piste-meta">
                            <span class="meta-item">
                                <span class="material-symbols-outlined">category</span>
                                ${piste.categorie || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <div class="piste-stats">
                        <div class="stat">
                            <span class="stat-label">BUDGET</span>
                            <span class="stat-value">${window.Utils ? Utils.formatCurrency(budget) : this.formatBudget(budget)}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">IMPACT</span>
                            <span class="stat-value impact">${impact}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderScenarioOptions() {
        if (!this.scenarios || this.scenarios.length === 0) {
            return '<option value="" disabled>Aucun scénario sauvegardé</option>';
        }
        
        return this.scenarios.map(scenario => {
            // CORRECTION: Vérifier si l'ID correspond au scénario courant
            const selected = scenario.id === this.currentScenario.id ? 'selected' : '';
            const date = new Date(scenario.createdAt).toLocaleDateString('fr-FR');
            const trackCount = scenario.pistes ? scenario.pistes.length : 0;
            return `<option value="${scenario.id}" ${selected}>${scenario.name} (${trackCount} pistes - ${date})</option>`;
        }).join('');
    },

    renderMetrics(currentTracks, totalBudget, totalImpact, avgRoi) {
        const reduction = currentTracks.length > 0 
            ? Math.min(100, Math.round(totalImpact / currentTracks.length * 0.8)) 
            : 0;
        
        return `
            <div class="metric-card">
                <div class="metric-header">
                    <span class="material-symbols-outlined metric-icon">trending_down</span>
                    <span class="metric-label">RÉDUCTION ACCIDENTS</span>
                </div>
                <div class="metric-value">-${reduction}%</div>
                <div class="metric-subtitle">Objectif: -50% en 2028</div>
            </div>

            <div class="metric-card">
                <div class="metric-header">
                    <span class="material-symbols-outlined metric-icon">payments</span>
                    <span class="metric-label">BUDGET TOTAL</span>
                </div>
                <div class="metric-value">${this.formatBudget(totalBudget)}</div>
                <div class="metric-subtitle">Sur 3 ans (2026-2028)</div>
            </div>

            <div class="metric-card">
                <div class="metric-header">
                    <span class="material-symbols-outlined metric-icon">trending_up</span>
                    <span class="metric-label">ROI MOYEN</span>
                </div>
                <div class="metric-value">${avgRoi} mois</div>
                <div class="metric-subtitle">Retour sur investissement</div>
            </div>
        `;
    },

    formatBudget(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(2) + ' M€';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' k€';
        } else {
            return amount + ' €';
        }
    },

    getPriorityColor(priority) {
        const colors = { 'P1': 'red', 'P2': 'orange', 'P3': 'yellow', 'P4': 'blue' };
        return colors[priority] || 'slate';
    },

    // ================ FONCTIONS CRUD ================

    // NOUVELLE FONCTION: Visualiser le détail du scénario
    viewScenarioDetail() {
        // Vérifier si un scénario est sélectionné
        if (!this.currentScenario.id && this.currentScenario.tracks.length === 0) {
            if (window.Notifications) {
                Notifications.warning('Aucun scénario à visualiser');
            }
            return;
        }

        // Si le scénario a un ID (sauvegardé), utiliser cet ID
        if (this.currentScenario.id) {
            console.log('👁️ Visualisation du scénario:', this.currentScenario.id);
            if (window.router) {
                router.navigate(`/scenario-detail/${this.currentScenario.id}`);
            }
        } else {
            // Sinon, créer un scénario temporaire pour la visualisation
            // On peut soit demander à sauvegarder d'abord, soit créer un ID temporaire
            if (confirm('Ce scénario n\'est pas sauvegardé. Voulez-vous le sauvegarder d\'abord avant de voir le détail ?')) {
                this.saveCurrentScenario();
                // La redirection se fera après la sauvegarde dans le setTimeout
            } else {
                // Option: créer un ID temporaire basé sur le timestamp
                const tempId = 'temp_' + Date.now();
                const tempScenario = {
                    id: tempId,
                    name: this.currentScenario.name,
                    pistes: this.currentScenario.tracks,
                    createdAt: new Date().toISOString()
                };
                
                // Sauvegarder temporairement dans le store ou localStorage
                // Pour l'exemple, on va simplement naviguer avec les données dans l'URL
                console.log('👁️ Visualisation d\'un scénario temporaire');
                
                if (window.router) {
                    // On pourrait passer les données en paramètre, mais c'est plus simple
                    // de naviguer vers la page avec l'ID temporaire et de stocker les données
                    // dans une variable globale temporaire
                    window.__tempScenario = tempScenario;
                    router.navigate(`/scenario-detail/${tempId}`);
                }
            }
        }
    },

    openSimulateur() {
        const state = appStore ? appStore.getState() : {};
        const currentTracks = this.currentScenario.tracks || state.currentScenario || [];

        if (window.appStore) {
            appStore.setState({
                currentScenario: currentTracks,
                currentScenarioId: this.currentScenario.id || state.currentScenarioId || null
            });
        }

        if (window.router) {
            router.navigate('/simulateur');
        }
    },

    async loadSelectedScenario(scenarioId) {
        if (!scenarioId) {
            this.createNewScenario();
            return;
        }
        
        console.log('📂 Chargement du scénario:', scenarioId);
        
        if (appActions && appActions.loadScenario) {
            appActions.loadScenario(scenarioId);
            
            // Mettre à jour l'affichage après un court délai
            setTimeout(() => {
                // Recharger l'état depuis le store
                const state = appStore.getState();
                this.scenarios = state.scenarios || [];
                
                // Trouver le scénario chargé
                const loadedScenario = this.scenarios.find(s => s.id === scenarioId);
                if (loadedScenario) {
                    this.currentScenario.id = loadedScenario.id;
                    this.currentScenario.name = loadedScenario.name;
                    this.currentScenario.createdAt = loadedScenario.createdAt;
                    this.currentScenario.tracks = state.currentScenario || [];
                }
                
                this.rerender();
            }, 100);
        }
    },

    saveCurrentScenario() {
        const tracks = appStore ? appStore.getValue('currentScenario') : [];
        
        if (tracks.length === 0) {
            if (window.Notifications) {
                Notifications.warning('Ajoutez au moins une piste avant de sauvegarder');
            } else {
                alert('Ajoutez au moins une piste avant de sauvegarder');
            }
            return;
        }
        
        let scenarioName = this.currentScenario.name;
        
        // Si c'est un scénario temporaire, demander un nom
        if (!this.currentScenario.id || this.currentScenario.name === 'Scénario en cours' || this.currentScenario.name === 'Nouveau scénario') {
            scenarioName = prompt('Nom du scénario:', 'Mon scénario');
            if (!scenarioName) return;
        }
        
        if (appActions && appActions.saveScenario) {
            appActions.saveScenario(scenarioName);
            
            // Mettre à jour la liste des scénarios
            setTimeout(() => {
                const state = appStore.getState();
                this.scenarios = state.scenarios || [];
                
                // Trouver le scénario qui vient d'être sauvegardé (le dernier)
                const savedScenario = this.scenarios[this.scenarios.length - 1];
                if (savedScenario) {
                    this.currentScenario.id = savedScenario.id;
                    this.currentScenario.name = savedScenario.name;
                    this.currentScenario.createdAt = savedScenario.createdAt;
                }
                
                this.rerender();
                
                // Notification de succès
                if (window.Notifications) {
                    Notifications.success('Scénario sauvegardé');
                }
            }, 100);
        }
    },

    createNewScenario() {
        console.log('➕ Création d\'un nouveau scénario');
        
        if (appActions && appActions.clearScenario) {
            appActions.clearScenario();
        }
        
        this.currentScenario = {
            id: null,
            name: 'Nouveau scénario',
            tracks: [],
            createdAt: new Date().toISOString()
        };
        
        this.rerender();
        
        if (window.Notifications) {
            Notifications.info('Nouveau scénario créé');
        }
    },

    deleteCurrentScenario() {
        if (!this.currentScenario.id) {
            if (window.Notifications) {
                Notifications.warning('Aucun scénario à supprimer');
            }
            return;
        }
        
        // Afficher la modale de confirmation
        const modal = document.getElementById('delete-modal');
        const nameSpan = document.getElementById('delete-scenario-name');
        if (modal && nameSpan) {
            nameSpan.textContent = this.currentScenario.name;
            modal.style.display = 'flex';
        }
    },

    confirmDelete() {
        const scenarioId = this.currentScenario.id;
        
        if (!scenarioId) {
            this.hideDeleteModal();
            return;
        }
        
        console.log('🗑️ Suppression du scénario:', scenarioId);
        
        if (appActions && appActions.deleteScenario) {
            appActions.deleteScenario(scenarioId);
            
            // Mettre à jour la liste
            setTimeout(() => {
                const state = appStore.getState();
                this.scenarios = state.scenarios || [];
                
                // Créer un nouveau scénario vide
                this.createNewScenario();
                
                this.hideDeleteModal();
                
                if (window.Notifications) {
                    Notifications.success('Scénario supprimé');
                }
            }, 100);
        } else {
            this.hideDeleteModal();
        }
    },

    hideDeleteModal() {
        const modal = document.getElementById('delete-modal');
        if (modal) modal.style.display = 'none';
    },

    duplicateScenario() {
        if (!this.currentScenario.id && this.currentScenario.tracks.length === 0) {
            if (window.Notifications) {
                Notifications.warning('Aucun scénario à dupliquer');
            }
            return;
        }
        
        const newName = prompt('Nom du scénario dupliqué:', this.currentScenario.name + ' (copie)');
        if (!newName) return;
        
        console.log('📋 Duplication du scénario:', this.currentScenario.name);
        
        // Sauvegarder comme nouveau scénario
        if (appActions && appActions.saveScenario) {
            appActions.saveScenario(newName);
            
            setTimeout(() => {
                const state = appStore.getState();
                this.scenarios = state.scenarios || [];
                
                // Trouver le nouveau scénario
                const newScenario = this.scenarios[this.scenarios.length - 1];
                if (newScenario) {
                    this.currentScenario.id = newScenario.id;
                    this.currentScenario.name = newScenario.name;
                    this.currentScenario.createdAt = newScenario.createdAt;
                }
                
                this.rerender();
                
                if (window.Notifications) {
                    Notifications.success('Scénario dupliqué');
                }
            }, 100);
        }
    },

    editScenarioName() {
        if (!this.currentScenario.id) {
            // Pour un scénario non sauvegardé, on peut juste renommer
            const newName = prompt('Nouveau nom du scénario:', this.currentScenario.name);
            if (newName) {
                this.currentScenario.name = newName;
                this.rerender();
            }
            return;
        }
        
        const newName = prompt('Nouveau nom du scénario:', this.currentScenario.name);
        if (!newName) return;
        
        console.log('✏️ Renommage du scénario:', this.currentScenario.id, '→', newName);
        
        // Mettre à jour le nom dans le scénario courant
        this.currentScenario.name = newName;
        
        // Mettre à jour le scénario dans la liste
        const scenarioIndex = this.scenarios.findIndex(s => s.id === this.currentScenario.id);
        if (scenarioIndex !== -1) {
            this.scenarios[scenarioIndex].name = newName;
        }
        
        this.rerender();
        
        if (window.Notifications) {
            Notifications.success('Scénario renommé');
        }
    },

    clearScenario() {
        if (this.currentScenario.tracks.length === 0) return;
        
        if (confirm('Vider toutes les pistes sélectionnées ?')) {
            if (appActions && appActions.clearScenario) {
                appActions.clearScenario();
            }
            
            this.currentScenario.tracks = [];
            this.rerender();
            
            if (window.Notifications) {
                Notifications.info('Scénario vidé');
            }
        }
    },

    compareScenarios() {
        if (this.scenarios.length < 2) {
            if (window.Notifications) {
                Notifications.warning('Créez au moins 2 scénarios pour comparer');
            } else {
                alert('Créez au moins 2 scénarios pour comparer');
            }
            return;
        }
        
        // Naviguer vers la page de comparaison
        if (window.router) {
            router.navigate('/comparer');
        }
    },

    exportScenario() {
        if (this.currentScenario.tracks.length === 0) {
            if (window.Notifications) {
                Notifications.warning('Aucune piste à exporter');
            }
            return;
        }
        
        const data = {
            name: this.currentScenario.name,
            id: this.currentScenario.id,
            createdAt: this.currentScenario.createdAt,
            tracks: this.currentScenario.tracks.map(t => ({
                numero: t.numero,
                titre: t.titre,
                budget: t.budget?.cout_3_ans,
                impact: t.impact_score
            })),
            summary: {
                totalTracks: this.currentScenario.tracks.length,
                totalBudget: this.currentScenario.tracks.reduce((s, t) => s + (t.budget?.cout_3_ans || 0), 0),
                avgImpact: Math.round(this.currentScenario.tracks.reduce((s, t) => s + (t.impact_score || 0), 0) / this.currentScenario.tracks.length)
            }
        };
        
        const filename = `scenario_${this.currentScenario.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        
        if (window.Utils) {
            Utils.downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
        } else {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
        
        if (window.Notifications) {
            Notifications.success('Scénario exporté');
        }
    },

    // ================ FONCTIONS DE SÉLECTION ================

    togglePiste(pisteId) {
        console.log('Toggle piste:', pisteId);
        const state = appStore ? appStore.getState() : {};
        const allPistes = state.allPistes || [];
        const piste = allPistes.find(p => p.numero === pisteId);
        const currentTracks = state.currentScenario || [];
        const isSelected = currentTracks.find(t => t.numero === pisteId);

        if (isSelected) {
            if (appActions && appActions.removePisteFromScenario) {
                appActions.removePisteFromScenario(pisteId);
            }
        } else {
            if (piste && appActions && appActions.addPisteToScenario) {
                appActions.addPisteToScenario(piste);
            }
        }

        this.rerender();
    },

    selectAll() {
        console.log('Select all pistes');
        const state = appStore ? appStore.getState() : {};
        const allPistes = state.allPistes || [];
        const currentTracks = state.currentScenario || [];

        allPistes.forEach(piste => {
            const isSelected = currentTracks.find(t => t.numero === piste.numero);
            if (!isSelected && appActions && appActions.addPisteToScenario) {
                appActions.addPisteToScenario(piste);
            }
        });

        this.rerender();
    },

    deselectAll() {
        console.log('Deselect all pistes');
        const state = appStore ? appStore.getState() : {};
        const currentTracks = state.currentScenario || [];

        currentTracks.forEach(track => {
            if (appActions && appActions.removePisteFromScenario) {
                appActions.removePisteFromScenario(track.numero);
            }
        });

        this.rerender();
    },

    rerender() {
        this.render().then(html => {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = html;
                this.setupEventListeners();
            }
        }).catch(err => console.error('Rerender error:', err));
    },

    setupEventListeners() {
        console.log('Setup event listeners - Simulate');
        
        // Fermer la modale en cliquant en dehors
        const modal = document.getElementById('delete-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideDeleteModal();
                }
            });
        }
        
        // Gérer la touche Echap pour fermer la modale
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideDeleteModal();
            }
        });
    },

    getStyles() {
        return `<style>
.simulate-wrapper{display:flex;flex-direction:column;min-height:100vh;background:var(--gray-50)}.simulate-header{background:white;border-bottom:1px solid var(--gray-200);padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px}

/* CRUD Section */
.scenario-crud{flex:2;min-width:400px}.scenario-label{font-size:10px;text-transform:uppercase;font-weight:700;color:var(--gray-400);letter-spacing:0.05em;display:block;margin-bottom:8px}.scenario-selector{display:flex;gap:8px;margin-bottom:12px}.scenario-select{flex:1;padding:10px 12px;border:1px solid var(--gray-200);border-radius:6px;font-size:14px;color:var(--gray-800);background:white;cursor:pointer}.scenario-select:hover{border-color:var(--cdg-navy)}.scenario-actions{display:flex;gap:4px}.crud-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border:1px solid var(--gray-200);border-radius:6px;background:white;color:var(--gray-700);cursor:pointer;transition:all 0.2s}.crud-btn:hover{background:var(--gray-50)}.save-btn{background:var(--cdg-navy);color:white;border:none}.save-btn:hover{background:#002a5c}.new-btn:hover{color:var(--success);border-color:var(--success)}.delete-btn:hover{color:var(--danger);border-color:var(--danger)}.duplicate-btn:hover{color:var(--info);border-color:var(--info)}.view-detail-btn{color:var(--info);border-color:var(--info)}.view-detail-btn:hover{background:var(--info);color:white;border-color:var(--info)}.view-detail-btn:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none}.scenario-name-display{display:flex;align-items:center;gap:8px;margin-bottom:4px}.scenario-name{font-size:16px;font-weight:600;color:var(--gray-800)}.edit-name-btn{background:none;border:none;color:var(--gray-400);cursor:pointer;font-size:18px;padding:4px}.edit-name-btn:hover{color:var(--cdg-navy)}.scenario-meta{display:flex;gap:16px;font-size:11px;color:var(--gray-400)}.scenario-id{font-family:monospace}.header-actions{display:flex;gap:8px;align-self:center}.btn-action{display:flex;align-items:center;gap:6px;padding:10px 16px;border:1px solid var(--gray-200);border-radius:6px;background:white;color:var(--gray-700);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s}.btn-action:hover{background:var(--gray-50);border-color:var(--cdg-navy)}.btn-action:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none}.simulate-main{flex:1;overflow-y:auto;padding:32px}.metrics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:32px}.metric-card{background:white;border:1px solid var(--gray-200);border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}.metric-header{display:flex;align-items:center;gap:8px;margin-bottom:12px}.metric-icon{font-size:20px;color:var(--cdg-navy)}.metric-label{font-size:10px;text-transform:uppercase;font-weight:700;color:var(--gray-500);letter-spacing:0.05em}.metric-value{font-size:32px;font-weight:700;color:var(--gray-800);margin-bottom:4px}.metric-subtitle{font-size:12px;color:var(--gray-400)}.simulate-content{display:grid;grid-template-columns:2fr 1fr;gap:24px}.tracks-section{background:white;border-radius:12px;overflow:hidden;border:1px solid var(--gray-200)}.section-header{display:flex;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--gray-200);background:var(--gray-50);flex-wrap:wrap}.section-header h2{font-size:18px;font-weight:700;color:var(--gray-800);margin:0}.track-count{font-size:12px;color:var(--gray-500);background:white;padding:4px 8px;border-radius:4px}.section-controls{display:flex;gap:8px;margin-left:auto}.control-btn{display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--gray-200);border-radius:6px;background:white;font-size:12px;font-weight:600;cursor:pointer;color:var(--gray-700)}.control-btn:hover{background:var(--gray-100);border-color:var(--cdg-navy);color:var(--cdg-navy)}.tracks-list{padding:16px;max-height:600px;overflow-y:auto}.piste-item{display:flex;align-items:flex-start;gap:12px;padding:16px;background:white;border:1px solid var(--gray-200);border-radius:8px;margin-bottom:8px;transition:all 0.2s;cursor:pointer}.piste-item:hover{border-color:var(--cdg-navy);background:var(--gray-50)}.piste-item.selected{border-color:var(--cdg-navy);background:#eff6ff}.piste-checkbox-wrapper{position:relative;display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;margin-top:2px}.piste-checkbox{position:absolute;opacity:0;cursor:pointer;width:100%;height:100%;margin:0}.checkbox-label{display:flex;align-items:center;justify-content:center;width:20px;height:20px;border:2px solid var(--gray-300);border-radius:4px;background:white;transition:all 0.2s;pointer-events:none}.piste-checkbox:checked+.checkbox-label{background:var(--cdg-navy);border-color:var(--cdg-navy)}.piste-checkbox:checked+.checkbox-label::after{content:'✓';color:white;font-weight:bold;font-size:14px}.piste-info{flex:1}.piste-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.priority-badge{padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700;background:var(--gray-800);color:white}.priority-red{background:var(--danger)}.priority-orange{background:var(--cdg-orange)}.priority-yellow{background:var(--warning)}.priority-blue{background:var(--info)}.piste-title{font-size:14px;font-weight:700;color:var(--gray-800);margin:0}.piste-description{font-size:12px;color:var(--gray-500);margin:4px 0;line-height:1.4}.piste-meta{display:flex;gap:12px;margin-top:8px;font-size:11px;color:var(--gray-400)}.meta-item{display:flex;align-items:center;gap:4px}.meta-item .material-symbols-outlined{font-size:14px}.piste-stats{display:flex;gap:24px;flex-shrink:0}.stat{text-align:right}.stat-label{font-size:10px;text-transform:uppercase;font-weight:700;color:var(--gray-400);display:block;margin-bottom:4px}.stat-value{font-size:14px;font-weight:700;color:var(--gray-800)}.stat-value.impact{color:var(--success)}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;text-align:center;color:var(--gray-500)}.empty-icon{font-size:64px;color:var(--gray-300);margin-bottom:16px}.scenario-summary{background:white;border-radius:12px;padding:24px;border:1px solid var(--gray-200)}.summary-stats{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}.summary-stat{background:var(--gray-50);padding:16px;border-radius:8px;text-align:center}.summary-stat-label{font-size:11px;text-transform:uppercase;color:var(--gray-400);display:block;margin-bottom:4px}.summary-stat-value{font-size:20px;font-weight:700;color:var(--cdg-navy)}.selected-tracks-list h4{font-size:14px;margin:0 0 12px;color:var(--gray-700)}.selected-tracks{list-style:none;padding:0;margin:0 0 20px;max-height:300px;overflow-y:auto}.selected-track-item{display:flex;align-items:center;gap:8px;padding:10px;background:var(--gray-50);border-radius:6px;margin-bottom:6px}.selected-track-id{font-family:monospace;font-weight:700;color:var(--cdg-navy);background:white;padding:2px 6px;border-radius:4px;font-size:11px}.selected-track-title{flex:1;font-size:13px;color:var(--gray-700)}.remove-track-btn{background:none;border:none;color:var(--gray-400);cursor:pointer;display:flex;align-items:center;padding:4px}.remove-track-btn:hover{color:var(--danger)}.no-tracks{color:var(--gray-400);font-style:italic;text-align:center;padding:20px}.summary-actions{display:flex;gap:8px;margin-top:16px}.btn-clear,.btn-save-summary,.btn-view-detail{flex:1;padding:12px;border:none;border-radius:6px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}.btn-clear{background:var(--gray-100);color:var(--gray-700)}.btn-clear:hover{background:var(--gray-200)}.btn-save-summary{background:var(--cdg-navy);color:white}.btn-save-summary:hover{background:#002a5c}.btn-view-detail{background:var(--info);color:white}.btn-view-detail:hover{background:#2563eb}.btn-view-detail:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none}

/* Modal */
.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}.modal-content{background:white;padding:30px;border-radius:12px;max-width:400px;width:90%}.modal-content h3{margin:0 0 12px;color:var(--gray-800)}.modal-content p{margin:0 0 24px;color:var(--gray-600)}.modal-actions{display:flex;gap:12px;justify-content:flex-end}.btn-cancel,.btn-confirm-delete{padding:10px 20px;border:none;border-radius:6px;font-weight:600;cursor:pointer}.btn-cancel{background:var(--gray-100);color:var(--gray-700)}.btn-cancel:hover{background:var(--gray-200)}.btn-confirm-delete{background:var(--danger);color:white}.btn-confirm-delete:hover{background:#dc2626}

@media(max-width:1024px){.simulate-content{grid-template-columns:1fr}.metrics-grid{grid-template-columns:repeat(2,1fr)}.header-actions{flex-direction:column;width:100%}.btn-action{width:100%;justify-content:center}.section-controls{flex-direction:column;width:100%;margin-left:0}.control-btn{width:100%;justify-content:center}}@media(max-width:768px){.scenario-crud{min-width:100%}.scenario-selector{flex-wrap:wrap}.scenario-actions{width:100%;justify-content:space-between}.crud-btn{flex:1}}@media(max-width:640px){.simulate-header{flex-direction:column;align-items:flex-start}.metrics-grid{grid-template-columns:1fr}.piste-stats{flex-direction:column;gap:8px}.piste-item{flex-direction:column}.summary-actions{flex-direction:column}}
</style>`;
    }
};

window.pages = window.pages || {};
window.pages.Simulate = pages.Simulate;
