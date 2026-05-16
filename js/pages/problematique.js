/**
 * PAGES/PROBLEMATIQUE.JS - Page présentant le contexte et les enjeux du projet
 * Inspirée du document "Fiche projet IENAC24 ARPEX - CSEA - Sécurité en piste"
 */

pages.Problematique = {
    async render() {
        const state = appStore ? appStore.getState() : {};
        const pistes = state.allPistes || [];

        return `
            <div class="problematique-wrapper">
                <!-- En-tête avec titre et contexte -->
                <header class="problematique-header">
                    <div class="header-content">
                        <div class="header-left">
                            <h1>
                                <span class="material-symbols-outlined">warning</span>
                                Sécurité en piste
                            </h1>
                            <p class="header-subtitle">Réduire les accidents d'engins de piste de groundhandling en zone réservée</p>
                        </div>
                        <div class="header-badge">
                            <span class="badge-urgence">URGENCE SÉCURITAIRE</span>
                        </div>
                    </div>
                </header>

                <!-- Navigation par onglets -->
                <div class="problematique-tabs">
                    <button class="tab-btn active" onclick="pages.Problematique.switchTab('contexte')">
                        <span class="material-symbols-outlined">info</span>
                        Contexte
                    </button>
                    <button class="tab-btn" onclick="pages.Problematique.switchTab('chiffres')">
                        <span class="material-symbols-outlined">analytics</span>
                        Chiffres clés
                    </button>
                    <button class="tab-btn" onclick="pages.Problematique.switchTab('causes')">
                        <span class="material-symbols-outlined">search</span>
                        Causes
                    </button>
                    <button class="tab-btn" onclick="pages.Problematique.switchTab('objectifs')">
                        <span class="material-symbols-outlined">track_changes</span>
                        Objectifs
                    </button>
                    <button class="tab-btn" onclick="pages.Problematique.switchTab('methodologie')">
                        <span class="material-symbols-outlined">science</span>
                        Méthodologie
                    </button>
                </div>

                <!-- Contenu principal -->
                <main class="problematique-main">
                    <!-- Section Contexte -->
                    <section class="problematique-section active" id="section-contexte">
                        <div class="contexte-container">
                            <div class="contexte-texte">
                                <h2>Contexte et enjeux</h2>
                                
                                <div class="citation-block">
                                    <p class="citation-texte">
                                        "Malgré les actions de prévention des entreprises de groundhandling, 
                                        leurs efforts concertés et les actions collectives, le nombre d'accidents 
                                        en piste n'a pas décru à CDG depuis la reprise d'activité post-COVID."
                                    </p>
                                    <p class="citation-source">— CSCA, Analyse sécurité 2025</p>
                                </div>

                                <p class="contexte-paragraphe">
                                    Nos actions de formation et de contrôle de formation, nos actions collectives 
                                    de prévention n'ont jamais été aussi intenses et partagées entre les acteurs 
                                    aéroportuaires. Et pourtant le constat à CDG est formel : <strong>la sinistralité 
                                    n'a pas diminué</strong>.
                                </p>

                                <div class="alerte-box">
                                    <span class="material-symbols-outlined">emergency</span>
                                    <div>
                                        <h4>Situation critique</h4>
                                        <p>+100% d'accidents corporels entre 2023 et 2025 sur la plateforme CDG</p>
                                    </div>
                                </div>

                                <p class="contexte-paragraphe">
                                    Nous pensons qu'une approche avec de nouveaux yeux pourrait apporter des idées 
                                    de nouvelles méthodes de prévention et de communication.
                                </p>
                            </div>

                            <div class="contexte-visuel">
                                <div class="stats-mini-card">
                                    <div class="stats-mini-header">
                                        <span class="material-symbols-outlined">flight_takeoff</span>
                                        <h3>Trafic CDG 2025</h3>
                                    </div>
                                    <div class="stats-mini-content">
                                        <div class="stat-mini-item">
                                            <span class="stat-mini-value">450 000</span>
                                            <span class="stat-mini-label">Mouvements</span>
                                        </div>
                                        <div class="stat-mini-item">
                                            <span class="stat-mini-value">65M</span>
                                            <span class="stat-mini-label">Passagers</span>
                                        </div>
                                        <div class="stat-mini-item">
                                            <span class="stat-mini-value">15 000</span>
                                            <span class="stat-mini-label">Employés piste</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="contexte-image-placeholder">
                                    <span class="material-symbols-outlined">airport_shuttle</span>
                                    <p>Engins de piste en zone réservée</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section Chiffres clés -->
                    <section class="problematique-section" id="section-chiffres">
                        <h2>Chiffres clés de l'accidentologie</h2>
                        
                        <div class="chiffres-grid">
                            <div class="chiffre-card">
                                <div class="chiffre-icon">
                                    <span class="material-symbols-outlined">trending_up</span>
                                </div>
                                <div class="chiffre-content">
                                    <span class="chiffre-valeur">+100%</span>
                                    <span class="chiffre-label">Accidents corporels (2024-2025)</span>
                                </div>
                            </div>

                            <div class="chiffre-card">
                                <div class="chiffre-icon">
                                    <span class="material-symbols-outlined">warning</span>
                                </div>
                                <div class="chiffre-content">
                                    <span class="chiffre-valeur">41</span>
                                    <span class="chiffre-label">Accidents matériels / an</span>
                                </div>
                            </div>

                            <div class="chiffre-card">
                                <div class="chiffre-icon">
                                    <span class="material-symbols-outlined">personal_injury</span>
                                </div>
                                <div class="chiffre-content">
                                    <span class="chiffre-valeur">20</span>
                                    <span class="chiffre-label">Accidents corporels / an</span>
                                </div>
                            </div>

                            <div class="chiffre-card">
                                <div class="chiffre-icon">
                                    <span class="material-symbols-outlined">schedule</span>
                                </div>
                                <div class="chiffre-content">
                                    <span class="chiffre-valeur">30</span>
                                    <span class="chiffre-label">Retards vols / an</span>
                                </div>
                            </div>
                        </div>

                        <div class="comparaison-aeroports">
                            <h3>Comparaison avec d'autres aéroports</h3>
                            <div class="table-container">
                                <table class="comparaison-table">
                                    <thead>
                                        <tr>
                                            <th>Aéroport</th>
                                            <th>Trafic (Mvts)</th>
                                            <th>Accidents/10k mvts</th>
                                            <th>Tendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>CDG</strong></td>
                                            <td>450 000</td>
                                            <td class="valeur-elevee">2.4</td>
                                            <td><span class="tendance hausse">📈 +18%</span></td>
                                        </tr>
                                        <tr>
                                            <td>FRA (Francfort)</td>
                                            <td>430 000</td>
                                            <td class="valeur-moyenne">1.8</td>
                                            <td><span class="tendance stable">➡️ stable</span></td>
                                        </tr>
                                        <tr>
                                            <td>LHR (Londres)</td>
                                            <td>470 000</td>
                                            <td class="valeur-faible">1.2</td>
                                            <td><span class="tendance baisse">📉 -5%</span></td>
                                        </tr>
                                        <tr>
                                            <td>AMS (Amsterdam)</td>
                                            <td>440 000</td>
                                            <td class="valeur-faible">1.3</td>
                                            <td><span class="tendance baisse">📉 -3%</span></td>
                                        </tr>
                                        <tr>
                                            <td>MXP (Milan)</td>
                                            <td>220 000</td>
                                            <td class="valeur-moyenne">1.9</td>
                                            <td><span class="tendance hausse">📈 +7%</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p class="table-note">Source: Données consolidées 2024-2025, groupes de travail CSCA</p>
                        </div>

                        <div class="evolution-graph">
                            <h3>Évolution des accidents à CDG</h3>
                            <div class="graph-placeholder">
                                <!-- Ici un vrai graphique serait intégré avec Chart.js -->
                                <div class="bar-chart">
                                    <div class="bar-container">
                                        <div class="bar-label">2022</div>
                                        <div class="bar" style="height: 60px; background: #94a3b8;"></div>
                                        <div class="bar-value">30</div>
                                    </div>
                                    <div class="bar-container">
                                        <div class="bar-label">2023</div>
                                        <div class="bar" style="height: 70px; background: #94a3b8;"></div>
                                        <div class="bar-value">35</div>
                                    </div>
                                    <div class="bar-container">
                                        <div class="bar-label">2024</div>
                                        <div class="bar" style="height: 100px; background: #FF6B35;"></div>
                                        <div class="bar-value">50</div>
                                    </div>
                                    <div class="bar-container">
                                        <div class="bar-label">2025</div>
                                        <div class="bar" style="height: 120px; background: #FF6B35;"></div>
                                        <div class="bar-value">61</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section Causes -->
                    <section class="problematique-section" id="section-causes">
                        <h2>Analyse des causes</h2>
                        
                        <div class="causes-grid">
                            <div class="cause-card">
                                <div class="cause-icon">
                                    <span class="material-symbols-outlined">groups</span>
                                </div>
                                <h3>Renouvellement générationnel</h3>
                                <p>Départ des effectifs expérimentés post-COVID, arrivée massive de nouvelles recrues</p>
                                <div class="cause-stat">
                                    <span class="stat-chiffre">+40%</span>
                                    <span class="stat-label">d'embauches en 2024</span>
                                </div>
                            </div>

                            <div class="cause-card">
                                <div class="cause-icon">
                                    <span class="material-symbols-outlined">smartphone</span>
                                </div>
                                <h3>Nouveaux comportements</h3>
                                <p>Téléphone au volant, consommation d'alcool et stupéfiants, excès de vitesse</p>
                                <div class="cause-stat">
                                    <span class="stat-chiffre">67%</span>
                                    <span class="stat-label">des incidents liés à l'attention</span>
                                </div>
                            </div>

                            <div class="cause-card">
                                <div class="cause-icon">
                                    <span class="material-symbols-outlined">speed</span>
                                </div>
                                <h3>Pressions opérationnelles</h3>
                                <p>Pics d'activité, formation accélérée, rotation rapide des personnels</p>
                                <div class="cause-stat">
                                    <span class="stat-chiffre">-30%</span>
                                    <span class="stat-label">temps de formation</span>
                                </div>
                            </div>

                            <div class="cause-card">
                                <div class="cause-icon">
                                    <span class="material-symbols-outlined">psychology</span>
                                </div>
                                <h3>Facteurs sociétaux</h3>
                                <p>Individualisme, laxisme, banalisation du risque, perte de discipline collective</p>
                                <div class="cause-stat">
                                    <span class="stat-chiffre">52%</span>
                                    <span class="stat-label">des jeunes conducteurs</span>
                                </div>
                            </div>
                        </div>

                        <div class="citation-box">
                            <p class="citation">
                                "On pourrait penser que le renouvellement générationnel pourrait apporter des comportements 
                                moins respectueux des règles de conduite. Certains constats amènent à penser que le phénomène 
                                n'est pas dû à l'âge ni au manque d'expérience."
                            </p>
                        </div>
                    </section>

                    <!-- Section Objectifs -->
                    <section class="problematique-section" id="section-objectifs">
                        <h2>Objectifs du projet</h2>
                        
                        <div class="objectifs-liste">
                            <div class="objectif-item">
                                <div class="objectif-number">1</div>
                                <div class="objectif-content">
                                    <h3>Analyse comparative internationale</h3>
                                    <p>Étudier l'accidentologie sur plusieurs aéroports français et étrangers : FRA, LHR, MXP, NCE, MRS, TLS...</p>
                                    <div class="objectif-tags">
                                        <span class="tag">Benchmark</span>
                                        <span class="tag">Aéroports</span>
                                    </div>
                                </div>
                            </div>

                            <div class="objectif-item">
                                <div class="objectif-number">2</div>
                                <div class="objectif-content">
                                    <h3>Élargissement sectoriel</h3>
                                    <p>Analyser les actions menées dans d'autres industries : BTP, transports urbains, prévention routière, FedEx...</p>
                                    <div class="objectif-tags">
                                        <span class="tag">Industrie</span>
                                        <span class="tag">Transport</span>
                                    </div>
                                </div>
                            </div>

                            <div class="objectif-item">
                                <div class="objectif-number">3</div>
                                <div class="objectif-content">
                                    <h3>Critique constructive</h3>
                                    <p>Évaluer les actions actuelles sur les aéroports français et proposer des améliorations</p>
                                    <div class="objectif-tags">
                                        <span class="tag">Audit</span>
                                        <span class="tag">Optimisation</span>
                                    </div>
                                </div>
                            </div>

                            <div class="objectif-item">
                                <div class="objectif-number">4</div>
                                <div class="objectif-content">
                                    <h3>Brainstorming innovant</h3>
                                    <p>Proposer des actions structurées, basées sur des données chiffrées, avec indicateurs précis</p>
                                    <div class="objectif-tags">
                                        <span class="tag">Innovation</span>
                                        <span class="tag">Indicateurs</span>
                                    </div>
                                </div>
                            </div>

                            <div class="objectif-item">
                                <div class="objectif-number">5</div>
                                <div class="objectif-content">
                                    <h3>Lien avec écoles de communication</h3>
                                    <p>Préparer des actions d'information et de communication avec des étudiants en communication</p>
                                    <div class="objectif-tags">
                                        <span class="tag">Communication</span>
                                        <span class="tag">Pédagogie</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="objectif-final">
                            <h3>Objectif final</h3>
                            <div class="final-badge">
                                <span class="material-symbols-outlined">flag</span>
                                <span>ZÉRO ACCIDENT CORPOREL D'ICI 2028</span>
                            </div>
                        </div>
                    </section>

                    <!-- Section Méthodologie -->
                    <section class="problematique-section" id="section-methodologie">
                        <h2>Méthodologie proposée</h2>
                        
                        <div class="methodologie-timeline">
                            <div class="timeline-item">
                                <div class="timeline-marker">1</div>
                                <div class="timeline-content">
                                    <h3>Phase 1 : Analyse documentaire</h3>
                                    <p>Étude des programmes de formation sécurité en piste et des actions collectives CSCE/CSCA</p>
                                    <ul>
                                        <li>Programmes de formation existants</li>
                                        <li>Rapports d'incidents</li>
                                        <li>Actions de prévention en cours</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker">2</div>
                                <div class="timeline-content">
                                    <h3>Phase 2 : Collecte de données</h3>
                                    <p>Analyse des accidents en piste sur plusieurs aéroports</p>
                                    <ul>
                                        <li>Données CDG, ORY (France)</li>
                                        <li>Données européennes : FRA, LHR, AMS, MXP</li>
                                        <li>Comparaison des ratios accident/trafic</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker">3</div>
                                <div class="timeline-content">
                                    <h3>Phase 3 : Benchmark intersectoriel</h3>
                                    <p>Enquête sur les actions dans d'autres domaines</p>
                                    <ul>
                                        <li>Prévention routière</li>
                                        <li>BTP et chantiers</li>
                                        <li>Réseaux de bus urbains</li>
                                        <li>Transport routier et logistique</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker">4</div>
                                <div class="timeline-content">
                                    <h3>Phase 4 : Analyse sociologique</h3>
                                    <p>Étude des facteurs humains et sociétaux</p>
                                    <ul>
                                        <li>Impact du renouvellement générationnel</li>
                                        <li>Évolution des comportements sociétaux</li>
                                        <li>Motivation et engagement des personnels</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker">5</div>
                                <div class="timeline-content">
                                    <h3>Phase 5 : Proposition d'actions</h3>
                                    <p>Recommandations structurées avec indicateurs</p>
                                    <ul>
                                        <li>Actions de formation innovantes</li>
                                        <li>Campagnes de communication ciblées</li>
                                        <li>Indicateurs de suivi d'impact</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="livrables-box">
                            <h3>Livrables attendus</h3>
                            <div class="livrables-grid">
                                <div class="livrable-item">
                                    <span class="material-symbols-outlined">assessment</span>
                                    <span>Analyse comparative</span>
                                </div>
                                <div class="livrable-item">
                                    <span class="material-symbols-outlined">lightbulb</span>
                                    <span>Brainstorming d'idées innovantes</span>
                                </div>
                                <div class="livrable-item">
                                    <span class="material-symbols-outlined">bar_chart</span>
                                    <span>Indicateurs précis d'amélioration</span>
                                </div>
                                <div class="livrable-item">
                                    <span class="material-symbols-outlined">campaign</span>
                                    <span>Plan de communication</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <!-- Footer avec contacts -->
                <footer class="problematique-footer">
                    <div class="footer-content">
                        <div class="footer-contacts">
                            <h4>Contacts projet</h4>
                            <div class="contacts-grid">
                                <div class="contact">
                                    <span class="contact-name">Michel RAGOT</span>
                                    <a href="mailto:michelragot5@gmail.com">michelragot5@gmail.com</a>
                                    <span>xx xx xx xx xx</span>
                                </div>
                                <div class="contact">
                                    <span class="contact-name">Claude DEORESTIS</span>
                                    <a href="mailto:claude.deorestis@outlook.fr">claude.deorestis@outlook.fr</a>
                                    <span>xx xx xx xx xx</span>
                                </div>
                                <div class="contact">
                                    <span class="contact-name">Chama EL KHEMSANI </span>
                                    <a href="mailto:chama.elkhemsani@gmail.com">chama.elkhemsani@gmail.com</a>
                                    <span>xx xx xx xx xx</span>
                                </div>
                            </div>
                        </div>
                        <div class="footer-logos">
                            <div class="logo-placeholder">CSAE</div>
                            <div class="logo-placeholder">ENAC</div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>Projet IENAC Mineure exploitation aéroportuaire - 2026</p>
                    </div>
                </footer>
            </div>

            ${this.getStyles()}
        `;
    },

    switchTab(tabId) {
        // Masquer toutes les sections
        document.querySelectorAll('.problematique-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Désactiver tous les onglets
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activer la section correspondante
        const section = document.getElementById(`section-${tabId}`);
        if (section) section.classList.add('active');
        
        // Activer l'onglet cliqué
        event.target.classList.add('active');
    },

    getStyles() {
        return `
            <style>
                .problematique-wrapper {
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: 'Public Sans', sans-serif;
                }

                /* Header */
                .problematique-header {
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    color: white;
                    padding: 48px 32px;
                }

                .header-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                }

                .header-left h1 {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-size: 36px;
                    font-weight: 700;
                    margin: 0 0 12px 0;
                }

                .header-left h1 .material-symbols-outlined {
                    font-size: 48px;
                    color: #FF6B35;
                }

                .header-subtitle {
                    font-size: 18px;
                    color: rgba(255,255,255,0.9);
                    margin: 0;
                }

                .badge-urgence {
                    background: #FF6B35;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: 0.05em;
                }

                /* Tabs */
                .problematique-tabs {
                    display: flex;
                    gap: 4px;
                    padding: 0 32px;
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .tab-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 24px;
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

                /* Main content */
                .problematique-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 48px 32px;
                }

                .problematique-section {
                    display: none;
                }

                .problematique-section.active {
                    display: block;
                }

                h2 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #003D82;
                    margin: 0 0 32px 0;
                }

                h3 {
                    font-size: 20px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0 0 16px 0;
                }

                /* Section Contexte */
                .contexte-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                }

                .citation-block {
                    background: #f1f5f9;
                    border-left: 4px solid #FF6B35;
                    padding: 24px;
                    border-radius: 8px;
                    margin: 32px 0;
                }

                .citation-texte {
                    font-size: 18px;
                    font-style: italic;
                    color: #1e293b;
                    line-height: 1.6;
                    margin: 0 0 12px 0;
                }

                .citation-source {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }

                .contexte-paragraphe {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #334155;
                    margin-bottom: 24px;
                }

                .alerte-box {
                    background: #fee2e2;
                    border: 1px solid #fecaca;
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 32px 0;
                }

                .alerte-box .material-symbols-outlined {
                    font-size: 32px;
                    color: #dc2626;
                }

                .alerte-box h4 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #b91c1c;
                    margin: 0 0 4px 0;
                }

                .alerte-box p {
                    font-size: 14px;
                    color: #7f1d1d;
                    margin: 0;
                }

                .stats-mini-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 24px;
                    margin-bottom: 24px;
                }

                .stats-mini-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .stats-mini-header h3 {
                    margin: 0;
                }

                .stats-mini-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 16px;
                }

                .stat-mini-item {
                    text-align: center;
                }

                .stat-mini-value {
                    display: block;
                    font-size: 20px;
                    font-weight: 700;
                    color: #FF6B35;
                }

                .stat-mini-label {
                    font-size: 12px;
                    color: #64748b;
                }

                .contexte-image-placeholder {
                    background: #f1f5f9;
                    border-radius: 16px;
                    padding: 48px 24px;
                    text-align: center;
                    border: 2px dashed #cbd5e1;
                }

                .contexte-image-placeholder .material-symbols-outlined {
                    font-size: 64px;
                    color: #94a3b8;
                }

                .contexte-image-placeholder p {
                    color: #64748b;
                    margin: 16px 0 0;
                }

                /* Section Chiffres */
                .chiffres-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .chiffre-card {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .chiffre-icon {
                    width: 56px;
                    height: 56px;
                    background: #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FF6B35;
                }

                .chiffre-icon .material-symbols-outlined {
                    font-size: 28px;
                }

                .chiffre-content {
                    flex: 1;
                }

                .chiffre-valeur {
                    display: block;
                    font-size: 28px;
                    font-weight: 700;
                    color: #003D82;
                }

                .chiffre-label {
                    font-size: 12px;
                    color: #64748b;
                }

                .comparaison-aeroports {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    margin-bottom: 48px;
                }

                .table-container {
                    overflow-x: auto;
                }

                .comparaison-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .comparaison-table th {
                    background: #f8fafc;
                    padding: 16px;
                    text-align: left;
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                }

                .comparaison-table td {
                    padding: 16px;
                    border-bottom: 1px solid #f1f5f9;
                }

                .valeur-elevee {
                    color: #dc2626;
                    font-weight: 600;
                }

                .valeur-moyenne {
                    color: #f97316;
                    font-weight: 600;
                }

                .valeur-faible {
                    color: #10b981;
                    font-weight: 600;
                }

                .tendance {
                    font-size: 13px;
                }

                .tendance.hausse { color: #dc2626; }
                .tendance.stable { color: #64748b; }
                .tendance.baisse { color: #10b981; }

                .table-note {
                    font-size: 12px;
                    color: #94a3b8;
                    margin: 16px 0 0;
                }

                .evolution-graph {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                }

                .graph-placeholder {
                    height: 200px;
                    background: #f8fafc;
                    border-radius: 12px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding: 20px;
                }

                .bar-chart {
                    display: flex;
                    align-items: flex-end;
                    gap: 40px;
                    height: 150px;
                }

                .bar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .bar {
                    width: 50px;
                    border-radius: 8px 8px 0 0;
                    transition: height 0.3s;
                }

                .bar-label {
                    font-size: 12px;
                    color: #64748b;
                }

                .bar-value {
                    font-size: 12px;
                    font-weight: 600;
                    color: #1e293b;
                }

                /* Section Causes */
                .causes-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .cause-card {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .cause-icon {
                    width: 56px;
                    height: 56px;
                    background: #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FF6B35;
                    margin-bottom: 24px;
                }

                .cause-card h3 {
                    font-size: 18px;
                    margin: 0 0 12px 0;
                }

                .cause-card p {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin: 0 0 16px 0;
                }

                .cause-stat {
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                }

                .stat-chiffre {
                    display: block;
                    font-size: 20px;
                    font-weight: 700;
                    color: #FF6B35;
                }

                .stat-label {
                    font-size: 11px;
                    color: #64748b;
                }

                .citation-box {
                    background: #f1f5f9;
                    border-radius: 16px;
                    padding: 32px;
                    text-align: center;
                }

                .citation {
                    font-size: 18px;
                    font-style: italic;
                    color: #1e293b;
                    max-width: 800px;
                    margin: 0 auto;
                }

                /* Section Objectifs */
                .objectifs-liste {
                    margin-bottom: 48px;
                }

                .objectif-item {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 24px;
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }

                .objectif-number {
                    width: 48px;
                    height: 48px;
                    background: #FF6B35;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .objectif-content h3 {
                    margin: 0 0 8px 0;
                }

                .objectif-content p {
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 12px;
                }

                .objectif-tags {
                    display: flex;
                    gap: 8px;
                }

                .tag {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 4px 12px;
                    border-radius: 999px;
                    font-size: 12px;
                }

                .objectif-final {
                    background: linear-gradient(135deg, #003D82 0%, #002a5c 100%);
                    border-radius: 16px;
                    padding: 48px;
                    text-align: center;
                    color: white;
                }

                .objectif-final h3 {
                    color: white;
                    opacity: 0.9;
                    font-size: 20px;
                    margin-bottom: 24px;
                }

                .final-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 16px;
                    background: rgba(255,255,255,0.1);
                    padding: 20px 40px;
                    border-radius: 999px;
                    font-size: 28px;
                    font-weight: 700;
                    border: 2px solid rgba(255,255,255,0.2);
                }

                .final-badge .material-symbols-outlined {
                    font-size: 40px;
                    color: #FF6B35;
                }

                /* Section Méthodologie */
                .methodologie-timeline {
                    position: relative;
                    margin-bottom: 48px;
                }

                .methodologie-timeline::before {
                    content: '';
                    position: absolute;
                    left: 24px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: #e2e8f0;
                }

                .timeline-item {
                    position: relative;
                    padding-left: 70px;
                    margin-bottom: 32px;
                }

                .timeline-marker {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 48px;
                    height: 48px;
                    background: #FF6B35;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 700;
                    z-index: 2;
                }

                .timeline-content {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .timeline-content h3 {
                    margin: 0 0 12px 0;
                    color: #003D82;
                }

                .timeline-content p {
                    color: #64748b;
                    margin-bottom: 12px;
                }

                .timeline-content ul {
                    margin: 0;
                    padding-left: 20px;
                    color: #475569;
                }

                .timeline-content li {
                    margin-bottom: 4px;
                }

                .livrables-box {
                    background: white;
                    border-radius: 16px;
                    padding: 32px;
                }

                .livrables-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin-top: 24px;
                }

                .livrable-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                }

                .livrable-item .material-symbols-outlined {
                    color: #FF6B35;
                }

                /* Footer */
                .problematique-footer {
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    padding: 48px 32px 24px;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    gap: 32px;
                    margin-bottom: 32px;
                }

                .footer-contacts h4 {
                    color: #1e293b;
                    margin-bottom: 16px;
                }

                .contacts-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }

                .contact {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .contact-name {
                    font-weight: 700;
                    color: #003D82;
                }

                .contact a {
                    color: #64748b;
                    text-decoration: none;
                    font-size: 14px;
                }

                .contact a:hover {
                    color: #FF6B35;
                }

                .footer-logos {
                    display: flex;
                    gap: 24px;
                }

                .logo-placeholder {
                    padding: 8px 16px;
                    background: #f1f5f9;
                    border-radius: 8px;
                    font-weight: 700;
                    color: #475569;
                }

                .footer-bottom {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                    padding-top: 24px;
                    border-top: 1px solid #f1f5f9;
                    color: #94a3b8;
                    font-size: 14px;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .contexte-container,
                    .chiffres-grid,
                    .causes-grid,
                    .livrables-grid,
                    .contacts-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .problematique-tabs {
                        flex-wrap: wrap;
                    }
                    
                    .contexte-container,
                    .chiffres-grid,
                    .causes-grid,
                    .livrables-grid,
                    .contacts-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .header-content {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .final-badge {
                        font-size: 20px;
                        flex-wrap: wrap;
                        padding: 16px;
                    }
                    
                    .timeline-item {
                        padding-left: 60px;
                    }
                }
            </style>
        `;
    }
};

window.pages = window.pages || {};
window.pages.Problematique = pages.Problematique;