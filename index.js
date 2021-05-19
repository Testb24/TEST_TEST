/* eslint-disable eqeqeq */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable camelcase */

const toggle_btn = document.getElementById('toggle_btn')
console.log(toggle_btn.checked)

let url
if (toggle_btn.checked) {
  url = 'https://trav-server-0-2.herokuapp.com'
} else {
  url = 'http://localhost:3000'
}
// url = "https://trav-server-0-2.herokuapp.com";
url = 'http://localhost:3000'
console.log(url)

// let general_data;
// load_at_start();

// async function load_at_start() {
//     general_data = await req_general_data_server()
// }

//= =============================================================================
// Affiche le bon doc : se connecter / s'inscrire
//= =============================================================================
const go_co = document.getElementById('change_connecter')
const go_in = document.getElementById('change_inscrire')

const form_co = document.getElementById('form_login')
const form_in = document.getElementById('form_inscription')

const message_validation = document.getElementById('message_validation')
const message_validation_co = document.getElementById('message_validation_co')

form_in.style.display = 'none'

go_co.addEventListener('click', change_screen)
go_in.addEventListener('click', change_screen)

function change_screen () {
  if (this.id == 'change_connecter') {
    form_in.style.display = 'none'
    form_co.style.display = 'flex'
  } else if (this.id == 'change_inscrire') {
    form_in.style.display = 'flex'
    form_co.style.display = 'none'
  }

  message_validation.innerText = ''
  message_validation_co.innerText = ''
}
//= =============================================================================
// Affiche le nom et le bandeau vert/rouge si connecté
//= =============================================================================
document.addEventListener('DOMContentLoaded', se_connecte)

const name_place = document.getElementById('name_place')
const connected_space = document.getElementById('connected_space')
const my_account = document.getElementById('my_account')

function se_connecte () {

  if (localStorage.getItem('name') == 'undefined' ||
        localStorage.getItem('name') == null ||
        localStorage.getItem('name') == ''
  ) {
    name_place.innerText = 'Non connecté'
    connected_space.style.backgroundColor = 'crimson'
    btn_deco.style.visibility = 'hidden'
    form_in.style.display = 'none'
    form_co.style.display = 'flex'
    my_account.style.display = 'none'
  } else {
    name_place.innerText = localStorage.getItem('name')
    connected_space.style.backgroundColor = 'green'
    btn_deco.style.visibility = 'visible'
    form_in.style.display = 'none'
    form_co.style.display = 'none'
    my_account.style.display = 'block'

    while (place_liste_server_joueur.firstChild) {
      place_liste_server_joueur.removeChild(place_liste_server_joueur.lastChild)
    }

    build_liste(false)
  }
}
//= =============================================================================
// Inscription de l'utilisateur
//= =============================================================================
const btn = document.getElementById('btn')

btn.addEventListener('click', Inscription)

const email = document.getElementById('email')
const name2 = document.getElementById('name')
const pass = document.getElementById('pass')

async function Inscription () {

  message_validation.innerText = ''
  message_validation_co.innerText = ''

  const return_from_inscription = await createNewUser(email.value, pass.value, name2.value)

  if (return_from_inscription.message == 'Utilisateur créé !') {
    message_validation.innerText = 'Utilisateur créé !'
  } else if (return_from_inscription.message == 'mail ') {
    message_validation.innerText = 'Veuillez choisir une autre adresse mail'
  } else {
    message_validation.innerText = 'Erreur'
  }
  email.value = ''
  name2.value = ''
  pass.value = ''
}

async function createNewUser (email, password, name) {
  // let johuiu = []
  const obj = {
    email: email,
    password: password,
    name: name,
    serveur: [],
    groupe: []
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
  })

  return response.json()
}
//= =============================================================================
// Connexion de l'utilisateur
//= =============================================================================
const btn2 = document.getElementById('btn2')

btn2.addEventListener('click', Connexion)

const email_login = document.getElementById('email_login')
const pass_login = document.getElementById('pass_login')

