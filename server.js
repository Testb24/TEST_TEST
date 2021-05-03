let under_title = document.getElementById("under_title");
let message_error = document.getElementById('message_error');


let DATA_server = Object;


let temp_var = true;
let url;
if (!temp_var) {
    url = "https://trav-server-0-2.herokuapp.com";
} else {
    url = 'http://localhost:3000';
}
// // console.log(url);
// under_title.innerText = 'Stats : ' + type;
// // console.log(type)
// if (!id == null) {
//     // console.log("========AAAA+++++++++++")
//     under_title.innerText += '(' + id + ')';
// }
//==============================================================================
//AU START : - affiche la page / change le type + check if possible 
//==============================================================================
let server, type, id;

at_start()

function at_start() {

    let params = new URLSearchParams(document.location.search.substring(1));
    server = params.get("a");
    type = params.get("b");
    id = params.get("c");

    if (id == null && type != 'general' && type != '0') {
        message_error.innerText = "404 : Ally, joueur ou village non trouvé !";
        type = 'general';
    };

    switch (type) {
        case 'general':
        case '0':
            type = 'general'
            break;
        case 'ally':
        case '1':
            type = 'ally';
            break;
        case 'player':
        case '2':
            type = 'player';
            break;
        case 'town':
        case '3':
            type = 'town'
            break;
    }

    under_title.innerText = "Stats : " + type;
};

console.log("==================================");
console.log(type);
console.log("==================================");
//==============================================================================
//Charge la data au start de la page (=> plus rapide)
//==============================================================================
// document.addEventListener('DOMContentLoaded', charge_data_at_start());
// build_table(false, server, type);
charge_data_at_start(server, url, type, id);

async function charge_data_at_start(server, url, type, id) {
    // console.log(server)
    // console.log("TEST RETURN");
    // console.log(DATA_server.allys)
    if (DATA_server.allys == undefined) {
        // console.log('recharge les datas');
        DATA_server.allys = await requete_server(server, "ally", url);
        // DATA_server.players = await requete_server(server, "player", url);
        // DATA_server.towns = await requete_server(server, "town", url);
    }

    // console.log(DATA_server);
    // console.log(DATA_server.allys);
    // console.log(DATA_server.players);
    // console.log(DATA_server.towns);

    build_table(DATA_server, type, id);
};

async function requete_server(server, type, url) {

    let url_temp = url + '/api/server/' + server + '/' + type;
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

function build_table(DATA_server, type, id) {

    let table = document.getElementById('table');

    let DATA_temp;
    let table_top = document.createElement('tr');
    // let table_content = document.createElement('tr');
    let element = document.createElement('tr');

    console.log(type);
    console.log(id);
    console.log(server);

    console.log(DATA_server.allys);

    switch (type) {
        case ("ally"): DATA_temp = DATA_server.allys;
            table_top.innerHTML =
                "<th>Joueur</th>" +
                "<th>Nbr de vivi</th>" +
                "<th>Pop</th>";
            table.appendChild(table_top);

            let ally = DATA_server.allys.find(element => element._id == server + '_' + id);

            ally.Player.forEach(player => {
                element.innerHTML =
                    "<td>"+player+"<a href=\"https://"+server+"/profile/"+player+"\" target=\"_blank\"> \&#8663</a></td>" +
                    "<td>" + player + "</td>" +
                    "<td>" + player + "</td>";
                table.appendChild(element);
            });
            break;
        case ("player"): DATA_temp = DATA_server.players;
            table_top.innerHTML =
                "<th>Vivi</th>" +
                "<th>Pop</th>" +
                "<th>Position</th>";
                table.appendChild(table_top);

                let player = DATA_server.players.find(element => element._id == server + '_' + id);

                player.town.forEach(player => {
                    element.innerHTML =
                        "<td>" + player + "</td>" +
                        "<td>" + player + "</td>" +
                        "<td>" + player + "</td>";
                    table.appendChild(element);
                });
            break;
        case ("town"): DATA_temp = DATA_server.towns;
            break;
    }

    // if (table_top != "") {
    //     table.appendChild(table_top);
    //     table.appendChild(table_content);
    // }


    console.log(table);

    // console.log(DATA_temp);




};
//==============================================================================
const toggle_btn = document.getElementById('toggle_btn');
// console.log(toggle_btn.checked)

// console.log("url : " + url);
