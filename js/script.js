let flippedCard = null;
let cards = null;
let time = 0; 
let timer_on = 0;
let flips = 0;
let matchedCards = [];
let nCards = 0;
let nGames = 0;
let mainGen = document.querySelector("main");
const btn = document.querySelector("button");
const gameIndex = document.querySelector("section");
const cardTypes = [
  "dist/img/fiestaparrot.gif",
  "dist/img/metalparrot.gif",
  "dist/img/revertitparrot.gif",
  "dist/img/ceilingparrot.gif",
  "dist/img/unicornparrot.gif",
  "dist/img/dadparrot.gif",
  "dist/img/brazilianfanparrot.gif",
  "dist/img/evilparrot.gif",
  "dist/img/githubparrot.gif",
  "dist/img/originalparrot.gif",
  "dist/img/parrotnotfound.gif",
  "dist/img/quadparrot.gif",
  "dist/img/transparront.gif",
  "dist/img/gothparrot.gif",
  "dist/img/gentlemanparrot.gif",
  "dist/img/mustacheparrot.gif",
  "dist/img/60fpsparrot.gif",
  "dist/img/biparrot.gif",
  "dist/img/partyblob.gif",
  "dist/img/vibepartycat.gif",
  "dist/img/witnessprotectionparrot.gif",
  "dist/img/partyblob.gif",
  "dist/img/asyncparrot.gif",
  "dist/img/cursedparrot.gif",
  "dist/img/partymoogle.gif",
  "dist/img/stubparrot.gif",
];

startButton();

function gameInit(){
  let mainProto = []; 

  while (nCards < 4 || (nCards % 2) != 0 || nCards > 14){
    nCards = parseInt(prompt("Digite o número de cartas a jogar, sendo ele par entre 4 e 14"));
  }
  gameIndex.children[0].innerText = `Flips: 0`;
  gameIndex.children[1].innerText = `Time: 0`;
  mainGen.innerHTML = "";

  for (let i = 0; i < cardTypes.length; i++){  
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
  startCount();
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
  gameIndex.children[1].innerText = `Time: ${time++}s`;
  timeout = setTimeout(updateTime, 1000);
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
  if (matchedCards.length === cards.length && !nGames){
    stopCount();
    setTimeout(() => {
      alert(`
        Você ganhou em ${flips} jogadas! 
        Tempo de jogo: ${time} segundos`)
      reset();
    }, 300);
  }
  else if (matchedCards.length === cards.length) {
    stopCount();
    setTimeout(() => {
      alert(`
        Você ganhou em ${flips} jogadas! 
        Tempo de jogo: ${time} segundos
        Sequência de vitórias: ${nGames}`);
      reset();
    }, 300);
  }
}
function reset(){
  nGames++;
  flippedCard = null;
  nCards = null;
  cards = null;
  time = 0; 
  flips = 0;
  matchedCards = [];

  if (prompt(`Digite 1 para jogar novamente`) === '1'){
    gameInit();
  }
  else {
    gameIndex.children[0].innerText = `Flips: 0`;
    gameIndex.children[1].innerText = `Time: 0`;

    btn.classList.remove("clicked");
    btn.classList.remove("hidden");
    btn.children[0].innerText = `JOGAR NOVAMENTE`;
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
function startButton(){
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");

    setTimeout(() => {
      btn.classList.add("hidden");
      gameInit();
    }, 300);
  });
}
function startCount() {
  if (!timer_on) {
    timer_on = 1;
    updateTime();
  }
}
function stopCount() {
  console.log("entrou");
  clearTimeout(timeout);
  timer_on = 0;
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