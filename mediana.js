'use strict';

/*

// Funkcija za pridobiti random številko med dvema vrednostima
function getRandomInt(min, max) 
{
    return Math.floor(Math.random()* (max - min) + min);
};

// spremenljivka za pridobljeno random številko med 1 in 1000
let randomInt = getRandomInt(1, 1000);

//spremenljivka za seznam petih številk
let randomArray = [...Array(5)].map(e=>getRandomInt(1, 1000));
console.log(randomArray);

spremenljivka za prikaz  seznamu
 let aLength = randomArray.length;
 let text = "<ul>";
 for (let i = 0; i < aLength; i++) 
 {
   text += "<li>" + randomArray[i] + "</li>";
 }
 text += "</ul>";
 
 //funkcija za dodajanje nove številke v seznam

function updateArray() 
{
 randomArray.push(randomInt)
 console.log(randomArray);
 document.getElementById("updateArray").innerHTML = randomArray;
}
document.getElementById("demo10").innerHTML = randomArray;
*/

// inicializacija seznama

let seznam = [];
for (let i = 0; i < 5; i++) {
  seznam.push(Math.floor(Math.random() * 1000) + 1);
}
prikaziSeznam();
naloziPodatke();

// izbira naključnega elementa za odstranitev
function nakljucniElement() {
  let index = Math.floor(Math.random() * seznam.length);
  return index;
}

// prikaz seznama na strani
function prikaziSeznam() {
  let seznamElement = document.getElementById("seznam");
  seznamElement.innerHTML = "";
  for (let i = 0; i < seznam.length; i++) {
    let li = document.createElement("li");
    li.innerText = seznam[i];
    seznamElement.appendChild(li);
  }
}

// dodajanje naključnega števila na seznam
document.getElementById("dodaj-nakljucno").addEventListener("click", function () {
  seznam.push(Math.floor(Math.random() * 1000) + 1);
  prikaziSeznam();
});

// dodajanje števila, ki ga uporabnik vnese
document.getElementById("dodaj").addEventListener("click", function () {
  let vnos = document.getElementById("dodaj-stevilo").value;
  if (vnos > 0) {
    seznam.push(parseInt(vnos));
    prikaziSeznam();
  }
});

// odstranjevanje naključnega števila iz seznama
document.getElementById("odstrani-nakljucno").addEventListener("click", function () {
  let index = nakljucniElement();
  seznam.splice(index, 1);
  prikaziSeznam();
});

// odstranjevanje vseh elementov iz seznama
document.getElementById("odstrani-vse").addEventListener("click", function () {
  seznam = [];
  prikaziSeznam();
});

// izračunavanje mediane

// izračun mediane
document.getElementById("izracunaj-median").addEventListener("click", function () {
  let payload = {
    data: seznam
  }

  const options = {
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' }
  };
  axios.post("http://127.0.0.1:8000/calculate/", payload, options)
    .then(function (response) {
      return response
      throw new Error("Network response was not ok.");
    })
    .then(function (response) {
      prikaziTabeloMedianov(response.data.value);
    })
    .catch(function (error) {
      console.log("Error:", error.message);
    });
});

// prikaz tabele medianov
function prikaziTabeloMedianov(data) {
  let tabelaElement = document.getElementById("tabela-mediana");
  let vrstica = document.createElement("tr");
  let celica1 = document.createElement("td");
  celica1.innerText = data;
  vrstica.appendChild(celica1);
  tabelaElement.insertBefore(vrstica, tabelaElement.firstChild);
}

function naloziPodatke() {
  const options = {
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' }
  };
  axios.get("http://127.0.0.1:8000/get/", options).
    then(function (response) {
      /*
      response je seznam
      */
      console.log('get data', response)
      const seznam = response.data

      for (let i = 0; i < seznam.length; i++) {
        console.log('element', seznam[i])
        prikaziTabeloMedianov(seznam[i].value);
      }

    })
}


