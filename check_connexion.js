try {
    console.log(url);
} catch (e) {
    url = 'http://localhost:3000';
}

//==============================================================================
//Affiche le nom et le bandeau vert/rouge si connecté
//==============================================================================
// document.addEventListener('DOMContentLoaded', se_connecte);

let name_place = document.getElementById('name_place');
let connected_space = document.getElementById('connected_space');
let my_account = document.getElementById('my_account');
let se_connecter = document.getElementById('se_connecter');
let title = document.getElementById('title');

const btn_deco = document.getElementById('btn_deco');

se_connecte();

function se_connecte() {

    let params = new URLSearchParams(document.location.search.substring(1));
    let server = params.get("a");

    let temp = server.split('.');
    title.innerText = temp[0] + ' (' + temp[2] + ')';

    // console.log(localStorage.getItem('name'));

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
        se_connecter.innerText = "Se connecter";
    } else {
        name_place.innerText = localStorage.getItem('name');
        connected_space.style.backgroundColor = "green";
        btn_deco.style.visibility = "visible";
        // form_in.style.display = "none";
        // form_co.style.display = "none";
        // my_account.style.display = "block";
        se_connecter.innerText = "Mon Compte";

        // while (place_liste_server_joueur.firstChild) {
        //     place_liste_server_joueur.removeChild(place_liste_server_joueur.lastChild);
        // }

        // build_liste(false);
    }
};
//==============================================================================
//Déconnexion de l'utilisateur
//==============================================================================
btn_deco.addEventListener("click", function () {
    Deconnexion(url);
});

function Deconnexion() {
    // console.log(url)
    let token3 = "";
    let name3 = "";

    localStorage.setItem('token', token3);
    localStorage.setItem('name', name3);

    se_connecte();

    // console.log("server");
    // console.log(localStorage.getItem('name'));


    btn_deco.style.visibility = "hidden";

    window.location.href = window.location.origin + '/index.html';
};