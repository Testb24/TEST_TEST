// const url = "http://localhost:3000";
// const url = "https://test-trav.herokuapp.com";
// const url = "https://trav-server-0-2.herokuapp.com";
// let url = 'http://localhost:3000';
let url = 'ok';
// url = "https://trav-server-0-2.herokuapp.com";

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//POST DATA test avec une array
const btn_test = document.getElementById("TEST_TEST");

btn_test.addEventListener("click", function () { test_test(url) });
function test_test(url) {
    console.log("ok test_test =====XXX");

    let data98 = { Pop: 222, _id: '178' };
    // let url89 = "http://localhost:3000/api/server/ts7.x1.europe.travian.com/sql/array"
    let url89 = "http://localhost:3000/api/server/ts7.x1.europe.travian.com/test/test"
    url89 = url + "/api/server/ts7.x1.europe.travian.com/test/test"
    console.log("pry")
    console.log(url89)
    // postArray(url89, data98)
}

async function postArray(url = '', data = []) {

    const response = await fetch(url, {
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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // console.log("data_saved")
    return response.json(); // parses JSON response into native JavaScript objects
}



// const btn_test = document.getElementById("TEST_TEST");
const btn_local = document.getElementById("LOCAL_LOCAL");
const btn_enLigne = document.getElementById("ENLIGNE_ENLIGNE");
// btn_test.addEventListener("click", function () { test_test() });
btn_local.addEventListener("click", function () { maj_url(true) });
btn_enLigne.addEventListener("click", function () { maj_url(false) });


const sortie = document.getElementById("SORTIE_SORTIE");

const maj_url = (local) => {
    if (local) {
        url = 'http://localhost:3000';
    } else {
        url = 'https://rocky-citadel-04936.herokuapp.com/';
    }

    sortie.value = url

    return url
}