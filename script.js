// Generate Cards first thing when the page loads
var cardsContainer = document.querySelector(".cardsContainer");
function generateCards(difficulty) {
    cardsContainer.setAttribute("style", "grid-template-columns: repeat(4, auto);")
    if(difficulty == "Standard") {
        for(let i = 0; i < 15; i++) {
            // Cloning the first entire card div
            var clone = document.querySelector(".card").cloneNode(true);
            // Accessing the .icon class which is the image class
            cloneArr.push(clone);
            var iconClass = document.querySelector(".icon");
            // Change the image base on the loop condition
            iconClass.src = "img/ai_logo/" + ((i + 1) % 8) + ".png";
            cardsContainer.appendChild(clone);
        }
    }
    else if(difficulty == "Medium") {
        for(let i = 0; i < 15; i++) {
            var iconClass = document.querySelector(".icon");
            if(i == 0) {
                iconClass.src = "img/medium/01.png";}
            var clone = document.querySelector(".card").cloneNode(true);
            cloneArr.push(clone);
            if(i < 7){
                iconClass.src = "img/medium/0" + ((i + 2)) + ".png";}
            else{
                if((i + 2) % 8 === 0)
                    iconClass.src = "img/medium/18.png";
                else
                    iconClass.src = "img/medium/1" + ((i + 2) % 8) + ".png";}
            cardsContainer.appendChild(clone);
        }
    }
    else {
        for(let i = 0; i < 15; i++) {
            var iconClass = document.querySelector(".icon");
            if(i == 0) {
                iconClass.src = "img/hard/png/01.png";}
            var clone = document.querySelector(".card").cloneNode(true);
            cloneArr.push(clone);
            if(i < 7){
                iconClass.src = "img/hard/png/0" + ((i + 2)) + ".png";}
            else{
                if((i + 2) % 8 === 0)
                    iconClass.src = "img/hard/png/18.png";
                else
                    iconClass.src = "img/hard/png/1" + ((i + 2) % 8) + ".png";}
            cardsContainer.appendChild(clone);
        }
    }
}

// Game Variables
var overlays = document.querySelectorAll(".overlay");
var results = document.querySelectorAll(".results")
var cards = document.querySelectorAll(".card");
var cardFront = document.querySelector(".cardFront");
var choices = document.querySelectorAll(".choices");
var cloneArr = [];
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
        addClickEventToCards();
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
        display = card.getElementsByClassName("icon")["id"].src
        console.log(display)
        return difficulty == "Standard" ? display : (display.match(/[0-9]/gi)|| [])[4];
        // returns an array of the numbers of the user path below and you take the fifth number which is at index 5 then you compare that index
        // number. The index number is representative of the image itself.
        // file:///Users/eugenelim/Desktop/wdi/sei-24-project_1/img/medium/15.png
        // [2, 4, 1, 1, 5]
        // file:///Users/eugenelim/Desktop/wdi/sei-24-project_1/img/medium/05.png
        // [2, 4, 1, 0, 5]
        // console.log(display);
    }


    shuffleCards(){
        // Looping through the entire array starting from the back
        // RandomIndex is generated from 0 to 15, .length -1 so that you dont touch the index 16 fisheryates shuffle
        // Due to nature of Math.random you have to plus 1 so that you can cover all 0 - 15
        for(let i = this.cardsArray.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * (i+1))
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
            console.log("shuffled")
        }
    }
    resetCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("visible")
            card.classList.remove("matched")
        })
    }

    // RATING FUNCTIONS
    ratingCheck(currentMoves) {
        for(let i = 0; i < 3; i++) {
            if(currentMoves > 13 && currentMoves < 18)
                this.ratings[i].textContent = "★ ★ ☆";
            else if(currentMoves >= 18)
                this.ratings[i].textContent = "★ ☆ ☆";
            else if(currentMoves == -1)
                this.ratings[i].textContent = "☆ ☆ ☆";
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
        this.ratingCheck(parseInt(-1));
        setTimeout(this.removeCards, 1000);
    }
    victory() {
        clearInterval(this.countDownRef);
        document.getElementById("victory").classList.add("visible");
        this.ratingCheck(parseInt(this.moves.textContent));
        setTimeout(this.removeCards, 1000);
    }
    removeCards() {
        cloneArr.forEach(clone => {
            clone.remove();
        })
    }
}
choices.forEach(choice => {
    choice.addEventListener("click", () =>{
        difficulty = choice.textContent;
        generateCards(difficulty);
        removeOverlay();
        cards = document.querySelectorAll(".card");
        newGame = new gameStatus(100, cards)
        newGame.initializeNewGame();
    })
})
function  addClickEventToCards() {
        cards.forEach(card => {
            card.addEventListener("click", () => {
                newGame.flipCard(card);
            })
        });
    }
function removeOverlay() {
    overlays.forEach(overlay => {
        overlay.classList.remove("visible");
    })
}
function myFunction() {
    console.log(popup);
    var popup = document.querySelectorAll("#myPopup");
    popup.forEach(text => {
            text.classList.toggle("show");
    })
}