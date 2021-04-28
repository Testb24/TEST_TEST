//==============================================================================
//Affiche le nom et le bandeau vert/rouge si connecté
//==============================================================================
document.addEventListener('DOMContentLoaded', se_connecte);

let name_place = document.getElementById('name_place');
let connected_space = document.getElementById('connected_space');
let my_account = document.getElementById('my_account');

function se_connecte() {

    if (localStorage.getItem('name') == "undefined" ||
        localStorage.getItem('name') == null ||
        localStorage.getItem('name') == ""
    ) {
        name_place.innerText = "Non connecté";
        connected_space.style.backgroundColor = "crimson";
        btn_deco.style.visibility = "hidden";
        // form_in.style.display = "none";
        // form_co.style.display = "flex";
        // my_account.style.display = "none";
    } else {
        name_place.innerText = localStorage.getItem('name');
        connected_space.style.backgroundColor = "green";
        btn_deco.style.visibility = "visible";
        // form_in.style.display = "none";
        // form_co.style.display = "none";
        // my_account.style.display = "block";

        // while (place_liste_server_joueur.firstChild) {
        //     place_liste_server_joueur.removeChild(place_liste_server_joueur.lastChild);
        // }

        // build_liste(false);
    }
};