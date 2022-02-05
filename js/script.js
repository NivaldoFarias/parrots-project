let nCards = parseInt(prompt("Quantas cartas?"));
let interval = null, time = 0, flips = 0;
const gameIndex = document.querySelector("section");
let cardsCollection = document.querySelector("main");

gameInit();
const cards = Array.from(document.getElementsByClassName("card"));

shuffleCards(cards);
rotateCards(); //so pode ser chamada apos const cards ser declarada, que por si, so pode ser chamada apos gameInit()

function gameInit(){
  let mainProto = []; 

  while (nCards < 4 || (nCards % 2) != 0 || nCards > 14){
    nCards = parseInt(prompt("Quantas cartas? 4-14 e n pode ser impar"));
  }
  for (let i = nCards/2, j = 0; i > 0; i--, j++){
    const cardTypes = [
      'dist/img/bobrossparrot.gif',
      'dist/img/explodyparrot.gif',
      'dist/img/fiestaparrot.gif',
      'dist/img/metalparrot.gif',
      'dist/img/revertitparrot.gif',
      'dist/img/tripletsparrot.gif',
      'dist/img/unicornparrot.gif'
    ]
    mainProto.push (`
      <div class="card hidden">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="${cardTypes[j]}" alt="papagaio dancando">
        </div>
      </div>
    `);
    mainProto.push (`
      <div class="card hidden">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="${cardTypes[j]}" alt="papagaio dancando">
        </div>
      </div>
    `);
  }
  printCards(mainProto);
}
function printCards(arr){
  arr = shuffleCards(arr);

  for (let i = 0; i < arr.length; i++){
    cardsCollection.innerHTML += arr[i];
  }
}
function rotateCards(){
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('visible');
      updateFlips();
    })
  })
}
function updateFlips(){
  gameIndex.children[0].innerText = `Flips: ${++flips}`;
}
function updateTime(){
  gameIndex.children[1].innerText = `Time passed: ${++time}`;
}
function shuffleCards(arrOfCards){ 
  let index = arrOfCards.length,  randIndex;

    // While there remain elements to shuffle...
    while (index != 0) {

      // Pick a remaining element...
      randIndex = Math.floor(Math.random() * index);
      index--;

      // And swap it with the current element.
      [arrOfCards[index], arrOfCards[randIndex]] = [
        arrOfCards[randIndex], arrOfCards[index]];
    }
  return arrOfCards;
}
function cardType(card){
  return card.children[1].children[0].src; // retorna src do tipo da carta
}

interval = setInterval(updateTime, 1000);

/* 
  A versão da função shuffleCards() foi consultada em: 
    https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  ----------
  Basicamente, utiliza o conceito de randomização ao máximo, seguindo a lógica deste artigo: 
    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  ----------
  Também salvei outras referências sobre o método no README.md deste projeto. É um assunto complexo que exige bastante estudo, já que envolve complexidade de algoritmos.
*/