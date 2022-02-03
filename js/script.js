let nCards = parseInt(prompt("Quantas cartas?"));

gameInit();

function gameInit(){
  while (nCards < 4){
    nCards = parseInt(prompt("Quantas cartas? 4-14"));
  }
  for (let i = nCards; i > 0; i--){
    let collection = document.querySelector("main");

    collection.innerHTML += `
      <div class="card">
        <div class="front-face face"><img src="dist/img/front.png" alt="papagaio"></div>
        <div class="back-face face"><img src="dist/img/bobrossparrot.gif" alt="papagaio bob ross dancando"></div>
      </div>
    `;
  }
}
