/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */
/* eslint-disable quote-props */
/* eslint-disable padded-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-case-declarations */
/* eslint-disable no-useless-escape */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable camelcase */
const under_title = document.getElementById('under_title')
const message_error = document.getElementById('message_error')

// AAA OK C

const DATA_server = Object
let params = new URLSearchParams(document.location.search.substring(1))
let server = params.get('a')
let type = params.get('b')
let id = params.get('c')

// console.log(server)
// console.log(type)
// console.log(id)

let url
let i = 0

url = 'http://localhost:3000'
// url = "https://trav-server-0-2.herokuapp.com";

const retour_menu_base = document.getElementById('retour_menu_base')
retour_menu_base.addEventListener('click', function () {
	// retour sur la page de base
	// console.log(server)
	let url_server = window.location.origin + '/server.html?a=' + server + '&b=0'


	// console.log(url_server)
	// console.log(window.location.pathname.split('/')[1])
	let temp3

	try {
		// console.log(window.location.pathname)
		temp3 = window.location.pathname.split('/')[1]
		// console.log(temp3);
		if (temp3 == 'Test_Trav_0.2') {
			url_server = window.location.origin + '/' + temp3 + '/server.html?a=' + server + '&b=0'
			// console.log("change url pour github page")
		}
	} catch (e) {
		// console.log(e)
	}

	// console.log(temp3)

	window.history.pushState('data', 'title', url_server)

	main_loop()


	// window.location.href = url_server
})



//= =============================================================================
// AU START : - affiche la page / change le type + check if possible
//= =============================================================================
window.addEventListener('load', main_loop)



async function main_loop() { // url, DATA_server, server, type, id
	i++

	const table = document.getElementById('table')
	table.innerHTML = ''
	params = new URLSearchParams(document.location.search.substring(1))
	server = params.get('a')
	type = params.get('b')
	id = params.get('c')

	if (id == null && type != 'general' && type != '0') {
		message_error.innerText = '404 : Ally, joueur ou village non trouvé !'
		type = 'general'
	}

	switch (type) {
		case 'general':
		case '0':
			type = 'general'
			break
		case 'ally':
		case '1':
			type = 'ally'
			break
		case 'player':
		case '2':
			type = 'player'

			try {
				const temp = DATA_server.towns[1]
			} catch (e) {
				// console.log('recharge les datas juste pour town');
				// DATA_server.allys = await requete_server(server, "ally", url);
				// DATA_server.players = await requete_server(server, "player", url);
				DATA_server.towns = await requete_server(server, 'town', url)
			}

			break
		case 'town':
		case '3':
			type = 'town'
			break
	}
	under_title.innerText = 'Stats : ' + type

	await charge_data()


	// console.log(DATA_server.allys);
	// console.log(DATA_server.players);
	// console.log(DATA_server.towns);
	// console.log(type);
	// console.log(id);
	build_table(DATA_server, type, id)
}

async function charge_data() {
	console.log("charge ?")
	try {
		DATA_server.allys[1] != DATA_server.players[1]
		console.log("1")
	} catch (e) {
		// console.log('recharge les datas ' + i + ' ème FOIS');
		DATA_server.allys = await requete_server(server, 'ally', url)
		DATA_server.players = await requete_server(server, 'player', url)
		// DATA_server.towns = await requete_server(server, "town", url);
		console.log(DATA_server.allys[1]._id)
		console.log("2")
		i++
	}
}

async function requete_server(server, type, url) {

	const url_temp = url + '/api/server/' + server + '/' + type
	console.log(url_temp);
	const token55 = localStorage.getItem('token2')
	// console.log(token55)
	const response = await fetch(url_temp, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// 'Authorization': 'Bearer ' + token554,
			'Authorization': 'Bearer ' + token55, //+'aaa',
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify() // body data type must match "Content-Type" header
	})

	return response.json()
}

