// Commentaire: script image.js pour le dossier Volatina
/* =====================================================
   PROJET DHTML
   MODULE : REDIMENSIONNEMENT IMAGE
   jQuery UI Slider
===================================================== */

// Page image : contrôle de la taille via sliders et application immédiate aux éléments.
$(document).ready(function(){



    let largeur = 300;
    let hauteur = 250;



    const image =
    $("#photo");



    const couche =
    $("#couche");





    /* ================================
       SLIDER LARGEUR
    ================================= */

    // Ajuste la largeur du cadre photo et affiche la valeur en px.
    $("#widthSlider").slider({


        min:100,

        max:800,

        value:largeur,

        step:10,



        slide:function(event,ui){


            largeur = ui.value;


            $("#widthValue")
            .text(largeur);



            modifierTaille();



        }


    });









    /* ================================
       SLIDER HAUTEUR
    ================================= */

    // Ajuste la hauteur du cadre image et met à jour l'affichage.
    $("#heightSlider").slider({


        min:100,

        max:600,

        value:hauteur,

        step:10,



        slide:function(event,ui){



            hauteur = ui.value;



            $("#heightValue")
            .text(hauteur);



            modifierTaille();


        }



    });








    /* ================================
       MODIFICATION CSS DYNAMIQUE
    ================================= */

    // Applique la largeur et la hauteur choisies au conteneur et à la photo.
    function modifierTaille(){



        image.css({

            width: largeur+"px",

            height: hauteur+"px",

            objectFit:"cover"

        });





        couche.css({

            width: largeur+"px",

            height: hauteur+"px"


        });



    }






    modifierTaille();




});