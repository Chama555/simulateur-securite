/**
 * PAGES/EXPLORE.JS - Page exploration des pistes (Design professionnel - CORRIGÉ)
 */

pages.Explore = {
    currentPage: 1,
    itemsPerPage: 6,
    viewMode: 'grid',
    sortDirection: 'desc',
    filteredPistes: [],
    allPistes: [],
    selectedPriorities: [],
    trackRatings: {},
    minRatingFilter: 0,

    async render() {
        const state = appStore.getState();
        const pistes = state.allPistes || [];
        this.loadRatings();
        this.allPistes = JSON.parse(JSON.stringify(pistes)); // Copie profonde
        this.filteredPistes = JSON.parse(JSON.stringify(pistes));
        this.applySorting();
        this.currentPage = 1;
        this.selectedPriorities = [];

        const categoryOptions = [...new Set(
            pistes
                .map(p => (p.categorie || '').trim())
                .filter(Boolean)
        )].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

        const categoryCounts = categoryOptions.reduce((acc, category) => {
            acc[category] = pistes.filter(p => this.normalizeCategory(p.categorie) === this.normalizeCategory(category)).length;
            return acc;
        }, {});
        const priorityLevels = [
            { code: 'P1', label: 'Gain rapide', color: 'red' },
            { code: 'P2', label: 'Stratégique', color: 'orange' },
            { code: 'P3', label: 'Support', color: 'yellow' },
            { code: 'P4', label: 'Long terme', color: 'blue' }
        ];

        return `
            <div class="explore-wrapper">
                <aside class="explore-sidebar">
                    <div class="sidebar-header">
                        <h2>Filtres</h2>
                        <button class="reset-btn" id="reset-filters">Réinitialiser</button>
                    </div>

                    <!-- Catégories -->
                    <div class="filter-section">
                        <h3 class="filter-title">
                            <span class="material-symbols-outlined">category</span>
                            Catégories
                        </h3>
                        <div class="filter-options">
                            ${categoryOptions.map(category => `
                                <label class="filter-checkbox">
                                    <input type="checkbox" value="${category}" class="category-filter" checked>
                                    <span>${this.formatCategoryLabel(category)}</span>
                                    <span class="count">${categoryCounts[category]}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Niveau de Priorité -->
                    <div class="filter-section">
                        <h3 class="filter-title">
                            <span class="material-symbols-outlined">priority_high</span>
                            Niveau de Priorité
                        </h3>
                        <div class="priority-grid">
                            ${priorityLevels.map(p => `
                                <button class="priority-btn priority-${p.color}" data-priority="${p.code}">
                                    ${p.code}<br><span class="priority-label">${p.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Notation -->
                    <div class="filter-section">
                        <h3 class="filter-title">
                            <span class="material-symbols-outlined">stars</span>
                            Notation
                        </h3>
                        <div class="rating-filter-range">
                            <input type="range" id="rating-range" min="0" max="5" step="1" value="${this.minRatingFilter}" class="rating-slider">
                            <div class="rating-filter-labels">
                                <span>Aucune</span>
                                <span id="rating-value">${this.getMinRatingLabel(this.minRatingFilter)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Budget -->
                    <div class="filter-section">
                        <h3 class="filter-title">
                            <span class="material-symbols-outlined">payments</span>
                            Budget (€)
                        </h3>
                        <input type="range" id="budget-range" min="0" max="2000000" value="2000000" class="budget-slider">
                        <div class="budget-labels">
                            <span>0 €</span>
                            <span id="budget-value">2M+ €</span>
                        </div>
                    </div>


                </aside>

                <main class="explore-main">
                    <!-- Barre de Recherche -->
                    <div class="search-bar">
                        <div class="search-input-wrapper">
                            <span class="material-symbols-outlined">search</span>
                            <input type="text" id="search-input" placeholder="Chercher par ID ou titre..." class="search-input">
                        </div>
                        <button class="sort-btn" id="sort-impact-btn">
                            <span class="material-symbols-outlined">sort</span>
                            Trier par Impact (${this.sortDirection === 'desc' ? 'décroissant' : 'croissant'})
                        </button>

                        <button class="create-btn" id="create-track-btn" onclick="pages.Explore.createTrack()">
                            <span class="material-symbols-outlined">add_circle</span>
                            Nouvelle piste
                        </button>
                    </div>

                    <!-- En-tête -->
                    <div class="explore-header">
                        <div>
                            <h2>Pistes d'Amélioration Sécurité</h2>
                            <p id="result-count">Affichage de ${pistes.length} résultats selon vos filtres</p>
                        </div>
                        <div class="view-toggle">
                            <button class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid">
                                <span class="material-symbols-outlined">grid_view</span>
                            </button>
                            <button class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list">
                                <span class="material-symbols-outlined">list</span>
                            </button>
                        </div>
                    </div>

                    <!-- Grille/Liste -->
                    <div class="piste-container ${this.viewMode === 'list' ? 'list-mode' : ''}" id="piste-container">
                        ${this.renderPistes(this.filteredPistes.slice(0, this.itemsPerPage))}
                    </div>

                    <!-- Pagination -->
                    <div class="pagination" id="pagination">
                        ${this.renderPagination(this.filteredPistes.length)}
                    </div>
                </main>
            </div>

            ${this.getStyles()}
        `;
    },

    renderPistes(pistes) {
        if (!pistes || pistes.length === 0) {
            return '<div class="no-results"><p>Aucune piste trouvée</p></div>';
        }
        
        return pistes.map((p, idx) => {
            const pisteNum = p.numero || `P${idx}`;
            const rating = this.getTrackRating(p);
            return `
                <div class="piste-card" data-piste-id="${pisteNum}">
                    <div class="card-header">
                        <div class="card-badges">
                            <span class="priority-badge priority-${this.getPriorityColor(p.priorite)}">${p.priorite || 'P3'}</span>
                            <span class="category-badge">${p.categorie || 'N/A'}</span>
                        </div>
                        <div class="star-btn" onclick="event.stopPropagation()" aria-label="Notation piste">
                            ${[1, 2, 3, 4, 5].map(score => `
                                <button
                                    class="star-rate-btn ${score <= rating ? 'active' : ''}"
                                    onclick="event.stopPropagation(); pages.Explore.rateTrack('${pisteNum}', ${score})"
                                    title="Noter ${score}/5"
                                    aria-label="Noter ${score} sur 5">
                                    <span class="material-symbols-outlined">star</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <h3 class="card-title">${p.titre || 'Sans titre'}</h3>
                    <p class="card-description">${p.description || ''}</p>
                    <div class="card-footer">
                        <div class="card-info">
                            <div class="info-item">
                                <span class="material-symbols-outlined">category</span>
                                <span>${p.categorie || 'N/A'}</span>
                            </div>
                            <div class="info-item budget">
                                <span class="material-symbols-outlined">payments</span>
                                <span>${Utils.formatCurrency(p.budget?.cout_3_ans || 0)}</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="edit-btn" onclick="event.stopPropagation(); pages.Explore.goToEdition('${pisteNum}')">Édition</button>
                            <button class="details-btn" onclick="event.stopPropagation(); pages.Explore.goToDetail('${pisteNum}')">Détails</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderPagination(total) {
        const totalPages = Math.ceil(total / this.itemsPerPage);
        if (totalPages <= 1) return '';

        let html = '<div class="pagination-controls">';
        html += '<button class="pagination-prev" id="prev-btn">‹</button>';

        const visiblePages = this.getVisiblePaginationPages(totalPages);
        let previousPage = 0;

        visiblePages.forEach(page => {
            if (previousPage && page - previousPage > 1) {
                html += '<span class="pagination-dots">...</span>';
            }

            html += `<button class="pagination-num ${page === this.currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
            previousPage = page;
        });

        html += '<button class="pagination-next" id="next-btn">›</button>';
        html += '</div>';
        return html;
    },

    getVisiblePaginationPages(totalPages) {
        const currentPage = Math.min(Math.max(this.currentPage, 1), totalPages);

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const pages = new Set([1, totalPages]);
        const windowStart = Math.max(2, currentPage - 2);
        const windowEnd = Math.min(totalPages - 1, currentPage + 2);

        for (let page = windowStart; page <= windowEnd; page++) {
            pages.add(page);
        }

        return Array.from(pages).sort((a, b) => a - b);
    },

    getPriorityColor(priority) {
        const colors = { 'P1': 'red', 'P2': 'orange', 'P3': 'yellow', 'P4': 'blue' };
        return colors[priority] || 'slate';
    },

    normalizeCategory(value) {
        return (value || '').toString().trim().toLowerCase();
    },

    formatCategoryLabel(value) {
        const text = (value || '').toString().trim();
        if (!text) return 'N/A';
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    loadRatings() {
        try {
            const raw = window.localStorage?.getItem('exploreTrackRatings');
            this.trackRatings = raw ? JSON.parse(raw) : {};
        } catch (error) {
            this.trackRatings = {};
        }
    },

    saveRatings() {
        try {
            window.localStorage?.setItem('exploreTrackRatings', JSON.stringify(this.trackRatings));
        } catch (error) {
            // Ignore localStorage errors
        }
    },

    getTrackRating(piste) {
        const key = String(piste?.numero || piste?.id || '');
        const localRating = Number(this.trackRatings?.[key]);
        const baseRating = Number(piste?.rating || 0);
        const value = Number.isFinite(localRating) && localRating > 0 ? localRating : baseRating;
        return Math.min(5, Math.max(0, value));
    },

    getMinRatingLabel(minRating) {
        const value = Math.min(5, Math.max(0, Number(minRating) || 0));
        return value === 0 ? 'Toutes' : `≥ ${value}★`;
    },

    rateTrack(pisteId, rating) {
        const key = String(pisteId);
        const value = Math.min(5, Math.max(1, Number(rating)));

        this.trackRatings[key] = value;
        this.saveRatings();

        this.allPistes.forEach(piste => {
            if (String(piste?.numero) === key) {
                piste.rating = value;
            }
        });

        if (window.appStore && typeof window.appStore.getState === 'function' && typeof window.appStore.setState === 'function') {
            const state = window.appStore.getState();
            const updatedPistes = (state.allPistes || []).map((piste) => {
                if (String(piste?.numero) === key) {
                    return { ...piste, rating: value };
                }
                return piste;
            });
            window.appStore.setState({ allPistes: updatedPistes });
        }

        this.filterPistes();
    },

    goToDetail(pisteId) {
        console.log('Navigating to detail for piste:', pisteId);
        // Créer une route directe vers la page détail
        if (window.router) {
            window.router.navigate(`/piste-detail/${pisteId}`);
        } else {
            window.location.hash = `piste-detail/${pisteId}`;
        }
    },

    goToEdition(pisteId) {
        if (window.pages && window.pages.Edition) {
            window.pages.Edition.selectedTrackId = String(pisteId);
            window.pages.Edition.activeTab = 'general';
        }
        if (window.router) {
            window.router.navigate('/edition');
        } else {
            window.location.href = '/edition';
        }
    },

    createTrack() {
        if (window.router && typeof window.router.navigate === 'function') {
            window.router.navigate('/edition');
        } else {
            window.location.href = '/edition';
        }
    },

    setupEventListeners() {
        console.log('Setting up event listeners for Explore page');
        
        // Recherche
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                console.log('Search input changed:', e.target.value);
                this.filterPistes();
            });
        }

        // Catégories
        document.querySelectorAll('.category-filter').forEach(cb => {
            cb.addEventListener('change', (e) => {
                console.log('Category filter changed:', e.target.value);
                this.filterPistes();
            });
        });

        // Priorités
        document.querySelectorAll('.priority-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Priority button clicked:', btn.dataset.priority);
                btn.classList.toggle('active');
                this.filterPistes();
            });
        });

        // Filtre notation (jauge)
        const ratingRange = document.getElementById('rating-range');
        if (ratingRange) {
            ratingRange.addEventListener('input', (e) => {
                this.minRatingFilter = parseInt(e.target.value || '0', 10);
                const ratingValue = document.getElementById('rating-value');
                if (ratingValue) ratingValue.textContent = this.getMinRatingLabel(this.minRatingFilter);
                this.filterPistes();
            });
        }

        // Budget
        const budgetRange = document.getElementById('budget-range');
        if (budgetRange) {
            budgetRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                console.log('Budget changed:', value);
                if (value >= 1000000) {
                    document.getElementById('budget-value').textContent = '2M+ €';
                } else {
                    document.getElementById('budget-value').textContent = (value / 1000).toFixed(0) + 'k€';
                }
                this.filterPistes();
            });
        }

        // Status
        const statusSelect = document.getElementById('status-select');
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                console.log('Status changed:', e.target.value);
                this.filterPistes();
            });
        }

        // Reset
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Reset filters clicked');
                this.resetFilters();
            });
        }

        // Tri impact
        const sortImpactBtn = document.getElementById('sort-impact-btn');
        if (sortImpactBtn) {
            sortImpactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
                this.applySorting();
                this.currentPage = 1;
                this.renderCurrentPage();
                this.updateSortButtonLabel();
            });
        }

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('View toggle clicked:', btn.dataset.view);
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.viewMode = btn.dataset.view;
                this.renderCurrentPage();
            });
        });

        // Pagination
        this.setupPaginationEvents();

        // Navigation detail uniquement via "Détails"
    },

    setupPaginationEvents() {
        document.querySelectorAll('.pagination-num, .pagination-prev, .pagination-next').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePagination(btn);
            });
        });
    },

    filterPistes() {
        console.log('Filtering pistes...');
        const search = (document.getElementById('search-input')?.value || '').toLowerCase();
        const categories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
        const priorities = Array.from(document.querySelectorAll('.priority-btn.active')).map(btn => btn.dataset.priority);
        const maxBudget = parseInt(document.getElementById('budget-range')?.value || '2000000');
        const status = document.getElementById('status-select')?.value || '';
        const minRating = this.minRatingFilter;

        console.log('Filter criteria:', { search, categories, priorities, maxBudget, status, minRating });

        this.filteredPistes = this.allPistes.filter(p => {
            const matchSearch = !search || 
                (p.titre && p.titre.toLowerCase().includes(search)) || 
                (p.numero && p.numero.toLowerCase().includes(search));
            
            const matchCategory = categories.length === 0 || categories.some(
                category => this.normalizeCategory(category) === this.normalizeCategory(p.categorie)
            );
            const matchPriority = priorities.length === 0 || priorities.includes(p.priorite || 'P3');
            const matchBudget = p.budget && p.budget.cout_3_ans <= maxBudget;
            const matchRating = this.getTrackRating(p) >= minRating;
            
            return matchSearch && matchCategory && matchPriority && matchBudget && matchRating;
        });

        this.applySorting();

        console.log('Filtered pistes count:', this.filteredPistes.length);

        this.currentPage = 1;
        this.renderCurrentPage();
    },

    applySorting() {
        this.filteredPistes.sort((a, b) => {
            const impactA = Number(a?.impact_score || 0);
            const impactB = Number(b?.impact_score || 0);

            if (this.sortDirection === 'asc') {
                return impactA - impactB;
            }
            return impactB - impactA;
        });
    },

    updateSortButtonLabel() {
        const sortImpactBtn = document.getElementById('sort-impact-btn');
        if (!sortImpactBtn) return;
        sortImpactBtn.innerHTML = `
            <span class="material-symbols-outlined">sort</span>
            Trier par Impact (${this.sortDirection === 'desc' ? 'décroissant' : 'croissant'})
        `;
    },

    renderCurrentPage() {
        console.log('Rendering current page:', this.currentPage);
        
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pagePistes = this.filteredPistes.slice(start, end);

        console.log('Page pistes:', pagePistes.length, 'from', start, 'to', end);

        const container = document.getElementById('piste-container');
        if (container) {
            container.className = `piste-container ${this.viewMode === 'list' ? 'list-mode' : ''}`;
            const html = this.renderPistes(pagePistes);
            console.log('Rendering HTML with length:', html.length);
            container.innerHTML = html;
            
            // Navigation detail uniquement via "Détails"
        }

        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.innerHTML = this.renderPagination(this.filteredPistes.length);
            this.setupPaginationEvents();
        }

        const resultCount = document.getElementById('result-count');
        if (resultCount) {
            resultCount.textContent = `Affichage de ${this.filteredPistes.length} résultats selon vos filtres`;
        }
    },

    handlePagination(btn) {
        const totalPages = Math.ceil(this.filteredPistes.length / this.itemsPerPage);
        
        if (btn.classList.contains('pagination-prev')) {
            if (this.currentPage > 1) this.currentPage--;
        } else if (btn.classList.contains('pagination-next')) {
            if (this.currentPage < totalPages) this.currentPage++;
        } else {
            this.currentPage = parseInt(btn.dataset.page);
        }
        
        console.log('Page changed to:', this.currentPage);
        this.renderCurrentPage();
    },

    resetFilters() {
        console.log('Resetting all filters');
        
        // Reset checkboxes
        document.querySelectorAll('.category-filter').forEach(cb => cb.checked = true);
        
        // Reset priorities
        document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));

        // Reset notation
        this.minRatingFilter = 0;
        const ratingRange = document.getElementById('rating-range');
        if (ratingRange) ratingRange.value = '0';
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) ratingValue.textContent = this.getMinRatingLabel(0);
        
        // Reset budget
        const budgetRange = document.getElementById('budget-range');
        if (budgetRange) {
            budgetRange.value = '2000000';
            document.getElementById('budget-value').textContent = '2M+ €';
        }
        
        // Reset search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Reset status
        const statusSelect = document.getElementById('status-select');
        if (statusSelect) {
            statusSelect.value = '';
        }
        
        this.filterPistes();
    },

    getStyles() {
        return `
            <style>
                .explore-wrapper {
                    display: grid;
                    grid-template-columns: 288px 1fr;
                    gap: 0;
                    min-height: 100vh;
                    background: #f8fafc;
                }

                .explore-sidebar {
                    background: white;
                    border-right: 1px solid #e2e8f0;
                    padding: 12px;
                    overflow-y: auto;
                    height: 100vh;
                    position: sticky;
                    top: 0;
                }

                .sidebar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                 /*   margin-bottom: 32px;*/
                }

                .sidebar-header h2 {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                }

                .reset-btn {
                    font-size: 12px;
                    color: #003D82;
                    font-weight: 600;
                    border: none;
                    background: none;
                    cursor: pointer;
                    text-decoration: underline;
                }

                .reset-btn:hover {
                    color: #FF6B35;
                }

                .filter-section {
                    margin-bottom: 6px;
                }

                .filter-title {
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #64748b;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .filter-title .material-symbols-outlined {
                    font-size: 16px;
                }

                .filter-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .filter-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    font-size: 10px;
                    color: #64748b;
                }

                .filter-checkbox input {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    accent-color: #003D82;
                }

                .filter-checkbox .count {
                    margin-left: auto;
                    font-size: 12px;
                    color: #94a3b8;
                    background: #f1f5f9;
                    padding: 2px 8px;
                    border-radius: 9999px;
                }

                .priority-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }

                .rating-filter-range {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .rating-slider {
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                    accent-color: #f59e0b;
                }

                .rating-filter-labels {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    color: #64748b;
                }

                #rating-value {
                    font-weight: 700;
                    color: #92400e;
                    background: #fffbeb;
                    border: 1px solid #fde68a;
                    border-radius: 999px;
                    padding: 2px 8px;
                }

                .priority-btn {
                    padding: 8px 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.2s;
                    background: white;
                    color: #64748b;
                }

                .priority-btn.priority-red {
                    border-color: #fecaca;
                    background: #fef2f2;
                    color: #b91c1c;
                }

                .priority-btn.priority-orange {
                    border-color: #fed7aa;
                    background: #fff7ed;
                    color: #b45309;
                }

                .priority-btn.priority-yellow {
                    border-color: #fde047;
                    background: #fffbeb;
                    color: #92400e;
                }

                .priority-btn.priority-blue {
                    border-color: #bfdbfe;
                    background: #eff6ff;
                    color: #1e40af;
                }

                .priority-btn.active.priority-red {
                    background: #dc2626;
                    color: white;
                    border-color: #dc2626;
                }

                .priority-btn.active.priority-orange {
                    background: #ea580c;
                    color: white;
                    border-color: #ea580c;
                }

                .priority-btn.active.priority-yellow {
                    background: #eab308;
                    color: white;
                    border-color: #eab308;
                }

                .priority-btn.active.priority-blue {
                    background: #2563eb;
                    color: white;
                    border-color: #2563eb;
                }

                .priority-label {
                    font-size: 8px;
                    font-weight: 400;
                    display: block;
                    margin-top: 2px;
                }

                .budget-slider {
                    width: 100%;
                    height: 8px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    accent-color: #003D82;
                }

                .budget-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #64748b;
                }

                .budget-labels span {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .status-select {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 14px;
                    color: #1e293b;
                    background: white;
                    cursor: pointer;
                }

                .explore-main {
                    display: flex;
                    flex-direction: column;
                    background: #f8fafc;
                    overflow: hidden;
                }

                .search-bar {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 16px 32px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 16px;
                }

                .search-input-wrapper {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    min-width: 280px;
                    position: relative;
                }

                .search-input-wrapper .material-symbols-outlined {
                    position: absolute;
                    left: 12px;
                    color: #94a3b8;
                    font-size: 18px;
                }

                .search-input {
                    width: 100%;
                    padding: 8px 12px 8px 40px;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #1e293b;
                }

                .search-input::placeholder {
                    color: #94a3b8;
                }

                .sort-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    background: white;
                    color: #475569;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                }

                .sort-btn:hover {
                    background: #f1f5f9;
                }

                .scenario-info {
                    text-align: right;
                    margin-right: 8px;
                }

                .scenario-label {
                    font-size: 10px;
                    text-transform: uppercase;
                    font-weight: 700;
                    color: #94a3b8;
                    margin: 0;
                }

                .scenario-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                }

                .create-btn {
                    background: #FF6B35;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .create-btn:hover {
                    filter: brightness(1.1);
                }

                .explore-header {
                    background: white;
                    padding: 32px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .explore-header h2 {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 8px;
                    margin: 0;
                }

                .explore-header p {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }

                .view-toggle {
                    display: flex;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    overflow: hidden;
                    background: white;
                }

                .view-btn {
                    padding: 8px;
                    border: none;
                    background: white;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .view-btn.active {
                    background: #f1f5f9;
                    color: #1e293b;
                }

                .piste-container {
                    padding: 32px;
                    overflow-y: auto;
                    flex: 1;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 24px;
                }

                .no-results {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: #64748b;
                    font-size: 16px;
                }

                .piste-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 20px;
                    cursor: default;
                    transition: all 0.3s;
                    display: flex;
                    flex-direction: column;
                }

                .piste-container.list-mode {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .piste-container.list-mode .piste-card {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) auto;
                    align-items: center;
                    gap: 16px;
                }

                .piste-container.list-mode .card-header,
                .piste-container.list-mode .card-title,
                .piste-container.list-mode .card-description {
                    grid-column: 1 / 2;
                }

                .piste-container.list-mode .card-title {
                    margin-left: 2px;
                }

                .piste-container.list-mode .card-footer {
                    grid-column: 2 / 3;
                    border-top: none;
                    padding-top: 0;
                    margin-top: 0;
                    align-self: center;
                    min-width: 220px;
                }

                .piste-card:hover {
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    transform: translateY(-2px);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                }

                .card-badges {
                    display: flex;
                    gap: 8px;
                }

                .priority-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    background: #1e293b;
                    color: white;
                }

                .category-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                    color: #475569;
                }

                .star-btn {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                }

                .star-rate-btn {
                    background: none;
                    border: none;
                    color: #cbd5e1;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }

                .star-rate-btn .material-symbols-outlined {
                    font-size: 18px;
                }

                .star-rate-btn:hover,
                .star-rate-btn.active {
                    color: #f59e0b;
                }

                .card-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 8px;
                    line-height: 1.4;
                    margin: 0 0 8px;
                }

                .card-description {
                    font-size: 14px;
                    color: #64748b;
                    margin-bottom: 16px;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin: 0 0 16px;
                }

                .card-footer {
                    margin-top: auto;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .card-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .card-info {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #64748b;
                }

                .info-item .material-symbols-outlined {
                    font-size: 16px;
                }

                .info-item.budget {
                    font-size: 14px;
                    font-weight: 600;
                    color: #10b981;
                }

                .details-btn {
                    background: #f1f5f9;
                    color: #003D82;
                    border: 1px solid #e2e8f0;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .details-btn:hover {
                    background: #003D82;
                    color: white;
                }

                .edit-btn {
                    background: #fff7ed;
                    color: #c2410c;
                    border: 1px solid #fed7aa;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .edit-btn:hover {
                    background: #c2410c;
                    color: white;
                    border-color: #c2410c;
                }

                .pagination {
                    background: white;
                    padding: 24px 32px;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                }

                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }

                .pagination-prev, .pagination-next, .pagination-num {
                    padding: 8px 12px;
                    border: 1px solid #e2e8f0;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #475569;
                    transition: all 0.2s;
                }

                .pagination-prev:hover, .pagination-next:hover, .pagination-num:hover {
                    background: #f1f5f9;
                }

                .pagination-num.active {
                    background: #003D82;
                    color: white;
                    border-color: #003D82;
                }

                .pagination-dots {
                    color: #94a3b8;
                    margin: 0 4px;
                }

                @media (max-width: 1024px) {
                    .explore-wrapper {
                        grid-template-columns: 1fr;
                    }

                    .explore-sidebar {
                        display: none;
                    }

                    .piste-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 640px) {
                    .piste-container {
                        grid-template-columns: 1fr;
                    }

                    .search-bar {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .scenario-info {
                        text-align: left;
                        margin-right: 0;
                    }

                    .explore-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }
                }
            </style>
        `;
    }
};

// Exporter pour usage global
window.pages = window.pages || {};
window.pages.Explore = pages.Explore;
