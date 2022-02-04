let nCards = parseInt(prompt("Quantas cartas?"));

gameInit();
rotate();

function gameInit(){
  while (nCards < 4){
    nCards = parseInt(prompt("Quantas cartas? 4-14"));
  }
  for (let i = nCards; i > 0; i--){
    let cards = document.querySelector("main");

    cards.innerHTML += `
      <div class="card">
        <div class="front-face face">
          <img src="dist/img/front.png" alt="papagaio">
        </div>
        <div class="back-face face">
          <img src="dist/img/bobrossparrot.gif" alt="papagaio bob ross dancando">
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
    })
  })
}
