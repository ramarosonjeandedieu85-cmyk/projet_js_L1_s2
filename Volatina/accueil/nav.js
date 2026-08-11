// nav.js
// But : ne définir le menu de navigation qu'à UN SEUL endroit.
// Chaque page appelle ce script, et le nav est injecté automatiquement.

function chargerNav() {
    const navHTML = `
        <nav>
            <div>
                <ul>
                    <li><a href="../accueil/index.html">accueil</a></li>
                    <li><a href="../cramer/cramer.html">cramer</a></li>
                    <li><a href="../panneau/panneau.html">Panneau</a></li>
                    <li><a href="../image/image.html">image</a></li>
                    <li><a href="../datatable/datatable.html">datatable</a></li>
                </ul>
            </div>
        </nav>
    `;

    const emplacement = document.getElementById("nav-placeholder");
    if (emplacement) {
        emplacement.innerHTML = navHTML;
        marquerLienActif();
    }
}

// Bonus : met en surbrillance le lien de la page actuelle
function marquerLienActif() {
    const pageActuelle = window.location.pathname.split("/").pop();
    const liens = document.querySelectorAll("#nav-placeholder a");

    liens.forEach(lien => {
        if (lien.getAttribute("href") === pageActuelle) {
            lien.classList.add("actif");
        }
    });
}

// On attend que le HTML soit chargé avant d'injecter le nav
document.addEventListener("DOMContentLoaded", chargerNav);
//DOMContentLoaded attend le fil du chargement de la page
