// Commentaire: script panneau.js pour le dossier Volatina
// panneau.js - Version 3D Coverflow
// Ce script gère le carrousel publicitaire en mode coverflow :
// la carte centrale est mise en avant et les cartes de chaque côté s'inclinent en 3D.

// Cibles HTML : conteneur principal, cartes et boutons de navigation.
const panneau = document.querySelector('.panneau-publicitaire');
const cards = document.querySelectorAll('.card');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

// Paramètres visuels pour l'effet 3D.
const perspectiveValue = "1000px"; // Profondeur 3D
const rotationAngle = 45; // Angle de rotation des cartes latérales (en degrés)
const depthOffset = -200; // Distance vers l'arrière des cartes latérales (px)
const scaleReduced = 0.8; // Taille réduite des cartes latérales (0.8 = 80%)
const spaceBetween = 60; // Espace horizontal supplémentaire entre les cartes (px)

// État du carrousel.
let currentIndex = 0; // Index de la carte centrale (on commence à 0)
let autoSlideTimer ;

// --- Fonction Principale de Mise à Jour (place la carte centrale et transforme les autres) ---
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
            // --- Carte centrale sélectionnée ---
            // Elle reste droite, pleine taille, et devant les autres.
            card.style.transform = `translateX(0px) scale(1) rotateY(0deg) translateZ(0px)`;
            card.style.opacity = 1;
            card.style.zIndex = 10; // Devant toutes les autres
            card.classList.add('active'); // Pour la lueur forte
        } 
        else {
            // --- Cartes latérales : gauche / droite ---
            // Elles s'inclinent et reculent légèrement pour créer le volume.
            const direction = distanceFromCenter > 0 ? 1 : -1; // 1 pour droite, -1 pour gauche
            
            // Décalage horizontal pour séparer les cartes.
            const tx = direction * spaceBetween;
            // Rotation pour donner un effet de perspective.
            const ry = -direction * rotationAngle;
            // Recul dans l'espace pour l'effet 3D.
            const tz = depthOffset;
            
            card.style.transform = `translateX(${tx}px) scale(${scaleReduced}) rotateY(${ry}deg) translateZ(${tz}px)`;
            
            // Faire fondre un peu la carte en fonction de sa distance au centre.
            const opacity = 1 - (Math.abs(distanceFromCenter) * 0.3);
            card.style.opacity = Math.max(0.1, opacity); // Au moins 10% d'opacité
            
            // Les cartes proches du centre restent au-dessus visuellement.
            card.style.zIndex = 10 - Math.abs(distanceFromCenter);
            card.classList.remove('active');
        }
    });
}

// --- Initialisation ---
// Prépare le cadrage 3D et force le rendu dès que la page est prête.

// Activer la perspective 3D sur le parent direct
panneau.style.perspective = perspectiveValue;

// Centrer la première carte au chargement
/*window.addEventListener('load', updateCoverflow);*/
// Recalculer si la fenêtre est redimensionnée
window.addEventListener('resize', updateCoverflow);

function startAutoSlide(){
    clearInterval(autoSlideTimer) ;
    autoSlideTimer = setInterval(() => {
        if(currentIndex < cards.length - 1){
            currentIndex ++ ;
        }
        else{
            currentIndex = 0 ;
        }
        updateCoverflow() ;
    }, 15000) ;
}

// Démarrer le défilement automatique au chargement de la page
window.addEventListener('load', () => {
    updateCoverflow() ;
    startAutoSlide();
});

// Réinitialiser le minuteur de 15s lors d'un clic sur le bouton Suivant
btnNext.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Retour au début
    }
    updateCoverflow();
    startAutoSlide(); // Remet le compteur de 15s à zéro
});

// Réinitialiser le minuteur de 15s lors d'un clic sur le bouton Précédent
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; // Retour à la fin
    }
    updateCoverflow();
    startAutoSlide(); // Remet le compteur de 15s à zéro
});