function build_table(DATA_server, type, id) {

	const table = document.getElementById('table')

	// let DATA_temp;
	const table_top = document.createElement('tr')

	let DATA_ally, DATA_player, DATA_town
	let elt_new
	let media_array
	let magic_input

console.log("aaa");

	switch (type) {
		case ('general'):
			// console.log(server);
			magic_input = document.getElementById('magic_input')
			const input_auto = document.createElement('div')
			// input_auto.innerHTML =
			//     '<form autocomplete="off">' +
			//     '<div class="autocomplete" style="width:300px;">' +
			//     '<input id="myInput" type="text" name="myCountry" placeholder="Country">' +
			//     '</div>' +
			//     '<input type="submit">' +
			//     '</form>';

			input_auto.innerHTML =
				'<div class="autocomplete" style="width:300px;">' +
				'<input id="myInput" type="text" name="myCountry" placeholder="Recherche" autocomplete="off">' +
				'</div>' +
				'<div>' +
				'<button id="recherche_ally">Ally</button>' +
				'<button id="recherche_joueur">Joueur</button>' +
				'</div>'

			magic_input.appendChild(input_auto)
			// console.log(table.parentElement);
			const players_auto = DATA_server.players.map(player => player.Un)
			const allys_auto = DATA_server.allys.map(ally => ally.An)
			const all_auto = players_auto.concat(allys_auto)
			// console.log(all_auto);
			autocomplete(document.getElementById('myInput'), all_auto)
			const myInput = document.getElementById('myInput')
			const recherche_ally = document.getElementById('recherche_ally')
			const recherche_joueur = document.getElementById('recherche_joueur')
			// console.log(myInput.value);
			// console.log(myInput);
			recherche_ally.addEventListener('click', function () {
				magic_input.removeChild(magic_input.lastElementChild)
				change_de_page('ally', myInput.value)
			})
			recherche_joueur.addEventListener('click', function () {
				magic_input.removeChild(magic_input.lastElementChild)
				change_de_page('player', myInput.value)
			})

			function change_de_page(type, name) {
				// console.log(type);
				// console.log(name);

				let id
				switch (type) {
					case ('ally'):
						id = DATA_server.allys.find(ally => ally.An == name)
						id = id.Aid
						break
					case ('player'):
						id = DATA_server.players.find(player => player.Un == name)
						id = id.Uid
						break
				}
				// console.log(id);

				const new_url = window.location.origin + window.location.pathname + '?a=' + server + '&b=' + type + '&c=' + id
				// console.log(new_url)
				// window.location.href = new_url;
				window.history.pushState('data', 'title', new_url)

				main_loop()
			}


			break
		case ('ally'):
			// DATA_temp = DATA_server.allys;
			table_top.innerHTML =
				'<th>Joueur</th>' +
				'<th>Nbr de vivi</th>' +
				'<th>Pop</th>'
			table.appendChild(table_top)
			// console.log(DATA_server.allys);
			DATA_ally = DATA_server.allys.find(ally => ally.Aid == id)
			DATA_player = DATA_server.players.filter(player => player.Aid == id)
			DATA_player.sort((a, b) => b.Pop - a.Pop)
			// console.log(DATA_ally)
			// console.log(DATA_player[0])
			// under_title.innerText = "Alliance " + DATA_ally.An + ' ( ' + DATA_ally.Player.length + ' joueurs )';
			// under_title.innerText = "Alliance " + DATA_player[0].An + ' ( ' + DATA_player.length + ' joueurs )';
			under_title.innerText = 'Alliance ' + DATA_ally.An + ' ( ' + DATA_player.length + ' joueurs )'
			// console.log(DATA_ally)
			// console.log(DATA_ally.An)
			// console.log(DATA_player)
			DATA_player.forEach(player => {
				const element = document.createElement('tr')
				// console.log('==============')
				// console.log(window.location.origin + window.location.pathname + '?a=' + server + '&b=2&c=' + player.Uid)
				element.innerHTML =
					'<td>' +
					// "<a href=\"" + window.location.origin + window.location.pathname + '?a=' + server + '&b=2&c=' + player.Uid + "\">" + player.Un + "</a>" +
					'<a id="' + player.Uid + '" class="create_new_url">' + player.Un + '</a>' +

					'<a href="https://' + server + '/profile/' + player.Uid + '" target="_blank"> \&#8663</a>' +
					'</td>' +
					'<td>' + player.Vivi.length + '</td>' +
					'<td>' + player.Pop + '</td>'
				table.appendChild(element)
				// console.log(table);
			})
			elt_new = document.getElementsByClassName('create_new_url')
			media_array = Object.values(elt_new)

			media_array.forEach(elt => {
				elt.addEventListener('click', function () {
					// window.history.pushState()
					// console.log(this.id)
					var str = window.location.search
					str = replaceQueryParam('b', 2, str)
					str = replaceQueryParam('c', this.id, str)
					// window.location = window.location.pathname + str
					window.history.pushState('data', 'title', window.location.pathname + str)
					table.innerHTML = ''
					main_loop()
				})
			})
			break
		case ('player'):
			// DATA_temp = DATA_server.players;
			table_top.innerHTML =
				'<th>Vivi</th>' +
				'<th>Pop</th>' +
				'<th>Position</th>'
			table.appendChild(table_top)

			DATA_player = DATA_server.players.find(player => player.Uid == id)
			// console.log(DATA_player)
			under_title.innerText = 'Joueur ' + DATA_player.Un + ' ( ' + DATA_player.Vivi.length + ' villages )'
			under_title.innerHTML += '<a href="https://' + server + '/profile/' + DATA_player.Uid + '" target="_blank"> \&#8663</a>'

			DATA_town = DATA_server.towns.filter(town => town.Uid == id)
			DATA_town.sort((a, b) => b.Pop - a.Pop)
			// console.log(DATA_town)

			DATA_town.forEach(town => {
				// console.log(town)
				const element = document.createElement('tr')
				element.innerHTML =
					'<td>' +
					town.Vn +
					// "<a href=\"https://" + server + "/profile/" + town.Uid + "\" target=\"_blank\"> \&#8663</a>" +
					'</td>' +
					'<td>' + town.Pop[town.Pop.length - 1] + '</td>' +
					'<td>' +
					'<a href="https://' + server + '/position_details.php?x=' + town.X + '&y=' + town.Y + '" target="_blank">' + town.X + '/' + town.Y + '</a>'
				'</td>'
				table.appendChild(element)
			})
			const message = document.createElement('div')
			message.innerHTML =
				// "Ally : <a href=\"" + window.location.origin + window.location.pathname + '?a=' + server + '&b=1&c=' + DATA_player.Aid + "\">" + DATA_player.An + "</a>";
				'Ally : <a id="' + DATA_player.Aid + '" class="create_new_url">' + DATA_player.An + '</a>'
			// magic_input.innerHTML =
			//     "Ally : <a id=\"" + DATA_player.Aid + "\" class=\"create_new_url\">" + DATA_player.An + "</a>";
			table.parentElement.appendChild(message)
			// console.log(table.parentElement);

			elt_new = document.getElementsByClassName('create_new_url')
			media_array = Object.values(elt_new)

			media_array.forEach(elt => {
				elt.addEventListener('click', function () {
					// window.history.pushState()
					// console.log(this);
					// console.log(this.id);
					var str = window.location.search
					str = replaceQueryParam('b', 1, str)
					str = replaceQueryParam('c', this.id, str)
					// window.location = window.location.pathname + str
					window.history.pushState('data', 'title', window.location.pathname + str)
					table.innerHTML = ''
					// message.innerHTML = "";
					message.parentElement.removeChild(message.parentElement.lastElementChild)
					// magic_input.parentElement.removeChild(magic_input.parentElement.lastElementChild);
					main_loop()
				})
			})


			break
		case ('town'):
			// DATA_temp = DATA_server.towns;
			break
	}
}

