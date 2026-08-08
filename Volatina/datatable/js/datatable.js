/* =====================================================
   PROJET DHTML
   MODULE : DATATABLE + CHART.JS
===================================================== */



$(document).ready(function(){



/* ===============================
   CALCUL DES MONTANTS
================================ */


let totalQte = 0;

let totalMontant = 0;


let prix = [];

let produits = [];





$("#produits tbody tr").each(function(){



    let qte =
    Number(
        $(this).find("td:eq(1)").text()
    );



    let prixProduit =
    Number(
        $(this).find("td:eq(2)").text()
    );



    let montant =
    qte * prixProduit;





    $(this)
    .find("td:eq(3)")
    .html(
        montant.toLocaleString("fr-FR")
        +" Ar"
    );





    totalQte += qte;


    totalMontant += montant;



    prix.push(prixProduit);



    produits.push(
        $(this)
        .find("td:eq(0)")
        .text()
    );



});






/* ===============================
   FOOTER TOTAL
================================ */



$("#totalQte")
.text(totalQte);



$("#totalMontant")
.text(
totalMontant.toLocaleString("fr-FR")
+" Ar"
);






/* ===============================
   STATISTIQUES
================================ */


let sommePrix = 0;


prix.forEach(function(p){

    sommePrix += p;

});



let moyenne =
sommePrix / prix.length;



let minimum =
Math.min(...prix);



let maximum =
Math.max(...prix);





$("#prixMoyen")
.text(
moyenne.toLocaleString("fr-FR")
+" Ar"
);



$("#prixMin")
.text(
minimum.toLocaleString("fr-FR")
+" Ar"
);



$("#prixMax")
.text(
maximum.toLocaleString("fr-FR")
+" Ar"
);









/* ===============================
   DATATABLE FRANÇAIS
================================ */


new DataTable(
"#produits",
{

language:{


search:"Rechercher :",

lengthMenu:
"Afficher _MENU_ éléments",


info:
"Affichage de _START_ à _END_ sur _TOTAL_ éléments",


paginate:{


first:"Premier",

last:"Dernier",

next:"Suivant",

previous:"Précédent"


},


zeroRecords:
"Aucun résultat trouvé"



},



pageLength:5


}

);









/* ===============================
   CHART.JS
================================ */



let canvas =
document.getElementById(
"chartProduit"
);





new Chart(
canvas,
{


type:"bar",



data:{


labels:produits,


datasets:[{


label:
"Prix des produits (Ar)",



data:prix,



backgroundColor:[

"#0d6efd",

"#198754",

"#dc3545",

"#ffc107"

]



}]



},



options:{



responsive:true,



plugins:{



legend:{


display:true


},



title:{


display:true,


text:
"Comparaison des prix"



}


}





}





}

);



});