let params = new URLSearchParams(document.location.search.substring(1));

let server = params.get("a");
let type = params.get("b");
let id = params.get("c");

console.log("a : " + server)
console.log("b : " + type)
console.log("c : " + id)

//==============================================================================
const toggle_btn = document.getElementById('toggle_btn');
// console.log(toggle_btn.checked)

let url;
if (toggle_btn.checked) {
    url = "https://trav-server-0-2.herokuapp.com";
} else {
    url = 'http://localhost:3000';
}

console.log("url : " + url);
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
//==============================================================================
//Charge le type de data
//==============================================================================
type_page(type);
// console.log(type)

async function type_page(type) {
    let data;
    console.log("==========");
    switch (type) {

        case "0":
            data = await charge_data("general");
            break;
        case "1":
            data = await charge_data("ally/" + id);
            break;
        case "2":
            data = await charge_data("ally/" + id);
            break;
        case "3":
            data = await charge_data("town/" + id);
            break;
    }
    console.log("==========");
    console.log(data);

};
//==============================================================================
//Charge General
//==============================================================================
async function charge_general() {
    const data = await charge_data("general")
};
//==============================================================================
//Charge Ally
//==============================================================================
async function charge_ally() {
    const ally = await charge_data("ally/" + id)

};
//==============================================================================
//Charge Player
//==============================================================================
async function charge_player() {
    const player = await charge_data("player/" + id)

};
//==============================================================================
//Charge Town
//==============================================================================
async function charge_town() {
    const town = await charge_data("town/" + id)

};
//==============================================================================
//Charge Town
//==============================================================================
async function charge_data(type) {

    let url_temp = url + '/api/travian/' + server + '/' + type;
    console.log(url_temp);

    const response = await fetch(url_temp, {
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

    return response.json()
};