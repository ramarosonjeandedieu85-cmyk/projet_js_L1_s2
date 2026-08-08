/* =====================================================
   PROJET DHTML ENI
   JAVASCRIPT COMMUN
   Navigation + fonctions générales
===================================================== */


/* ================= HORLOGE ================= */


function afficherHeure(){


    let date = new Date();


    let heure =
        date.toLocaleTimeString("fr-FR");


    let element =
        document.getElementById("clock");


    if(element){

        element.innerHTML = heure;

    }

}


setInterval(afficherHeure,1000);



/* ================= MENU ACTIF ================= */


document.addEventListener(
"DOMContentLoaded",
function(){



    let liens =
    document.querySelectorAll(
        ".nav-link"
    );



    let page =
    window.location.pathname
    .split("/")
    .pop();



    liens.forEach(function(lien){


        let href =
        lien.getAttribute("href");



        if(href === page){


            lien.classList.add(
                "active"
            );


        }



        lien.addEventListener(
        "click",
        function(){


            liens.forEach(function(item){

                item.classList.remove(
                    "active"
                );

            });


            this.classList.add(
                "active"
            );


        });



    });



});




/* ================= MESSAGE ================= */


function messageSucces(msg){


    alert(msg);


}





/* ================= FORMAT MONNAIE ================= */


function formatAr(nombre){


    return nombre
    .toLocaleString("fr-FR")
    +" Ar";


}






/* ================= ANIMATION SIMPLE ================= */


function animationCard(){


let cards =
document.querySelectorAll(
".card-hover"
);



cards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{


card.style.transform=
"translateY(-8px)";


});




card.addEventListener(
"mouseleave",
()=>{


card.style.transform=
"translateY(0)";


});


});



}



document.addEventListener(
"DOMContentLoaded",
animationCard
);