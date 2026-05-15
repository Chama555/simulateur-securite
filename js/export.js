/**
 * EXPORT.JS - Export en PDF, JSON, Excel, HTML
 */

class Export {
    /**
     * Exporter en PDF
     */
    static async exportPDF(pistes, filename = 'plan-action.pdf') {
        try {
            appActions.setLoading(true);

            // Générer HTML pour PDF
            const html = this.generatePDFHTML(pistes);

            // Créer blob HTML
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            // Utiliser print pour PDF (plus simple)
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);

            iframe.onload = () => {
                iframe.contentWindow.print();
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    URL.revokeObjectURL(url);
                    appActions.setLoading(false);
                    appActions.showNotification('PDF généré avec succès!', 'success');
                }, 1000);
            };

        } catch (error) {
            console.error('Erreur export PDF:', error);
            appActions.showNotification('Erreur lors de l\'export PDF', 'error');
            appActions.setLoading(false);
        }
    }

    /**
     * Générer HTML pour PDF
     */
    static generatePDFHTML(pistes) {
        const now = new Date().toLocaleString('fr-FR');
        const totalBudget = pistes.reduce((sum, p) => sum + p.budget.cout_3_ans, 0);
        const avgImpact = Math.round(pistes.reduce((sum, p) => sum + p.impact_score, 0) / pistes.length);
        const totalAccidents = pistes.reduce((sum, p) => sum + p.impact_accidents_evites, 0);

        return `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Plan d'Action Sécurité CDG</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
                    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #003D82; padding-bottom: 20px; }
                    .header h1 { color: #003D82; font-size: 28px; margin-bottom: 10px; }
                    .header p { color: #666; font-size: 14px; }
                    .executive-summary { background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
                    .summary-item { display: inline-block; margin: 10px 20px 10px 0; }
                    .summary-value { font-size: 24px; font-weight: bold; color: #003D82; }
                    .summary-label { font-size: 12px; color: #999; text-transform: uppercase; }
                    .table-wrapper { margin: 30px 0; }
                    .table-title { font-size: 18px; font-weight: bold; color: #003D82; margin: 20px 0 15px; }
                    table { width: 100%; border-collapse: collapse; }
                    th { background: #003D82; color: white; padding: 12px; text-align: left; font-weight: bold; }
                    td { padding: 12px; border-bottom: 1px solid #ddd; }
                    tr:nth-child(even) { background: #f9fafb; }
                    .page-break { page-break-after: always; }
                    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #999; }
                    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
                    .badge-high { background: #fecaca; color: #991b1b; }
                    .badge-medium { background: #fed7aa; color: #92400e; }
                    .badge-low { background: #d1fae5; color: #065f46; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Plan d'Action Sécurité CDG 2026</h1>
                        <p>Rapport de simulation - Généré le ${now}</p>
                    </div>

                    <div class="executive-summary">
                        <h2 style="margin-bottom: 15px; color: #003D82;">Résumé Exécutif</h2>
                        <div class="summary-item">
                            <div class="summary-value">${pistes.length}</div>
                            <div class="summary-label">Pistes sélectionnées</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-value">${Utils.formatCurrency(totalBudget)}</div>
                            <div class="summary-label">Budget total</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-value">${avgImpact}/100</div>
                            <div class="summary-label">Impact moyen</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-value">-${totalAccidents}</div>
                            <div class="summary-label">Accidents évités/an</div>
                        </div>
                    </div>

                    <div class="table-wrapper">
                        <h2 class="table-title">Détail des Pistes Sélectionnées</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Titre</th>
                                    <th>Budget 3 ans</th>
                                    <th>Impact</th>
                                    <th>ROI</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${pistes.map(p => `
                                    <tr>
                                        <td><strong>${p.numero}</strong></td>
                                        <td>${p.titre}</td>
                                        <td>${Utils.formatCurrency(p.budget.cout_3_ans)}</td>
                                        <td>${p.impact_score}/100</td>
                                        <td>${p.roi_mois} mois</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="page-break"></div>

                    <div class="table-wrapper">
                        <h2 class="table-title">Récapitulatif Budgétaire par Année</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Année</th>
                                    <th>Budget</th>
                                    <th>% du total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2026</td>
                                    <td>${Utils.formatCurrency(pistes.reduce((s, p) => s + p.budget.cout_2026, 0))}</td>
                                    <td>${Math.round(pistes.reduce((s, p) => s + p.budget.cout_2026, 0) / totalBudget * 100)}%</td>
                                </tr>
                                <tr>
                                    <td>2027</td>
                                    <td>${Utils.formatCurrency(pistes.reduce((s, p) => s + p.budget.cout_2027, 0))}</td>
                                    <td>${Math.round(pistes.reduce((s, p) => s + p.budget.cout_2027, 0) / totalBudget * 100)}%</td>
                                </tr>
                                <tr>
                                    <td>2028</td>
                                    <td>${Utils.formatCurrency(pistes.reduce((s, p) => s + p.budget.cout_2028, 0))}</td>
                                    <td>${Math.round(pistes.reduce((s, p) => s + p.budget.cout_2028, 0) / totalBudget * 100)}%</td>
                                </tr>
                                <tr style="background: #003D82; color: white; font-weight: bold;">
                                    <td>TOTAL</td>
                                    <td>${Utils.formatCurrency(totalBudget)}</td>
                                    <td>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="footer">
                        <p>Simulateur Sécurité CDG 2026 | v1.0.0</p>
                        <p>Document généré automatiquement - Confidentiel</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    /**
     * Exporter en JSON
     */
    static exportJSON(pistes, filename = 'scenario.json') {
        try {
            const data = {
                version: '1.0.0',
                generated: new Date().toISOString(),
                pistes: pistes.map(p => ({
                    id: p.id,
                    numero: p.numero,
                    titre: p.titre,
                    categorie: p.categorie,
                    budget: p.budget.cout_3_ans,
                    impact_score: p.impact_score,
                    roi_mois: p.roi_mois,
                    delai_mois: p.delai_mois
                })),
                summary: {
                    totalPistes: pistes.length,
                    totalBudget: pistes.reduce((s, p) => s + p.budget.cout_3_ans, 0),
                    averageImpact: Math.round(pistes.reduce((s, p) => s + p.impact_score, 0) / pistes.length),
                    totalAccidentsEvited: pistes.reduce((s, p) => s + p.impact_accidents_evites, 0)
                }
            };

            Utils.downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
            appActions.showNotification('Données exportées en JSON!', 'success');

        } catch (error) {
            console.error('Erreur export JSON:', error);
            appActions.showNotification('Erreur lors de l\'export JSON', 'error');
        }
    }

    /**
     * Exporter en HTML
     */
    static exportHTML(pistes, filename = 'rapport.html') {
        try {
            const html = this.generatePDFHTML(pistes);
            Utils.downloadFile(html, filename, 'text/html');
            appActions.showNotification('Rapport HTML généré!', 'success');
        } catch (error) {
            console.error('Erreur export HTML:', error);
            appActions.showNotification('Erreur lors de l\'export HTML', 'error');
        }
    }

    /**
     * Exporter en CSV
     */
    static exportCSV(pistes, filename = 'pistes.csv') {
        try {
            const headers = ['ID', 'Titre', 'Catégorie', 'Budget (3 ans)', 'Impact', 'ROI (mois)', 'Délai (mois)'];
            const rows = pistes.map(p => [
                p.numero,
                `"${p.titre}"`,
                p.categorie,
                p.budget.cout_3_ans,
                p.impact_score,
                p.roi_mois,
                p.delai_mois
            ]);

            const csv = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');

            Utils.downloadFile(csv, filename, 'text/csv');
            appActions.showNotification('Fichier CSV généré!', 'success');

        } catch (error) {
            console.error('Erreur export CSV:', error);
            appActions.showNotification('Erreur lors de l\'export CSV', 'error');
        }
    }

    /**
     * Télécharger fichier
     */
    static downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Export global
window.Export = Export;
