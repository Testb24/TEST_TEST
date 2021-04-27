// const domain = "local";
const domain = "heroku";

// AAA

const url = 'http://localhost:3000';
// const url = "https://trav-server-0-2.herokuapp.com";

// let general_data;
// load_at_start();

// async function load_at_start() {
//     general_data = await req_general_data_server()
// }


//==============================================================================
//Affiche le bon doc : se connecter / s'inscrire
//==============================================================================
const go_co = document.getElementById('change_connecter');
const go_in = document.getElementById('change_inscrire');

let form_co = document.getElementById('form_login');
let form_in = document.getElementById('form_inscription');

let message_validation = document.getElementById('message_validation');
let message_validation_co = document.getElementById('message_validation_co');

form_in.style.display = "none";

go_co.addEventListener('click', change_screen);
go_in.addEventListener('click', change_screen);

function change_screen() {
    if (this.id == "change_connecter") {
        form_in.style.display = "none";
        form_co.style.display = "flex";
    } else if (this.id == "change_inscrire") {
        form_in.style.display = "flex";
        form_co.style.display = "none";
    }

    message_validation.innerText = "";
    message_validation_co.innerText = "";
};
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
        form_in.style.display = "none";
        form_co.style.display = "flex";
        my_account.style.display = "none";
    } else {
        name_place.innerText = localStorage.getItem('name');
        connected_space.style.backgroundColor = "green";
        btn_deco.style.visibility = "visible";
        form_in.style.display = "none";
        form_co.style.display = "none";
        my_account.style.display = "block";

    }
};
//==============================================================================
//Inscription de l'utilisateur
//==============================================================================
const btn = document.getElementById('btn');

btn.addEventListener("click", Inscription);

let email = document.getElementById('email');
let name2 = document.getElementById('name');
let pass = document.getElementById('pass');

async function Inscription() {

    message_validation.innerText = "";
    message_validation_co.innerText = "";

    let return_from_inscription = await createNewUser(email.value, pass.value, name2.value);

    if (return_from_inscription.message == "Utilisateur créé !") {
        message_validation.innerText = "Utilisateur créé !";
    } else if (return_from_inscription.message == "mail ") {
        message_validation.innerText = "Veuillez choisir une autre adresse mail";
    } else {
        message_validation.innerText = "Erreur";
    }
    email.value = "";
    name2.value = "";
    pass.value = "";
};

async function createNewUser(email, password, name) {
    let johuiu = []
    const obj = {
        email: email,
        password: password,
        name: name,
        serveur: johuiu
    }
    const response = await fetch(url + '/api/auth/signup', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(obj) // body data type must match "Content-Type" header
    });

    return response.json()
};
//==============================================================================
//Connexion de l'utilisateur
//==============================================================================
const btn2 = document.getElementById('btn2');

btn2.addEventListener("click", Connexion);

let email_login = document.getElementById('email_login');
let pass_login = document.getElementById('pass_login');

async function Connexion() {

    message_validation.innerText = "";
    message_validation_co.innerText = "";

    let return_from_connexion = await login(email_login.value, pass_login.value);

    if (return_from_connexion.error == "user non enregistré !") {
        message_validation_co.innerText = "user non enregistré !";
    } else if (return_from_connexion.error == "mdp faux !") {
        message_validation_co.innerText = "mdp faux !";
    } else {
        message_validation_co.innerText = "Erreur";
    }

    const token = return_from_connexion.token;
    const user = return_from_connexion.userId;
    const name = return_from_connexion.name;
    console.log(user)

    localStorage.setItem('token', token);
    localStorage.setItem('token2', token);
    localStorage.setItem('name', name);
    localStorage.setItem('user', user);

    email_login.value = ""
    pass_login.value = ""

    se_connecte()
};

async function login(email, pass) {

    const obj = {
        email: email,
        password: pass
    }

    let token55 = localStorage.getItem('token2');
    console.log(token55);

    const response = await fetch(url + '/api/auth/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Authorization': 'Bearer ' + token55,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(obj) // body data type must match "Content-Type" header
    });
    // console.log(response)
    return response.json()
};
//==============================================================================
//Déconnexion de l'utilisateur
//==============================================================================
const btn_deco = document.getElementById('btn_deco');

btn_deco.addEventListener("click", Deconnexion);

function Deconnexion() {

    let token3 = "";
    let name3 = "";

    localStorage.setItem('token', token3);
    localStorage.setItem('name', name3);

    se_connecte();

    btn_deco.style.visibility = "hidden";
};
//==============================================================================
//Construit la page Mon compte (tableau serveurs en cours / dispo)
//==============================================================================
const place_liste_server_dispo = document.getElementById('place_liste_server_dispo');
const place_liste_server_joueur = document.getElementById('place_liste_server_joueur');
build_liste()

async function build_liste() {
    const liste_server_dispo = await req_general_data_server();
    const liste_server_joueur = await req_player_data_server();
    console.log(liste_server_dispo);
    console.log(liste_server_joueur);

    build_liste_html(liste_server_dispo, place_liste_server_dispo);
    build_liste_html(liste_server_joueur, place_liste_server_joueur);
}

async function req_general_data_server() {

    // let token554 = localStorage.getItem('token2');
    // console.log(token554);

    const response = await fetch(url + '/api/travian/server', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            // 'Authorization': 'Bearer ' + token554,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify() // body data type must match "Content-Type" header
    });
    // console.log(response.json())
    return response.json()
}

async function req_player_data_server() {

    // let token554 = localStorage.getItem('token2');
    // console.log(token554);
    let name17 = localStorage.getItem('user')
    console.log(name17);

    const response = await fetch(url + '/api/travian/' + name17, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            // 'Authorization': 'Bearer ' + token554,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify() // body data type must match "Content-Type" header
    });
    // console.log(response.json())
    return response.json()
}

function build_liste_html(liste, place) {
    liste.forEach(serveur => {

        let listItem = document.createElement('li');
        listItem.classList.add("server");
        listItem.innerText = serveur.name.split('.')[0];

        let add_icon = document.createElement('span');
        add_icon.innerText = '[+]';
        add_icon.classList.add("close");
        add_icon.addEventListener('click', add_server);

        listItem.appendChild(add_icon);
        place.appendChild(listItem);

    });
};

function add_server() {
    console.log(this);
}