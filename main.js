$().ready(initiateGame);

//global variables
var first_card_clicked =null;
var second_card_clicked = null;
var cardOrder = ['attack','attack','shield','bahamut','doubleStrike','tripleStrike','heal','doubleStrike','tripleStrike'];

var currentPlayerTurn = true; //true is player 1
var screenClickable = false; // player notificatin will turn this into true. for player 1.

var player1 = new Player('Player 1', '#player1');
var player2 = new Player('Player 2', '#player2');
var totalPlayers = [player1,player2];
var targetPlayer;
var currentPlayer;
var playerDeath = false;

var backgroundMusic = new Audio("audio/Ayako Saso_Painful Battle.mp3");
backgroundMusic.loop = true;
backgroundMusic.autoplay = true;



function initiateGame() {
    addEventHandler();
    randomizeCardOrderArr();
    addImageAddressToCard();
}

function addEventHandler() {
    $('.game-area').on('click', '.card', flipCardToFront);
    $('#reset').on('click', resetGame);
    $('#toggleMusic').on('click', backgroundMusicButton);
    $('#introStartButton').on('click', startGameButton);
}

function startGameButton(){
    $('#introModal').hide();
    backgroundMusic.play();
    currentPlayerPositionNotification();

}

function randomizeCardOrderArr(){
    var newArrayOrder = [];
    var cardOrderLength = cardOrder.length-1;

    while(newArrayOrder.length <= cardOrderLength){
        var rndNumber = Math.floor(Math.random()*cardOrder.length);

        newArrayOrder.push(cardOrder[rndNumber]);
        cardOrder.splice([rndNumber],1);
    }
    cardOrder = newArrayOrder;
}

function addImageAddressToCard() {
    var cards = $('.game-area .card > .back');
    for (var i = 0; i< cards.length; i++) {
        $(cards[i]).attr('src', cardName[cardOrder[i]].address)//<img>
    }
}

function flipCardToFront() {
    var cardType = null;

    if (!screenClickable){ // if false then exit// it starts true.
        return;
    }


    var currentCard = $(this);
    cardType = checkCardName($(currentCard).find('img').attr('src'));

    if (first_card_clicked === null && currentCard.hasClass('revealed')=== false){
        currentCard.addClass('revealed'); // reveal the current card by adding class.
        // here we check card ability
        if (cardType != 'attack') {
            screenClickable = !screenClickable;
            activateCardAbility(cardType);
            setTimeout(displayCard, 500, $(currentCard).find('img').attr('src')); //this will display a card.
            return
        }
        first_card_clicked = currentCard;

    }else if (currentCard.hasClass('revealed')=== false){
        screenClickable = !screenClickable; // turn off clickablity
        second_card_clicked = currentCard;
        currentCard.addClass('revealed'); // reveal the current card by adding class.

        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')){
            //really a check to see if attack matches.
            activateCardAbility(cardType);
            resetPlayerAbilitys(); //round is over reset abilities.
            setTimeout(displayCard, 500, $(first_card_clicked).find('img').attr('src'));// ('#cardModal');
            //this is for attack only
            //do attack damage. to target player.
            setTimeout(resetDeck, 2000); // at 2000ms is when the player notification will be called. when that happens reset deck.

        }else{
            cardType = checkCardName($(currentCard).find('img').attr('src'));
            if (cardType === 'bahamut') {
                activateCardAbility(cardType);
                setTimeout(displayCard, 500, $(currentCard).find('img').attr('src')); //this will display a card.
            }else{
                setTimeout(flipCardToBack, 1000, first_card_clicked, second_card_clicked);
            }
        }
    }
}

function flipCardToBack(jQueryElement1,jQueryElement2) {
    $(jQueryElement1).removeClass('revealed');
    $(jQueryElement2).removeClass('revealed');
    resetFirstandSecondCardVar();
}

function resetGame() {
    resetDeck();
    player1.resetPlayerHealth();
    player2.resetPlayerHealth();
    resetPlayerAbilitys();
    playerDeath = false;
    resetFirstandSecondCardVar();
    updatePlayerStats();
    
}

function resetDeck(){
    //flip all cards
    flipAllCardsOver();
    //randomize all cards
    randomizeCardOrderArr();
    setTimeout(addImageAddressToCard, 300);
}

function flipAllCardsOver(){
    var allCards = $('.card');
    for (var i = 0; i < allCards.length; i++){
        $(allCards[i]).removeClass('revealed');
    }
}

function resetFirstandSecondCardVar() {
    first_card_clicked = null;
    second_card_clicked = null;
    currentPlayerTurn = !currentPlayerTurn;
    currentPlayerPositionNotification(); // this will notify who should pick next.
}

function displayCard(_inputCardSrc){
    $('#imgCardModal').attr('src', _inputCardSrc);
    toggleModal('#cardModal')
    setTimeout(toggleModal, 1500,'#cardModal'); //un toggle modal

    //this finds card name so we can call the sound via card.
    var cardType = checkCardName(_inputCardSrc);
    cardName[cardType].sound();

    updatePlayerStats(); // this updates player stats at the end of each attack or display
    if(playerDeath === true){
        //set winner modal
        setTimeout(announceWinner,2000);
        return;
    }
    setTimeout(resetFirstandSecondCardVar,2000); // gives a sec before announcing player turn

}

function announceWinner() {
    // check who died.
    //show modal.
    //time out modal and reset game.
    if (player1.health <= 0 && player2.health <=0){
        $('#winnerModalName').text('Its a tie!');
    }else if(player1.health <= 0 ){
        $('#winnerModalName').text(player2.name);
    }else{
        $('#winnerModalName').text(player1.name);
    }
    toggleModal('#winnerModal');
    setTimeout(toggleModal,5000,'#winnerModal');
    setTimeout(resetGame,5500);
}

function currentPlayerPositionNotification(){
    screenClickable = true;// allows player to click again afterwards.

    if (currentPlayerTurn){
        targetPlayer = player2;
        currentPlayer = player1;
        toggleModal('#modalPlayer1');
        $('#player1 h1').addClass('underLineText');
        $('#player2 h1').removeClass('underLineText');
        setTimeout(toggleModal,1500,'#modalPlayer1');
    }else{
        targetPlayer = player1;
        currentPlayer = player2;
        toggleModal('#modalPlayer2');
        $('#player2 h1').addClass('underLineText');
        $('#player1 h1').removeClass('underLineText');
        setTimeout(toggleModal,1500,'#modalPlayer2');
    }
}

function updatePlayerStats(){
    for (var i = 0; i < 2; i++){
        totalPlayers[i].updateStatDisplay();
    }
}

function resetPlayerAbilitys(){
    for (var i = 0; i < 2; i++){
        totalPlayers[i].resetPlayerStats();
    }
}

function toggleModal( _string ) {
    var display = $(_string).css('display');
    if (display === 'none'){
        $(_string).show();
    }else{
        $(_string).hide();
    }
}

function checkCardName(_inputImageSrc){
    // input img src as a string
    // return's string with no file location and .jpg
    var stringArray = _inputImageSrc.split('/')[2];
    var cardName = stringArray.split('C')[0];
    return cardName;
}

function activateCardAbility(_cardName) {
    cardName[_cardName].ability(); // simpliy calls card ability.
}

function backgroundMusicButton() {
    $('#toggleMusic').toggleClass('strikeThrough');
    debugger;
    if(backgroundMusic.paused){
        backgroundMusic.play()
    }else{
        backgroundMusic.pause();
    }
}