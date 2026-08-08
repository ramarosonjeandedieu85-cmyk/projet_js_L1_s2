/* =====================================================
   PROJET DHTML
   MODULE : REDIMENSIONNEMENT IMAGE
   jQuery UI Slider
===================================================== */


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