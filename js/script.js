let nCards = parseInt(prompt("Quantas cartas?"));
let flips = 0;
const gameIndex = document.querySelector("section p");

gameInit();
rotate();

function gameInit(){
  while (nCards < 4 || (nCards % 2) != 0){
    nCards = parseInt(prompt("Quantas cartas? 4-14 e n pode ser impar"));
  }
  for (let i = nCards/2, j = 0; i > 0; i--, j++){
    let cards = document.querySelector("main");
    const cardTypes = [
      'dist/img/bobrossparrot.gif',
      'dist/img/explodyparrot.gif',
      'dist/img/fiestaparrot.gif',
      'dist/img/metalparrot.gif',
      'dist/img/revertitparrot.gif',
      'dist/img/tripletsparrot.gif',
      'dist/img/unicornparrot.gif'
    ]

    cards.innerHTML += `
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
function rotate(){
  const cards = Array.from(document.getElementsByClassName("card"));

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('visible');
      updateIndex();
    })
  })
}
function updateIndex(){
  gameIndex.innerText = `Flips: ${++flips}`;
}

