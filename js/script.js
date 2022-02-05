let nCards = parseInt(prompt("Quantas cartas?"));
let interval = null; 
let time = 0; 
let flips = 0;
let cardsCollection = document.querySelector("main");
let flippedCard = null;
let matchedCards = [];
const gameIndex = document.querySelector("section");

gameInit();
const cards = Array.from(document.getElementsByClassName("card")); //so pode ser declarada apos chamar gameInit() 
rotateCard(); //so pode ser chamada apos declarar const cards

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
      <div class="card">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="${cardTypes[j]}" alt="papagaio dancando">
        </div>
      </div>
    `);
    mainProto.push (`
      <div class="card">
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
  gameIndex.children[1].innerText = `Time passed: ${++time}s`;
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
    setTimeout(() => {
      alert(`
        Você ganhou em ${flips} jogadas! 
        Tempo total: ${time} segundos`)
    }, 300);
    
  }
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