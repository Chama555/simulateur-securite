/**
 * PAGES/SCENARIO-DETAIL.JS - Page de détail d'un scénario
 * Utilise les vraies données des pistes depuis le XML
 */

pages.ScenarioDetail = {
    currentScenario: null,
    scenarioId: null,
    allPistes: [],
    
    // Mapping des icônes par type d'élément (garde les icônes)
    TYPE_ICONS: {
        'problematique': '⚠️',
        'principe': '🔧',
        'perimetre': '📍',
        'bareme': '📉',
        'seuil': '📊',
        'recidive': '🔄',
        'reconquete': '➕',
        'modalite': '⚙️',
        'articulation_disciplinaire': '⚖️',
        'avantage': '✅',
        'risque': '⚠️',
        'comparaison': '🔍',
        'phase': '📅',
        'indicateur': '📈',
        'question': '❓',
        'question_technique': '🔬',
        'question_operationnelle': '⚙️',
        'message_cle': '💬',
        'demande': '📢',
        'visuel': '🎯',
        'dimension': '📊',
        'approche_technologique': '🤖',
        'approche_humaine': '👥',
        'dispositif_technique': '🖥️',
        'perimetre_deploiement': '🎯',
        'technologie': '🔬',
        'etat_lieux': '📋',
        'emps': '🚓',
        'plan_controles': '📅',
        'rotation_zones': '🔄',
        'protocole_alcool': '🍷',
        'protocole_stupefiant': '💊',
        'articulation_p1': '🔗',
        'complementarite': '🤝',
        'complementarite_audits': '🤝',
        'base_legale': '⚖️',
        'obligation': '📋',
        'obligation_prealable': '📋',
        'condition_juridique': '⚖️',
        'investissement': '💰',
        'economie': '💶',
        'indicateur_activite': '📊',
        'indicateur_resultat': '🎯',
        'indicateur_cle': '🔑',
        'seuil_alcool': '🍷',
        'seuil_stupefiant': '💊',
        'video_profil': '🎬',
        'affichage_zone': '📍',
        'scenario_vr': '🥽',
        'objectif_adoption': '📊',
        'indicateur_impact': '📈'
    },

    // Mapping des titres pour les types d'éléments
    TYPE_TITLES: {
        'problematique': 'Problématique',
        'principe': 'Principes généraux',
        'perimetre': "Périmètre d'application",
        'perimetre_deploiement': 'Périmètre de déploiement',
        'bareme': 'Barème de retrait de points',
        'seuil': 'Seuils progressifs',
        'seuil_alcool': 'Protocoles alcoolémie',
        'seuil_stupefiant': 'Protocoles stupéfiants',
        'recidive': 'Récidive',
        'reconquete': 'Reconquête de points',
        'modalite': 'Modalités opérationnelles',
        'articulation_disciplinaire': 'Articulation avec le cadre disciplinaire',
        'articulation_p1': 'Articulation avec le permis à points',
        'avantage': 'Avantages',
        'risque': 'Risques et mitigation',
        'comparaison': 'Comparaison avec dispositifs existants',
        'phase': 'Phases de déploiement',
        'indicateur': 'Indicateurs de suivi',
        'indicateur_activite': "Indicateurs d'activité",
        'indicateur_resultat': 'Indicateurs de résultat',
        'indicateur_cle': 'Indicateurs clés',
        'question': 'Questions à valider',
        'question_technique': 'Questions techniques',
        'question_operationnelle': 'Questions opérationnelles',
        'message_cle': 'Message clé',
        'demande': 'Notre demande',
        'visuel': 'Visuel de synthèse',
        'dimension': 'Dimensions Balancing',
        'approche_technologique': 'Approche technologique',
        'approche_humaine': 'Approche humaine',
        'dispositif_technique': 'Dispositif technique',
        'technologie': 'Technologie',
        'etat_lieux': 'État des lieux',
        'emps': 'Équipes Mobiles de Prévention Sécurité (EMPS)',
        'plan_controles': 'Plan de contrôles',
        'rotation_zones': 'Rotation des zones',
        'protocole_alcool': 'Protocole alcoolémie',
        'protocole_stupefiant': 'Protocole stupéfiants',
        'complementarite': 'Complémentarités',
        'complementarite_audits': 'Complémentarités avec audits',
        'base_legale': 'Base légale',
        'obligation': 'Obligations',
        'obligation_prealable': 'Obligations préalables',
        'condition_juridique': 'Conditions juridiques',
        'investissement': 'Investissement',
        'economie': 'Économies estimées',
        'video_profil': 'Personnalisation des vidéos par profil',
        'affichage_zone': 'Rotation et localisation des affichages',
        'scenario_vr': 'Scénarios de réalité virtuelle',
        'objectif_adoption': "Objectifs d'adoption de l'application",
        'indicateur_impact': "Indicateurs d'impact des campagnes"
    },

    async render() {
        // Extraire l'ID de l'URL
        let path = (window.router && window.router.currentPath) || window.location.pathname || '/';
        path = path.split('?')[0];
        const segments = path.split('/').filter(s => s.length > 0);
        this.scenarioId = segments[segments.length - 1];
        
        console.log('📌 Détail pour scénario ID:', this.scenarioId);

        // Récupérer les données depuis le store
        const state = appStore ? appStore.getState() : {};
        const scenarios = state.scenarios || [];
        this.allPistes = state.allPistes || [];
        
        // Trouver le scénario
        this.currentScenario = scenarios.find(s => s.id === this.scenarioId);
        
        if (!this.currentScenario) {
            return `
                <div class="detail-wrapper">
                    <div class="error-page">
                        <h2>Scénario non trouvé</h2>
                        <p>ID recherché: ${this.scenarioId}</p>
                        <button onclick="router.navigate('/simuler')" class="btn-back">
                            ← Retour à la simulation
                        </button>
                    </div>
                </div>
                ${this.getStyles()}
            `;
        }

        // Récupérer les pistes complètes du scénario
        const scenarioPistes = this.allPistes.filter(p => 
            this.currentScenario.pistes.some(sp => sp.numero === p.numero)
        );

        // Fusionner les éléments par type à partir des vraies données
        const mergedElements = this.mergePistesElements(scenarioPistes);
        
        // Calculer les métriques globales
        const metrics = this.calculateScenarioMetrics(scenarioPistes);

        // Calculer les dimensions moyennes pour le radar
        const avgDimensions = this.calculateAverageDimensions(scenarioPistes);

        return `
            <div class="container" id="pdf-content">
                <!-- Barre d'actions en haut -->
                <div class="action-bar">
                    <button class="btn-back-nav" onclick="pages.ScenarioDetail.goBack()">
                        <span class="material-symbols-outlined">arrow_back</span>
                        Retour
                    </button>
                    <div class="action-buttons">
                        <button class="btn-pdf" onclick="pages.ScenarioDetail.exportToPDF()">
                            <span class="material-symbols-outlined">picture_as_pdf</span>
                            Exporter en PDF
                        </button>
                        <button class="btn-print" onclick="window.print()">
                            <span class="material-symbols-outlined">print</span>
                            Imprimer
                        </button>
                    </div>
                </div>

                <!-- Header -->
                <div class="header" style="background: linear-gradient(135deg, var(--cdg-navy) 0%, #0055a8 100%);">
                    <div class="badge-piste">Scénario</div>
                    <h1>${this.currentScenario.name}</h1>
                    <h2>${scenarioPistes.length} pistes sélectionnées</h2>
                    <div class="header-meta">
                        <span class="meta-chip">
                            <span class="material-symbols-outlined">calendar_today</span>
                            Créé le ${new Date(this.currentScenario.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                        <span class="meta-chip">
                            <span class="material-symbols-outlined">payments</span>
                            Budget: ${this.formatBudget(metrics.totalBudget)}
                        </span>
                        <span class="meta-chip">
                            <span class="material-symbols-outlined">trending_up</span>
                            Impact moyen: ${metrics.avgImpact}%
                        </span>
                    </div>
                </div>
            
                <!-- Résumé exécutif -->
                <div class="section">
                    <div class="section-title"><span>📊</span> Résumé exécutif</div>
                    
                    <div class="executive-summary">
                        <div class="summary-stats-grid">
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${scenarioPistes.length}</div>
                                <div class="summary-stat-label">Pistes sélectionnées</div>
                            </div>
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${this.formatBudget(metrics.totalBudget)}</div>
                                <div class="summary-stat-label">Budget total (3 ans)</div>
                            </div>
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${metrics.avgImpact}%</div>
                                <div class="summary-stat-label">Impact moyen</div>
                            </div>
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${metrics.totalAccidentsEvites}</div>
                                <div class="summary-stat-label">Accidents évités/an</div>
                            </div>
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${metrics.avgRoi} mois</div>
                                <div class="summary-stat-label">ROI moyen</div>
                            </div>
                            <div class="summary-stat-card">
                                <div class="summary-stat-value">${metrics.avgDelai} mois</div>
                                <div class="summary-stat-label">Délai moyen</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graphique Radar des dimensions moyennes -->
                ${scenarioPistes.length > 0 ? `
                <div class="section">
                    <div class="section-title"><span>📊</span> Équilibre des dimensions (moyenne)</div>
                   
                    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                        <div style="width: 100%; max-width: 500px;">
                            <canvas id="radarChart" width="400" height="400"></canvas>
                        </div>
                    </div>
                    
                    <!-- Légende des dimensions -->
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Culture: ${avgDimensions.culture}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Tech: ${avgDimensions.technique}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Humain: ${avgDimensions.humain}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Organisationnel: ${avgDimensions.organisationnel}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Économique: ${avgDimensions.economique}%</span>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Liste des pistes du scénario -->
                <div class="section">
                    <div class="section-title"><span>📋</span> Pistes incluses dans le scénario</div>
                    
                    <div class="pistes-grid">
                        ${scenarioPistes.map(piste => `
                            <div class="piste-mini-card" onclick="router.navigate('/piste-detail/${piste.numero}')">
                                <div class="piste-mini-header">
                                    <span class="piste-mini-id">${piste.numero}</span>
                                    <span class="priority-badge-mini priority-${this.getPriorityColor(piste.priorite)}">${piste.priorite || 'P3'}</span>
                                </div>
                                <h4 class="piste-mini-title">${piste.titre}</h4>
                                <div class="piste-mini-stats">
                                    <span>${this.formatBudget(piste.budget?.cout_3_ans || 0)}</span>
                                    <span>Impact: ${piste.impact_score || 0}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            
                <!-- Éléments fusionnés par rubrique à partir des données XML -->
                ${this.renderMergedElements(mergedElements, scenarioPistes.length)}
            
                <!-- Actions -->
                <div class="section" style="display: flex; gap: 15px; justify-content: center;">
                    <button class="btn-primary" onclick="pages.ScenarioDetail.loadInSimulator()">
                        <span class="material-symbols-outlined">simulation</span>
                        Ouvrir dans le simulateur
                    </button>
                </div>
            

            </div>
            ${this.getStyles()}
        `;
    },

    /**
     * Fusionne les éléments de toutes les pistes du scénario à partir des données XML
     */
    mergePistesElements(pistes) {
        const merged = {};
        
        // Types d'éléments disponibles dans les données XML
        const elementTypes = [
            'justificatifs', 'risques', 'avantages', 'tags', 'dimensions'
        ];
        
        pistes.forEach(piste => {
            // Traiter les risques
            if (piste.risques && piste.risques.length > 0) {
                if (!merged['risque']) merged['risque'] = [];
                piste.risques.forEach(risque => {
                    merged['risque'].push({
                        ...risque,
                        pisteRef: {
                            numero: piste.numero,
                            titre: piste.titre,
                            priorite: piste.priorite
                        }
                    });
                });
            }
            
            // Traiter les avantages
            if (piste.avantages && piste.avantages.length > 0) {
                if (!merged['avantage']) merged['avantage'] = [];
                piste.avantages.forEach(avantage => {
                    merged['avantage'].push({
                        nom: avantage.texte,
                        beneficiaire: avantage.beneficiaire,
                        pisteRef: {
                            numero: piste.numero,
                            titre: piste.titre
                        }
                    });
                });
            }
            
            // Traiter les tags comme des indicateurs de catégorie
            if (piste.tags && piste.tags.length > 0) {
                if (!merged['categorie']) merged['categorie'] = [];
                piste.tags.forEach(tag => {
                    merged['categorie'].push({
                        nom: tag,
                        pisteRef: {
                            numero: piste.numero,
                            titre: piste.titre
                        }
                    });
                });
            }
            
            // Ajouter la problématique à partir de la description
            if (piste.description_longue || piste.description) {
                if (!merged['problematique']) merged['problematique'] = [];
                merged['problematique'].push({
                    nom: 'Contexte',
                    description: piste.description_longue || piste.description,
                    pisteRef: {
                        numero: piste.numero,
                        titre: piste.titre
                    }
                });
            }
            
            // Ajouter les principes
            if (!merged['principe']) merged['principe'] = [];
            merged['principe'].push({
                nom: 'Principe général',
                description: piste.titre_long || piste.titre,
                pisteRef: {
                    numero: piste.numero,
                    titre: piste.titre
                }
            });
            
            // Ajouter le périmètre (catégorie et famille)
            if (!merged['perimetre']) merged['perimetre'] = [];
            merged['perimetre'].push({
                nom: 'Catégorie',
                description: `${piste.categorie} - ${piste.famille || 'Non spécifié'}`,
                pisteRef: {
                    numero: piste.numero,
                    titre: piste.titre
                }
            });
            
            // Ajouter les indicateurs de performance
            if (!merged['indicateur_cle']) merged['indicateur_cle'] = [];
            merged['indicateur_cle'].push({
                nom: 'Délai de déploiement',
                cible: piste.delai_texte || `${piste.delai_mois} mois`,
                unite: '',
                periodicite: 'Unique',
                pisteRef: { numero: piste.numero }
            });
            merged['indicateur_cle'].push({
                nom: 'ROI',
                cible: piste.roi_texte || `${piste.roi_mois} mois`,
                unite: '',
                periodicite: 'À l\'investissement',
                pisteRef: { numero: piste.numero }
            });
            merged['indicateur_cle'].push({
                nom: 'Accidents évités',
                cible: piste.impact_accidents_evites,
                unite: '/an',
                periodicite: 'annuelle',
                pisteRef: { numero: piste.numero }
            });
            
            // Ajouter les phases de déploiement (si disponibles dans les données)
            if (!merged['phase']) merged['phase'] = [];
            merged['phase'].push({
                nom: 'Phase de déploiement',
                etape_duree: piste.delai_texte || `${piste.delai_mois} mois`,
                activites: 'Déploiement de la piste',
                objectifs_etape: piste.impact_texte || 'Amélioration de la sécurité',
                livrable_etape: 'Mise en œuvre complète',
                pisteRef: { numero: piste.numero }
            });
            
            // Ajouter les informations budgetaires
            if (!merged['investissement']) merged['investissement'] = [];
            merged['investissement'].push({
                nom: 'Budget total 3 ans',
                description: this.formatBudget(piste.budget?.cout_3_ans || 0),
                pisteRef: { numero: piste.numero }
            });
            merged['investissement'].push({
                nom: 'Coût récurrent annuel',
                description: this.formatBudget(piste.budget?.cout_recurrent_annuel || 0),
                pisteRef: { numero: piste.numero }
            });
            
            // Ajouter les économies estimées
            if (piste.impact_economies) {
                if (!merged['economie']) merged['economie'] = [];
                merged['economie'].push({
                    nom: 'Économies estimées',
                    description: this.formatBudget(piste.impact_economies) + '/an',
                    pisteRef: { numero: piste.numero }
                });
            }
            
            // Ajouter les questions (si disponibles dans les métadonnées)
            // Note: Les questions pourraient être stockées dans un champ dédié
            if (piste.meta_questions) {
                // À implémenter si les données contiennent des questions
            }
        });
        
        return merged;
    },

    /**
     * Calcule les dimensions moyennes pour le radar
     */
    calculateAverageDimensions(pistes) {
        if (pistes.length === 0) {
            return {
                culture: 0,
                technique: 0,
                humain: 0,
                organisationnel: 0,
                economique: 0
            };
        }
        
        let total = {
            culture: 0,
            technique: 0,
            humain: 0,
            organisationnel: 0,
            economique: 0
        };
        
        pistes.forEach(piste => {
            if (piste.dimensions) {
                total.culture += piste.dimensions.culture || 0;
                total.technique += piste.dimensions.technique || 0;
                total.humain += piste.dimensions.humain || 0;
                total.organisationnel += piste.dimensions.organisationnel || 0;
                total.economique += piste.dimensions.economique || 0;
            }
        });
        
        return {
            culture: Math.round(total.culture / pistes.length),
            technique: Math.round(total.technique / pistes.length),
            humain: Math.round(total.humain / pistes.length),
            organisationnel: Math.round(total.organisationnel / pistes.length),
            economique: Math.round(total.economique / pistes.length)
        };
    },

    /**
     * Rend les éléments fusionnés par rubrique
     */
    renderMergedElements(mergedElements, pistesCount) {
        let html = '';
        
        // Ordre d'affichage des rubriques
        const orderedTypes = [
            'problematique',
            'principe',
            'perimetre',
            'bareme',
            'seuil',
            'seuil_alcool',
            'seuil_stupefiant',
            'reconquete',
            'investissement',
            'economie',
            'phase',
            'indicateur_cle',
            'indicateur_activite',
            'indicateur_resultat',
            'risque',
            'avantage',
            'categorie',
            'question'
        ];
        
        for (const type of orderedTypes) {
            const elements = mergedElements[type];
            if (!elements || elements.length === 0) continue;
            
            const icon = this.TYPE_ICONS[type] || '📌';
            const title = this.TYPE_TITLES[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            html += `
                <div class="section merged-section">
                    <div class="section-title">
                          ${title}
                        <span class="section-badge">${elements.length}</span> élément(s) de ${pistesCount} piste(s)
                    </div>
                    
                    <div class="merged-content">
                        ${this.renderMergedElementsByType(type, elements)}
                    </div>
                </div>
            `;
        }
        
        return html;
    },

    /**
     * Rend les éléments fusionnés selon leur type
     */
    renderMergedElementsByType(type, elements) {
        switch(type) {
            case 'investissement':
            case 'economie':
                return this.renderMergedInvestissement(elements);
            
            case 'phase':
                return this.renderMergedPhases(elements);
            
            case 'indicateur_cle':
            case 'indicateur_activite':
            case 'indicateur_resultat':
                return this.renderMergedIndicateurs(elements);
            
            case 'risque':
                return this.renderMergedRisques(elements);
            
            case 'avantage':
                return this.renderMergedAvantages(elements);
            
            case 'categorie':
                return this.renderMergedCategories(elements);
            
            default:
                return this.renderMergedDefault(elements);
        }
    },

    renderMergedInvestissement(elements) {
        // Grouper par piste
        const grouped = {};
        elements.forEach(elem => {
            if (!grouped[elem.pisteRef.numero]) {
                grouped[elem.pisteRef.numero] = [];
            }
            grouped[elem.pisteRef.numero].push(elem);
        });
        
        let html = '';
        
        Object.entries(grouped).forEach(([pisteNum, items]) => {
            const pisteName = items[0].pisteRef.titre;
            html += `
                <div class="piste-group">
                    <h4 class="piste-group-title">${pisteNum} - ${pisteName}</h4>
                    <table class="table">
                        <tr><th>Poste</th><th>Valeur</th></tr>
                        ${items.map(item => `
                            <tr>
                                <td>${item.nom}</td>
                                <td>${item.description}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            `;
        });
        
        return html;
    },

    renderMergedPhases(elements) {
        let html = '<div class="phases-container">';
        
        elements.forEach(elem => {
            html += `
                <div class="phase-item">
                    <div class="phase-header">
                        <span class="piste-ref-badge">${elem.pisteRef.numero}</span>
                        <strong>${elem.nom}</strong>
                    </div>
                    <div class="phase-details">
                        <div><strong>Durée:</strong> ${elem.etape_duree || '-'}</div>
                        <div><strong>Activités:</strong> ${elem.activites || '-'}</div>
                        <div><strong>Objectifs:</strong> ${elem.objectifs_etape || '-'}</div>
                        <div><strong>Livrable:</strong> ${elem.livrable_etape || '-'}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    },

    renderMergedIndicateurs(elements) {
        let html = `
            <table class="table">
                <tr>
                    <th>Piste</th>
                    <th>Indicateur</th>
                    <th>Valeur</th>
                    <th>Périodicité</th>
                </tr>
        `;
        
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><span class="piste-ref-badge">${elem.pisteRef.numero}</span></td>
                    <td>${elem.nom}</td>
                    <td>${elem.cible || ''} ${elem.unite || ''}</td>
                    <td>${elem.periodicite || '-'}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        return html;
    },

    renderMergedRisques(elements) {
        let html = `
            <table class="table">
                <tr>
                    <th>Piste</th>
                    <th>Risque</th>
                    <th>Probabilité</th>
                    <th>Gravité</th>
                    <th>Mitigation</th>
                </tr>
        `;
        
        const probaMap = { 'élevée': '🔴', 'moyenne': '🟡', 'faible': '🟢' };
        const graviteMap = { 'critique': '🔴', 'élevée': '🟡', 'modérée': '🟢', 'faible': '⚪' };
        
        elements.forEach(elem => {
            const probaIcone = probaMap[elem.probabilite] || '⚪';
            const graviteIcone = graviteMap[elem.gravite] || '⚪';
            
            html += `
                <tr>
                    <td><span class="piste-ref-badge">${elem.pisteRef.numero}</span></td>
                    <td>${elem.nom || ''}</td>
                    <td>${probaIcone} ${elem.probabilite || ''}</td>
                    <td>${graviteIcone} ${elem.gravite || ''}</td>
                    <td>${elem.mitigation || ''}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        return html;
    },

    renderMergedAvantages(elements) {
        let html = `
            <table class="table">
                <tr>
                    <th>Piste</th>
                    <th>Bénéficiaire</th>
                    <th>Avantage</th>
                </tr>
        `;
        
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><span class="piste-ref-badge">${elem.pisteRef.numero}</span></td>
                    <td>${elem.beneficiaire || 'N/A'}</td>
                    <td>${elem.nom || ''}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        return html;
    },

    renderMergedCategories(elements) {
        let html = '<div class="tags-cloud">';
        
        elements.forEach(elem => {
            html += `<span class="tag"><span class="piste-ref-tag">${elem.pisteRef.numero}</span> ${elem.nom}</span>`;
        });
        
        html += '</div>';
        return html;
    },

    renderMergedDefault(elements) {
        let html = '<div class="default-items">';
        
        elements.forEach(elem => {
            html += `
                <div class="default-item">
                    <div class="default-item-header">
                        <span class="piste-ref-badge">${elem.pisteRef.numero}</span>
                        <strong>${elem.nom || ''}</strong>
                    </div>
                    <div class="default-item-content">
                        ${elem.description || ''}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    },

    calculateScenarioMetrics(pistes) {
        const totalBudget = pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
        const totalImpact = pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0);
        const totalAccidents = pistes.reduce((sum, p) => sum + (p.impact_accidents_evites || 0), 0);
        const totalRoi = pistes.reduce((sum, p) => sum + (p.roi_mois || 0), 0);
        const totalDelai = pistes.reduce((sum, p) => sum + (p.delai_mois || 0), 0);
        
        return {
            totalBudget,
            avgImpact: pistes.length > 0 ? Math.round(totalImpact / pistes.length) : 0,
            totalAccidentsEvites: totalAccidents,
            avgRoi: pistes.length > 0 ? Math.round(totalRoi / pistes.length) : 0,
            avgDelai: pistes.length > 0 ? Math.round(totalDelai / pistes.length) : 0
        };
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
        const colors = { 
            'P1': 'red',
            'P2': 'orange',
            'P3': 'yellow',
            'P4': 'blue'
        };
        return colors[priority] || 'slate';
    },

    goBack() {
        if (window.router) {
            router.navigate('/simuler');
        } else {
            window.history.back();
        }
    },

    loadInSimulator() {
        if (window.router && this.currentScenario) {
            // Charger le scénario dans le simulateur
            if (appActions && appActions.loadScenario) {
                appActions.loadScenario(this.currentScenario.id);
            }
            router.navigate('/simuler');
        }
    },

    exportScenarioJSON() {
        if (!this.currentScenario) return;
        
        const data = {
            name: this.currentScenario.name,
            id: this.currentScenario.id,
            createdAt: this.currentScenario.createdAt,
            pistes: this.currentScenario.pistes.map(p => p.numero),
            pistesDetails: this.currentScenario.pistes,
            metrics: this.calculateScenarioMetrics(this.currentScenario.pistes)
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

    async exportToPDF() {
        try {
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'pdf-loading';
            loadingMsg.innerHTML = `
                <div class="pdf-loading-content">
                    <div class="spinner"></div>
                    <p>Génération du PDF en cours...</p>
                </div>
            `;
            document.body.appendChild(loadingMsg);

            if (typeof window.html2pdf === 'undefined') {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
            }

            const element = document.getElementById('pdf-content');
            if (!element) throw new Error('Contenu PDF introuvable');

            const themeStyle = document.createElement('style');
            themeStyle.id = 'pdf-theme-vars-scenario';
            themeStyle.textContent = this.getThemeVariablesForPDF();
            document.head.appendChild(themeStyle);
            element.classList.add('pdf-export-mode');

            const opt = {
                margin: [0.3, 0.3, 0.3, 0.3],
                filename: `Scenario_${this.currentScenario.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    letterRendering: true,
                    useCORS: true,
                    logging: false,
                    scrollX: 0,
                    scrollY: 0,
                    x: 0,
                    y: 0,
                    width: element.scrollWidth,
                    height: element.scrollHeight,
                    windowWidth: element.scrollWidth,
                    windowHeight: element.scrollHeight,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(element).save();
            element.classList.remove('pdf-export-mode');
            const cleanupThemeStyle = document.getElementById('pdf-theme-vars-scenario');
            if (cleanupThemeStyle) cleanupThemeStyle.remove();
            document.body.removeChild(loadingMsg);

            if (window.Notifications) {
                Notifications.success('PDF généré avec succès !');
            }

        } catch (error) {
            console.error('Erreur PDF:', error);
            const loadingMsg = document.querySelector('.pdf-loading');
            if (loadingMsg) document.body.removeChild(loadingMsg);

            const element = document.getElementById('pdf-content');
            if (element) element.classList.remove('pdf-export-mode');
            const cleanupThemeStyle = document.getElementById('pdf-theme-vars-scenario');
            if (cleanupThemeStyle) cleanupThemeStyle.remove();
            
            if (window.Notifications) {
                Notifications.error('Erreur lors de la génération du PDF');
            }
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

    getThemeVariablesForPDF() {
        const computed = getComputedStyle(document.documentElement);
        const defaults = {
            '--cdg-navy': '#003D82',
            '--cdg-orange': '#FF6B35',
            '--gray-50': '#F9FAFB',
            '--gray-100': '#F3F4F6',
            '--gray-200': '#E5E7EB',
            '--gray-300': '#D1D5DB',
            '--gray-400': '#9CA3AF',
            '--gray-500': '#6B7280',
            '--gray-600': '#4B5563',
            '--gray-700': '#374151',
            '--gray-800': '#1F2937',
            '--gray-900': '#111827',
            '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            '--info': '#3B82F6'
        };

        const lines = Object.entries(defaults).map(([name, fallback]) => {
            const value = computed.getPropertyValue(name).trim() || fallback;
            return `${name}: ${value};`;
        });

        return `:root { ${lines.join(' ')} }`;
    },

    setupEventListeners() {
        console.log('✅ ScenarioDetail ready');
        
        // Initialiser le graphique radar après le rendu
        setTimeout(() => {
            this.initRadarChart();
        }, 100);
    },

    initRadarChart() {
        const canvas = document.getElementById('radarChart');
        if (!canvas || !window.Chart) return;
        
        const pistes = this.currentScenario?.pistes || [];
        if (pistes.length === 0) return;
        
        const avgDimensions = this.calculateAverageDimensions(pistes);
        
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['CULTURE', 'TECH', 'HUMAIN', 'ORGANISATIONNEL', 'ÉCONOMIQUE'],
                datasets: [{
                    label: 'Moyenne du scénario',
                    data: [
                        avgDimensions.culture,
                        avgDimensions.technique,
                        avgDimensions.humain,
                        avgDimensions.organisationnel,
                        avgDimensions.economique
                    ],
                    backgroundColor: 'rgba(0, 61, 130, 0.2)',
                    borderColor: 'rgba(0, 61, 130, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 61, 130, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 61, 130, 1)'
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
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '%';
                            }
                        }
                    }
                }
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
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: var(--gray-50);
                    color: var(--gray-800);
                    line-height: 1.6;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 20px auto;
                    background-color: white;
                    box-shadow: var(--shadow-xl);
                    border-radius: 12px;
                    overflow: hidden;
                }

                .container.pdf-export-mode .action-bar {
                    display: none !important;
                }

                .container.pdf-export-mode {
                    margin: 0 !important;
                    max-width: none !important;
                    width: 100% !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                }
                
                /* Action Bar */
                .action-bar {
                    background: white;
                    padding: 15px 30px;
                    border-bottom: 1px solid var(--gray-200);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: var(--shadow-sm);
                }
                
                .btn-back-nav {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: none;
                    border: 1px solid var(--gray-200);
                    border-radius: 8px;
                    color: var(--gray-700);
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                
                .btn-back-nav:hover {
                    background: var(--gray-50);
                    border-color: var(--cdg-navy);
                    color: var(--cdg-navy);
                }
                
                .action-buttons {
                    display: flex;
                    gap: 10px;
                }
                
                .btn-pdf, .btn-print {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                
                .btn-pdf {
                    background: var(--cdg-orange);
                    color: white;
                }
                
                .btn-pdf:hover {
                    background: #e55a2b;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .btn-print {
                    background: var(--gray-100);
                    color: var(--gray-700);
                }
                
                .btn-print:hover {
                    background: var(--gray-200);
                    transform: translateY(-2px);
                }
                
                /* Header */
                .header {
                    background: linear-gradient(135deg, var(--cdg-navy) 0%, #0055a8 100%);
                    color: white;
                    padding: 40px;
                    position: relative;
                }
                
                .header h1 {
                    font-size: 2.5em;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                
                .header h2 {
                    font-size: 1.3em;
                    opacity: 0.9;
                    font-weight: 400;
                    margin-bottom: 20px;
                }
                
                .badge-piste {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    background-color: rgba(255,255,255,0.2);
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-size: 1.2em;
                    font-weight: bold;
                    backdrop-filter: blur(10px);
                }
                
                .header-meta {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                .meta-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: rgba(255,255,255,0.15);
                    border-radius: 20px;
                    font-size: 13px;
                    backdrop-filter: blur(5px);
                }
                
                .meta-chip .material-symbols-outlined {
                    font-size: 16px;
                }
                
                /* Section */
                .section {
                    padding: 30px 40px;
                    border-bottom: 1px solid var(--gray-200);
                }
                
                .section:last-child {
                    border-bottom: none;
                }
                
                .section-title {
                    font-size: 1.6em;
                    color: var(--cdg-navy);
                    margin-bottom: 25px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                
                .section-title span {
                    background-color: var(--cdg-navy);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2em;
                }
                
                .section-badge {
                    background: var(--gray-100);
                    color: var(--gray-600);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: normal;
                    margin-left: 10px;
                }
                
                /* Résumé exécutif */
                .executive-summary {
                    background: var(--gray-50);
                    border-radius: 12px;
                    padding: 24px;
                }
                
                .summary-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 16px;
                }
                
                .summary-stat-card {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                
                .summary-stat-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--cdg-navy);
                    margin-bottom: 5px;
                }
                
                .summary-stat-label {
                    font-size: 12px;
                    color: var(--gray-500);
                    text-transform: uppercase;
                }
                
                /* Grille des pistes */
                .pistes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 16px;
                }
                
                .piste-mini-card {
                    background: var(--gray-50);
                    border: 1px solid var(--gray-200);
                    border-radius: 8px;
                    padding: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .piste-mini-card:hover {
                    border-color: var(--cdg-navy);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                }
                
                .piste-mini-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                
                .piste-mini-id {
                    font-family: monospace;
                    font-weight: 700;
                    color: var(--cdg-navy);
                    background: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 12px;
                }
                
                .priority-badge-mini {
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    color: white;
                }
                
                .priority-red { background: var(--danger); }
                .priority-orange { background: var(--cdg-orange); }
                .priority-yellow { background: var(--warning); }
                .priority-blue { background: var(--info); }
                
                .piste-mini-title {
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0 0 10px;
                    color: var(--gray-800);
                }
                
                .piste-mini-stats {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: var(--gray-500);
                }
                
                /* Éléments fusionnés */
                .merged-section {
                    background: white;
                }
                
                .piste-ref-badge {
                    display: inline-block;
                    background: var(--cdg-navy);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    white-space: nowrap;
                }
                
                .piste-ref-tag {
                    display: inline-block;
                    background: var(--cdg-navy);
                    color: white;
                    padding: 1px 4px;
                    border-radius: 3px;
                    font-size: 9px;
                    font-weight: 700;
                    margin-right: 4px;
                }
                
                .piste-group {
                    margin-bottom: 24px;
                }
                
                .piste-group-title {
                    font-size: 14px;
                    color: var(--cdg-navy);
                    margin: 0 0 12px;
                    padding-bottom: 6px;
                    border-bottom: 1px dashed var(--gray-300);
                }
                
                .phases-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .phase-item {
                    background: var(--gray-50);
                    border-radius: 8px;
                    padding: 16px;
                }
                
                .phase-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 10px;
                }
                
                .phase-details {
                    font-size: 13px;
                    margin-left: 28px;
                }
                
                .phase-details div {
                    margin-bottom: 4px;
                }
                
                .default-items {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .default-item {
                    padding: 12px;
                    background: var(--gray-50);
                    border-radius: 8px;
                }
                
                .default-item-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 6px;
                }
                
                .tags-cloud {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .tag {
                    background: var(--gray-100);
                    color: var(--gray-700);
                    padding: 4px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    display: inline-flex;
                    align-items: center;
                }
                
                /* Table */
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                }
                
                .table th {
                    background: var(--gray-100);
                    padding: 10px;
                    text-align: left;
                    font-weight: 600;
                }
                
                .table td {
                    padding: 10px;
                    border-bottom: 1px solid var(--gray-200);
                }
                
                /* Boutons */
                .btn-primary, .btn-secondary {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                }
                
                .btn-primary {
                    background: var(--cdg-navy);
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #002f66;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .btn-secondary {
                    background: white;
                    color: var(--gray-700);
                    border: 1px solid var(--gray-300);
                }
                
                .btn-secondary:hover {
                    background: var(--gray-50);
                    transform: translateY(-2px);
                }
                
                /* Footer */
                .footer {
                    background: var(--gray-800);
                    color: white;
                    padding: 20px 40px;
                    text-align: center;
                }
                
                .footer a {
                    color: var(--gray-400);
                    text-decoration: none;
                }
                
                .footer a:hover {
                    color: white;
                }
                
                /* Loading PDF */
                .pdf-loading {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                
                .pdf-loading-content {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--gray-200);
                    border-top-color: var(--cdg-navy);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                /* Error page */
                .error-page {
                    text-align: center;
                    padding: 60px 20px;
                }
                
                .error-page h2 {
                    color: var(--gray-800);
                    margin-bottom: 10px;
                }
                
                .error-page p {
                    color: var(--gray-500);
                    margin-bottom: 20px;
                }
                
                .btn-back {
                    background: var(--cdg-navy);
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .section { padding: 20px; }
                    .header h1 { font-size: 1.8em; }
                    .summary-stats-grid { grid-template-columns: 1fr 1fr; }
                    .action-bar { flex-direction: column; gap: 10px; }
                    .action-buttons { width: 100%; }
                    .btn-pdf, .btn-print { flex: 1; }
                }
            </style>
        `;
    }
};

// Enregistrer la page
window.pages = window.pages || {};
window.pages.ScenarioDetail = pages.ScenarioDetail;
