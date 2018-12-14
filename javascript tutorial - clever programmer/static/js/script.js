(function () {

    document.getElementById("challengeOneStart").onclick = function () {
        var challengeOneResult = document.getElementById("challengeOneResult");
        var birthYear = prompt('What is the year of your birth?');
        var ageInDays = calculateAgeInDays(birthYear);
        var h1 = document.createElement('h1');
        var answer = document.createTextNode("You are " + ageInDays + " days old!");
        h1.setAttribute('id', 'ageInDays');
        h1.appendChild(answer);
        challengeOneResult.appendChild(h1);
    };

    document.getElementById("challengeOneReset").onclick = function () {
        var challengeOneResult = document.getElementById("challengeOneResult");
        document.getElementById('ageInDays').remove();
    };

    function calculateAgeInDays(birthYear) {
        return (new Date().getFullYear() - birthYear) * 365;
    }

    //challenge 2: generate cats
    document.getElementById("generateCats").onclick = function () {
        var challengeTwoResult = document.getElementById("challengeTwoResult");
        var img = document.createElement('img');
        img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
        img.classList.add("catImage");
        challengeTwoResult.appendChild(img);
    }
})();

//challenge 3: rock paper scissors
function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice); //[0, 1] human lost | bot won
    var message = finalMessage(results); //you won
    rpsFrontEnd(yourChoice.id, botChoice, message); //{message: 'You won!', 'color': 'green'}   
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore == 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore == 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' };
    }
    else {
        return { 'message': 'You won!', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    //lets remove images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice]
        + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice]
        + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color']
        + "; font-size= 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"

    document.getElementById('rockPaperScissorsChoices').append(humanDiv);
    document.getElementById('rockPaperScissorsChoices').append(messageDiv);
    document.getElementById('rockPaperScissorsChoices').append(botDiv);
}

//CHALLENGE3: Code below this was most of my implementation before I was ready to see how Qazi did it
// var rockPaperScissorsChoices = 
// [
//     'rock',
//     'paper',
//     'scissors'
// ];

// function PlayRockPaperScissors(playerChoice){
//     debugger;
//     //not inclusive of upper range will return 0-2
//     var computerChoiceNumber = Math.floor(Math.random() * 3) 
//     var computerChoice = rockPaperScissorsChoices[computerChoiceNumber];
//     console.log(computerChoice);
//     determineWinOrLoss(playerChoice, computerChoice);
// }

// function determineWinOrLoss(playerChoice, computerChoice){
//     var playerWon = false;
//     var tie = false;
//     if (playerChoice == computerChoice){
//         tie = true;
//     }
//     else
//     {
//         switch (playerChoice)
//         {
//             case 'rock':
//             if (computerChoice == 'scissors'){
//                 playerWon = true;
//             }
//             break;

//             case 'paper':
//             if (computerChoice == 'rock'){
//                 playerWon = true;
//             }

//             case 'scissors':
//             if (computerChoice == 'paper'){
//                 playerWon = true;
//             }
//         }
//     }
//     processRockPaperScissorsResults(playerChoice, computerChoice, playerWon, tie)

// }

// function processRockPaperScissorsResults(playerChoice, computerChoice, playerWon, tie){
//     var rockChoice = document.getElementById('rockChoice');
//     var paperChoice = document.getElementById('paperChoice');
//     var scissorsChoice = document.getElementById('scissorsChoice');

//     if (playerWon){
//         rockChoice.style.boxShadow = '2px 2px 5px 5px green'
//         scissorsChoice.style.boxShadow = '2px 2px 5px 5px red'

//     }
//     else if (tie){
//         console.log('tie');
//     }
//     else{
//         console.log('you lost!');
//     }
// }


// <!--Challenge 4-->: Change the color of all buttons
/*
    My basic solution before looking at the answer:

    1) store document.getElementsByTagName('button') into a variable
    2) create empty array for original button classes
    3) loop through the array created in #1 and push each class name to 
    the empty array in #2.

    This will preserve each buttons className in order since the getElements 
    walks the DOM from the first tag to the last it finds.

    4) To change button colors you just need to loop through the array in #1
    and change the className to a random choice.

    5) When you want to reset every button the original color just loop 
    through the array in #1 and change its className to the className at the
    same index in the array in #2.

    EX: for (var i = 0; i < buttons.length; i++){
    buttons[i].className = buttonColorsInOrder[i];
}
*/


///QAZI SOLUTION BELOW
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value == 'red') {
        buttonsRed();
    }
    else if (buttonThingy.value == 'green') {
        buttonsGreen();
    }
    else if (buttonThingy.value == 'reset') {
        buttonColorReset();
    }
    else if (buttonThingy.value == 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for (let i = 0; i < all_buttons.length; i++) {
        var random = Math.floor(Math.random() * 4);
        console.log(random);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random]);
    }
}

// Challenge 5: Blackjack
//Who can get closet to 21 without going over (hit for draw card, stand for wait).

let blackJackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': [
        { cardNumber: '2', cardValue: 2, cardImage: 'static/images/2.png' },
        { cardNumber: '3', cardValue: 3, cardImage: 'static/images/3.png' },
        { cardNumber: '4', cardValue: 4, cardImage: 'static/images/4.png' },
        { cardNumber: '5', cardValue: 5, cardImage: 'static/images/5.png' },
        { cardNumber: '6', cardValue: 6, cardImage: 'static/images/6.png' },
        { cardNumber: '7', cardValue: 7, cardImage: 'static/images/7.png' },
        { cardNumber: '8', cardValue: 8, cardImage: 'static/images/8.png' },
        { cardNumber: '9', cardValue: 9, cardImage: 'static/images/9.png' },
        { cardNumber: '10', cardValue: 10, cardImage: 'static/images/10.png' },
        { cardNumber: 'K', cardValue: 10, cardImage: 'static/images/K.png' },
        { cardNumber: 'J', cardValue: 10, cardImage: 'static/images/J.png' },
        { cardNumber: 'Q', cardValue: 10, cardImage: 'static/images/Q.png' },
        { cardNumber: 'A', cardValue: [11, 1], cardImage: 'static/images/A.png' },
    ],
    'gameScore': { wins: 0, losses: 0, draws: 0 },
    'isStandingMode': false,
    'allTurnsOver': true,
}

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const HITSOUND = new Audio('static/sounds/swish.m4a');
const WINSOUND = new Audio('static/sounds/cash.mp3');
const LOSESOUND = new Audio('static/sounds/aww.mp3');
const TIESOUND = new Audio('static/sounds/swish.m4a')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit() {
    if (!blackJackGame['isStandingMode'])
    {
        blackJackGame['allTurnsOver'] = false;
        showCard(YOU);
    }
}

function blackjackStand() {
    if (!blackJackGame['isStandingMode']){
        if (YOU['score'] > 0){
            blackJackGame['isStandingMode'] = true;
            dealerPlay();
        }
    }
}


function showCard(activePlayer) {
    if (activePlayer['score'] < 21){
        var randomCard = generateRandomCard();
        let cardImage = document.createElement('img');
        cardImage.src = randomCard.cardImage;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HITSOUND.play();
        updateScore(randomCard, activePlayer);
    }
}

function blackjackDeal() {
    if (blackJackGame['allTurnsOver']){
        blackJackGame['isStandingMode'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
    
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
    
        document.querySelector('#blackjack-result').innerHTML = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = 'black';
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scoreSpan']).innerHTML = 0;
        document.querySelector(DEALER['scoreSpan']).innerHTML = 0;
        document.querySelector(YOU['scoreSpan']).style.color = "";
        document.querySelector(DEALER['scoreSpan']).style.color = "";
    }
}

function generateRandomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function dealerPlay() {
    if (shouldDealerHitAgain(DEALER)) {
        showCard(DEALER);
        setTimeout(dealerPlay, 1000);
    }
    else {
        determineWinner();
    }

}

function updateScore(card, activePlayer) {
    if (card.cardNumber == 'A') {
        if (activePlayer['score'] + card.cardValue[0] > 21) {
            activePlayer['score'] += card.cardValue[1];
        }
        else {
            activePlayer['score'] += card.cardValue[0];
        }
    }
    else {
        activePlayer['score'] += card.cardValue
    }
    showScore(activePlayer);
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).innerHTML = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score'];
    }
}
//Main AI logic
function shouldDealerHitAgain(activePlayer) {
    let AIRiskTolerance = .65;
    let amountLeftBefore21 = 21 - activePlayer['score'];
    let chanceOfLosing = calculateProbabilityOfLosing(amountLeftBefore21);
    var shouldHitAgain = chanceOfLosing <= AIRiskTolerance;
    return shouldHitAgain;
}

function calculateProbabilityOfLosing(amountBefore21) {
    var countOfLosingCards = 0;
    for (var i = 0; i < blackJackGame['cards'].length; i++) {
        if (blackJackGame['cards'][i].cardValue > amountBefore21) {
            countOfLosingCards++;
        }
    }
    return countOfLosingCards / blackJackGame['cards'].length;
}

function determineWinner() {
    var isYourScoreOver21 = YOU['score'] > 21;
    var isDealerScoreOver21 = DEALER['score'] > 21;
    var tied = false;
    var playerWon = true;

    if (!isYourScoreOver21 && YOU['score'] > DEALER['score'] ||
        !isYourScoreOver21 && isDealerScoreOver21) {
        showGameResults(playerWon, tied);
    }
    else if (!isDealerScoreOver21 && DEALER['score'] > YOU['score'] ||
        !isDealerScoreOver21 && isYourScoreOver21) {
        playerWon = false;
        showGameResults(playerWon, tied);
    }
    else {
        tied = true;
        playerWon = false;
        showGameResults(playerWon, tied);
    }
}

function showGameResults(playerWon, playerTied) {
    if (playerTied) {
        document.querySelector('#blackjack-result').innerHTML = 'You tie!'
        document.querySelector('#blackjack-result').style.color = 'gold';
        TIESOUND.play();
        blackJackGame['gameScore']['draws']++;
        document.querySelector('#draws').innerHTML = blackJackGame['gameScore']['draws'];
    }
    else if (playerWon) {
        document.querySelector('#blackjack-result').innerHTML = 'You win!'
        document.querySelector('#blackjack-result').style.color = 'green';
        WINSOUND.play();
        blackJackGame['gameScore']['wins']++;
        document.querySelector('#wins').innerHTML = blackJackGame['gameScore']['wins'];
    }
    else if (!playerWon) {
        document.querySelector('#blackjack-result').innerHTML = 'You lose!'
        document.querySelector('#blackjack-result').style.color = 'red';
        LOSESOUND.play();
        blackJackGame['gameScore']['losses']++;
        document.querySelector('#losses').innerHTML = blackJackGame['gameScore']['losses'];
    }
    startNewRound();
}

function startNewRound(){
    blackJackGame['allTurnsOver'] = true;
}