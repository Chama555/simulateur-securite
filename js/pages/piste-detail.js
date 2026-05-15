/**
 * PAGES/PISTE-DETAIL.JS - Page de détail d'une piste (VERSION ULTRA COMPLÈTE)
 * Inspirée du script Python export2html.py avec tous les types d'éléments
 */

pages.PisteDetail = {
    currentPiste: null,

    // Mapping des icônes par type d'élément
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
        'indicateur_impact': '📈',
        'impact': '🎯',
        'faisabilite': '📐',
        'acceptabilite': '🤝',
        'recommandation': '💡',
        'conclusion': '📌',
        'objectif': '🎯',
        'chiffre_cle': '🔢',
        'calendrier': '📅',
        'suivi': '📊',
        'detail': '🔍',
        'contexte': '📋',
        'pilote': '🚀',
        'generalisation': '🌍',
        'extension': '📈'
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
        'articulation_p1': 'Articulation avec le permis à points (P1)',
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
        'indicateur_impact': "Indicateurs d'impact des campagnes",
        'impact': 'Niveau impact',
        'faisabilite': 'Niveau faisabilité',
        'acceptabilite': "Niveau d'acceptabilité",
        'recommandation': 'Recommandation',
        'conclusion': 'Conclusion',
        'objectif': 'Objectifs',
        'chiffre_cle': 'Chiffres clés',
        'calendrier': 'Calendrier prévisionnel',
        'suivi': 'Suivi et indicateurs',
        'detail': 'Détails complémentaires',
        'contexte': 'Contexte',
        'pilote': 'Phase pilote',
        'extension': "Phase d'extension",
        'generalisation': 'Phase de généralisation'
    },

    // Mapping des couleurs par priorité
    PRIORITY_COLORS: {
        'P1': '#EF4444',  // Rouge pour Quick Wins
        'P2': '#F59E0B',  // Orange pour Stratégiques
        'P3': '#FF6B35',  // Orange clair pour Complémentaires
        'P4': '#3B82F6',  // Bleu pour Long terme
    },

    async render() {
        // Extraire l'ID de l'URL
        let path = (window.router && window.router.currentPath) || window.location.pathname || '/';
        path = path.split('?')[0];
        const segments = path.split('/').filter(s => s.length > 0);
        let pisteId = segments[segments.length - 1];
        
        console.log('📌 Détail pour piste ID:', pisteId);

        // Attendre que les pistes soient chargées
        const state = appStore.getState();
        let pistes = state.allPistes;
        
        if (!pistes || pistes.length === 0) {
            console.log('⏳ Attente du chargement des pistes...');
            await new Promise(resolve => setTimeout(resolve, 500));
            const newState = appStore.getState();
            pistes = newState.allPistes;
        }

        const piste = pistes?.find(p => p.numero === pisteId);

        if (!piste) {
            return `
                <div class="detail-wrapper">
                    <div class="error-page">
                        <h2>Piste non trouvée</h2>
                        <p>ID recherché: ${pisteId}</p>
                        <button onclick="pages.PisteDetail.goBack()" class="btn-back">
                            ← Retour
                        </button>
                    </div>
                </div>
                ${this.getStyles()}
            `;
        }

        this.currentPiste = piste;

        // Grouper les éléments par type (simulation - à remplacer par des données réelles)
        const elementsByType = this.groupElementsByType(piste);

        return `
            <div class="container" id="pdf-content">
                <!-- Barre d'actions en haut -->
                <div class="action-bar">
                    <button class="btn-back-nav" onclick="pages.PisteDetail.goBack()">
                        <span class="material-symbols-outlined">arrow_back</span>
                        Retour
                    </button>
                    <div class="action-buttons">
                        <button class="btn-pdf" onclick="pages.PisteDetail.exportToPDF()">
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
                    <div class="badge-piste">${piste.numero || 'N/A'}</div>
                    <h1>${piste.titre || 'Sans titre'}</h1>
                    <h2>${piste.titre_long || ''}</h2>
                    <div>
                        <span class="badge" style="background-color: ${this.getPriorityColor(piste.priorite)}; color: white;">${piste.priorite || 'P3'}</span>
                        <span class="badge" style="background-color: var(--gray-600); color: white;">${piste.categorie || 'N/A'}</span>
                        <span class="badge" style="background-color: var(--info); color: white;">${piste.famille || 'N/A'}</span>
                    </div>
                </div>
            
                <!-- Description -->
                <div class="section">
                    <div class="section-title"><span>📝</span> Description</div>
                    <p style="font-size: 1.1em; margin-bottom: 20px;">${piste.description || ''}</p>
                    <div class="info-card">
                        <h3>Description détaillée</h3>
                        <p>${piste.description_longue || piste.description || 'Aucune description détaillée disponible'}</p>
                    </div>
                </div>
            
                <!-- Indicateurs clés -->
                <div class="section">
                    <div class="section-title"><span>📊</span> Indicateurs clés</div>
                    <div class="grid-3">
                        <div class="stat-box">
                            <div class="stat-value">${this.formatBudget(piste.budget?.cout_3_ans || 0)}</div>
                            <div class="stat-label">Budget total 3 ans</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${piste.delai_texte || piste.delai_mois + ' mois' || 'N/A'}</div>
                            <div class="stat-label">Délai de déploiement</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${piste.impact_score || 0}/100</div>
                            <div class="stat-label">Score d'impact</div>
                        </div>
                    </div>
            
                    <div style="margin-top: 30px;">
                        <h3>Détail du budget</h3>
                        <table class="table">
                            <tr><td>Budget 2026</td><td>${this.formatBudget(piste.budget?.cout_2026 || 0)}</td></tr>
                            <tr><td>Budget 2027</td><td>${this.formatBudget(piste.budget?.cout_2027 || 0)}</td></tr>
                            <tr><td>Budget 2028</td><td>${this.formatBudget(piste.budget?.cout_2028 || 0)}</td></tr>
                            <tr><td>Coût récurrent annuel</td><td>${this.formatBudget(piste.budget?.cout_recurrent_annuel || 0)}</td></tr>
                        </table>
                    </div>
                </div>
            
                <!-- ROI et Impact -->
                <div class="section">
                    <div class="grid-2">
                        <div class="info-card">
                            <h3>📈 Retour sur investissement</h3>
                            <p><strong>ROI :</strong> ${piste.roi_texte || piste.roi_mois + ' mois' || 'N/A'}</p>
                            <p>${piste.roi_mois || ''} mois</p>
                        </div>
                        <div class="info-card">
                            <h3>🎯 Impact attendu</h3>
                            <p>${piste.impact_texte || ''}</p>
                            <p><strong>Accidents évités estimés :</strong> ${piste.impact_accidents_evites || 0}/an</p>
                            <p><strong>Économies estimées :</strong> ${this.formatBudget(piste.impact_economies || 0)}/an</p>
                        </div>
                    </div>
                </div>
            
                <!-- Matrice d'évaluation -->
                <div class="section">
                    <div class="section-title"><span>📐</span> Matrice d'évaluation</div>
                    <div class="grid-2">
                        <div>
                            <h3>Niveau d'impact</h3>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(piste.niveau_impact || 0) * 25}%;"></div>
                            </div>
                            <p>Niveau ${piste.niveau_impact || 0}/4</p>
                        </div>
                        <div>
                            <h3>Niveau de faisabilité</h3>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(piste.niveau_faisabilite || 0) * 25}%;"></div>
                            </div>
                            <p>Niveau ${piste.niveau_faisabilite || 0}/4</p>
                        </div>
                    </div>
                </div>
                
                <!-- Tags -->
                ${piste.tags && piste.tags.length > 0 ? `
                <div class="section">
                    <div class="section-title"><span>🏷️</span> Tags</div>
                    <div>
                        ${piste.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Dimensions Balancing -->
                <div class="section">
                    <div class="section-title"><span>📊</span> Dimensions Balancing</div>
                   
                    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                        <div style="width: 100%; max-width: 500px;">
                            <canvas id="radarChart" width="400" height="400"></canvas>
                        </div>
                    </div>
                    
                    <!-- Légende des dimensions -->
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Culture: ${piste.dimensions?.culture || 0}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Tech: ${piste.dimensions?.technique || 0}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Humain: ${piste.dimensions?.humain || 0}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Organisationnel: ${piste.dimensions?.organisationnel || 0}%</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: rgba(0, 61, 130, 0.2); border: 2px solid rgba(0, 61, 130, 1); border-radius: 3px; margin-right: 5px;"></div>
                            <span style="font-size: 0.9em;">Économique: ${piste.dimensions?.economique || 0}%</span>
                        </div>
                    </div>
                </div>
            
                <!-- SECTION DÉTAILS DU DISPOSITIF -->
                <div class="section">
                    <div class="section-title"><span>📋</span> Détails du dispositif</div>
                    
                    ${this.renderAllElementsByType(elementsByType)}
                    
                </div>
            
                <!-- Avantages -->
                ${piste.avantages && piste.avantages.length > 0 ? `
                <div class="section">
                    <div class="section-title"><span>✅</span> Avantages</div>
                    <table class="table">
                        <tr><th>Bénéficiaire</th><th>Avantage</th></tr>
                        ${piste.avantages.map(av => `
                        <tr>
                            <td>${av.beneficiaire || 'N/A'}</td>
                            <td>${av.texte || 'N/A'}</td>
                        </tr>
                        `).join('')}
                    </table>
                </div>
                ` : ''}
            
                <!-- Risques et mitigation -->
                ${piste.risques && piste.risques.length > 0 ? `
                <div class="section">
                    <div class="section-title"><span>⚠️</span> Risques et mitigation</div>
                    <table class="table">
                        <tr><th>Risque</th><th>Probabilité</th><th>Gravité</th><th>Mitigation</th></tr>
                        ${piste.risques.map(r => this.renderRiskRow(r)).join('')}
                    </table>
                </div>
                ` : ''}
            
                <!-- Justificatifs et sources -->
                ${piste.justificatifs && piste.justificatifs.length > 0 ? `
                <div class="section">
                    <div class="section-title"><span>📚</span> Justificatifs et sources</div>
                    <table class="table">
                        <tr><th>Type</th><th>Titre</th><th>Source</th><th>Résultat</th><th>Pertinence</th></tr>
                        ${piste.justificatifs.map(j => this.renderJustificatifRow(j)).join('')}
                    </table>
                </div>
                ` : ''}
            
                <!-- Actions >
                <div class="section" style="display: flex; gap: 15px; justify-content: center;">
                    <button class="btn-primary" onclick="pages.PisteDetail.addToScenario('${piste.numero}')">
                        <span class="material-symbols-outlined">add_circle</span>
                        Ajouter au scénario
                    </button>
                </div-->
            


            </div>
            ${this.getStyles()}
        `;
    },

    /**
     * Groupe les éléments par type pour faciliter le rendu
     */
    groupElementsByType(piste) {
        const elementsByType = {};

        // Ajouter les éléments problématique (simulés)
        elementsByType['problematique'] = [
            {
                nom: 'Constat alarmant',
                description: piste.description_longue?.split('.')[0] || 'Les statistiques 2024-2025 font apparaître des causes multiples d\'accidents.'
            },
            {
                nom: 'Notre hypothèse',
                description: 'La certitude de la sanction est plus dissuasive que sa sévérité.'
            }
        ];

        // Ajouter les éléments périmètre
        elementsByType['perimetre'] = [
            {
                nom: 'Personnes concernées',
                description: 'Conducteurs d\'engins de piste (PUSH, LOADER, TRACTEUR BAGAGES, TAPIS, GPU, BUS, DÉGIVREUSE...)'
            },
            {
                nom: 'Engins - Priorité 1',
                description: 'Catégories critiques (PUSH, LOADER, DÉGIVREUSE, BUS)'
            }
        ];

        // Ajouter les éléments phases de déploiement
        elementsByType['phase'] = [
            {
                nom: 'Phase 1 - Pilote',
                etape_duree: '3-6 mois',
                activites: 'Sélection d\'une entreprise pilote. Information-consultation CSE. Achat et installation des équipements.',
                objectifs_etape: 'Tester l\'acceptabilité et la faisabilité opérationnelle',
                livrable_etape: 'Évaluation intermédiaire'
            },
            {
                nom: 'Phase 2 - Extension',
                etape_duree: '6-12 mois',
                activites: 'Extension à 2-3 entreprises supplémentaires. Renforcement des équipes.',
                objectifs_etape: 'Généralisation aux engins critiques',
                livrable_etape: 'Dispositif étendu'
            },
            {
                nom: 'Phase 3 - Généralisation',
                etape_duree: '12-24 mois',
                activites: 'Équipement généralisé des engins critiques. Généralisation sur CDG et Orly.',
                objectifs_etape: 'Déploiement sur l\'ensemble des plateformes',
                livrable_etape: 'Dispositif généralisé'
            }
        ];

        // Ajouter les éléments investissement
        elementsByType['investissement'] = [
            {
                nom: 'Éthylotests portables connectés',
                description: '400€/unité. Phase 1 : 400 - 160 000€. Total général : 700 000€.'
            },
            {
                nom: 'Kits dépistage stupéfiants',
                description: '150€/boîte. Phase 1 : 100 boîtes - 15 000€. Total général : 60 000€.'
            },
            {
                nom: 'Formation équipes',
                description: '2 500€/pers. Phase 1 : 12 pers - 30 000€. Total général : 90 000€.'
            },
            {
                nom: 'Total Phase 1 (pilote)',
                description: '~285 000€'
            },
            {
                nom: 'Total général',
                description: '~1 040 000€'
            }
        ];

        // Ajouter les éléments économies
        elementsByType['economie'] = [
            {
                nom: 'Accidents matériels',
                description: 'Coût unitaire : 15 000€/accident. Volume annuel : 41. Économie : 615 000€.'
            },
            {
                nom: 'Accidents corporels',
                description: 'Coût unitaire : 45 000€/accident. Volume annuel : 20. Économie : 900 000€.'
            },
            {
                nom: 'Retards vols',
                description: 'Coût unitaire : 8 000€/incident. Volume annuel : 30. Économie : 240 000€.'
            },
            {
                nom: 'Économie annuelle potentielle',
                description: '~1 980 000€'
            }
        ];

        // Ajouter les éléments indicateurs
        elementsByType['indicateur_activite'] = [
            {
                nom: 'Nombre de tests réalisés',
                cible: '> 5 000',
                unite: '/mois',
                periodicite: 'mensuelle'
            },
            {
                nom: 'Taux de couverture des conducteurs',
                cible: '> 80',
                unite: '%',
                periodicite: 'trimestrielle'
            }
        ];

        elementsByType['indicateur_resultat'] = [
            {
                nom: 'Taux de positivité alcool',
                cible: '< 0.1',
                unite: '%',
                periodicite: 'mensuelle'
            },
            {
                nom: 'Accidents corporels liés à l\'alcool/stup',
                cible: '0',
                unite: '',
                periodicite: 'trimestrielle'
            }
        ];

        elementsByType['indicateur_cle'] = [
            {
                nom: 'Nombre de tests mensuels',
                cible: '5 000',
                unite: 'tests',
                periodicite: 'mensuelle'
            },
            {
                nom: 'Taux d\'engins équipés (M24)',
                cible: '100',
                unite: '%',
                periodicite: 'semestrielle'
            },
            {
                nom: 'Taux de positivité alcool (cible)',
                cible: '0.1',
                unite: '%',
                periodicite: 'mensuelle'
            }
        ];

        // Ajouter les éléments questions
        elementsByType['question'] = [
            {
                description: 'Avez-vous connaissance d\'initiatives similaires déjà tentées sur CDG ou d\'autres aéroports français ?'
            },
            {
                description: 'Quel est, selon vous, le principal frein à ce type de dispositif : coût, acceptabilité sociale, cadre légal, ou autre ?'
            },
            {
                description: 'Une entreprise membre du CSCA serait-elle volontaire pour une phase pilote ?'
            }
        ];

        // Ajouter les éléments visuel de synthèse
        elementsByType['visuel'] = [
            {
                nom: 'Titre',
                description: `DISPOSITIF ${piste.titre?.toUpperCase() || 'PISTE'} - PROPOSITION CDG 2026`
            },
            {
                nom: 'Budget',
                description: `${this.formatBudget(piste.budget?.cout_3_ans || 0)} sur 3 ans`
            },
            {
                nom: 'Impact',
                description: `${piste.impact_texte || `-${piste.impact_score || 0}% accidents`}`
            },
            {
                nom: 'ROI',
                description: `${piste.roi_texte || piste.roi_mois + ' mois' || 'N/A'}`
            },
            {
                nom: 'Objectif',
                description: 'ZÉRO ACCIDENT CORPOREL D\'ICI 2028'
            }
        ];

        // Ajouter les éléments complémentarité
        elementsByType['complementarite_audits'] = [
            {
                nom: 'Audits périodiques (1-2/an)',
                meta_donnees: '',
                description: 'Contrôles quotidiens → Effet dissuasif permanent'
            },
            {
                nom: 'Évaluation des processus',
                meta_donnees: '',
                description: 'Évaluation des individus → Responsabilisation personnelle'
            },
            {
                nom: 'Sanctions différées',
                meta_donnees: '',
                description: 'Sanctions immédiates → Lien cause/conséquence visible'
            }
        ];

        // Ajouter les éléments obligations
        elementsByType['obligation_prealable'] = [
            {
                nom: 'Information-consultation CSE',
                meta_donnees: 'Employeur / IRP',
                etape_duree: '1-2 mois'
            },
            {
                nom: 'Avis médecin du travail',
                meta_donnees: 'Service de santé au travail',
                etape_duree: '1 mois'
            },
            {
                nom: 'Déclaration CNIL (tests salivaires)',
                meta_donnees: 'CNIL',
                etape_duree: '2-3 mois'
            }
        ];

        // Ajouter les éléments conditions juridiques
        elementsByType['condition_juridique'] = [
            {
                nom: 'Proportionnalité',
                description: 'Les contrôles doivent être justifiés par la nature des risques (sécurité aérienne)'
            },
            {
                nom: 'Transparence',
                description: 'Information préalable des salariés (règlement intérieur)'
            },
            {
                nom: 'Non-discrimination',
                description: 'Tous les conducteurs concernés de façon identique'
            },
            {
                nom: 'Confidentialité',
                description: 'Résultats des tests protégés (secret médical pour les stupéfiants)'
            }
        ];

        return elementsByType;
    },

    /**
     * Rend tous les éléments groupés par type
     */
    renderAllElementsByType(elementsByType) {
        let html = '';

        // Ordre d'affichage des types d'éléments
        const orderedTypes = [
            'problematique',
            'principe',
            'perimetre',
            'perimetre_deploiement',
            'approche_technologique',
            'approche_humaine',
            'dispositif_technique',
            'technologie',
            'etat_lieux',
            'emps',
            'plan_controles',
            'rotation_zones',
            'bareme',
            'seuil',
            'seuil_alcool',
            'seuil_stupefiant',
            'recidive',
            'reconquete',
            'modalite',
            'articulation_disciplinaire',
            'articulation_p1',
            'complementarite',
            'complementarite_audits',
            'base_legale',
            'obligation',
            'obligation_prealable',
            'condition_juridique',
            'investissement',
            'economie',
            'comparaison',
            'phase',
            'indicateur',
            'indicateur_activite',
            'indicateur_resultat',
            'indicateur_cle',
            'question',
            'question_technique',
            'question_operationnelle',
            'message_cle',
            'demande',
            'visuel',
            'video_profil',
            'affichage_zone',
            'scenario_vr',
            'objectif_adoption',
            'indicateur_impact'
        ];

        const processedTypes = new Set();

        for (const type of orderedTypes) {
            if (processedTypes.has(type)) continue;
            
            const elements = elementsByType[type];
            if (!elements || elements.length === 0) continue;

            const icon = this.TYPE_ICONS[type] || '📌';
            const title = this.TYPE_TITLES[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            // Style spécial pour la problématique
            if (type === 'problematique') {
                html += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #e74c3c;">${title}</h3>
                ${this.renderElementGroup(type, elements)}
            </div>
                `;
            } else {
                html += `
            <div style="margin-bottom: 30px;">
                <h3>${title}</h3>
                ${this.renderElementGroup(type, elements)}
            </div>
                `;
            }

            processedTypes.add(type);
        }

        return html;
    },

    /**
     * Rend un groupe d'éléments selon leur type
     */
    renderElementGroup(type, elements) {
        switch(type) {
            case 'bareme':
                return this.renderBaremeElements(elements);
            
            case 'seuil':
                return this.renderSeuilElements(elements);
            
            case 'seuil_alcool':
            case 'seuil_stupefiant':
                return this.renderSeuilTableElements(elements);
            
            case 'obligation':
            case 'obligation_prealable':
                return this.renderObligationElements(elements);
            
            case 'condition_juridique':
                return this.renderConditionJuridiqueElements(elements);
            
            case 'complementarite':
            case 'complementarite_audits':
                return this.renderComplementariteElements(elements);
            
            case 'indicateur':
            case 'indicateur_activite':
            case 'indicateur_resultat':
            case 'indicateur_cle':
                return this.renderIndicateurElements(elements);
            
            case 'investissement':
            case 'economie':
                return this.renderInvestissementElements(elements);
            
            case 'phase':
                return this.renderPhaseElements(elements);
            
            case 'question':
            case 'question_technique':
            case 'question_operationnelle':
                return this.renderQuestionElements(elements);
            
            case 'visuel':
                return this.renderVisuelElements(elements);
            
            case 'video_profil':
                return this.renderVideoProfilElements(elements);
            
            case 'affichage_zone':
                return this.renderAffichageZoneElements(elements);
            
            case 'scenario_vr':
                return this.renderScenarioVRElements(elements);
            
            case 'objectif_adoption':
                return this.renderObjectifAdoptionElements(elements);
            
            case 'indicateur_impact':
                return this.renderIndicateurImpactElements(elements);
            
            default:
                return this.renderDefaultElements(elements);
        }
    },

    renderBaremeElements(elements) {
        let html = '<div class="points-grid">';
        elements.forEach(elem => {
            const classe = elem.libelle_infraction || 'modérée';
            const points = elem.meta_donnees || '-';
            html += `
                <div class="points-card ${classe}">
                    <h4>${elem.nom}</h4>
                    <div class="points negatif">${points}</div>
                    <div><strong>Gravité :</strong> ${classe}</div>
                    <div class="constat">
                        <strong>Constat :</strong> ${elem.description || ''}
                    </div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    },

    renderSeuilElements(elements) {
        let html = '';
        elements.forEach(elem => {
            const couleur = elem.couleur_hex || '#667eea';
            html += `
                <div class="seuil-bar">
                    <div class="seuil-indicator" style="background-color: ${couleur};"></div>
                    <div class="seuil-range">${elem.seuil_min || ''}-${elem.seuil_max || ''} points</div>
                    <div class="seuil-info">
                        <strong>${elem.statut || ''}</strong><br>
                        <span class="seuil-consequences">${elem.consequences || ''}</span>
                    </div>
                </div>
                <div style="margin-left: 45px; margin-bottom: 15px; font-size: 0.9em; color: #718096;">
                    ${elem.mesures_accompagnement || ''}
                </div>
            `;
        });
        return html;
    },

    renderSeuilTableElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Seuil</th><th>Qualification</th><th>Conséquence immédiate</th><th>Suivi</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.consequences || ''}</td>
                    <td>${elem.mesures_accompagnement || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderObligationElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Action</th><th>Autorité compétente</th><th>Délai estimé</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td>${elem.nom}</td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.etape_duree || elem.description || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderConditionJuridiqueElements(elements) {
        let html = '<ol style="padding-left: 20px;">';
        elements.forEach(elem => {
            html += `
                <li><strong>${elem.nom}</strong> : ${elem.description}</li>
            `;
        });
        html += '</ol>';
        return html;
    },

    renderComplementariteElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Action CSCE/CSCA</th><th>Notre proposition</th><th>Plus-value</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.description || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderIndicateurElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Indicateur</th><th>Cible</th><th>Périodicité</th></tr>
        `;
        elements.forEach(elem => {
            const cible = elem.cible || '';
            const unite = elem.unite || '';
            let cibleDisplay = cible;
            if (unite === '%' && !cible.includes('%')) {
                cibleDisplay = `${cible} %`;
            } else if (unite && !cible.includes(unite)) {
                cibleDisplay = `${cible} ${unite}`.trim();
            }
            
            html += `
                <tr>
                    <td>${elem.nom}</td>
                    <td>${cibleDisplay}</td>
                    <td>${elem.periodicite || '-'}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderInvestissementElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Poste</th><th>Détail</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td>${elem.nom}</td>
                    <td>${elem.description}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderPhaseElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Phase</th><th>Durée</th><th>Activités</th><th>Objectifs</th><th>Livrable</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.etape_duree || '-'}</td>
                    <td>${elem.activites || '-'}</td>
                    <td>${elem.objectifs_etape || '-'}</td>
                    <td>${elem.livrable_etape || '-'}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderQuestionElements(elements) {
        let html = '<ol style="padding-left: 20px;">';
        elements.forEach(elem => {
            html += `<li>${elem.description}</li>`;
        });
        html += '</ol>';
        return html;
    },

    renderVisuelElements(elements) {
        let html = '<div class="visuel-synthese">';
        elements.forEach(elem => {
            if (elem.nom === 'Titre') {
                html += `
                    <div style="text-align: center; font-weight: bold; margin-bottom: 15px;">
                        ${elem.description}
                    </div>
                `;
            } else {
                html += `
                    <div><strong>${elem.nom}:</strong> ${elem.description}</div>
                `;
            }
        });
        html += '</div>';
        return html;
    },

    renderVideoProfilElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Profil conducteur</th><th>Vidéo recommandée</th><th>Angle pédagogique</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.description || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderAffichageZoneElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Zone</th><th>Thème prioritaire</th><th>Rotation</th><th>Responsable</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.meta_donnees2 || ''}</td>
                    <td>${elem.description || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderScenarioVRElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Scénario VR</th><th>Durée</th><th>Compétence visée</th><th>Public prioritaire</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.meta_donnees2 || ''}</td>
                    <td>${elem.description || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderObjectifAdoptionElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Échéance</th><th>Taux d'installation</th><th>Taux d'utilisation hebdomadaire</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td><strong>${elem.nom}</strong></td>
                    <td>${elem.meta_donnees || ''}</td>
                    <td>${elem.meta_donnees2 || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderIndicateurImpactElements(elements) {
        let html = `
            <table class="table">
                <tr><th>Indicateur</th><th>Cible</th><th>Source</th></tr>
        `;
        elements.forEach(elem => {
            html += `
                <tr>
                    <td>${elem.nom}</td>
                    <td>${elem.cible || ''}</td>
                    <td>${elem.source_mesure || ''}</td>
                </tr>
            `;
        });
        html += '</table>';
        return html;
    },

    renderDefaultElements(elements) {
        let html = '';
        elements.forEach(elem => {
            html += `
                <div class="info-card" style="margin-bottom: 15px;">
                    <h4>${elem.nom}</h4>
                    <p>${elem.description}</p>
                </div>
            `;
        });
        return html;
    },

    renderRiskRow(risk) {
        const probaMap = { 'élevée': '🔴', 'moyenne': '🟡', 'faible': '🟢' };
        const graviteMap = { 'critique': '🔴', 'élevée': '🟡', 'modérée': '🟢', 'faible': '⚪' };
        
        const probaIcone = probaMap[risk.probabilite] || '⚪';
        const graviteIcone = graviteMap[risk.gravite] || '⚪';
        
        return `
            <tr>
                <td>${risk.nom || ''}</td>
                <td>${probaIcone} ${risk.probabilite || ''}</td>
                <td>${graviteIcone} ${risk.gravite || ''}</td>
                <td>${risk.mitigation || ''}</td>
            </tr>
        `;
    },

    renderJustificatifRow(justif) {
        const etoiles = '★'.repeat(justif.pertinence || 0) + '☆'.repeat(5 - (justif.pertinence || 0));
        return `
            <tr>
                <td>${justif.type || 'N/A'}</td>
                <td>${justif.url ? `<a href="${justif.url}" target="_blank" style="color: var(--cdg-navy); text-decoration: none;">${justif.titre || 'N/A'}</a>` : (justif.titre || 'N/A')}</td>
                <td>${justif.source || 'N/A'}</td>
                <td>${justif.resultat || '-'}</td>
                <td>${etoiles}</td>
            </tr>
        `;
    },

    formatBudget(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + ' M€';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' k€';
        } else {
            return amount + ' €';
        }
    },

    getPriorityColor(priority) {
        const colors = { 
            'P1': '#EF4444',
            'P2': '#F59E0B',
            'P3': '#FF6B35',
            'P4': '#3B82F6'
        };
        return colors[priority] || '#6B7280';
    },

    addToScenario(pisteId) {
        const state = appStore.getState();
        const piste = state.allPistes?.find(p => p.numero === pisteId);
        if (piste) {
            appActions.addPisteToScenario(piste);
            if (window.Notifications) {
                Notifications.success(`${pisteId} ajoutée au scénario`);
            } else {
                alert(`${pisteId} ajoutée au scénario`);
            }
        }
    },

    goBack() {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }
        if (window.router) {
            router.navigate('/explorer');
        }
    },

    async exportToPDF() {
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

            // Vérifier si html2pdf est chargé, sinon le charger dynamiquement
            if (typeof window.html2pdf === 'undefined') {
                await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
            }

            const element = document.getElementById('pdf-content');
            const piste = this.currentPiste;

            if (!element) {
                throw new Error('Contenu PDF introuvable');
            }

            const themeStyle = document.createElement('style');
            themeStyle.id = 'pdf-theme-vars';
            themeStyle.textContent = this.getThemeVariablesForPDF();
            document.head.appendChild(themeStyle);
            element.classList.add('pdf-export-mode');
            
            // Options pour le PDF
            const opt = {
                margin:        [0.3, 0.3, 0.3, 0.3],
                filename:      `Piste_${piste.numero}_${piste.titre.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`,
                image:         { type: 'jpeg', quality: 0.98 },
                html2canvas:   {
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
                jsPDF:         { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Générer le PDF
            await html2pdf().set(opt).from(element).save();

            element.classList.remove('pdf-export-mode');
            const cleanupThemeStyle = document.getElementById('pdf-theme-vars');
            if (cleanupThemeStyle) cleanupThemeStyle.remove();

            document.body.removeChild(loadingMsg);

            if (window.Notifications) {
                Notifications.success('PDF généré avec succès !');
            }

        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            
            const loadingMsg = document.querySelector('.pdf-loading');
            if (loadingMsg) document.body.removeChild(loadingMsg);

            const element = document.getElementById('pdf-content');
            if (element) element.classList.remove('pdf-export-mode');
            const cleanupThemeStyle = document.getElementById('pdf-theme-vars');
            if (cleanupThemeStyle) cleanupThemeStyle.remove();

            if (window.Notifications) {
                Notifications.error('Erreur lors de la génération du PDF');
            } else {
                alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
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
        console.log('✅ Event listeners prêts');
        
        // Initialiser le graphique radar après le rendu
        setTimeout(() => {
            this.initRadarChart();
        }, 100);
    },

    initRadarChart() {
        const canvas = document.getElementById('radarChart');
        if (!canvas || !window.Chart) return;
        
        const piste = this.currentPiste;
        if (!piste) return;
        
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['CULTURE', 'TECH', 'HUMAIN', 'ORGANISATIONNEL', 'ÉCONOMIQUE'],
                datasets: [{
                    label: 'Distribution',
                    data: [
                        piste.dimensions?.culture || 0,
                        piste.dimensions?.technique || 0,
                        piste.dimensions?.humain || 0,
                        piste.dimensions?.organisationnel || 0,
                        piste.dimensions?.economique || 0
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
                    position: relative;
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
                
                /* Barre d'actions */
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
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid var(--gray-200);
                    border-top: 4px solid var(--cdg-navy);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
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
                    margin-right: 15px;
                    font-size: 1.2em;
                }
                
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                
                .grid-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                }
                
                .info-card {
                    background-color: var(--gray-50);
                    padding: 25px;
                    border-radius: 10px;
                    border-left: 4px solid var(--cdg-orange);
                }
                
                .info-card h3 {
                    font-size: 1.2em;
                    margin-bottom: 15px;
                    color: var(--gray-800);
                    font-weight: 600;
                }
                
                .info-card p {
                    color: var(--gray-700);
                }
                
                .stat-box {
                    text-align: center;
                    padding: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                
                .stat-value {
                    font-size: 2.5em;
                    font-weight: bold;
                    color: var(--cdg-navy);
                    margin-bottom: 5px;
                }
                
                .stat-label {
                    color: var(--gray-500);
                    font-size: 0.9em;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .badge {
                    display: inline-block;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.85em;
                    font-weight: 600;
                    margin-right: 8px;
                    margin-bottom: 8px;
                    color: white;
                }
                
                .tag {
                    background-color: var(--gray-200);
                    color: var(--gray-700);
                    padding: 4px 10px;
                    border-radius: 15px;
                    font-size: 0.85em;
                    display: inline-block;
                    margin-right: 8px;
                    margin-bottom: 8px;
                }
                
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }
                
                .table th {
                    background-color: var(--gray-100);
                    padding: 12px;
                    text-align: left;
                    font-weight: 600;
                    color: var(--gray-800);
                }
                
                .table td {
                    padding: 12px;
                    border-bottom: 1px solid var(--gray-200);
                }
                
                .table tr:last-child td {
                    border-bottom: none;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 10px;
                    background-color: var(--gray-200);
                    border-radius: 5px;
                    margin: 10px 0;
                }
                
                .progress-fill {
                    height: 100%;
                    background-color: var(--cdg-navy);
                    border-radius: 5px;
                }
                
                .risk-badge {
                    display: inline-block;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.85em;
                    font-weight: 600;
                }
                
                .risk-élevée, .risk-élevé, .risk-critique {
                    background-color: #fee2e2;
                    color: #dc2626;
                }
                
                .risk-moyenne, .risk-moyen {
                    background-color: #fef3c7;
                    color: #d97706;
                }
                
                .risk-faible, .risk-modérée {
                    background-color: #d1fae5;
                    color: #059669;
                }
                
                .points-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .points-card {
                    background-color: var(--gray-50);
                    border-radius: 10px;
                    padding: 20px;
                    border-left: 4px solid;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }
                
                .points-card.critique { border-left-color: #e74c3c; }
                .points-card.elevée { border-left-color: #e67e22; }
                .points-card.modérée { border-left-color: #f1c40f; }
                .points-card.faible { border-left-color: #3498db; }
                
                .points-card h4 {
                    font-size: 1.1em;
                    margin-bottom: 10px;
                    color: var(--gray-800);
                }
                
                .points-card .points {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 10px 0;
                }
                
                .points-card .points.negatif { color: #e74c3c; }
                .points-card .points.positif { color: #27ae60; }
                
                .points-card .constat {
                    font-size: 0.9em;
                    color: var(--gray-500);
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid var(--gray-200);
                }
                
                .seuil-bar {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: var(--gray-50);
                    border-radius: 8px;
                }
                
                .seuil-indicator {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                
                .seuil-range {
                    font-weight: bold;
                    min-width: 60px;
                }
                
                .seuil-info {
                    flex: 1;
                    margin-left: 15px;
                }
                
                .seuil-consequences {
                    font-size: 0.9em;
                    color: var(--gray-500);
                }
                
                .visuel-synthese {
                    background-color: var(--gray-50);
                    padding: 20px;
                    border-radius: 10px;
                    font-family: monospace;
                }
                
                .btn-primary {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 1em;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                    background: var(--cdg-navy);
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #002f66;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .footer {
                    background-color: #2d3748;
                    color: white;
                    padding: 20px 40px;
                    text-align: center;
                }
                
                .footer a {
                    color: #a0aec0;
                    text-decoration: none;
                }
                
                .footer a:hover {
                    color: white;
                }
                
                .error-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 32px;
                    text-align: center;
                }
                
                .error-page h2 {
                    font-size: 24px;
                    color: #1e293b;
                    margin-bottom: 12px;
                }
                
                .error-page p {
                    color: #64748b;
                    margin-bottom: 24px;
                }
                
                .btn-back {
                    background: var(--cdg-navy);
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                
                .btn-back:hover {
                    background: #002f66;
                }
                
                /* Styles pour l'impression */
                @media print {
                    .action-bar, .btn-primary, .btn-back-nav {
                        display: none !important;
                    }
                    
                    .container {
                        margin: 0;
                        box-shadow: none;
                    }
                    
                    .header {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    .badge, .risk-badge {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
                
                @media (max-width: 768px) {
                    .grid-2, .grid-3 {
                        grid-template-columns: 1fr;
                    }
                    .header h1 {
                        font-size: 1.8em;
                    }
                    .section {
                        padding: 20px;
                    }
                    .action-bar {
                        flex-direction: column;
                        gap: 10px;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.PisteDetail = pages.PisteDetail;
