// panneau.js - Version 3D Coverflow

const panneau = document.querySelector('.panneau-publicitaire');
const cards = document.querySelectorAll('.card');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

// Configuration de l'effet
const perspectiveValue = "1000px"; // Profondeur 3D
const rotationAngle = 45; // Angle de rotation des cartes latérales (en degrés)
const depthOffset = -200; // Distance vers l'arrière des cartes latérales (px)
const scaleReduced = 0.8; // Taille réduite des cartes latérales (0.8 = 80%)
const spaceBetween = 60; // Espace horizontal supplémentaire entre les cartes (px)

// État du carrousel
let currentIndex = 0; // Index de la carte centrale (on commence à 0)

// --- Fonction Principale de Mise à Jour (L'Effet Coverflow) ---
function updateCoverflow() {
    // 1. Calculer le déplacement pour centrer la carte 'currentIndex'
    const cardWidth = cards[0].offsetWidth;
    const centerOffset = (panneau.offsetWidth / 2) - (cardWidth / 2);
    // On calcule la position théorique de la carte centrale sans transformation
    const targetLeft = currentIndex * cardWidth; 
    // On applique la translation pour amener cette position au centre
    panneau.style.transform = `translateX(${centerOffset - targetLeft}px)`;

    // 2. Appliquer les transformations 3D à CHAQUE carte
    cards.forEach((card, index) => {
        const distanceFromCenter = index - currentIndex;
        
        if (distanceFromCenter === 0) {
            // --- Carte Centrale ---
            card.style.transform = `translateX(0px) scale(1) rotateY(0deg) translateZ(0px)`;
            card.style.opacity = 1;
            card.style.zIndex = 10; // Devant toutes les autres
            card.classList.add('active'); // Pour la lueur forte
        } 
        else {
            // --- Cartes Latérales (Gauche et Droite) ---
            const direction = distanceFromCenter > 0 ? 1 : -1; // 1 pour droite, -1 pour gauche
            
            // Calcul du décalage horizontal pour l'espacement
            const tx = direction * spaceBetween;
            // Rotation Y (perspective)
            const ry = -direction * rotationAngle;
            // Éloignement en profondeur (Z)
            const tz = depthOffset;
            
            card.style.transform = `translateX(${tx}px) scale(${scaleReduced}) rotateY(${ry}deg) translateZ(${tz}px)`;
            
            // Effet d'estompage (plus on s'éloigne, plus c'est transparent)
            const opacity = 1 - (Math.abs(distanceFromCenter) * 0.3);
            card.style.opacity = Math.max(0.1, opacity); // Minimum 10% d'opacité
            
            // Empilement : les cartes proches du centre sont devant
            card.style.zIndex = 10 - Math.abs(distanceFromCenter);
            card.classList.remove('active');
        }
    });
}

// --- Écouteurs d'Événements ---

btnNext.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCoverflow();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCoverflow();
    }
});

// --- Initialisation ---

// Activer la perspective 3D sur le parent direct
panneau.style.perspective = perspectiveValue;

// Centrer la première carte au chargement
window.addEventListener('load', updateCoverflow);
// Recalculer si la fenêtre est redimensionnée
window.addEventListener('resize', updateCoverflow);
