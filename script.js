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
    constructor(time, cards) {
        this.cardsArray = cards;
        this.totalTime = time;
    }
    initializeNewGame(){
        // Reset Moves counter
        this.moves = document.querySelector(".moveCounter");
        this.moves.innerText = 0;
        // Reset Rating counter
        this.ratings = document.querySelector(".ratingCounter");
        this.ratingCheck(parseInt(this.moves.innerText));
        // Reset time counter
        this.timer = document.querySelector(".timeCounter");
        this.timer.innerText = this.totalTime;
        // Reset back all my cards
        this.resetCards();
        // Reset matchedCards array back to 0 and shuffle my cards again
        this.matchedCards = [];
        this.shuffleCards();
    }
    flipCard(card) {
        if(this.canFlipCard(card)){
            this.moves.textContent++;
            this.ratingCheck(parseInt(this.moves.textContent));
            card.classList.add("visible");
        }
    }
    canFlipCard(card) {
        return true;
    }
    shuffleCards(){
        // Looping through the entire array starting from the back
        // RandomIndex is generated from 0 to 15, .length -1 so that you dont touch the index 16 fisheryates shuffle
        // Due to nature of Math.random you have to plus 1 so that you can cover all 0 - 15
        for(let i = this.cardsArray.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * (i+1))
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }
    ratingCheck(currentMoves) {
    if(currentMoves > 11 && currentMoves < 16)
        this.ratings.textContent = "★ ★ ☆";
    else if(currentMoves >= 16)
        this.ratings.textContent = "★ ☆ ☆";
    else
        this.ratings.textContent = "★ ★ ★";
    }
    resetCards() {
        this.cardsArray.forEach(card => {
            card.style.display = "none";
            card.classList.remove("visible")
            card.classList.remove("matched")
            card.style.display = "";
        //     setTimeout(() => {
        //          }, 0);
        })
    }
}
let newGame = new gameStatus(100, cards)
// Add click event to all my overlays
overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
        newGame.initializeNewGame();
    })
});
cards.forEach(card => {
    card.addEventListener("click", () => {
        newGame.flipCard(card);
    })
});












//for harder difficulty
// cardsContainer.setAttribute("style", "grid-template-columns: repeat(8, auto);")