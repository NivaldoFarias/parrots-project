let nCards = parseInt(prompt("Quantas cartas?"));
let interval = null, time = 0, flips = 0;
const gameIndex = document.querySelector("section");

gameInit();
const cards = Array.from(document.getElementsByClassName("card"));

rotateCard();



function gameInit(){
  while (nCards < 4 || (nCards % 2) != 0){
    nCards = parseInt(prompt("Quantas cartas? 4-14 e n pode ser impar"));
  }
  for (let i = nCards/2, j = 0; i > 0; i--, j++){
    let collection = document.querySelector("main");
    const cardTypes = [
      'dist/img/bobrossparrot.gif',
      'dist/img/explodyparrot.gif',
      'dist/img/fiestaparrot.gif',
      'dist/img/metalparrot.gif',
      'dist/img/revertitparrot.gif',
      'dist/img/tripletsparrot.gif',
      'dist/img/unicornparrot.gif'
    ]

    collection.innerHTML += `
      <div class="card">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="${cardTypes[j]}" alt="papagaio dancando">
        </div>
      </div>
      <div class="card">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="${cardTypes[j]}" alt="papagaio dancando">
        </div>
      </div>
    `;
  }
}
function rotateCard(){
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

interval = setInterval(updateTime, 1000);
