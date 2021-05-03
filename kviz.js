let moznost = document.getElementById("odpovedi");
let indexOtazky;
let pocetSpravnychOdpovedi;
let poleOdpovedi = [];
let seznamOtazek = [
  {
    textOtazky: "Jak se jmenuje její pes?",
    mozneOdpovedi: ["Ramba", "Mamba", "Namba"],
    spravnaOdpoved: 1,
  },
  {
    textOtazky: "Kolik je jí let na fotce?",
    mozneOdpovedi: ["5", "8", "25"],
    spravnaOdpoved: 1,
  },
  {
    textOtazky: "Jaká je její nejoblíbenější barva?",
    mozneOdpovedi: ["cyklámenová", "hořčicová", "petrolejová"],
    spravnaOdpoved: 2,
  },
  {
    textOtazky: "Jaké je její povolání?",
    mozneOdpovedi: ["Učitelka", "Kadeřnice", "Oděvní návrhář"],
    spravnaOdpoved: 2,
  },
  {
    textOtazky: "Kolik v životě chovala dětí?",
    mozneOdpovedi: ["10", "7", "3"],
    spravnaOdpoved: 2,
  },
];
window.onload = function nacteniStranky() {
  indexOtazky = 0;
  pocetSpravnychOdpovedi = 0;
  novaOtazka(indexOtazky);
};

function novaOtazka(iOtazky) {
  let otazkaObj = seznamOtazek[iOtazky];
  let titulekOtazky = document.getElementById("otazka");
  titulekOtazky.innerHTML = otazkaObj.textOtazky;
  let cisloOtazky = document.getElementById("cislo");
  cisloOtazky.innerHTML = iOtazky + 1;
  let jednotliveOdpovedi = document.getElementById("odpovedi");
  while (jednotliveOdpovedi.firstChild) {
    jednotliveOdpovedi.removeChild(jednotliveOdpovedi.lastChild);
  }

  for (let i = 0; i < seznamOtazek[iOtazky].mozneOdpovedi.length; i++) {
    let odpoved = document.createElement("li");
    odpoved.setAttribute("id", "odpoved" + i);
    odpoved.onclick = stiskMoznosti;
    odpoved.innerHTML = seznamOtazek[iOtazky].mozneOdpovedi[i];
    jednotliveOdpovedi.appendChild(odpoved);
  }
}

function stiskMoznosti(e) {
  let indexOdpovedi = e.srcElement.getAttribute("id").replace("odpoved", "");
  let spravnaOdpoved = seznamOtazek[indexOtazky].spravnaOdpoved;
  let vysledek = indexOdpovedi == spravnaOdpoved;

  console.log(vysledek);
  if (vysledek == true) {
    pocetSpravnychOdpovedi++;
  }

  poleOdpovedi[indexOtazky] = indexOdpovedi;

  console.log(pocetSpravnychOdpovedi);

  if (indexOtazky == seznamOtazek.length - 1) {
    ukazVysledek();
  } else {
    dalsiOtazka();
  }
}

function dalsiOtazka() {
  indexOtazky++;
  novaOtazka(indexOtazky);
  let fotka = document.getElementById('obrazek');
  if (indexOtazky == 1){
    
    fotka.src = '/obrazky/DSC_0001.JPG';
  }
  else if (indexOtazky == 2)
  {fotka.src = '/obrazky/saty.png';}
  else if (indexOtazky == 3)
  {fotka.src = '/obrazky/povolani.jpeg';}
  else if (indexOtazky == 4)
  {fotka.src = '/obrazky/dite.jpg';}
}

function ukazVysledek() {
  //document.getElementById("kviz").innerHTML = "";
  document.getElementById("kviz").style.display = "none";
  document.querySelector(".konecne-vysledky").style.display = "inline";
  //let konecneOdpovedi = document.getElementById('vysledek');
  document.getElementById("vysledek-h2");
  let vysledkyDiv = document.getElementById("konecne-odpovedi");

  for (let i = 0; i < seznamOtazek.length; i++) {
    let otazksaObj = seznamOtazek[i];
    let divOtazka = document.createElement("div");

    let nadpisOtazky = document.createElement("li");
    nadpisOtazky.classList.add('polozky');
    nadpisOtazky.classList.add("otazka");
    nadpisOtazky.innerHTML = otazksaObj.textOtazky;
    divOtazka.appendChild(nadpisOtazky);

    let tvojeOdpoved = document.createElement("li");
    tvojeOdpoved.classList.add('polozky');
    let tvojeVolba = seznamOtazek[i].mozneOdpovedi[poleOdpovedi[i]];
    tvojeOdpoved.innerHTML = "Tvoje odpověď: " + tvojeVolba;
    divOtazka.appendChild(tvojeOdpoved);

    let spravnostOdpovedi = document.createElement("li");
    spravnostOdpovedi.classList.add('polozky');
    let spravnost = seznamOtazek[i].spravnaOdpoved == poleOdpovedi[i];
    if (spravnost) {
      spravnostOdpovedi.innerHTML = "Tato odpověď je správně";
    } else {
      spravnostOdpovedi.innerHTML =
        "Správná odpověď: " +
        seznamOtazek[i].mozneOdpovedi[seznamOtazek[i].spravnaOdpoved];
    }
    divOtazka.appendChild(spravnostOdpovedi);

    vysledkyDiv.appendChild(divOtazka);
  }

  let pocetSpravnychOdpovediVypis = document.getElementById("vyhodnoceni");
  let vypocetProcent = (pocetSpravnychOdpovedi / seznamOtazek.length) * 100;
  pocetSpravnychOdpovediVypis.innerHTML =
    "Správně je " +
    pocetSpravnychOdpovedi +
    " z " +
    seznamOtazek.length +
    " otázek. " +
    "Úspěšnost " +
    vypocetProcent +
    " %.";
}
