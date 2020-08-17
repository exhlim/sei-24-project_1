// Generate Cards first thing when the page loads
var cardsContainer = document.querySelector(".cardsContainer");
function generateCards(difficulty) {
    if(difficulty == "Easy") {
        for(let i = 0; i < 15; i++) {
            // Cloning the first entire card div
            var cloneArr = document.querySelector(".card").cloneNode(true);
            // Accessing the .icon class which is the image class
            var iconClass = document.querySelector(".icon");
            cardsContainer.setAttribute("style", "grid-template-columns: repeat(4, auto);")
            // Change the image base on the loop condition
            iconClass.src = "img/ai_logo/" + ((i + 1) % 8)+ ".png";
            cardsContainer.appendChild(cloneArr);
        }
    }
    else {
        for(let i = 0; i < 15; i++){
            var cloneArr = document.querySelector(".card").cloneNode(true);
            var iconClass = document.querySelector(".icon");
            cardsContainer.setAttribute("style", "grid-template-columns: repeat(4, auto);")


        }
    }
}

// Game Variables
var overlays = document.querySelectorAll(".overlay");
var results = document.querySelectorAll(".results")
var cards = document.querySelectorAll(".card");
var cardFront = document.querySelector(".cardFront");
var choices = document.querySelectorAll(".choices");
var difficulty;
var display;

// Game class
class gameStatus {
    constructor(time, cards) {
        this.cardsArray = cards;
        this.totalTime = time;
    }
    initializeNewGame(){
        // Add event listener to the results screen
        cards = document.querySelectorAll(".card");
        addClickEventToCards();
        overlays.forEach(overlay => {
            overlay.addEventListener("click", () =>{
                overlay.classList.remove("visible");
            })
        });
        // Reset Moves counter
        this.moves = document.querySelector(".moveCounter");
        this.moves.innerText = 0;
        // Reset Rating counter
        this.ratings = document.querySelectorAll(".ratingCounter");
        this.ratingCheck(parseInt(this.moves.innerText));
        // Reset time counter
        this.timer = document.querySelector(".timeCounter");
        this.timer.innerText = this.totalTime;
        // Reset back all my cards
        this.resetCards();
        // Reset matchedCards array back to 0 and shuffle my cards again
        this.matchedCards = [];
        this.shuffleCards();
        this.cardToBeChecked = null;
        // Start the count down timer
        this.startCountDown();
        this.busy = false;
    }

    // CARD RELATED FUNCTIONS
    flipCard(cardJustClicked) {
        if(this.canFlipCard(cardJustClicked)){
            // Check the rating based on the moves
            this.ratingCheck(parseInt(this.moves.textContent));
            // Makee the card visible
            cardJustClicked.classList.add("visible");

            if(this.cardToBeChecked) {
                this.checkForCardMatch(cardJustClicked)
                // Increase move count
                this.moves.textContent++;
            }
            else {
                this.cardToBeChecked = cardJustClicked;
            }
        }
    }
    canFlipCard(card) {
        // return true;
        return (!this.busy && card !== this.cardToBeChecked && !this.matchedCards.includes(card));
    }
    checkForCardMatch(cardJustClicked) {
        if(this.recognise(cardJustClicked) === this.recognise(this.cardToBeChecked)){
            // add the cardJustClicked and cardToBeChecked to the matched array
            this.matchedCards.push(cardJustClicked);
            this.matchedCards.push(this.cardToBeChecked);
            // add the matched class to the cards
            cardJustClicked.classList.add("matched");
            this.cardToBeChecked.classList.add("matched");
            // reset the cardToBeChecked back to null
            this.cardToBeChecked = null;
            if(this.matchedCards.length === this.cardsArray.length){
                this.victory();
            }
        }
        else {
            this.busy = true;
            //When the card is not matched.
            setTimeout(() =>{
                cardJustClicked.classList.remove("visible");
                this.cardToBeChecked.classList.remove("visible");
                this.cardToBeChecked = null;
                this.busy = false;
            }, 800);

        }
    }
    recognise(card) {
        display = card.getElementsByClassName("icon")["id"].src;
        // console.log(display);
        // console.log((display.match(/[0-9]/gi)|| [])[3]);
        return display;
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
    resetCards() {
        this.cardsArray.forEach(card => {
            console.log("reseting cards")
            card.classList.remove("visible")
            card.classList.remove("matched")
        //     setTimeout(() => {
        //          }, 0);
        })
    }


    // RATING FUNCTIONS
    ratingCheck(currentMoves) {
        for(let i = 0; i < 3; i++) {
            if(currentMoves > 11 && currentMoves < 16)
                this.ratings[i].textContent = "★ ★ ☆";
            else if(currentMoves >= 16)
                this.ratings[i].textContent = "★ ☆ ☆";
            else
                this.ratings[i].textContent = "★ ★ ★";}
    }

    // TIMING FUNCTIONS
    startCountDown() {
        this.countDownRef = setInterval(() => {
            this.timer.innerText--;
            if(this.timer.innerText == "0")
                this.gameOver();
        }, 1000);
    }

    // GAME OVER FUNCTIONS
    gameOver() {
        clearInterval(this.countDownRef);
        document.getElementById("gameOver").classList.add("visible");
        this.ratingCheck(parseInt(this.moves.textContent));
    }
    victory() {
        clearInterval(this.countDownRef);
        document.getElementById("victory").classList.add("visible");
        this.ratingCheck(parseInt(this.moves.textContent));
    }
}
let newGame = new gameStatus(100, cards)
// Add click event to all my overlays
// overlays.forEach(overlay => {
//     overlay.addEventListener("click", () => {
//         overlay.classList.remove("visible");
//         newGame.initializeNewGame();
//     })
// });
choices.forEach(choice => {
    choice.addEventListener("click", () =>{
        difficulty = choice.textContent;
        generateCards(difficulty);
        newGame.initializeNewGame();
    })
})
function addClickEventToCards(){
        cards.forEach(card => {
            card.addEventListener("click", () => {
                newGame.flipCard(card);
        })
    });
}
//start screen will contain 2 buttons 1 with easy and 1 with hard difficult.
// unless they click one of the difficult they wont be able to start the game.











//for harder difficulty