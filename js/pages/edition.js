/**
 * PAGES/EDITION.JS - Page d'édition des pistes (Design professionnel)
 * Version enrichie avec tous les champs de piste-detail.js
 * CORRECTION : Données par défaut complètes pour chaque onglet
 */

pages.Edition = {
    selectedTrackId: null,
    filteredTracks: [],
    filterPriority: 'Tous',
    searchTerm: '',
    activeTab: 'general', // general, dimensions, dispositif, phases, indicateurs, avantages, risques, justificatifs, elements

    // Mapping des icônes par type d'élément (copié de piste-detail.js)
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

    async render() {
        const state = appStore ? appStore.getState() : {};
        const allPistes = state.allPistes || [];
        this.applyFilters(allPistes);
        const selectedTrack = this.findTrackById(allPistes, this.selectedTrackId);
        
        // Si aucune piste n'est sélectionnée et qu'il y a des pistes, sélectionner la première
        if (!selectedTrack && allPistes.length > 0) {
            this.selectedTrackId = allPistes[0].numero;
        }
        
        const currentTrack = this.findTrackById(allPistes, this.selectedTrackId);

        // Initialiser les données complètes pour la piste sélectionnée
        if (currentTrack) {
            this.ensureCompleteData(currentTrack);
        }

        return `
            <div class="edition-wrapper">
                <!-- Main Content -->
                <main class="edition-main">
                    <!-- Left Sidebar: Track List -->
                    <aside class="edition-sidebar">
                        <div class="sidebar-top">
                            <button class="btn-new-track" onclick="pages.Edition.createNewTrack()">
                                 <span class="material-icons">add</span>
                                 Nouvelle piste de sécurité
                           </button>
                            <div class="search-box">
                                <span class="material-symbols-outlined">search</span> <input type="text" placeholder="Rechercher une piste..." class="search-input" value="${this.searchTerm}" onkeyup="pages.Edition.filterTracks(this.value)">
                            </div>
                            <div class="filter-title">Niveau de Priorité</div>
                            <div class="filter-tabs">
                                <button class="filter-btn ${this.filterPriority === 'Tous' ? 'active' : ''}" style="${this.getFilterAllStyle(this.filterPriority === 'Tous')}" onclick="pages.Edition.setFilter('Tous')">Tous</button>
                                <button class="filter-btn filter-p1 ${this.filterPriority === 'P1' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P1', this.filterPriority === 'P1')}" onclick="pages.Edition.setFilter('P1')">${this.getPriorityLabel('P1')}</button>
                                <button class="filter-btn filter-p2 ${this.filterPriority === 'P2' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P2', this.filterPriority === 'P2')}" onclick="pages.Edition.setFilter('P2')">${this.getPriorityLabel('P2')}</button>
                                <button class="filter-btn filter-p3 ${this.filterPriority === 'P3' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P3', this.filterPriority === 'P3')}" onclick="pages.Edition.setFilter('P3')">${this.getPriorityLabel('P3')}</button>
                                <button class="filter-btn filter-p4 ${this.filterPriority === 'P4' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P4', this.filterPriority === 'P4')}" onclick="pages.Edition.setFilter('P4')"> ${this.getPriorityLabel('P4')}</button>
                            </div>
                        </div>

                        <div class="tracks-list">
                            ${this.filteredTracks.map((track, idx) => `
                                <div class="track-item ${this.isSameTrackId(track.numero, this.selectedTrackId) ? 'active' : ''}" onclick="pages.Edition.selectTrack('${track.numero}')">
                                    <div class="track-header">
                                        <span class="track-id">${track.numero}</span>
                                        <span class="priority-badge priority-${this.getPriorityClass(track.priorite)}">${this.getPriorityLabel(track.priorite)}</span>
                                    </div>
                                    <h3 class="track-title">${track.titre}</h3>
                                    <div class="track-meta">
                                        <span class="meta-item">
                                            <span class="material-symbols-outlined">groups</span>
                                            ${track.categorie}
                                        </span>
                                        <span class="meta-item">
                                            <span class="material-symbols-outlined">trending_down</span>
                                            -${Math.round(track.impact_score / 10)}% Acc.
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>


                    </aside>

                    <!-- Right Panel: Edit Form -->
                    <section class="edition-panel">
                        ${currentTrack ? this.renderEditForm(currentTrack) : '<div class="no-track">Aucune piste sélectionnée</div>'}
                    </section>
                </main>
            </div>

            ${this.getStyles()}
        `;
    },

    renderEditForm(track) {
        return `
            <div class="panel-header">
                <h2 class="panel-title">${track.numero} - ${track.titre}</h2>
                <div class="panel-meta">
                    <span class="badge priority-${this.getPriorityClass(track.priorite)}">${track.priorite}</span>
                    <span class="badge category">${track.categorie}</span>
                    <span class="badge family">${track.famille || 'Non définie'}</span>
                </div>
            </div>

            <div class="panel-actions">
                <button class="btn-delete" onclick="pages.Edition.deleteTrack('${track.numero}')">
                    <span class="material-symbols-outlined">delete_outline</span>
                    Supprimer
                </button>
                <button class="btn-cancel" onclick="pages.Edition.cancelEdit()">Annuler</button>
                <button class="btn-view" onclick="pages.Edition.viewTrack('${track.numero}')">
                    <span class="material-symbols-outlined">visibility</span>
                    Visualiser la piste
                </button>
                <button class="btn-save" onclick="pages.Edition.saveTrack('${track.numero}')">
                    <span class="material-symbols-outlined">check</span>
                    Enregistrer les modifications
                </button>
            </div>

            <!-- Tabs Navigation -->
            <div class="tabs-navigation">
                <button class="tab-btn ${this.activeTab === 'general' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('general')">
                    <span class="material-symbols-outlined">info</span>
                    Général
                </button>
                <button class="tab-btn ${this.activeTab === 'dimensions' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('dimensions')">
                    <span class="material-symbols-outlined">donut_large</span>
                    Dimensions
                </button>
                <button class="tab-btn ${this.activeTab === 'dispositif' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('dispositif')">
                    <span class="material-symbols-outlined">construction</span>
                    Dispositif
                </button>
                <button class="tab-btn ${this.activeTab === 'phases' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('phases')">
                    <span class="material-symbols-outlined">timeline</span>
                    Phases
                </button>
                <button class="tab-btn ${this.activeTab === 'indicateurs' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('indicateurs')">
                    <span class="material-symbols-outlined">analytics</span>
                    Indicateurs
                </button>
                <button class="tab-btn ${this.activeTab === 'avantages' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('avantages')">
                    <span class="material-symbols-outlined">thumb_up</span>
                    Avantages
                </button>
                <button class="tab-btn ${this.activeTab === 'risques' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('risques')">
                    <span class="material-symbols-outlined">warning</span>
                    Risques
                </button>
                <button class="tab-btn ${this.activeTab === 'justificatifs' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('justificatifs')">
                    <span class="material-symbols-outlined">attach_file</span>
                    Justificatifs
                </button>
                <button class="tab-btn ${this.activeTab === 'elements' ? 'active' : ''}" onclick="pages.Edition.setActiveTab('elements')">
                    <span class="material-symbols-outlined">list_alt</span>
                    Éléments
                </button>
            </div>

            <!-- Tab Content -->
            <div class="edition-tab-content">
                ${this.renderTabContent(track)}
            </div>
        `;
    },

    renderTabContent(track) {
        switch(this.activeTab) {
            case 'general':
                return this.renderGeneralTab(track);
            case 'dimensions':
                return this.renderDimensionsTab(track);
            case 'dispositif':
                return this.renderDispositifTab(track);
            case 'phases':
                return this.renderPhasesTab(track);
            case 'indicateurs':
                return this.renderIndicateursTab(track);
            case 'avantages':
                return this.renderAvantagesTab(track);
            case 'risques':
                return this.renderRisquesTab(track);
            case 'justificatifs':
                return this.renderJustificatifsTab(track);
            case 'elements':
                return this.renderElementsTab(track);
            default:
                return this.renderGeneralTab(track);
        }
    },

    renderGeneralTab(track) {
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Informations générales</h3>
                
                <!-- Row 1: Title & ID -->
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">TITRE COURT</label>
                        <input type="text" class="form-input" value="${track.titre || ''}" placeholder="Titre court" data-field="titre" onchange="pages.Edition.updateField('${track.numero}', 'titre', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">IDENTIFIANT (ID)</label>
                        <input type="text" class="form-input" value="${track.numero || ''}" placeholder="ID" readonly>
                    </div>
                </div>

                <!-- Row 2: Titre long -->
                <div class="form-group full-width">
                    <label class="form-label">TITRE LONG</label>
                    <input type="text" class="form-input" value="${track.titre_long || ''}" placeholder="Titre long descriptif" data-field="titre_long" onchange="pages.Edition.updateField('${track.numero}', 'titre_long', this.value)">
                </div>

                <!-- Row 3: Category, Priority, Family -->
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">CATÉGORIE</label>
                        <select class="form-input" data-field="categorie" onchange="pages.Edition.updateField('${track.numero}', 'categorie', this.value)">
                            <option value="Culture et reconnaissance" ${track.categorie === 'Culture et reconnaissance' ? 'selected' : ''}>Culture et reconnaissance</option>
                            <option value="Données et analyse" ${track.categorie === 'Données et analyse' ? 'selected' : ''}>Données et analyse</option>
                            <option value="Formation et pédagogie" ${track.categorie === 'Formation et pédagogie' ? 'selected' : ''}>Formation et pédagogie</option>
                            <option value="Gouvernance et participation" ${track.categorie === 'Gouvernance et participation' ? 'selected' : ''}>Gouvernance et participation</option>
                            <option value="Infrastructure et aménagement" ${track.categorie === 'Infrastructure et aménagement' ? 'selected' : ''}>Infrastructure et aménagement</option>
                            <option value="Organisation et processus" ${track.categorie === 'Organisation et processus' ? 'selected' : ''}>Organisation et processus</option>
                            <option value="Régulation et sanction" ${track.categorie === 'Régulation et sanction' ? 'selected' : ''}>Régulation et sanction</option>
                            <option value="Santé et bien-être" ${track.categorie === 'Santé et bien-être' ? 'selected' : ''}>Santé et bien-être</option>
                            <option value="Technologie embarquée" ${track.categorie === 'Technologie embarquée' ? 'selected' : ''}>Technologie embarquée</option>
                        </select>

                    </div>
                    <div class="form-group">
                        <label class="form-label">FAMILLE</label>
                        <select class="form-input" data-field="famille" onchange="pages.Edition.updateField('${track.numero}', 'famille', this.value)">
                            <option value="">Non définie</option>
                            <option value="Prévention" ${track.famille === 'Prévention' ? 'selected' : ''}>Prévention</option>
                            <option value="Détection" ${track.famille === 'Détection' ? 'selected' : ''}>Détection</option>
                            <option value="Contrôle" ${track.famille === 'Contrôle' ? 'selected' : ''}>Contrôle</option>
                            <option value="Sanction" ${track.famille === 'Sanction' ? 'selected' : ''}>Sanction</option>
                            <option value="Formation" ${track.famille === 'Formation' ? 'selected' : ''}>Formation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">NIVEAU DE PRIORITÉ</label>
                        <div class="priority-buttons">
                            <button class="priority-btn ${track.priorite === 'P1' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P1', track.priorite === 'P1')}" onclick="pages.Edition.updatePriority('${track.numero}', 'P1')">${this.getPriorityLabel('P1')}</button>
                            <button class="priority-btn ${track.priorite === 'P2' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P2', track.priorite === 'P2')}" onclick="pages.Edition.updatePriority('${track.numero}', 'P2')">${this.getPriorityLabel('P2')}</button>
                            <button class="priority-btn ${track.priorite === 'P3' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P3', track.priorite === 'P3')}" onclick="pages.Edition.updatePriority('${track.numero}', 'P3')">${this.getPriorityLabel('P3')}</button>
                            <button class="priority-btn ${track.priorite === 'P4' ? 'active' : ''}" style="${this.getFilterPriorityStyle('P4', track.priorite === 'P4')}" onclick="pages.Edition.updatePriority('${track.numero}', 'P4')">${this.getPriorityLabel('P4')}</button>
                        </div>
                    </div>
                </div>

                <!-- Row 4: Tags -->
                <div class="form-group full-width">
                    <label class="form-label">TAGS</label>
                    <div class="tags-input-container">
                        <input type="text" class="form-input tags-input" placeholder="Ajouter un tag (Entrée pour valider)" onkeydown="pages.Edition.handleTagInput(event, '${track.numero}')">
                        <div class="tags-list">
                            ${(track.tags || []).map(tag => `
                                <span class="tag-item">
                                    ${tag}
                                    <span class="tag-remove" onclick="pages.Edition.removeTag('${track.numero}', '${tag}')">&times;</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Row 5: Description courte -->
                <div class="form-group full-width">
                    <label class="form-label">DESCRIPTION COURTE</label>
                    <textarea class="form-input" rows="3" placeholder="Description courte..." data-field="description" onchange="pages.Edition.updateField('${track.numero}', 'description', this.value)">${track.description || ''}</textarea>
                </div>

                <!-- Row 6: Description longue -->
                <div class="form-group full-width">
                    <label class="form-label">DESCRIPTION LONGUE</label>
                    <div class="rich-editor">
                        <div class="editor-toolbar">
                            <button class="editor-btn" title="Gras"><strong>B</strong></button>
                            <button class="editor-btn" title="Italique"><em>I</em></button>
                            <button class="editor-btn" title="Liste"><span class="material-icons">list</span></button>
                            <button class="editor-btn" title="Lien"><span class="material-icons">link</span></button>
                        </div>
                        <textarea class="editor-content" rows="5" placeholder="Description détaillée..." data-field="description_longue" onchange="pages.Edition.updateField('${track.numero}', 'description_longue', this.value)">${track.description_longue || track.description || ''}</textarea>
                    </div>
                </div>

                <!-- Row 7: Budget & Impact -->
                <h3 class="section-subtitle" style="margin-top: 30px;">Budget et impact</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">BUDGET 2026 (€)</label>
                        <input type="number" class="form-input" value="${track.budget?.cout_2026 || 0}" placeholder="Budget 2026" data-field="budget.cout_2026" onchange="pages.Edition.updateNestedField('${track.numero}', 'budget', 'cout_2026', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">BUDGET 2027 (€)</label>
                        <input type="number" class="form-input" value="${track.budget?.cout_2027 || 0}" placeholder="Budget 2027" data-field="budget.cout_2027" onchange="pages.Edition.updateNestedField('${track.numero}', 'budget', 'cout_2027', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">BUDGET 2028 (€)</label>
                        <input type="number" class="form-input" value="${track.budget?.cout_2028 || 0}" placeholder="Budget 2028" data-field="budget.cout_2028" onchange="pages.Edition.updateNestedField('${track.numero}', 'budget', 'cout_2028', this.value)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">BUDGET TRIENNAL TOTAL (€)</label>
                        <input type="number" class="form-input" value="${track.budget?.cout_3_ans || 0}" placeholder="Total 3 ans" data-field="budget.cout_3_ans" onchange="pages.Edition.updateNestedField('${track.numero}', 'budget', 'cout_3_ans', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">COÛT RÉCURRENT ANNUEL (€)</label>
                        <input type="number" class="form-input" value="${track.budget?.cout_recurrent_annuel || 0}" placeholder="Coût récurrent" data-field="budget.cout_recurrent_annuel" onchange="pages.Edition.updateNestedField('${track.numero}', 'budget', 'cout_recurrent_annuel', this.value)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">SCORE D'IMPACT (0-100)</label>
                        <input type="number" class="form-input" value="${track.impact_score || 0}" min="0" max="100" placeholder="Score d'impact" data-field="impact_score" onchange="pages.Edition.updateField('${track.numero}', 'impact_score', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">RÉDUCTION D'ACCIDENTS (%)</label>
                        <input type="number" class="form-input" value="${track.impact_reduction || Math.round(track.impact_score / 10) || 0}" min="0" max="100" placeholder="Réduction %" data-field="impact_reduction" onchange="pages.Edition.updateField('${track.numero}', 'impact_reduction', this.value)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">ACCIDENTS ÉVITÉS ESTIMÉS (/an)</label>
                        <input type="number" class="form-input" value="${track.impact_accidents_evites || 0}" placeholder="Accidents évités" data-field="impact_accidents_evites" onchange="pages.Edition.updateField('${track.numero}', 'impact_accidents_evites', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">ÉCONOMIES ESTIMÉES (€/an)</label>
                        <input type="number" class="form-input" value="${track.impact_economies || 0}" placeholder="Économies annuelles" data-field="impact_economies" onchange="pages.Edition.updateField('${track.numero}', 'impact_economies', this.value)">
                    </div>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">TEXTE D'IMPACT</label>
                    <input type="text" class="form-input" value="${track.impact_texte || ''}" placeholder="Description textuelle de l'impact" data-field="impact_texte" onchange="pages.Edition.updateField('${track.numero}', 'impact_texte', this.value)">
                </div>

                <!-- Row 8: Délais et ROI -->
                <h3 class="section-subtitle" style="margin-top: 30px;">Délais et ROI</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">DÉLAI DE DÉPLOIEMENT (mois)</label>
                        <input type="number" class="form-input" value="${track.delai_mois || 0}" placeholder="Délai en mois" data-field="delai_mois" onchange="pages.Edition.updateField('${track.numero}', 'delai_mois', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">TEXTE DÉLAI</label>
                        <input type="text" class="form-input" value="${track.delai_texte || ''}" placeholder="Description textuelle du délai" data-field="delai_texte" onchange="pages.Edition.updateField('${track.numero}', 'delai_texte', this.value)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">ROI (mois)</label>
                        <input type="number" class="form-input" value="${track.roi_mois || 0}" placeholder="ROI en mois" data-field="roi_mois" onchange="pages.Edition.updateField('${track.numero}', 'roi_mois', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">TEXTE ROI</label>
                        <input type="text" class="form-input" value="${track.roi_texte || ''}" placeholder="Description textuelle du ROI" data-field="roi_texte" onchange="pages.Edition.updateField('${track.numero}', 'roi_texte', this.value)">
                    </div>
                </div>

                <!-- Row 9: Niveaux d'évaluation -->
                <h3 class="section-subtitle" style="margin-top: 30px;">Niveaux d'évaluation</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">NIVEAU D'IMPACT (1-4)</label>
                        <input type="number" class="form-input" value="${track.niveau_impact || 0}" min="1" max="4" placeholder="Niveau 1-4" data-field="niveau_impact" onchange="pages.Edition.updateField('${track.numero}', 'niveau_impact', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">NIVEAU DE FAISABILITÉ (1-4)</label>
                        <input type="number" class="form-input" value="${track.niveau_faisabilite || 0}" min="1" max="4" placeholder="Niveau 1-4" data-field="niveau_faisabilite" onchange="pages.Edition.updateField('${track.numero}', 'niveau_faisabilite', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">NIVEAU D'ACCEPTABILITÉ (1-4)</label>
                        <input type="number" class="form-input" value="${track.niveau_acceptabilite || 0}" min="1" max="4" placeholder="Niveau 1-4" data-field="niveau_acceptabilite" onchange="pages.Edition.updateField('${track.numero}', 'niveau_acceptabilite', this.value)">
                    </div>
                </div>
            </div>
        `;
    },

    renderDimensionsTab(track) {
        // S'assurer que les dimensions sont définies
        if (!track.dimensions) {
            track.dimensions = { culture: 20, technique: 20, humain: 20, organisationnel: 20, economique: 20 };
        }
        
        const dimensions = track.dimensions;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Dimensions Balancing</h3>
                <p class="dimensions-description">Répartissez le poids de la piste sur les 5 dimensions (total = 100%)</p>
                
                <div class="dimensions-container">
                    <div class="dimension-item">
                        <label class="form-label">CULTURE</label>
                        <div class="dimension-control">
                            <input type="range" min="0" max="100" step="5" value="${dimensions.culture || 20}" class="dimension-slider" data-dim="culture" oninput="pages.Edition.updateDimension('${track.numero}', 'culture', this.value)" onchange="pages.Edition.updateDimension('${track.numero}', 'culture', this.value)">
                            <input type="number" min="0" max="100" value="${dimensions.culture || 20}" class="dimension-input" data-dim="culture" onchange="pages.Edition.updateDimension('${track.numero}', 'culture', this.value)">
                            <span class="dimension-unit">%</span>
                        </div>
                    </div>
                    
                    <div class="dimension-item">
                        <label class="form-label">TECHNIQUE</label>
                        <div class="dimension-control">
                            <input type="range" min="0" max="100" step="5" value="${dimensions.technique || 20}" class="dimension-slider" data-dim="technique" oninput="pages.Edition.updateDimension('${track.numero}', 'technique', this.value)" onchange="pages.Edition.updateDimension('${track.numero}', 'technique', this.value)">
                            <input type="number" min="0" max="100" value="${dimensions.technique || 20}" class="dimension-input" data-dim="technique" onchange="pages.Edition.updateDimension('${track.numero}', 'technique', this.value)">
                            <span class="dimension-unit">%</span>
                        </div>
                    </div>
                    
                    <div class="dimension-item">
                        <label class="form-label">HUMAIN</label>
                        <div class="dimension-control">
                            <input type="range" min="0" max="100" step="5" value="${dimensions.humain || 20}" class="dimension-slider" data-dim="humain" oninput="pages.Edition.updateDimension('${track.numero}', 'humain', this.value)" onchange="pages.Edition.updateDimension('${track.numero}', 'humain', this.value)">
                            <input type="number" min="0" max="100" value="${dimensions.humain || 20}" class="dimension-input" data-dim="humain" onchange="pages.Edition.updateDimension('${track.numero}', 'humain', this.value)">
                            <span class="dimension-unit">%</span>
                        </div>
                    </div>
                    
                    <div class="dimension-item">
                        <label class="form-label">ORGANISATIONNEL</label>
                        <div class="dimension-control">
                            <input type="range" min="0" max="100" step="5" value="${dimensions.organisationnel || 20}" class="dimension-slider" data-dim="organisationnel" oninput="pages.Edition.updateDimension('${track.numero}', 'organisationnel', this.value)" onchange="pages.Edition.updateDimension('${track.numero}', 'organisationnel', this.value)">
                            <input type="number" min="0" max="100" value="${dimensions.organisationnel || 20}" class="dimension-input" data-dim="organisationnel" onchange="pages.Edition.updateDimension('${track.numero}', 'organisationnel', this.value)">
                            <span class="dimension-unit">%</span>
                        </div>
                    </div>
                    
                    <div class="dimension-item">
                        <label class="form-label">ÉCONOMIQUE</label>
                        <div class="dimension-control">
                            <input type="range" min="0" max="100" step="5" value="${dimensions.economique || 20}" class="dimension-slider" data-dim="economique" oninput="pages.Edition.updateDimension('${track.numero}', 'economique', this.value)" onchange="pages.Edition.updateDimension('${track.numero}', 'economique', this.value)">
                            <input type="number" min="0" max="100" value="${dimensions.economique || 20}" class="dimension-input" data-dim="economique" onchange="pages.Edition.updateDimension('${track.numero}', 'economique', this.value)">
                            <span class="dimension-unit">%</span>
                        </div>
                    </div>
                </div>
                
                <div class="dimension-total">
                    <span class="total-label">Total :</span>
                    <span class="total-value" id="dimension-total">${this.calculateDimensionsTotal(dimensions)}%</span>
                </div>
            </div>
        `;
    },

    renderDispositifTab(track) {
        // S'assurer que dispositif_elements est défini
        if (!track.dispositif_elements) {
            track.dispositif_elements = this.getDefaultDispositifElements();
        }
        
        const elements = track.dispositif_elements;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Détails du dispositif</h3>
                
                <!-- Problématique -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['problematique']}</span>
                        <h4>Problématique</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'problematique')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'problematique', elements.problematique || [])}
                    </div>
                </div>
                
                <!-- Périmètre -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['perimetre']}</span>
                        <h4>Périmètre d'application</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'perimetre')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'perimetre', elements.perimetre || [])}
                    </div>
                </div>
                
                <!-- Approche technologique -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['approche_technologique']}</span>
                        <h4>Approche technologique</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'approche_technologique')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'approche_technologique', elements.approche_technologique || [])}
                    </div>
                </div>
                
                <!-- Approche humaine -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['approche_humaine']}</span>
                        <h4>Approche humaine</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'approche_humaine')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'approche_humaine', elements.approche_humaine || [])}
                    </div>
                </div>
                
                <!-- Dispositif technique -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['dispositif_technique']}</span>
                        <h4>Dispositif technique</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'dispositif_technique')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'dispositif_technique', elements.dispositif_technique || [])}
                    </div>
                </div>
                
                <!-- Modalités opérationnelles -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['modalite']}</span>
                        <h4>Modalités opérationnelles</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'modalite')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'modalite', elements.modalite || [])}
                    </div>
                </div>
                
                <!-- Barème / Seuils -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['bareme']}</span>
                        <h4>Barème et seuils</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'bareme')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'bareme', elements.bareme || [])}
                    </div>
                </div>
                
                <!-- Récidive et reconquête -->
                <div class="element-group">
                    <div class="element-group-header">
                        <span class="element-icon">${this.TYPE_ICONS['recidive']}</span>
                        <h4>Récidive et reconquête</h4>
                        <button class="btn-add-element" onclick="pages.Edition.addElement('${track.numero}', 'recidive')">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                    <div class="element-list">
                        ${this.renderElementItems(track, 'recidive', elements.recidive || [])}
                    </div>
                </div>
            </div>
        `;
    },

    renderElementItems(track, type, items) {
        if (!items || items.length === 0) {
            return `
                <div class="element-empty" onclick="pages.Edition.addElement('${track.numero}', '${type}')">
                    <span class="material-symbols-outlined">add_circle_outline</span>
                    <span>Ajouter un élément</span>
                </div>
            `;
        }

        return items.map((item, index) => `
            <div class="element-item" data-type="${type}" data-index="${index}">
                <div class="element-item-header">
                    <input type="text" class="element-item-name" value="${item.nom || ''}" placeholder="Titre" data-field="nom" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'nom', this.value)">
                    <button class="element-item-remove" onclick="pages.Edition.removeElement('${track.numero}', '${type}', ${index})">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                
                <div class="element-item-content">
                    <textarea class="element-item-description" placeholder="Description" data-field="description" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'description', this.value)">${item.description || ''}</textarea>
                    
                    ${this.renderElementSpecificFields(type, item, track, index)}
                </div>
            </div>
        `).join('');
    },

    renderElementSpecificFields(type, item, track, index) {
        switch(type) {
            case 'phase':
                return `
                    <div class="element-fields-row">
                        <input type="text" class="element-field" value="${item.etape_duree || ''}" placeholder="Durée" data-field="etape_duree" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'etape_duree', this.value)">
                        <input type="text" class="element-field" value="${item.activites || ''}" placeholder="Activités" data-field="activites" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'activites', this.value)">
                    </div>
                    <div class="element-fields-row">
                        <input type="text" class="element-field" value="${item.objectifs_etape || ''}" placeholder="Objectifs" data-field="objectifs_etape" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'objectifs_etape', this.value)">
                        <input type="text" class="element-field" value="${item.livrable_etape || ''}" placeholder="Livrable" data-field="livrable_etape" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'livrable_etape', this.value)">
                    </div>
                `;
            
            case 'bareme':
                return `
                    <div class="element-fields-row">
                        <input type="text" class="element-field" value="${item.libelle_infraction || ''}" placeholder="Type d'infraction" data-field="libelle_infraction" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'libelle_infraction', this.value)">
                        <input type="text" class="element-field" value="${item.meta_donnees || ''}" placeholder="Points retirés" data-field="meta_donnees" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'meta_donnees', this.value)">
                    </div>
                    <input type="text" class="element-field" value="${item.constat || ''}" placeholder="Constat" data-field="constat" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'constat', this.value)">
                `;
            
            case 'investissement':
            case 'economie':
                return `
                    <input type="text" class="element-field" value="${item.nom || ''}" placeholder="Poste" data-field="nom" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'nom', this.value)">
                    <input type="text" class="element-field" value="${item.description || ''}" placeholder="Détail" data-field="description" onchange="pages.Edition.updateElement('${track.numero}', '${type}', ${index}, 'description', this.value)">
                `;
            
            default:
                return '';
        }
    },

    renderPhasesTab(track) {
        // S'assurer que phases est défini
        if (!track.phases || track.phases.length === 0) {
            track.phases = this.getDefaultPhases();
        }
        
        const phases = track.phases;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Phases de déploiement</h3>
                
                <div class="phases-container">
                    ${phases.map((phase, index) => `
                        <div class="phase-card">
                            <div class="phase-header">
                                <input type="text" class="phase-name" value="${phase.nom || ''}" placeholder="Nom de la phase" data-index="${index}" data-field="nom" onchange="pages.Edition.updatePhase('${track.numero}', ${index}, 'nom', this.value)">
                                <button class="phase-remove" onclick="pages.Edition.removePhase('${track.numero}', ${index})">
                                    <span class="material-icons">delete</span>
                                </button>
                            </div>
                            
                            <div class="phase-content">
                                <div class="form-group">
                                    <label class="form-label">Durée</label>
                                    <input type="text" class="form-input" value="${phase.etape_duree || ''}" placeholder="Ex: 3-6 mois" data-index="${index}" data-field="etape_duree" onchange="pages.Edition.updatePhase('${track.numero}', ${index}, 'etape_duree', this.value)">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Activités</label>
                                    <textarea class="form-input" rows="2" placeholder="Description des activités" data-index="${index}" data-field="activites" onchange="pages.Edition.updatePhase('${track.numero}', ${index}, 'activites', this.value)">${phase.activites || ''}</textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Objectifs</label>
                                    <input type="text" class="form-input" value="${phase.objectifs_etape || ''}" placeholder="Objectifs de l'étape" data-index="${index}" data-field="objectifs_etape" onchange="pages.Edition.updatePhase('${track.numero}', ${index}, 'objectifs_etape', this.value)">
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Livrable</label>
                                    <input type="text" class="form-input" value="${phase.livrable_etape || ''}" placeholder="Livrable attendu" data-index="${index}" data-field="livrable_etape" onchange="pages.Edition.updatePhase('${track.numero}', ${index}, 'livrable_etape', this.value)">
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn-add-phase" onclick="pages.Edition.addPhase('${track.numero}')">
                    <span class="material-icons">add</span>
                    Ajouter une phase
                </button>
            </div>
        `;
    },

    renderIndicateursTab(track) {
        // S'assurer que indicateurs est défini
        if (!track.indicateurs) {
            track.indicateurs = this.getDefaultIndicateurs();
        }
        
        const indicateurs = track.indicateurs;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Indicateurs de suivi</h3>
                
                <!-- Indicateurs d'activité -->
                <div class="indicateurs-group">
                    <h4>Indicateurs d'activité</h4>
                    <table class="indicateurs-table">
                        <thead>
                            <tr>
                                <th>Indicateur</th>
                                <th>Cible</th>
                                <th>Unité</th>
                                <th>Périodicité</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="indicateurs-activite-body">
                            ${this.renderIndicateurRows(track, 'activite', indicateurs.activite || [])}
                        </tbody>
                    </table>
                    <button class="btn-add-indicateur" onclick="pages.Edition.addIndicateur('${track.numero}', 'activite')">
                        <span class="material-icons">add</span>
                        Ajouter un indicateur d'activité
                    </button>
                </div>
                
                <!-- Indicateurs de résultat -->
                <div class="indicateurs-group">
                    <h4>Indicateurs de résultat</h4>
                    <table class="indicateurs-table">
                        <thead>
                            <tr>
                                <th>Indicateur</th>
                                <th>Cible</th>
                                <th>Unité</th>
                                <th>Périodicité</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="indicateurs-resultat-body">
                            ${this.renderIndicateurRows(track, 'resultat', indicateurs.resultat || [])}
                        </tbody>
                    </table>
                    <button class="btn-add-indicateur" onclick="pages.Edition.addIndicateur('${track.numero}', 'resultat')">
                        <span class="material-icons">add</span>
                        Ajouter un indicateur de résultat
                    </button>
                </div>
                
                <!-- Indicateurs clés -->
                <div class="indicateurs-group">
                    <h4>Indicateurs clés</h4>
                    <table class="indicateurs-table">
                        <thead>
                            <tr>
                                <th>Indicateur</th>
                                <th>Cible</th>
                                <th>Unité</th>
                                <th>Périodicité</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="indicateurs-cle-body">
                            ${this.renderIndicateurRows(track, 'cle', indicateurs.cle || [])}
                        </tbody>
                    </table>
                    <button class="btn-add-indicateur" onclick="pages.Edition.addIndicateur('${track.numero}', 'cle')">
                        <span class="material-icons">add</span>
                        Ajouter un indicateur clé
                    </button>
                </div>
            </div>
        `;
    },

    renderIndicateurRows(track, type, items) {
        if (!items || items.length === 0) {
            return `
                <tr class="empty-row">
                    <td colspan="5">Aucun indicateur défini</td>
                </tr>
            `;
        }

        return items.map((item, index) => `
            <tr>
                <td><input type="text" value="${item.nom || ''}" placeholder="Nom" data-type="${type}" data-index="${index}" data-field="nom" onchange="pages.Edition.updateIndicateur('${track.numero}', '${type}', ${index}, 'nom', this.value)"></td>
                <td><input type="text" value="${item.cible || ''}" placeholder="Cible" data-type="${type}" data-index="${index}" data-field="cible" onchange="pages.Edition.updateIndicateur('${track.numero}', '${type}', ${index}, 'cible', this.value)"></td>
                <td><input type="text" value="${item.unite || ''}" placeholder="Unité" data-type="${type}" data-index="${index}" data-field="unite" onchange="pages.Edition.updateIndicateur('${track.numero}', '${type}', ${index}, 'unite', this.value)"></td>
                <td>
                    <select data-type="${type}" data-index="${index}" data-field="periodicite" onchange="pages.Edition.updateIndicateur('${track.numero}', '${type}', ${index}, 'periodicite', this.value)">
                        <option value="mensuelle" ${item.periodicite === 'mensuelle' ? 'selected' : ''}>Mensuelle</option>
                        <option value="trimestrielle" ${item.periodicite === 'trimestrielle' ? 'selected' : ''}>Trimestrielle</option>
                        <option value="semestrielle" ${item.periodicite === 'semestrielle' ? 'selected' : ''}>Semestrielle</option>
                        <option value="annuelle" ${item.periodicite === 'annuelle' ? 'selected' : ''}>Annuelle</option>
                    </select>
                </td>
                <td>
                    <button class="btn-remove-indicateur" onclick="pages.Edition.removeIndicateur('${track.numero}', '${type}', ${index})">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderAvantagesTab(track) {
        // S'assurer que avantages est défini
        if (!track.avantages || track.avantages.length === 0) {
            track.avantages = this.getDefaultAvantages();
        }
        
        const avantages = track.avantages;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Avantages</h3>
                
                <table class="avantages-table">
                    <thead>
                        <tr>
                            <th>Bénéficiaire</th>
                            <th>Avantage</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="avantages-body">
                        ${this.renderAvantageRows(track, avantages)}
                    </tbody>
                </table>
                
                <button class="btn-add-avantage" onclick="pages.Edition.addAvantage('${track.numero}')">
                    <span class="material-icons">add</span>
                    Ajouter un avantage
                </button>
            </div>
        `;
    },

    renderAvantageRows(track, items) {
        if (!items || items.length === 0) {
            return `
                <tr class="empty-row">
                    <td colspan="3">Aucun avantage défini</td>
                </tr>
            `;
        }

        return items.map((item, index) => `
            <tr>
                <td><input type="text" value="${item.beneficiaire || ''}" placeholder="Bénéficiaire" data-index="${index}" data-field="beneficiaire" onchange="pages.Edition.updateAvantage('${track.numero}', ${index}, 'beneficiaire', this.value)"></td>
                <td><input type="text" value="${item.texte || ''}" placeholder="Description de l'avantage" data-index="${index}" data-field="texte" onchange="pages.Edition.updateAvantage('${track.numero}', ${index}, 'texte', this.value)"></td>
                <td>
                    <button class="btn-remove-avantage" onclick="pages.Edition.removeAvantage('${track.numero}', ${index})">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderRisquesTab(track) {
        // S'assurer que risques est défini
        if (!track.risques || track.risques.length === 0) {
            track.risques = this.getDefaultRisques();
        }
        
        const risques = track.risques;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Risques et mitigation</h3>
                
                <table class="risques-table">
                    <thead>
                        <tr>
                            <th>Risque</th>
                            <th>Probabilité</th>
                            <th>Gravité</th>
                            <th>Mitigation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="risques-body">
                        ${this.renderRisqueRows(track, risques)}
                    </tbody>
                </table>
                
                <button class="btn-add-risque" onclick="pages.Edition.addRisque('${track.numero}')">
                    <span class="material-icons">add</span>
                    Ajouter un risque
                </button>
            </div>
        `;
    },

    renderRisqueRows(track, items) {
        if (!items || items.length === 0) {
            return `
                <tr class="empty-row">
                    <td colspan="5">Aucun risque défini</td>
                </tr>
            `;
        }

        return items.map((item, index) => `
            <tr>
                <td><input type="text" value="${item.nom || ''}" placeholder="Nom du risque" data-index="${index}" data-field="nom" onchange="pages.Edition.updateRisque('${track.numero}', ${index}, 'nom', this.value)"></td>
                <td>
                    <select data-index="${index}" data-field="probabilite" onchange="pages.Edition.updateRisque('${track.numero}', ${index}, 'probabilite', this.value)">
                        <option value="faible" ${item.probabilite === 'faible' ? 'selected' : ''}>Faible</option>
                        <option value="moyenne" ${item.probabilite === 'moyenne' ? 'selected' : ''}>Moyenne</option>
                        <option value="élevée" ${item.probabilite === 'élevée' ? 'selected' : ''}>Élevée</option>
                    </select>
                </td>
                <td>
                    <select data-index="${index}" data-field="gravite" onchange="pages.Edition.updateRisque('${track.numero}', ${index}, 'gravite', this.value)">
                        <option value="faible" ${item.gravite === 'faible' ? 'selected' : ''}>Faible</option>
                        <option value="modérée" ${item.gravite === 'modérée' ? 'selected' : ''}>Modérée</option>
                        <option value="élevée" ${item.gravite === 'élevée' ? 'selected' : ''}>Élevée</option>
                        <option value="critique" ${item.gravite === 'critique' ? 'selected' : ''}>Critique</option>
                    </select>
                </td>
                <td><input type="text" value="${item.mitigation || ''}" placeholder="Mesure de mitigation" data-index="${index}" data-field="mitigation" onchange="pages.Edition.updateRisque('${track.numero}', ${index}, 'mitigation', this.value)"></td>
                <td>
                    <button class="btn-remove-risque" onclick="pages.Edition.removeRisque('${track.numero}', ${index})">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderJustificatifsTab(track) {
        // S'assurer que justificatifs est défini
        if (!track.justificatifs || track.justificatifs.length === 0) {
            track.justificatifs = this.getDefaultJustificatifs();
        }
        
        const justificatifs = track.justificatifs;
        
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Justificatifs et sources</h3>
                
                <table class="justificatifs-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Titre</th>
                            <th>Source</th>
                            <th>Résultat</th>
                            <th>Pertinence</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="justificatifs-body">
                        ${this.renderJustificatifRows(track, justificatifs)}
                    </tbody>
                </table>
                
                <button class="btn-add-justificatif" onclick="pages.Edition.addJustificatif('${track.numero}')">
                    <span class="material-icons">add</span>
                    Ajouter un justificatif
                </button>
            </div>
            
            <!-- Documents section -->
            <div class="documents-section">
                <h3 class="documents-title">
                    <span class="material-icons">attach_file</span>
                    Documents joints
                </h3>
                <div class="documents-grid">
                    ${(track.documents || []).map(doc => `
                        <div class="document-item">
                            <span class="material-icons">${doc.type === 'pdf' ? 'picture_as_pdf' : 'table_chart'}</span>
                            <p class="document-name">${doc.nom}</p>
                            <p class="document-size">${doc.taille}</p>
                            <button class="document-remove" onclick="pages.Edition.removeDocument('${track.numero}', '${doc.id}')">
                                <span class="material-icons">close</span>
                            </button>
                        </div>
                    `).join('')}
                    <div class="document-item add-document" onclick="pages.Edition.addDocument('${track.numero}')">
                        <span class="material-symbols-outlined">add_circle_outline</span>
                        <p>Ajouter</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderJustificatifRows(track, items) {
        if (!items || items.length === 0) {
            return `
                <tr class="empty-row">
                    <td colspan="6">Aucun justificatif défini</td>
                </tr>
            `;
        }

        return items.map((item, index) => `
            <tr>
                <td><input type="text" value="${item.type || ''}" placeholder="Type" data-index="${index}" data-field="type" onchange="pages.Edition.updateJustificatif('${track.numero}', ${index}, 'type', this.value)"></td>
                <td><input type="text" value="${item.titre || ''}" placeholder="Titre" data-index="${index}" data-field="titre" onchange="pages.Edition.updateJustificatif('${track.numero}', ${index}, 'titre', this.value)"></td>
                <td><input type="text" value="${item.source || ''}" placeholder="Source" data-index="${index}" data-field="source" onchange="pages.Edition.updateJustificatif('${track.numero}', ${index}, 'source', this.value)"></td>
                <td><input type="text" value="${item.resultat || ''}" placeholder="Résultat" data-index="${index}" data-field="resultat" onchange="pages.Edition.updateJustificatif('${track.numero}', ${index}, 'resultat', this.value)"></td>
                <td>
                    <select data-index="${index}" data-field="pertinence" onchange="pages.Edition.updateJustificatif('${track.numero}', ${index}, 'pertinence', this.value)">
                        <option value="1" ${item.pertinence == 1 ? 'selected' : ''}>★☆☆☆☆</option>
                        <option value="2" ${item.pertinence == 2 ? 'selected' : ''}>★★☆☆☆</option>
                        <option value="3" ${item.pertinence == 3 ? 'selected' : ''}>★★★☆☆</option>
                        <option value="4" ${item.pertinence == 4 ? 'selected' : ''}>★★★★☆</option>
                        <option value="5" ${item.pertinence == 5 ? 'selected' : ''}>★★★★★</option>
                    </select>
                </td>
                <td>
                    <button class="btn-remove-justificatif" onclick="pages.Edition.removeJustificatif('${track.numero}', ${index})">
                        <span class="material-icons">delete</span>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    renderElementsTab(track) {
        return `
            <div class="form-section">
                <h3 class="section-subtitle">Tous les éléments</h3>
                <p class="elements-description">Cette section regroupe tous les types d'éléments disponibles pour une édition avancée.</p>
                
                <div class="elements-selector">
                    <select class="element-type-select" onchange="pages.Edition.showElementTypeEditor('${track.numero}', this.value)">
                        <option value="">Sélectionner un type d'élément</option>
                        ${Object.keys(this.TYPE_TITLES).sort().map(key => `
                            <option value="${key}">${this.TYPE_ICONS[key] || '📌'} ${this.TYPE_TITLES[key]}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div id="element-type-editor" class="element-type-editor">
                    <!-- Sera rempli dynamiquement -->
                </div>
            </div>
        `;
    },

    // Méthodes utilitaires
    ensureCompleteData(track) {
        const clone = (data) => JSON.parse(JSON.stringify(data));

        if (!track.budget) {
            track.budget = {
                cout_2026: 0,
                cout_2027: 0,
                cout_2028: 0,
                cout_3_ans: 0,
                cout_recurrent_annuel: 0
            };
        }
        
        if (!track.dimensions) {
            track.dimensions = {
                culture: 20,
                technique: 20,
                humain: 20,
                organisationnel: 20,
                economique: 20
            };
        }
        
        if (!track.tags) track.tags = [];
        
        const defaultDispositif = this.getDefaultDispositifElements();
        if (!track.dispositif_elements) {
            track.dispositif_elements = clone(defaultDispositif);
        } else {
            Object.keys(defaultDispositif).forEach((key) => {
                if (!track.dispositif_elements[key] || !Array.isArray(track.dispositif_elements[key]) || track.dispositif_elements[key].length === 0) {
                    track.dispositif_elements[key] = clone(defaultDispositif[key]);
                }
            });
        }

        if (!track.phases || !Array.isArray(track.phases) || track.phases.length === 0) {
            track.phases = clone(this.getDefaultPhases());
        }

        const defaultIndicateurs = this.getDefaultIndicateurs();
        if (!track.indicateurs || typeof track.indicateurs !== 'object') {
            track.indicateurs = clone(defaultIndicateurs);
        } else {
            ['activite', 'resultat', 'cle'].forEach((key) => {
                if (!track.indicateurs[key] || !Array.isArray(track.indicateurs[key]) || track.indicateurs[key].length === 0) {
                    track.indicateurs[key] = clone(defaultIndicateurs[key]);
                }
            });
        }

        if (!track.avantages || !Array.isArray(track.avantages) || track.avantages.length === 0) {
            track.avantages = clone(this.getDefaultAvantages());
        }

        if (!track.risques || !Array.isArray(track.risques) || track.risques.length === 0) {
            track.risques = clone(this.getDefaultRisques());
        }

        if (!track.justificatifs || !Array.isArray(track.justificatifs) || track.justificatifs.length === 0) {
            track.justificatifs = clone(this.getDefaultJustificatifs());
        }

        if (!track.documents) track.documents = [];
        if (!track.contributors) track.contributors = ['C. Dubuisson'];
        if (!track.updated_by) track.updated_by = 'C. Dubuisson';
        if (!track.updated_at) track.updated_at = new Date();
    },

    getDefaultPhases() {
        return [
            {
                nom: 'Phase pilote',
                etape_duree: '3-6 mois',
                activites: 'Sélection d\'une entreprise pilote. Information-consultation CSE.',
                objectifs_etape: 'Tester l\'acceptabilité et la faisabilité opérationnelle',
                livrable_etape: 'Évaluation intermédiaire'
            },
            {
                nom: 'Phase d\'extension',
                etape_duree: '6-12 mois',
                activites: 'Extension à 2-3 entreprises supplémentaires',
                objectifs_etape: 'Généralisation aux engins critiques',
                livrable_etape: 'Dispositif étendu'
            },
            {
                nom: 'Phase de généralisation',
                etape_duree: '12-24 mois',
                activites: 'Équipement généralisé des engins critiques',
                objectifs_etape: 'Déploiement sur l\'ensemble des plateformes',
                livrable_etape: 'Dispositif généralisé'
            }
        ];
    },

    getDefaultIndicateurs() {
        return {
            activite: [
                { nom: 'Nombre de tests réalisés', cible: '5000', unite: '/mois', periodicite: 'mensuelle' },
                { nom: 'Taux de couverture des conducteurs', cible: '80', unite: '%', periodicite: 'trimestrielle' }
            ],
            resultat: [
                { nom: 'Taux de positivité', cible: '0.1', unite: '%', periodicite: 'mensuelle' },
                { nom: 'Accidents corporels liés', cible: '0', unite: '', periodicite: 'trimestrielle' }
            ],
            cle: [
                { nom: 'Tests mensuels', cible: '5000', unite: 'tests', periodicite: 'mensuelle' },
                { nom: 'Engins équipés', cible: '100', unite: '%', periodicite: 'semestrielle' }
            ]
        };
    },

    getDefaultAvantages() {
        return [
            { beneficiaire: 'Entreprises', texte: 'Réduction des accidents et de l\'absentéisme' },
            { beneficiaire: 'Salariés', texte: 'Amélioration des conditions de travail' }
        ];
    },

    getDefaultRisques() {
        return [
            { nom: 'Acceptabilité sociale', probabilite: 'moyenne', gravite: 'modérée', mitigation: 'Communication et dialogue social' },
            { nom: 'Coût de déploiement', probabilite: 'faible', gravite: 'élevée', mitigation: 'Phasage progressif' }
        ];
    },

    getDefaultJustificatifs() {
        return [
            { type: 'Étude', titre: 'Impact des contrôles inopinés', source: 'INRS', resultat: '+30% de dissuasion', pertinence: 4 }
        ];
    },

    getDefaultDispositifElements() {
        return {
            problematique: [
                { nom: 'Constat', description: 'Les statistiques 2024-2025 font apparaître des causes multiples d\'accidents.' },
                { nom: 'Notre hypothèse', description: 'La certitude de la sanction est plus dissuasive que sa sévérité.' }
            ],
            perimetre: [
                { nom: 'Personnes concernées', description: 'Conducteurs d\'engins de piste' },
                { nom: 'Engins critiques', description: 'PUSH, LOADER, DÉGIVREUSE, BUS' }
            ],
            approche_technologique: [
                { nom: 'Équipements connectés', description: 'Éthylotests portables connectés avec transmission automatique des résultats' }
            ],
            approche_humaine: [
                { nom: 'Sensibilisation', description: 'Campagnes de prévention et formation des conducteurs' }
            ],
            dispositif_technique: [
                { nom: 'Infrastructure', description: 'Bornes de contrôle et logiciel de gestion' }
            ],
            modalite: [
                { nom: 'Modalités de contrôle', description: 'Contrôles aléatoires et ciblés selon planning' }
            ],
            bareme: [
                { nom: 'Infraction légère', libelle_infraction: 'faible', meta_donnees: '-1', constat: 'Test positif < seuil' }
            ],
            recidive: [
                { nom: 'Récidive', description: 'Doublement de la sanction en cas de récidive dans l\'année' }
            ]
        };
    },

    calculateDimensionsTotal(dimensions) {
        const total = (dimensions.culture || 0) + (dimensions.technique || 0) + 
                     (dimensions.humain || 0) + (dimensions.organisationnel || 0) + 
                     (dimensions.economique || 0);
        return total;
    },

    formatDate(date) {
        if (typeof date === 'string') date = new Date(date);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },

    getPriorityClass(priority) {
        const map = { 'P1': 'critical', 'P2': 'high', 'P3': 'medium', 'P4': 'low' };
        return map[priority] || 'medium';
    },

    getPriorityLabel(priority) {
        const map = { 'P1': 'CRITICAL', 'P2': 'HIGH', 'P3': 'MEDIUM', 'P4': 'LOW' };
        return map[priority] || 'MEDIUM';
    },

    getFilterPriorityStyle(priority, isActive) {
        const base = 'border:none;border-radius:999px;padding:3px 6px;font-size:10px;font-weight:600;cursor:pointer;display:inline-block;';
        const styles = {
            P1: { bg: '#fee2e2', fg: '#dc2626', activeBg: '#dc2626' },
            P2: { bg: '#ffedd5', fg: '#ea580c', activeBg: '#ea580c' },
            P3: { bg: '#fef9c3', fg: '#a16207', activeBg: '#a16207' },
            P4: { bg: '#dbeafe', fg: '#2563eb', activeBg: '#2563eb' }
        };
        const variant = styles[priority];
        if (!variant) return base;
        if (isActive) return `${base}background-color:${variant.activeBg};color:white;`;
        return `${base}background-color:${variant.bg};color:${variant.fg};`;
    },

    getFilterAllStyle(isActive) {
        const base = 'border:none;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;display:inline-block;';
        if (isActive) return `${base}background-color:var(--cdg-orange);color:white;`;
        return `${base}background-color:rgba(255,107,53,0.12);color:var(--cdg-orange);`;
    },

    normalizeTrackId(trackId) {
        return trackId == null ? '' : String(trackId);
    },

    isSameTrackId(leftId, rightId) {
        return this.normalizeTrackId(leftId) === this.normalizeTrackId(rightId);
    },

    findTrackById(allPistes, trackId) {
        return allPistes.find(t => this.isSameTrackId(t.numero, trackId)) || null;
    },

    // Méthodes CRUD et événements
    selectTrack(trackId) {
        this.selectedTrackId = this.normalizeTrackId(trackId);
        this.activeTab = 'general';
        this.rerender();
    },

    setActiveTab(tab) {
        this.activeTab = tab;
        this.rerender();
    },

    filterTracks(searchTerm) {
        this.searchTerm = searchTerm || '';
        const state = appStore ? appStore.getState() : {};
        this.applyFilters(state.allPistes || []);
        this.rerender();
    },

    setFilter(priority) {
        this.filterPriority = priority;
        const state = appStore ? appStore.getState() : {};
        this.applyFilters(state.allPistes || []);
        this.rerender();
    },

    applyFilters(allPistes) {
        const searchValue = this.searchTerm.toLowerCase();
        this.filteredTracks = allPistes.filter(track => {
            const trackTitle = (track.titre || '').toLowerCase();
            const trackNumero = (track.numero || '').toLowerCase();
            const trackPriority = track.priorite || '';
            const matchSearch =
                !searchValue ||
                trackTitle.includes(searchValue) ||
                trackNumero.includes(searchValue);

            const matchPriority =
                this.filterPriority === 'Tous' ||
                trackPriority === this.filterPriority;
            return matchSearch && matchPriority;
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

    // Méthodes de mise à jour des champs
    updateField(trackId, field, value) {
        console.log(`Updating ${field} for ${trackId}:`, value);
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            track[field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    updateNestedField(trackId, parent, field, value) {
        console.log(`Updating ${parent}.${field} for ${trackId}:`, value);
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track[parent]) track[parent] = {};
            track[parent][field] = parseFloat(value) || 0;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    updatePriority(trackId, priority) {
        this.updateField(trackId, 'priorite', priority);
        this.rerender();
    },

    updateDimension(trackId, dimension, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.dimensions) track.dimensions = {};
            track.dimensions[dimension] = parseInt(value) || 0;
            track.updated_at = new Date();
            
            // Mettre à jour l'affichage du total
            const total = this.calculateDimensionsTotal(track.dimensions);
            const totalElement = document.getElementById('dimension-total');
            if (totalElement) totalElement.textContent = total + '%';
            
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    handleTagInput(event, trackId) {
        if (event.key === 'Enter') {
            const input = event.target;
            const tag = input.value.trim();
            if (tag) {
                const state = appStore.getState();
                const track = state.allPistes.find(t => t.numero === trackId);
                if (track) {
                    if (!track.tags) track.tags = [];
                    if (!track.tags.includes(tag)) {
                        track.tags.push(tag);
                        track.updated_at = new Date();
                        if (window.appStore && window.appActions) {
                            appActions.updatePiste(track);
                        }
                    }
                }
                input.value = '';
                this.rerender();
            }
        }
    },

    removeTag(trackId, tag) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.tags) {
            track.tags = track.tags.filter(t => t !== tag);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les phases
    addPhase(trackId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.phases) track.phases = [];
            track.phases.push({
                nom: 'Nouvelle phase',
                etape_duree: '',
                activites: '',
                objectifs_etape: '',
                livrable_etape: ''
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updatePhase(trackId, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.phases && track.phases[index]) {
            track.phases[index][field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removePhase(trackId, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.phases) {
            track.phases.splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les indicateurs
    addIndicateur(trackId, type) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.indicateurs) track.indicateurs = { activite: [], resultat: [], cle: [] };
            if (!track.indicateurs[type]) track.indicateurs[type] = [];
            
            track.indicateurs[type].push({
                nom: '',
                cible: '',
                unite: '',
                periodicite: 'mensuelle'
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updateIndicateur(trackId, type, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.indicateurs && track.indicateurs[type] && track.indicateurs[type][index]) {
            track.indicateurs[type][index][field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removeIndicateur(trackId, type, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.indicateurs && track.indicateurs[type]) {
            track.indicateurs[type].splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les avantages
    addAvantage(trackId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.avantages) track.avantages = [];
            track.avantages.push({
                beneficiaire: '',
                texte: ''
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updateAvantage(trackId, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.avantages && track.avantages[index]) {
            track.avantages[index][field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removeAvantage(trackId, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.avantages) {
            track.avantages.splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les risques
    addRisque(trackId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.risques) track.risques = [];
            track.risques.push({
                nom: '',
                probabilite: 'moyenne',
                gravite: 'modérée',
                mitigation: ''
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updateRisque(trackId, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.risques && track.risques[index]) {
            track.risques[index][field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removeRisque(trackId, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.risques) {
            track.risques.splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les justificatifs
    addJustificatif(trackId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.justificatifs) track.justificatifs = [];
            track.justificatifs.push({
                type: '',
                titre: '',
                source: '',
                resultat: '',
                pertinence: 3
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updateJustificatif(trackId, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.justificatifs && track.justificatifs[index]) {
            track.justificatifs[index][field] = field === 'pertinence' ? parseInt(value) : value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removeJustificatif(trackId, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.justificatifs) {
            track.justificatifs.splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les éléments du dispositif
    addElement(trackId, type) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            if (!track.dispositif_elements) track.dispositif_elements = {};
            if (!track.dispositif_elements[type]) track.dispositif_elements[type] = [];
            
            track.dispositif_elements[type].push({
                nom: '',
                description: ''
            });
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    updateElement(trackId, type, index, field, value) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.dispositif_elements && track.dispositif_elements[type] && track.dispositif_elements[type][index]) {
            track.dispositif_elements[type][index][field] = value;
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
        }
    },

    removeElement(trackId, type, index) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.dispositif_elements && track.dispositif_elements[type]) {
            track.dispositif_elements[type].splice(index, 1);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes pour les documents
    addDocument(trackId) {
        // Simulation d'ajout de document
        alert('Fonctionnalité d\'ajout de document à implémenter');
    },

    removeDocument(trackId, docId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track && track.documents) {
            track.documents = track.documents.filter(d => d.id !== docId);
            track.updated_at = new Date();
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            this.rerender();
        }
    },

    // Méthodes générales
    createNewTrack() {
        alert('Création d\'une nouvelle piste à implémenter');
    },

    deleteTrack(trackId) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la piste ${trackId} ?`)) {
            const state = appStore.getState();
            const updatedPistes = state.allPistes.filter(t => t.numero !== trackId);
            if (window.appStore && window.appActions) {
                appActions.setAllPistes(updatedPistes);
            }
            this.selectedTrackId = updatedPistes[0]?.numero || null;
            this.rerender();
        }
    },

    cancelEdit() {
        if (confirm('Annuler les modifications non enregistrées ?')) {
            // Recharger les données depuis le store
            this.rerender();
        }
    },

    viewTrack(trackId) {
        if (window.router) {
            router.navigate(`/piste-detail/${trackId}`);
        }
    },

    saveTrack(trackId) {
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (track) {
            track.updated_at = new Date();
            track.updated_by = 'C. Dubuisson';
            
            if (window.appStore && window.appActions) {
                appActions.updatePiste(track);
            }
            
            if (window.Notifications) {
                Notifications.success(`Piste ${trackId} enregistrée avec succès`);
            } else {
                alert(`Piste ${trackId} enregistrée avec succès`);
            }
        }
    },

    showElementTypeEditor(trackId, type) {
        if (!type) return;
        
        const editor = document.getElementById('element-type-editor');
        if (!editor) return;
        
        const state = appStore.getState();
        const track = state.allPistes.find(t => t.numero === trackId);
        if (!track) return;
        
        if (!track.dispositif_elements) track.dispositif_elements = {};
        if (!track.dispositif_elements[type]) track.dispositif_elements[type] = [];
        
        const items = track.dispositif_elements[type];
        const icon = this.TYPE_ICONS[type] || '📌';
        const title = this.TYPE_TITLES[type] || type;
        
        let html = `
            <div class="element-type-editor-header">
                <h4>${icon} ${title}</h4>
                <button class="btn-add-element-small" onclick="pages.Edition.addElement('${trackId}', '${type}')">
                    <span class="material-icons">add</span>
                    Ajouter
                </button>
            </div>
            <div class="element-type-editor-list">
        `;
        
        if (items.length === 0) {
            html += '<p class="empty-message">Aucun élément de ce type</p>';
        } else {
            items.forEach((item, index) => {
                html += `
                    <div class="element-type-editor-item">
                        <div class="item-header">
                            <input type="text" value="${item.nom || ''}" placeholder="Nom" data-type="${type}" data-index="${index}" data-field="nom" onchange="pages.Edition.updateElement('${trackId}', '${type}', ${index}, 'nom', this.value)">
                            <button class="item-remove" onclick="pages.Edition.removeElement('${trackId}', '${type}', ${index})">
                                <span class="material-icons">delete</span>
                            </button>
                        </div>
                        <textarea placeholder="Description" data-type="${type}" data-index="${index}" data-field="description" onchange="pages.Edition.updateElement('${trackId}', '${type}', ${index}, 'description', this.value)">${item.description || ''}</textarea>
                    </div>
                `;
            });
        }
        
        html += '</div>';
        editor.innerHTML = html;
    },

    setupEventListeners() {
        console.log('Setup event listeners - Edition enrichie');
        
        // Initialiser les écouteurs pour les sliders de dimensions
        document.querySelectorAll('.dimension-slider').forEach(slider => {
            slider.addEventListener('input', function() {
                const dim = this.dataset.dim;
                const input = document.querySelector(`.dimension-input[data-dim="${dim}"]`);
                if (input) input.value = this.value;
            });
        });
        
        document.querySelectorAll('.dimension-input').forEach(input => {
            input.addEventListener('change', function() {
                const dim = this.dataset.dim;
                const slider = document.querySelector(`.dimension-slider[data-dim="${dim}"]`);
                if (slider) slider.value = this.value;
            });
        });
    },

    getStyles() {
        return `<style>
            /* Base layout */
            .edition-wrapper {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background: var(--gray-50);
                font-family: 'Public Sans', sans-serif;
                color: var(--cdg-navy);
            }

            .edition-header {
                background: var(--cdg-navy);
                color: white;
                padding: 12px 20px;
                border-bottom: 4px solid var(--cdg-orange);
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
            }

            .header-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
            }

            .header-left, .header-right, .user-info, .location-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .header-divider {
                width: 1px;
                height: 28px;
                background: rgba(255,255,255,0.22);
            }

            .logo-box {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background: var(--cdg-orange);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .logo-box .material-icons { color: white; }
            .header-title { margin: 0; font-size: 16px; font-weight: 700; }
            .header-subtitle { margin: 2px 0 0; font-size: 11px; opacity: 0.8; }
            .user-name { margin: 0; font-size: 12px; font-weight: 600; }
            .user-role { margin: 0; font-size: 11px; opacity: 0.8; }
            .user-avatar {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background: rgba(255,255,255,0.12);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .edition-main {
                display: flex;
                flex: 1;
                min-height: 0;
            }

            .edition-sidebar {
                width: 300px;
                min-width: 300px;
                border-right: 1px solid var(--gray-200);
                background: white;
                display: flex;
                flex-direction: column;
                min-height: 0;
                overflow-y: auto;
            }

            .sidebar-top {
                padding: 14px;
                border-bottom: 1px solid var(--gray-200);
                background: var(--gray-50);
                position: sticky;
                top: 0;
                z-index: 2;
            }

            .search-box { position: relative; margin-bottom: 10px; margin-top: 10px;}
            .search-box .material-icons {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 18px;
                color: var(--gray-400);
            }

            .search-input {
                width: 80%;
                height: 38px;
                padding: 0 12px 0 36px;
                border: 1px solid var(--gray-300);
                border-radius: 8px;
                background: white;
            }

            .search-input:focus {
                outline: none;
                border-color: var(--cdg-orange);
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12);
            }

            .filter-tabs {
                display: flex;
                gap: 8px;
                overflow-x: auto;
            }

            .filter-title {
                font-size: 12px;
                font-weight: 700;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.04em;
                margin-bottom: 8px;
            }

            .filter-btn {
                border: none;
                border-radius: 999px;
                padding: 3px 4px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                color: var(--cdg-orange);
                background: rgba(255,107,53,0.12);
            }

            .filter-btn.active {
                color: white;
                background: var(--cdg-orange);
            }

            .sidebar-top .filter-btn.filter-p1 { background-color: #fee2e2; color: #dc2626; }
            .sidebar-top .filter-btn.filter-p2 { background-color: #ffedd5; color: #ea580c; }
            .sidebar-top .filter-btn.filter-p3 { background-color: #fef9c3; color: #a16207; }
            .sidebar-top .filter-btn.filter-p4 { background-color: #dbeafe; color: #2563eb; }

            .sidebar-top .filter-btn.filter-p1.active { background-color: #dc2626; color: white; }
            .sidebar-top .filter-btn.filter-p2.active { background-color: #ea580c; color: white; }
            .sidebar-top .filter-btn.filter-p3.active { background-color: #a16207; color: white; }
            .sidebar-top .filter-btn.filter-p4.active { background-color: #2563eb; color: white; }

            .tracks-list {
            /*    flex: 1;*/
                overflow-y: auto;
                min-height: 800px;
                height: 800px;
            }

            .track-item {
                padding: 14px;
                border-bottom: 1px solid var(--gray-100);
                cursor: pointer;
                border-left: 3px solid transparent;
            }

            .track-item:hover { background: var(--gray-50); }
            .track-item.active {
                background: rgba(255,107,53,0.08);
                border-left-color: var(--cdg-orange);
            }

            .track-header {
                display: flex;
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
            }

            .track-id { font-size: 11px; font-weight: 700; color: var(--cdg-orange); }
            .track-title { margin: 0; font-size: 14px; font-weight: 700; color: var(--cdg-navy); }
            .track-meta { margin-top: 8px; display: flex; gap: 10px; font-size: 12px; color: var(--gray-500); }
            .meta-item { display: inline-flex; align-items: center; gap: 4px; }
            .meta-item .material-icons,
            .meta-item .material-symbols-outlined { font-size: 14px; }

            .btn-new-track {
              /*  margin: 12px;*/
                padding: 10px 12px;
                border: none;
                border-radius: 8px;
                background: var(--cdg-navy);
                color: white;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                gap: 6px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;

            }

            .edition-panel {
                flex: 1;
                min-width: 0;
                overflow-y: auto;
                padding: 24px;
                background: white;
            }

            .panel-header {
                margin-bottom: 16px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--gray-200);
            }

            .panel-title { margin: 0; font-size: 26px; color: var(--cdg-navy); }
            .breadcrumb { font-size: 12px; color: var(--gray-500); margin-bottom: 10px; }
            .breadcrumb a { color: var(--cdg-orange); text-decoration: none; }

            .panel-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 16px;
            }

            .btn-delete, .btn-cancel, .btn-view, .btn-save {
                border: none;
                border-radius: 8px;
                padding: 10px 14px;
                cursor: pointer;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }

            .btn-delete { background: #fee2e2; color: #dc2626; }
            .btn-cancel { background: var(--gray-100); color: var(--gray-700); }
            .btn-view { background: #dbeafe; color: #1d4ed8; }
            .btn-save { background: var(--cdg-orange); color: white; margin-left: auto; }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                margin-bottom: 16px;
            }

            .form-group { display: flex; flex-direction: column; }
            .form-group.full-width { grid-column: 1 / -1; }
            .form-label {
                font-size: 12px;
                font-weight: 700;
                color: var(--gray-500);
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }

            .form-input, .editor-content, textarea, select {
                width: 100%;
                border: 1px solid var(--gray-300);
                border-radius: 8px;
                padding: 10px 12px;
                font-size: 14px;
                color: var(--cdg-navy);
                background: white;
            }

            .form-input:focus, .editor-content:focus, textarea:focus, select:focus {
                outline: none;
                border-color: var(--cdg-orange);
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12);
            }

            .priority-badge {
                font-size: 10px;
                font-weight: 700;
                padding: 3px 8px;
                border-radius: 999px;
                text-transform: uppercase;
            }

            .priority-badge.priority-critical { background: #fee2e2; color: #dc2626; }
            .priority-badge.priority-high { background: #ffedd5; color: #ea580c; }
            .priority-badge.priority-medium { background: #fef9c3; color: #a16207; }
            .priority-badge.priority-low { background: #dbeafe; color: #2563eb; }

            .no-track {
                display: grid;
                place-items: center;
                min-height: 300px;
                color: var(--gray-500);
                font-size: 16px;
            }

            .edition-sidebar::-webkit-scrollbar, .tracks-list::-webkit-scrollbar { width: 10px; }
            .edition-sidebar::-webkit-scrollbar-track, .tracks-list::-webkit-scrollbar-track { background: var(--gray-100); }
            .edition-sidebar::-webkit-scrollbar-thumb, .tracks-list::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 999px; }
            .edition-sidebar::-webkit-scrollbar-thumb:hover, .tracks-list::-webkit-scrollbar-thumb:hover { background: var(--gray-400); }

            @media(max-width: 1024px) {
                .edition-sidebar { width: 260px; min-width: 260px; }
            }

            @media(max-width: 768px) {
                .edition-main { flex-direction: column; }
                .edition-sidebar {
                    width: 100%;
                    min-width: 0;
                    max-height: 45vh;
                    border-right: none;
                    border-bottom: 1px solid var(--gray-200);
                }
                .edition-panel { padding: 16px; }
                .form-row { grid-template-columns: 1fr; }
            }
            
            /* Nouveaux styles pour l'édition enrichie */
            .panel-meta {
                margin-top: 8px;
                display: flex;
                gap: 8px;
            }
            
            .badge.priority-critical { background: #EF4444; color: white; }
            .badge.priority-high { background: #F59E0B; color: white; }
            .badge.priority-medium { background: #FF6B35; color: white; }
            .badge.priority-low { background: #3B82F6; color: white; }
            .badge.category { background: #6B7280; color: white; }
            .badge.family { background: #10B981; color: white; }
            
            .tabs-navigation {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin: 20px 0;
                padding: 4px;
                background: var(--gray-100);
                border-radius: 8px;
            }
            
            .tab-btn {
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                background: transparent;
                color: var(--gray-600);
                font-weight: 600;
                font-size: 13px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s;
            }
            
            .tab-btn .material-icons,
            .tab-btn .material-symbols-outlined {
                font-size: 18px;
            }
            
            .tab-btn:hover {
                background: rgba(255,107,53,0.1);
                color: var(--cdg-orange);
            }
            
            .tab-btn.active {
                background: white;
                color: var(--cdg-orange);
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .edition-tab-content {
                min-height: 400px;
            }
            
            .section-subtitle {
                font-size: 18px;
                font-weight: 600;
                color: var(--cdg-navy);
                margin: 20px 0 16px 0;
                padding-bottom: 8px;
                border-bottom: 2px solid var(--cdg-orange);
            }
            
            .tags-input-container {
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                padding: 8px;
            }
            
            .tags-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 8px;
            }
            
            .tag-item {
                background: var(--cdg-orange);
                color: white;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .tag-remove {
                cursor: pointer;
                font-size: 16px;
                line-height: 1;
            }
            
            .dimensions-container {
                background: var(--gray-50);
                padding: 20px;
                border-radius: 8px;
            }
            
            .dimension-item {
                margin-bottom: 16px;
            }
            
            .dimension-control {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .dimension-slider {
                flex: 1;
                height: 6px;
                -webkit-appearance: none;
                background: linear-gradient(90deg, var(--cdg-orange) 0%, var(--cdg-navy) 100%);
                border-radius: 3px;
            }
            
            .dimension-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                background: white;
                border: 2px solid var(--cdg-navy);
                border-radius: 50%;
                cursor: pointer;
            }
            
            .dimension-input {
                width: 70px;
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
                text-align: right;
            }
            
            .dimension-unit {
                color: var(--gray-500);
                font-size: 14px;
            }
            
            .dimension-total {
                margin-top: 20px;
                padding-top: 16px;
                border-top: 2px solid var(--gray-200);
                text-align: right;
                font-weight: 600;
            }
            
            .total-label {
                color: var(--gray-500);
                margin-right: 8px;
            }
            
            .total-value {
                font-size: 20px;
                color: var(--cdg-navy);
            }
            
            .element-group {
                margin-bottom: 30px;
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                overflow: hidden;
            }
            
            .element-group-header {
                background: var(--gray-100);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .element-icon {
                font-size: 18px;
            }
            
            .element-group-header h4 {
                flex: 1;
                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: var(--cdg-navy);
            }
            
            .btn-add-element {
                background: transparent;
                border: none;
                color: var(--cdg-orange);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
            }
            
            .btn-add-element:hover {
                background: rgba(255,107,53,0.1);
            }
            
            .element-list {
                padding: 12px;
            }
            
            .element-empty {
                padding: 24px;
                text-align: center;
                color: var(--gray-400);
                border: 2px dashed var(--gray-200);
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .element-empty:hover {
                border-color: var(--cdg-orange);
                color: var(--cdg-orange);
            }
            
            .element-item {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 6px;
                margin-bottom: 12px;
                padding: 12px;
            }
            
            .element-item-header {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;
            }
            
            .element-item-name {
                flex: 1;
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
                font-weight: 600;
            }
            
            .element-item-remove {
                background: transparent;
                border: none;
                color: var(--danger);
                cursor: pointer;
                padding: 4px;
            }
            
            .element-item-content {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .element-item-description {
                width: 100%;
                padding: 8px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
                min-height: 60px;
                resize: vertical;
            }
            
            .element-fields-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            
            .element-field {
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
            }
            
            .phases-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .phase-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                overflow: hidden;
            }
            
            .phase-header {
                background: var(--gray-100);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .phase-name {
                flex: 1;
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
                font-weight: 600;
            }
            
            .phase-remove {
                background: transparent;
                border: none;
                color: var(--danger);
                cursor: pointer;
                padding: 4px;
            }
            
            .phase-content {
                padding: 16px;
            }
            
            .btn-add-phase {
                width: 100%;
                margin-top: 16px;
                padding: 12px;
                background: white;
                border: 2px dashed var(--cdg-orange);
                border-radius: 8px;
                color: var(--cdg-orange);
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .btn-add-phase:hover {
                background: rgba(255,107,53,0.05);
            }
            
            .indicateurs-group {
                margin-bottom: 30px;
            }
            
            .indicateurs-group h4 {
                margin-bottom: 12px;
                color: var(--cdg-navy);
            }
            
            .indicateurs-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 12px;
            }
            
            .indicateurs-table th {
                background: var(--gray-100);
                padding: 8px;
                text-align: left;
                font-size: 12px;
                font-weight: 600;
                color: var(--gray-600);
            }
            
            .indicateurs-table td {
                padding: 4px;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .indicateurs-table input,
            .indicateurs-table select {
                width: 100%;
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
            }
            
            .btn-add-indicateur {
                padding: 8px 16px;
                background: white;
                border: 1px dashed var(--cdg-orange);
                border-radius: 6px;
                color: var(--cdg-orange);
                font-size: 13px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }
            
            .btn-remove-indicateur,
            .btn-remove-avantage,
            .btn-remove-risque,
            .btn-remove-justificatif {
                background: transparent;
                border: none;
                color: var(--danger);
                cursor: pointer;
                padding: 4px;
            }
            
            .avantages-table,
            .risques-table,
            .justificatifs-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 16px;
            }
            
            .avantages-table th,
            .risques-table th,
            .justificatifs-table th {
                background: var(--gray-100);
                padding: 8px;
                text-align: left;
                font-size: 12px;
                font-weight: 600;
            }
            
            .avantages-table td,
            .risques-table td,
            .justificatifs-table td {
                padding: 4px;
                border-bottom: 1px solid var(--gray-200);
            }
            
            .avantages-table input,
            .risques-table input,
            .risques-table select,
            .justificatifs-table input,
            .justificatifs-table select {
                width: 100%;
                padding: 6px;
                border: 1px solid var(--gray-200);
                border-radius: 4px;
            }
            
            .empty-row td {
                padding: 24px;
                text-align: center;
                color: var(--gray-400);
                font-style: italic;
            }
            
            .documents-section {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid var(--gray-200);
            }
            
            .documents-title {
                font-size: 16px;
                font-weight: 700;
                color: var(--cdg-navy);
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 16px;
            }
            
            .documents-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }
            
            .document-item {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 24px;
                border: 1px dashed var(--gray-200);
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .document-item:hover {
                border-color: var(--cdg-orange);
                background: rgba(255,107,53,0.05);
            }
            
            .document-item .material-icons {
                font-size: 32px;
                color: var(--cdg-orange);
                margin-bottom: 8px;
            }
            
            .document-name {
                font-size: 12px;
                font-weight: 600;
                color: var(--cdg-navy);
                margin-bottom: 4px;
            }
            
            .document-size {
                font-size: 11px;
                color: var(--gray-500);
            }
            
            .document-remove {
                position: absolute;
                top: 4px;
                right: 4px;
                background: white;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: var(--danger);
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .document-item:hover .document-remove {
                opacity: 1;
            }
            
            .add-document .material-icons {
                color: var(--gray-400);
                font-size: 40px;
            }
            
            .elements-selector {
                margin-bottom: 20px;
            }
            
            .element-type-select {
                width: 100%;
                padding: 10px;
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                font-size: 14px;
            }
            
            .element-type-editor {
                background: var(--gray-50);
                padding: 20px;
                border-radius: 8px;
                min-height: 200px;
            }
            
            .element-type-editor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            
            .btn-add-element-small {
                padding: 6px 12px;
                background: var(--cdg-orange);
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .element-type-editor-item {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 6px;
                margin-bottom: 12px;
                padding: 12px;
            }
            
            .empty-message {
                text-align: center;
                color: var(--gray-400);
                padding: 40px;
                font-style: italic;
            }
            
            .dimensions-description {
                color: var(--gray-500);
                font-size: 13px;
                margin-bottom: 20px;
            }
            
            @media(max-width: 768px) {
                .tabs-navigation {
                    overflow-x: auto;
                    flex-wrap: nowrap;
                }
                
                .tab-btn {
                    white-space: nowrap;
                }
                
                .documents-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .element-fields-row {
                    grid-template-columns: 1fr;
                }
            }
        </style>`;
    }
};

window.pages = window.pages || {};
window.pages.Edition = pages.Edition;
