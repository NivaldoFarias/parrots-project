let nCards = parseInt(prompt("Quantas cartas?"));

for (let i = nCards; i > 0; i--){
  let collection = document.querySelector("main");

  collection.innerHTML += `
    <div class="card"><img src="dist/img/front.png" alt="papagaio"></div>
  `;
}

