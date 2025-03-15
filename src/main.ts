import "./style.css";

// Zugriff Rundenanzahl
// const radioButton5 = document.getElementById("radio5");
// const radioButton10 = document.getElementById("radio5");
// const radioButton15 = document.getElementById("radio5");
// const radioButton20 = document.getElementById("radio5");

// Zugriff Ausgabe/Anzeige-Elemente
const user = document.getElementById("user")!;
const spielstand = document.getElementById("spielstand")!;
const computer = document.getElementById("computer")!;
const out = document.getElementById("out")!;

let countRounds: number = 5;

document.querySelectorAll<HTMLInputElement>(".radioBtn").forEach((item) => {
  item.addEventListener("change", () => {
    if (item.checked) {
      countRounds = Number(item.value);
      console.log(countRounds);
    }
  });
});

// Zugriff auf Eingabe-elemente

const schereSteinPapier = document.querySelectorAll<HTMLDivElement>(".token");
const reset = document.querySelector<HTMLButtonElement>(".reset")!;

// Globale Variablen
let clickIndexUser: number;
let zahlUser: number = 0,
  zahlComp: number = 0;
let count: string;

function addEingabeUser() {
  schereSteinPapier.forEach((item, index) => {
    item.addEventListener("click", () => {
      user.style.backgroundImage = getComputedStyle(item).backgroundImage;

      clickIndexUser = index;

      setTimeout(() => addEingabeComputer(), 900);
    });
  });
}

function winGame(userIn: number, compIn: number) {
  if (userIn === compIn) {
    out.innerHTML = "Ups, beide das gleiche !";
    zahlUser++;
    zahlComp++;
  } else if (userIn === 2 && compIn === 1) {
    out.innerHTML = "Schere schneidet Papier!";
    zahlUser++;
  } else if (userIn === 1 && compIn === 0) {
    out.innerHTML = "Papier schlägt Stein!";
    zahlUser++;
  } else if (userIn === 0 && compIn === 2) {
    out.innerHTML = "Stein schlägt Schere";
    zahlUser++;
  } else if (compIn === 2 && userIn === 1) {
    out.innerHTML = "Schere schneidet Papier!";
    zahlComp++;
  } else if (compIn === 1 && userIn === 0) {
    out.innerHTML = "Papier schlägt Stein!";
    zahlComp++;
  } else if (compIn === 0 && userIn === 2) {
    out.innerHTML = "Stein schlägt Schere";
    zahlComp++;
  }

  count = `${zahlUser} : ${zahlComp}`;
  spielstand.innerHTML = count;

  if (zahlComp === countRounds || zahlUser === countRounds) {
    out.innerHTML = " Ende !";
    setTimeout(() => window.location.reload(), 2000);
  }
}

function addEingabeComputer() {
  let randomNumber = Math.floor(Math.random() * 3);
  computer.style.backgroundImage = window.getComputedStyle(
    schereSteinPapier[randomNumber]
  ).backgroundImage;
  winGame(clickIndexUser, randomNumber);
}

function runGame() {
  reset.addEventListener("click", () => history.go(0));

  addEingabeUser();
}

runGame();
