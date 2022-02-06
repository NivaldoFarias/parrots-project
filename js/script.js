let interval = null; 
let flippedCard = null;
let cards = null;
let time = 0; 
let flips = 0;
let matchedCards = [];
let nCards = parseInt(prompt("Quantas cartas?"));
let mainGen = document.querySelector("main");
const gameIndex = document.querySelector("section");
const cardTypes = [
  'dist/img/bobrossparrot.gif',
  'dist/img/explodyparrot.gif',
  'dist/img/fiestaparrot.gif',
  'dist/img/metalparrot.gif',
  'dist/img/revertitparrot.gif',
  'dist/img/tripletsparrot.gif',
  'dist/img/unicornparrot.gif'
]

gameInit();

function gameInit(){
  let mainProto = []; 
  interval = setInterval(updateTime, 1000);

  while (nCards < 4 || (nCards % 2) != 0 || nCards > 14){
    nCards = parseInt(prompt("Quantas cartas? 4-14 e par"));
  }
  for (let i = 0; i < 7; i++){  
    mainProto.push (`
      <div class="card" data-identifier="card">
        <div class="front-face face" data-identifier="front-face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face" data-identifier="back-face">
          <img src="${cardTypes[i]}" alt="papagaio dancando">
        </div>
      </div>
    `);
    mainProto.push (`
      <div class="card" data-identifier="card">
        <div class="front-face face" data-identifier="front-face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face" data-identifier="back-face">
          <img src="${cardTypes[i]}" alt="papagaio dancando">
        </div>
      </div>
    `);
  }
  printCards(mainProto);
  cards = Array.from(document.getElementsByClassName("card"));

  rotateCard();
}
function printCards(arr){ 
  arr = cardPicker(arr);
  arr = shuffleCards(arr);

  for (let i = 0; i < arr.length; i++){
    mainGen.innerHTML += arr[i];
  }
}
function rotateCard(){
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!(card.classList.contains('blocked'))){
        updateFlips();
        card.classList.toggle('visible');

        if (flippedCard === null) {
          flippedCard = card;
          flippedCard.classList.add('blocked');
        }
        else if (flippedCard !== card){
          checkCards(card);
          victory();
        }
      }
    })
  })
}
function updateFlips(){
  gameIndex.children[0].innerText = `Flips: ${++flips}`;
}
function updateTime(){
  gameIndex.children[1].innerText = `Time: ${++time}s`;
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
function checkCards(card){
  if (cardType(card) === cardType(flippedCard)){
    matchedCards.push(card.classList.add('blocked', 'matched'));
    matchedCards.push(flippedCard.classList.add('blocked', 'matched'));
   
    flippedCard = null;
  }
  else {
    blockAllCards(true);

    setTimeout(() => {
      card.classList.remove('visible');
      flippedCard.classList.remove('visible');
      flippedCard = null;
      blockAllCards(false);
    }, 1000);
  }
}
function blockAllCards(bool){ 
  if (bool){
    cards.forEach((card) => {
      card.classList.add('blocked');
    })
  }
  else {
    cards.forEach((card) => {
      if (!(card.classList.contains('matched'))){
        card.classList.remove('blocked');
      }
    })
  }
}
function victory(){
  if (matchedCards.length === cards.length){
    clearInterval(interval);

    setTimeout(() => {
      alert(`
        Você ganhou em ${flips} jogadas! 
        Tempo de jogo: ${time} segundos`)
      reset();
    }, 300);
  }
}
function reset(){
  const choice = prompt('Deseja jogar novamente? y/n');
  if (choice === 'y'){
    interval = null; 
    flippedCard = null;
    nCards = null;
    cards = null;
    time = 0; 
    flips = 0;
    matchedCards = [];
    mainGen.innerHTML = '';
    interval = setInterval(updateTime, 1000);

    gameIndex.children[0].innerText = `Flips: 0`;
    gameIndex.children[1].innerText = `Time: 0`;

    gameInit();
  }
  else if (choice === 'n'){

  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function cardPicker(arr){
  let newArray = [];
  let indexOfCards = 0;

  for (let i = 0; i < nCards; ){
    indexOfCards = (getRndInteger(0, (arr.length - 2) / 2) * 2);
    newArray[i++] = arr[indexOfCards]; 
    newArray[i++] = arr[indexOfCards + 1]; 
    arr.splice(indexOfCards, 2);
  }
  return newArray;
}

/* 
  A versão da função shuffleCards() foi consultada em: 
    https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  ----------
  Basicamente, utiliza o conceito de randomização ao máximo, seguindo a lógica deste artigo: 
    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  ----------
  Também salvei outras referências sobre o método no README.md deste projeto. É um assunto complexo que exige bastante estudo, já que envolve complexidade de algoritmos.
*/