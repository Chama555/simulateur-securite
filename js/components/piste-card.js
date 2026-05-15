/**
 * PISTE-CARD.JS - Composant carte piste
 */

const PisteCard = {
    render(piste) {
        return `
            <div class="piste-card" onclick="modal.showPisteDetails(${JSON.stringify(piste).replace(/"/g, '&quot;')})">
                <div class="card-header">
                    <span class="piste-id">${piste.numero}</span>
                    <span class="category-badge">${piste.categorie}</span>
                </div>
                <h3 class="piste-title">${piste.titre}</h3>
                <p class="piste-desc">${piste.description}</p>
                <div class="piste-footer">
                    <div class="stat-small">
                        <span class="label">${Utils.formatCurrency(piste.budget.cout_3_ans)}</span>
                    </div>
                    <div class="stat-small">
                        <span class="label">${piste.impact_score}/100</span>
                    </div>
                </div>
            </div>
        `;
    }
};

window.PisteCard = PisteCard;
