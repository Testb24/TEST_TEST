let under_title = document.getElementById("under_title");
let message_error = document.getElementById('message_error');


let DATA_server = Object;
let params = new URLSearchParams(document.location.search.substring(1));
let server = params.get("a");
let type = params.get("b");
let id = params.get("c");

// console.log(server)
// console.log(type)
// console.log(id)

let temp_var = true;
let url;
let i = 0;

// url = 'http://localhost:3000';
url = "https://trav-server-0-2.herokuapp.com";
//==============================================================================
//AU START : - affiche la page / change le type + check if possible 
//==============================================================================
window.addEventListener('load', main_loop);

async function main_loop() { //url, DATA_server, server, type, id
    i++;


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

    await charge_data();
    async function charge_data() {
        try {
            console.log(DATA_server.allys[1]);
        } catch (e) {
            console.log('recharge les datas ' + i + ' ème FOIS');
            DATA_server.allys = await requete_server(server, "ally", url);
            DATA_server.players = await requete_server(server, "player", url);
            DATA_server.towns = await requete_server(server, "town", url);
            // console.log(DATA_server.allys[1]._id)
        }
    }

    // console.log(DATA_server.allys);
    // console.log(DATA_server.players);
    // console.log(DATA_server.towns);
    // console.log(type);
    // console.log(id);
    build_table(DATA_server, type, id);
};

async function requete_server(server, type, url) {

    let url_temp = url + '/api/server/' + server + '/' + type;
    // console.log(url_temp);

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

    let DATA_ally, DATA_player, DATA_tow;

    switch (type) {
        case ("general"):
            console.log("GENERAL")
            break
        case ("ally"):
            // DATA_temp = DATA_server.allys;
            table_top.innerHTML =
                "<th>Joueur</th>" +
                "<th>Nbr de vivi</th>" +
                "<th>Pop</th>";
            table.appendChild(table_top);
            // console.log(DATA_server.players);
            DATA_ally = DATA_server.allys.find(ally => ally.Aid == id);
            DATA_player = DATA_server.players.filter(player => player.Aid == id);

            under_title.innerText = "Alliance " + DATA_ally.An + ' ( ' + DATA_ally.Player.length + ' joueurs )';
            // console.log(DATA_ally)
            // console.log(DATA_ally.An)
            // console.log(DATA_player)
            DATA_player.forEach(player => {
                let element = document.createElement('tr');
                // console.log('==============')
                // console.log(window.location.origin + window.location.pathname + '?a=' + server + '&b=2&c=' + player.Uid)
                element.innerHTML =
                    "<td>" +
                    "<a href=\"" + window.location.origin + window.location.pathname + '?a=' + server + '&b=2&c=' + player.Uid + "\">" + player.Un + "</a>" +
                    "<a href=\"https://" + server + "/profile/" + player.Uid + "\" target=\"_blank\"> \&#8663</a>" +
                    "</td>" +
                    "<td>" + player.Vivi.length + "</td>" +
                    "<td>" + player.Pop + "</td>";
                table.appendChild(element);
                // console.log(table);
            })
            break;

        case ("player"): DATA_temp = DATA_server.players;
            table_top.innerHTML =
                "<th>Vivi</th>" +
                "<th>Pop</th>" +
                "<th>Position</th>";
            table.appendChild(table_top);

            DATA_player = DATA_server.players.find(player => player.Uid == id);
            // console.log(DATA_player)
            under_title.innerText = "Joueur " + DATA_player.Un + ' ( ' + DATA_player.Vivi.length + ' villages )';
            under_title.innerHTML += "<a href=\"https://" + server + "/profile/" + DATA_player.Uid + "\" target=\"_blank\"> \&#8663</a>";

            DATA_town = DATA_server.towns.filter(town => town.Uid == id);
            // console.log(DATA_town)

            DATA_town.forEach(town => {
                // console.log(town)
                let element = document.createElement('tr');
                element.innerHTML =
                    "<td>" +
                    town.Vn +
                    "<a href=\"https://" + server + "/profile/" + town.Uid + "\" target=\"_blank\"> \&#8663</a>" +
                    "</td>" +
                    "<td>" + town.Pop[town.Pop.length - 1] + "</td>" +
                    "<td>" +
                    "<a href=\"https://" + server + "/position_details.php?x=" + town.X + "&y=" + town.Y + "\" target=\"_blank\">" + town.X + "/" + town.Y + "</a>"
                "</td>";
                table.appendChild(element);
            })
            let message = document.createElement('div');
            message.innerHTML = "Ally : <a href=\"" + window.location.origin + window.location.pathname + '?a=' + server + '&b=1&c=' + DATA_player.Aid + "\">" + DATA_player.An + "</a>";
            table.parentElement.appendChild(message);
            // console.log(table.parentElement);
            break;
        case ("town"): DATA_temp = DATA_server.towns;
            break;
    }

    // if (table_top != "") {
    //     table.appendChild(table_top);
    //     table.appendChild(table_content);
    // }


    // console.log(table);

    // console.log(DATA_temp);




};
//==============================================================================
const toggle_btn = document.getElementById('toggle_btn');
// console.log(toggle_btn.checked)

// console.log("url : " + url);