async function Connexion () {
  console.log(url)
  message_validation.innerText = ''
  message_validation_co.innerText = ''

  const return_from_connexion = await login(email_login.value, pass_login.value)

  if (return_from_connexion.error == 'user non enregistré !') {
    message_validation_co.innerText = 'user non enregistré !'
  } else if (return_from_connexion.error == 'mdp faux !') {
    message_validation_co.innerText = 'mdp faux !'
  } else {
    message_validation_co.innerText = 'Erreur'
  }

  const token = return_from_connexion.token
  const user = return_from_connexion.userId
  const name = return_from_connexion.name

  localStorage.setItem('token', token)
  localStorage.setItem('token2', token)
  localStorage.setItem('name', name)
  localStorage.setItem('user', user)

  email_login.value = ''
  pass_login.value = ''

  se_connecte()
  build_liste(false)
}

async function login (email, pass) {

  const obj = {
    email: email,
    password: pass
  }

  const token55 = localStorage.getItem('token2')

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
  })

  return response.json()
}
//= =============================================================================
// Déconnexion de l'utilisateur
//= =============================================================================
const btn_deco = document.getElementById('btn_deco')

btn_deco.addEventListener('click', Deconnexion)

function Deconnexion () {
  console.log(url)
  const token3 = ''
  const name3 = ''

  localStorage.setItem('token', token3)
  localStorage.setItem('name', name3)

  se_connecte()

  console.log('index')
  console.log(localStorage.getItem('name'))

  btn_deco.style.visibility = 'hidden'
}
//= =============================================================================
// Construit la page Mon compte (tableau serveurs en cours / dispo)
//= =============================================================================
const place_liste_server_dispo = document.getElementById('place_liste_server_dispo')
const place_liste_server_joueur = document.getElementById('place_liste_server_joueur')

// build_liste(false)

async function build_liste (only_player) {

  const liste_server_joueur = await req_player_data_server()

  if (!only_player) {
    const liste_server_dispo = await req_general_data_server()
    build_liste_html(liste_server_dispo, place_liste_server_dispo, true)
  }

  build_liste_html(liste_server_joueur, place_liste_server_joueur, false)
}

async function req_general_data_server () {

  // let token554 = localStorage.getItem('token2');

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
  })

  return response.json()
}

async function req_player_data_server () {

  // let token554 = localStorage.getItem('token2');
  const name17 = localStorage.getItem('user')

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
  })
  return response.json()
}

function build_liste_html (liste, place, server_list) {
  console.log(url)
  // if (!server_list) {
  while (place.firstChild) {
    place.removeChild(place.lastChild)
  }
  // }

  liste.forEach(serveur => {

    const listItem = document.createElement('li')
    const linkItem = document.createElement('a')

    let temp

    if (serveur.name != undefined) {
      // temp = serveur.name.split('.')[0];
      temp = serveur.name
    } else {
      temp = serveur
    }
    let url_server = window.location.origin + '/server.html?a=' + temp + '&b=0'

    // console.log(window.location.pathname.split('/')[1])
    const temp3 = window.location.pathname.split('/')[1]
    console.log(temp3)
    if (temp3 == 'Test_Trav_0.2') {
      url_server = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/server.html?a=' + temp + '&b=0'
      console.log('change url pour github page')
    }

    console.log('====================')
    console.log(url_server)

    // console.log(window.location.origin);

    linkItem.classList.add('server')
    linkItem.setAttribute('href', url_server)

    linkItem.innerHTML = temp
    linkItem.id = temp
    listItem.appendChild(linkItem)

    if (server_list) {

      const add_icon = document.createElement('span')
      add_icon.innerText = '[+]'
      add_icon.classList.add('close')
      add_icon.addEventListener('click', add_server)


      listItem.appendChild(add_icon)
    }

    place.appendChild(listItem)

  })
}

async function add_server () {
  console.log(this.parentElement.firstChild.id)
  const aaa = await add_server_on_DB(this.parentElement.firstChild.id)
  build_liste(true)
}

async function add_server_on_DB (serveur) {

  let liste_server_joueur_temp = await req_player_data_server()
  const temp4 = liste_server_joueur_temp.push(serveur)
  // uniq = [...new Set(array)];
  liste_server_joueur_temp = [...new Set(liste_server_joueur_temp)]

  const token5546 = localStorage.getItem('token2')
  const name176 = localStorage.getItem('user')

  const obj99 = {
    serveur: liste_server_joueur_temp
  }
  const response = await fetch(url + '/api/travian/' + name176, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Authorization': 'Bearer ' + token5546,
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(obj99) // body data type must match "Content-Type" header
  })

  return response.json()
}
