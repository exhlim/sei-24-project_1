// Cloning my card back
var cardsContainer = document.querySelector(".cardsContainer");
for(let i = 0; i < 17; i++){
    var cloneArr = document.querySelector(".card").cloneNode(true);
    cardsContainer.appendChild(cloneArr);
}
// Cloning my card front


















//for harder difficulty
// cardsContainer.setAttribute("style", "grid-template-columns: repeat(8, auto);")