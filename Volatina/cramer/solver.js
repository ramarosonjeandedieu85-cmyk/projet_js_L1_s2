// Commentaire: script solver.js pour le dossier Volatina
// solver.js
// Résout un système de 3 équations à 3 inconnues (x1, x2, x3) par la méthode de Cramer.
//
// Le système :
//   a11.x1 + a12.x2 + a13.x3 = b1
//   a21.x1 + a22.x2 + a23.x3 = b2
//   a31.x1 + a32.x2 + a33.x3 = b3

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCramer");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // empêche le rechargement de la page (comportement par défaut d'un <form>)
        resoudreSysteme();
    });
});

// Calcule le déterminant d'une matrice 3x3 par développement selon la 1ère ligne.
// La matrice est donnée ligne par ligne : [a, b, c, d, e, f, g, h, i]
//   | a  b  c |
//   | d  e  f |
//   | g  h  i |
function determinant3x3(a, b, c, d, e, f, g, h, i) {
    // Formule de Sarrus / développement de Laplace sur la 1ère ligne :
    // det = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

function resoudreSysteme() {
    // 1) Récupérer toutes les valeurs saisies (converties en nombres avec parseFloat)
    const a11 = parseFloat(document.getElementById("a11").value);
    const a12 = parseFloat(document.getElementById("a12").value);
    const a13 = parseFloat(document.getElementById("a13").value);
    const b1  = parseFloat(document.getElementById("b1").value);

    const a21 = parseFloat(document.getElementById("a21").value);
    const a22 = parseFloat(document.getElementById("a22").value);
    const a23 = parseFloat(document.getElementById("a23").value);
    const b2  = parseFloat(document.getElementById("b2").value);

    const a31 = parseFloat(document.getElementById("a31").value);
    const a32 = parseFloat(document.getElementById("a32").value);
    const a33 = parseFloat(document.getElementById("a33").value);
    const b3  = parseFloat(document.getElementById("b3").value);

    // 2) Déterminant principal D (la matrice des coefficients a)
    const D = determinant3x3(
        a11, a12, a13,
        a21, a22, a23,
        a31, a32, a33
    );

    const conteneur = document.getElementById("resultat-contenu");

    // 3) Si D = 0, la méthode de Cramer ne s'applique pas :
    //    soit le système n'a AUCUNE solution, soit il en a une INFINITÉ.
    if (D === 0) {
        conteneur.innerHTML = `
            <p>Déterminant = 0.</p>
            <p>Le système n'a pas de solution unique
            (aucune solution, ou une infinité de solutions).</p>
        `;
        return;
    }

    // 4) Dx, Dy, Dz : on remplace la colonne correspondante par la colonne des b,
    //    et on recalcule le déterminant à chaque fois.

    // Dx : on remplace la 1ère colonne (les a_i1) par (b1, b2, b3)
    const Dx = determinant3x3(
        b1,  a12, a13,
        b2,  a22, a23,
        b3,  a32, a33
    );

    // Dy : on remplace la 2ème colonne (les a_i2) par (b1, b2, b3)
    const Dy = determinant3x3(
        a11, b1,  a13,
        a21, b2,  a23,
        a31, b3,  a33
    );

    // Dz : on remplace la 3ème colonne (les a_i3) par (b1, b2, b3)
    const Dz = determinant3x3(
        a11, a12, b1,
        a21, a22, b2,
        a31, a32, b3
    );

    // 5) La formule de Cramer : chaque inconnue = son déterminant / D
    const x1 = Dx / D;
    const x2 = Dy / D;
    const x3 = Dz / D;

    conteneur.innerHTML = `
        <p>x1 = ${x1.toFixed(4)}</p>
        <p>x2 = ${x2.toFixed(4)}</p>
        <p>x3 = ${x3.toFixed(4)}</p>
    `;
}