function replaceQueryParam(param, newval, search) {
	var regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?')
	var query = search.replace(regex, '$1').replace(/&$/, '')

	return (query.length > 2 ? query + '&' : '?') + (newval ? param + '=' + newval : '')
}
//= =============================================================================
// const toggle_btn = document.getElementById('toggle_btn')
// console.log(toggle_btn.checked)

// console.log("url : " + url);


// autocomplete(document.getElementById("myInput"), countries);

function autocomplete(inp, arr) {
	/* the autocomplete function takes two arguments,
		the text field element and an array of possible autocompleted values: */
	var currentFocus
	/* execute a function when someone writes in the text field: */
	inp.addEventListener('input', function (e) {
		var a, b, i
		var val = this.value
		/* close any already open lists of autocompleted values */
		closeAllLists()
		if (!val) { return false }
		currentFocus = -1
		/* create a DIV element that will contain the items (values): */
		a = document.createElement('DIV')
		a.setAttribute('id', this.id + 'autocomplete-list')
		a.setAttribute('class', 'autocomplete-items')
		/* append the DIV element as a child of the autocomplete container: */
		this.parentNode.appendChild(a)
		/* for each item in the array... */
		for (i = 0; i < arr.length; i++) {
			/* check if the item starts with the same letters as the text field value: */
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/* create a DIV element for each matching element: */
				b = document.createElement('DIV')
				/* make the matching letters bold: */
				b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'
				b.innerHTML += arr[i].substr(val.length)
				/* insert a input field that will hold the current array item's value: */
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"
				/* execute a function when someone clicks on the item value (DIV element): */
				b.addEventListener('click', function (e) {
					/* insert the value for the autocomplete text field: */
					inp.value = this.getElementsByTagName('input')[0].value
					/* close the list of autocompleted values,
										(or any other open lists of autocompleted values: */
					closeAllLists()
				})
				a.appendChild(b)
			}
		}
	})
	/* execute a function presses a key on the keyboard: */
	inp.addEventListener('keydown', function (e) {
		var x = document.getElementById(this.id + 'autocomplete-list')
		if (x) x = x.getElementsByTagName('div')
		if (e.keyCode == 40) {
			/* If the arrow DOWN key is pressed,
						increase the currentFocus variable: */
			currentFocus++
			/* and and make the current item more visible: */
			addActive(x)
		} else if (e.keyCode == 38) { // up
			/* If the arrow UP key is pressed,
						decrease the currentFocus variable: */
			currentFocus--
			/* and and make the current item more visible: */
			addActive(x)
		} else if (e.keyCode == 13) {
			/* If the ENTER key is pressed, prevent the form from being submitted, */
			e.preventDefault()
			if (currentFocus > -1) {
				/* and simulate a click on the "active" item: */
				if (x) x[currentFocus].click()
			}
		}
	})
	function addActive(x) {
		/* a function to classify an item as "active": */
		if (!x) return false
		/* start by removing the "active" class on all items: */
		removeActive(x)
		if (currentFocus >= x.length) currentFocus = 0
		if (currentFocus < 0) currentFocus = (x.length - 1)
		/* add class "autocomplete-active": */
		x[currentFocus].classList.add('autocomplete-active')
	}
	function removeActive(x) {
		/* a function to remove the "active" class from all autocomplete items: */
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('autocomplete-active')
		}
	}
	function closeAllLists(elmnt) {
		/* close all autocomplete lists in the document,
				except the one passed as an argument: */
		var x = document.getElementsByClassName('autocomplete-items')
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i])
			}
		}
	}
	/* execute a function when someone clicks in the document: */
	document.addEventListener('click', function (e) {
		closeAllLists(e.target)
	})
}
