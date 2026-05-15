﻿/**
 * PAGES/HOME.JS - Page d'accueil améliorée
 * Design moderne avec animations et données dynamiques
 */

const pages = window.pages || {};

pages.Home = {
    async render() {
        const state = appStore.getState();
        const pistes = state.allPistes || [];

        if (!pistes || pistes.length === 0) {
            return '<div class="loading-container"><div class="spinner"></div><p>Chargement des données...</p></div>';
        }

        // Calculer les métriques clés
        const totalBudget = pistes.reduce((sum, p) => sum + (p.budget?.cout_3_ans || 0), 0);
        const avgImpact = Math.round(pistes.reduce((sum, p) => sum + (p.impact_score || 0), 0) / pistes.length);
        const avgROI = Math.round(pistes.reduce((sum, p) => sum + (p.roi_mois || 0), 0) / pistes.length);
        const totalAccidents = pistes.reduce((sum, p) => sum + (p.impact_accidents_evites || 0), 0);
        
        // Compter par priorité
        const p1Count = pistes.filter(p => p.priorite === 'P1').length;
        const p2Count = pistes.filter(p => p.priorite === 'P2').length;
        const p3Count = pistes.filter(p => p.priorite === 'P3').length;
        const p4Count = pistes.filter(p => p.priorite === 'P4').length;

        // Récupérer les dernières pistes ajoutées
        const recentPistes = [...pistes].slice(0, 3);

        return `
            <div class="home-wrapper">
                <!-- Hero Section -->
                <section class="home-hero">
                    <div class="container">
                        <div class="hero-content">
                            <div class="hero-text animate-fade-in">
                                <div class="hero-badge">
                                    <span class="material-symbols-outlined">target</span>
                                    Objectif Zéro Accident 2028
                                </div>
                                <h1>
                                    Simulateur Sécurité
                                    <span class="text-gradient">CDG 2026</span>
                                </h1>
                                <p class="hero-subtitle">
                                    Plateforme d'aide à la décision pour optimiser la sécurité aéroportuaire
                                    et réduire les risques opérationnels.
                                </p>
                                <div class="hero-cta">
                                    <a href="/explorer" class="btn-primary">
                                        <span class="material-symbols-outlined">explore</span>
                                        Explorer les pistes
                                    </a>
                                    <a href="/simulateur" class="btn-secondary">
                                        <span class="material-symbols-outlined">play_arrow</span>
                                        Lancer une simulation
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Background decoration -->
                    <div class="hero-background">
                        <div class="gradient-orb orb-1"></div>
                        <div class="gradient-orb orb-2"></div>
                    </div>
                </section>

                <!-- Context Section -->
                <section class="context-section">
                    <div class="container">
                        <div class="section-header">
                            <h2>Contexte et enjeux</h2>
                            <p>Pourquoi agir maintenant ?</p>
                        </div>
                        
                        <div class="context-grid">
                            <div class="context-card animate-on-scroll">
                                <div class="context-icon warning">
                                    <span class="material-symbols-outlined">trending_up</span>
                                </div>
                                <h3>+100% Accidents corporels</h3>
                                <p>Hausse critique observée en 2024-2025 nécessitant une action immédiate.</p>
                            </div>
                            
                            <div class="context-card animate-on-scroll">
                                <div class="context-icon info">
                                    <span class="material-symbols-outlined">groups</span>
                                </div>
                                <h3>Renouvellement des effectifs</h3>
                                <p>Intégration massive de nouveaux profils à acculturer aux règles de sécurité.</p>
                            </div>
                            
                            <div class="context-card animate-on-scroll">
                                <div class="context-icon success">
                                    <span class="material-symbols-outlined">verified_user</span>
                                </div>
                                <h3>Complexité opérationnelle</h3>
                                <p>61 pistes à aligner sur une trajectoire commune pour maximiser l'impact.</p>
                            </div>
                            
                            <div class="context-card animate-on-scroll">
                                <div class="context-icon accent">
                                    <span class="material-symbols-outlined">payments</span>
                                </div>
                                <h3>Optimisation budgétaire</h3>
                                <p>Nécessité de prioriser les investissements à fort retour sur investissement.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- KPIs Section -->
                <section class="kpi-section">
                    <div class="container">
                        <div class="kpi-grid">
                            <div class="kpi-card animate-scale">
                                <div class="kpi-icon">
                                    <span class="material-symbols-outlined">analytics</span>
                                </div>
                                <div class="kpi-content">
                                    <span class="kpi-label">Impact moyen</span>
                                    <span class="kpi-value">${avgImpact}/100</span>
                                    <span class="kpi-trend positive">+${Math.round(avgImpact * 0.15)} vs 2025</span>
                                </div>
                            </div>
                            
                            <div class="kpi-card animate-scale">
                                <div class="kpi-icon">
                                    <span class="material-symbols-outlined">schedule</span>
                                </div>
                                <div class="kpi-content">
                                    <span class="kpi-label">ROI moyen</span>
                                    <span class="kpi-value">${avgROI} mois</span>
                                    <span class="kpi-trend positive">-${Math.round(avgROI * 0.1)} mois</span>
                                </div>
                            </div>
                            
                            <div class="kpi-card animate-scale">
                                <div class="kpi-icon">
                                    <span class="material-symbols-outlined">trending_down</span>
                                </div>
                                <div class="kpi-content">
                                    <span class="kpi-label">Accidents évités</span>
                                    <span class="kpi-value">${totalAccidents}/an</span>
                                    <span class="kpi-trend positive">+${Math.round(totalAccidents * 0.2)} vs cible</span>
                                </div>
                            </div>
                            
                            <div class="kpi-card animate-scale">
                                <div class="kpi-icon">
                                    <span class="material-symbols-outlined">savings</span>
                                </div>
                                <div class="kpi-content">
                                    <span class="kpi-label">Économies estimées</span>
                                    <span class="kpi-value">${(totalBudget * 1.2 / 1000000).toFixed(1)}M€</span>
                                    <span class="kpi-trend positive">ROI global</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Recent Tracks Section -->
                <section class="recent-section">
                    <div class="container">
                        <div class="section-header">
                            <h2>Pistes récentes</h2>
                            <p>Les dernières pistes d'amélioration ajoutées</p>
                        </div>
                        
                        <div class="recent-grid">
                            ${recentPistes.map(piste => `
                                <div class="track-card animate-on-scroll" onclick="pages.Home.goToDetail('${piste.numero}')">
                                    <div class="track-header">
                                        <span class="track-id">${piste.numero}</span>
                                        <span class="priority-badge priority-${this.getPriorityClass(piste.priorite)}">
                                            ${piste.priorite}
                                        </span>
                                    </div>
                                    <h3 class="track-title">${piste.titre}</h3>
                                    <p class="track-description">${piste.description || 'Aucune description'}</p>
                                    <div class="track-footer">
                                        <div class="track-meta">
                                            <span class="meta-item">
                                                <span class="material-symbols-outlined">payments</span>
                                                ${this.formatCurrency(piste.budget?.cout_3_ans || 0)}
                                            </span>
                                            <span class="meta-item">
                                                <span class="material-symbols-outlined">analytics</span>
                                                ${piste.impact_score || 0}/100
                                            </span>
                                        </div>
                                        <button class="btn-view">
                                            <span class="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="section-action">
                            <a href="/explorer" class="btn-outline">
                                Voir toutes les pistes
                                <span class="material-symbols-outlined">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="features-section">
                    <div class="container">
                        <div class="section-header">
                            <h2>Fonctionnalités</h2>
                            <p>Explorez tous les outils à votre disposition</p>
                        </div>
                        
                        <div class="features-grid">
                            <div class="feature-card animate-on-scroll">
                                <div class="feature-icon explore">
                                    <span class="material-symbols-outlined">explore</span>
                                </div>
                                <h3>Explorer</h3>
                                <p>Consultez l'inventaire des 61 pistes d'amélioration avec filtres avancés et système de notation.</p>
                                <div class="feature-stats">
                                    <span>${pistes.length} pistes</span>
                                    <span>${pistes.filter(p => p.categorie === 'Technique').length} techniques</span>
                                </div>
                                <a href="/explorer" class="feature-link">
                                    Parcourir
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                            
                            <div class="feature-card animate-on-scroll">
                                <div class="feature-icon simulate">
                                    <span class="material-symbols-outlined">auto_awesome</span>
                                </div>
                                <h3>Simuler</h3>
                                <p>Testez vos scénarios d'investissement avec contraintes budgétaires, dimensionnelles et temporelles.</p>
                                <div class="feature-stats">
                                    <span>Optimisation multi-critères</span>
                                    <span>Front de Pareto</span>
                                </div>
                                <a href="/simulateur" class="feature-link">
                                    Lancer
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                            
                            <div class="feature-card animate-on-scroll">
                                <div class="feature-icon compare">
                                    <span class="material-symbols-outlined">compare_arrows</span>
                                </div>
                                <h3>Comparer</h3>
                                <p>Analysez côte à côte plusieurs stratégies d'investissement avec visualisation radar.</p>
                                <div class="feature-stats">
                                    <span>Comparaison multi-scénarios</span>
                                    <span>Graphiques interactifs</span>
                                </div>
                                <a href="/compare" class="feature-link">
                                    Comparer
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                            
                            <div class="feature-card animate-on-scroll">
                                <div class="feature-icon decide">
                                    <span class="material-symbols-outlined">check_circle</span>
                                </div>
                                <h3>Décider</h3>
                                <p>Validez et exportez votre plan d'action en PDF, JSON ou Excel pour présentation.</p>
                                <div class="feature-stats">
                                    <span>Exports professionnels</span>
                                    <span>Prêt pour validation</span>
                                </div>
                                <a href="/decide" class="feature-link">
                                    Exporter
                                    <span class="material-symbols-outlined">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2>Prêt à optimiser votre stratégie de sécurité ?</h2>
                            <p>Commencez dès maintenant à explorer les pistes d'amélioration et à simuler vos scénarios.</p>
                            <div class="cta-buttons">
                                <a href="/explorer" class="btn-primary btn-large">
                                    <span class="material-symbols-outlined">explore</span>
                                    Explorer les pistes
                                </a>
                                <a href="/simulateur" class="btn-secondary btn-large">
                                    <span class="material-symbols-outlined">play_arrow</span>
                                    Lancer une simulation
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            ${this.getStyles()}
        `;
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

    goToDetail(pisteId) {
        if (window.router) {
            window.router.navigate(`/piste-detail/${pisteId}`);
        }
    },

    getStyles() {
        return `
            <style>
                /* Variables */
                :root {
                    --cdg-navy: #003D82;
                    --cdg-orange: #FF6B35;
                    --gray-50: #f8fafc;
                    --gray-100: #f1f5f9;
                    --gray-200: #e2e8f0;
                    --gray-300: #cbd5e1;
                    --gray-400: #94a3b8;
                    --gray-500: #64748b;
                    --gray-600: #475569;
                    --gray-700: #334155;
                    --gray-800: #1e293b;
                    --gray-900: #0f172a;
                    --success: #10b981;
                    --warning: #f59e0b;
                    --danger: #ef4444;
                    --info: #3b82f6;
                }

                /* Container */
                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 32px;
                }

                /* Hero Section */
                .home-hero {
                    position: relative;
                    min-height: 600px;
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .hero-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow: hidden;
                }

                .gradient-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                }

                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: #FF6B35;
                    top: -200px;
                    right: -200px;
                }

                .orb-2 {
                    width: 400px;
                    height: 400px;
                    background: #00a3ff;
                    bottom: -100px;
                    left: -100px;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 800px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 107, 53, 0.2);
                    border: 1px solid rgba(255, 107, 53, 0.3);
                    padding: 8px 16px;
                    border-radius: 999px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 32px;
                    backdrop-filter: blur(10px);
                }

                .hero-badge .material-symbols-outlined {
                    font-size: 18px;
                    color: #FF6B35;
                }

                .hero-text h1 {
                    font-size: 64px;
                    font-weight: 800;
                    line-height: 1.1;
                    margin: 0 0 24px 0;
                }

                .text-gradient {
                    background: linear-gradient(135deg, #FF6B35, #FFA07A);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    font-size: 18px;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 40px;
                    max-width: 600px;
                }

                .hero-cta {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }

                .btn-primary, .btn-secondary, .btn-outline {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    border: none;
                }

                .btn-primary {
                    background: #FF6B35;
                    color: white;
                }

                .btn-primary:hover {
                    background: #e55a2b;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(255, 107, 53, 0.3);
                }

                .btn-secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .btn-outline {
                    background: transparent;
                    color: #003D82;
                    border: 2px solid #003D82;
                }

                .btn-outline:hover {
                    background: #003D82;
                    color: white;
                }

                .btn-large {
                    padding: 16px 32px;
                    font-size: 16px;
                }

                .hero-stats {
                    margin-top: 48px;
                }

                .stats-card {
                    display: inline-flex;
                    align-items: center;
                    gap: 32px;
                    padding: 24px 32px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    backdrop-filter: blur(10px);
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 32px;
                    font-weight: 700;
                    color: white;
                }

                .stat-label {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.7);
                }

                .stat-divider {
                    width: 1px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                }

                .priority-chips {
                    display: flex;
                    gap: 12px;
                    margin-top: 16px;
                }

                .priority-chip {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 999px;
                    font-size: 13px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .priority-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .priority-p1 .priority-dot { background: #ef4444; }
                .priority-p2 .priority-dot { background: #f97316; }
                .priority-p3 .priority-dot { background: #eab308; }
                .priority-p4 .priority-dot { background: #3b82f6; }

                /* Sections communes */
                .section-header {
                    text-align: center;
                    margin-bottom: 48px;
                }

                .section-header h2 {
                    font-size: 36px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 12px 0;
                }

                .section-header p {
                    font-size: 18px;
                    color: #64748b;
                    margin: 0;
                }

                /* Context Section */
                .context-section {
                    padding: 80px 0;
                    background: white;
                }

                .context-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .context-card {
                    padding: 32px;
                    background: #f8fafc;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }

                .context-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                }

                .context-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .context-icon .material-symbols-outlined {
                    font-size: 28px;
                }

                .context-icon.warning {
                    background: #fef3c7;
                    color: #d97706;
                }

                .context-icon.info {
                    background: #dbeafe;
                    color: #2563eb;
                }

                .context-icon.success {
                    background: #d1fae5;
                    color: #059669;
                }

                .context-icon.accent {
                    background: #f1f5f9;
                    color: #475569;
                }

                .context-card h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 12px 0;
                }

                .context-card p {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0;
                }

                /* KPI Section */
                .kpi-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }

                .kpi-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .kpi-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 24px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .kpi-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
                }

                .kpi-icon {
                    width: 56px;
                    height: 56px;
                    background: #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FF6B35;
                }

                .kpi-icon .material-symbols-outlined {
                    font-size: 28px;
                }

                .kpi-content {
                    flex: 1;
                }

                .kpi-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    display: block;
                    margin-bottom: 4px;
                }

                .kpi-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1e293b;
                    display: block;
                    margin-bottom: 4px;
                }

                .kpi-trend {
                    font-size: 12px;
                    display: inline-flex;
                    align-items: center;
                    padding: 2px 8px;
                    border-radius: 999px;
                }

                .kpi-trend.positive {
                    background: #d1fae5;
                    color: #059669;
                }

                .kpi-trend.negative {
                    background: #fee2e2;
                    color: #dc2626;
                }

                /* Recent Tracks Section */
                .recent-section {
                    padding: 80px 0;
                    background: white;
                }

                .recent-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 40px;
                }

                .track-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .track-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                    border-color: #FF6B35;
                }

                .track-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .track-id {
                    font-family: monospace;
                    font-size: 14px;
                    font-weight: 600;
                    color: #FF6B35;
                }

                .priority-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .priority-badge.priority-critical { background: #fee2e2; color: #dc2626; }
                .priority-badge.priority-high { background: #ffedd5; color: #ea580c; }
                .priority-badge.priority-medium { background: #fef9c3; color: #a16207; }
                .priority-badge.priority-low { background: #dbeafe; color: #2563eb; }

                .track-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 12px 0;
                }

                .track-description {
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0 0 16px 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .track-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .track-meta {
                    display: flex;
                    gap: 16px;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    color: #64748b;
                }

                .meta-item .material-symbols-outlined {
                    font-size: 14px;
                }

                .btn-view {
                    width: 36px;
                    height: 36px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    background: transparent;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .btn-view:hover {
                    background: #FF6B35;
                    border-color: #FF6B35;
                    color: white;
                }

                .section-action {
                    text-align: center;
                }

                /* Features Section */
                .features-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .feature-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                }

                .feature-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .feature-icon .material-symbols-outlined {
                    font-size: 32px;
                }

                .feature-icon.explore {
                    background: #dbeafe;
                    color: #2563eb;
                }

                .feature-icon.simulate {
                    background: #d1fae5;
                    color: #059669;
                }

                .feature-icon.compare {
                    background: #fef3c7;
                    color: #d97706;
                }

                .feature-icon.decide {
                    background: #fee2e2;
                    color: #dc2626;
                }

                .feature-card h3 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 12px 0;
                }

                .feature-card p {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0 0 16px 0;
                }

                .feature-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 12px 0;
                    margin-bottom: 16px;
                    border-top: 1px solid #f1f5f9;
                    border-bottom: 1px solid #f1f5f9;
                    font-size: 12px;
                    color: #475569;
                }

                .feature-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    color: #FF6B35;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                }

                .feature-link:hover {
                    gap: 8px;
                }

                /* CTA Section */
                .cta-section {
                    padding: 80px 0;
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    color: white;
                    text-align: center;
                }

                .cta-content h2 {
                    font-size: 36px;
                    font-weight: 700;
                    margin: 0 0 16px 0;
                }

                .cta-content p {
                    font-size: 18px;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 32px;
                }

                .cta-buttons {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                /* Loading */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f1f5f9;
                    border-top: 4px solid #FF6B35;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 16px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Animations */
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }

                .animate-slide-up {
                    animation: slideUp 0.8s ease-out;
                }

                .animate-scale {
                    animation: scale 0.6s ease-out;
                }

                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scale {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .context-grid,
                    .kpi-grid,
                    .recent-grid,
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .hero-text h1 {
                        font-size: 48px;
                    }

                    .stats-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }

                    .stat-divider {
                        display: none;
                    }

                    .priority-chips {
                        flex-wrap: wrap;
                    }

                    .context-grid,
                    .kpi-grid,
                    .recent-grid,
                    .features-grid {
                        grid-template-columns: 1fr;
                    }

                    .kpi-card {
                        flex-direction: column;
                        text-align: center;
                    }

                    .hero-cta,
                    .cta-buttons {
                        flex-direction: column;
                    }

                    .btn-primary,
                    .btn-secondary,
                    .btn-outline {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .hero-text h1 {
                        font-size: 36px;
                    }

                    .section-header h2 {
                        font-size: 28px;
                    }

                    .container {
                        padding: 0 16px;
                    }
                }
            </style>
        `;
    }
};

window.pages = pages;