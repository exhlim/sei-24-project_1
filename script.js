// Generate Cards first thing when the page loads
var cardsContainer = document.querySelector(".cardsContainer");
for(let i = 0; i < 15; i++) {
    // Cloning the first entire card div
    var cloneArr = document.querySelector(".card").cloneNode(true);
    // Accessing the .icon class which is the image class
    var iconClass = document.querySelector(".icon");
    // Change the image base on the loop condition
    iconClass.src = "img/ai_logo/" + ((i + 1) % 8)+ ".png";
    cardsContainer.appendChild(cloneArr);
}

// Game Variables
var overlays = document.querySelectorAll(".overlay");
var cards = document.querySelectorAll(".card");
var cardFront = document.querySelector(".cardFront");

// Game class
class gameStatus {
    constructor(time, card) {

    }
}



// Add click event to all my overlays
overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
        // initializegame();
    })
});
cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("visible");
    })
});














//for harder difficulty
// cardsContainer.setAttribute("style", "grid-template-columns: repeat(8, auto);")