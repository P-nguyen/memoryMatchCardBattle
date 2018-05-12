$().ready(initiateGame);

//global variables
var first_card_clicked =null;
var second_card_clicked = null;
var cardOrder = ['attack','attack','shield','bahamut','doubleStrike','tripleStrike','heal','doubleStrike','tripleStrike'];
//old.
var total_possible_matches = cardOrder.length/2;//number of total possible matches (in this case 2)
var match_counter = 0;
var attempt_counter = 0;
var games_played = 0;

var currentPlayer = true; //true is player 1
var screenClickable = false; // player notificatin will turn this into true. for player 1.

var player1 = new Player('Player 1', '#player1');
var player2 = new Player('Player 2', '#player2');
var totalPlayers = [player1,player2];

function initiateGame() {
    addEventHandler();
    addImageAddressToCard();
    currentPlayerPositionNotification();
}

function addEventHandler() {
    $('.game-area').on('click', '.card', flipCardToFront);
    $('.reset').on('click', resetGame);
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
        console.log('exiting!')
        return;
    }


    var currentCard = $(this);
    if (first_card_clicked === null && currentCard.hasClass('revealed')=== false){
        currentCard.addClass('revealed'); // reveal the current card by adding class.
        // here we check card ability
        cardType = checkCardName($(currentCard).find('img').attr('src'));
        if (cardType != 'attack') {
            screenClickable = !screenClickable;
            if(cardType === 'bahamut'){
                console.log('ITs BAHAMUT!');
                setTimeout(resetDeck, 2000); // this sets a reset for entire deck.
                //do damange to both players
            }
            //if its bahamut reset deck., if it can be stored it will be.
            setTimeout(displayCard, 1000, $(currentCard).find('img').attr('src')); //this will display a card.

            return
        }
            //else if attack move on.
        first_card_clicked = currentCard;

    }else if (currentCard.hasClass('revealed')=== false){
        screenClickable = !screenClickable; // turn off clickablity
        second_card_clicked = currentCard;
        currentCard.addClass('revealed'); // reveal the current card by adding class.
        attempt_counter++; //increments attempts since this is the second card.

        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')){
            match_counter++;

            setTimeout(displayCard, 1000, $(first_card_clicked).find('img').attr('src'));// ('#cardModal');
            //this is for attack only
            //do attack damage. to target player.
            setTimeout(resetDeck, 2000); // at 2000ms is when the player notification will be called. when that happens reset deck.

        }else{
            //flip both cards back.
            setTimeout(flipCardToBack, 1000, first_card_clicked, second_card_clicked);
            //check for bahamut
            cardType = checkCardName($(currentCard).find('img').attr('src'));
            if (cardType === 'bahamut') {
                console.log('ITS BAHAMUT');
                //reset deck.
                setTimeout(resetDeck, 2000);
            }

        }
    }else{
        console.log('you clicked this already!');
    }
    updatePlayerStats();
}

function updatePlayerStats(){
    for (var i = 0; i < 2; i++){
        totalPlayers[i].updateStatDisplay();
    }
}

function display_stats(){
    $('.matches .value').text(match_counter);

    var accuracyPercent = match_counter/attempt_counter;
    accuracyPercent = accuracyPercent.toFixed(2);
    if (isNaN(accuracyPercent)){
        accuracyPercent = 0;
    }

    $('.accuracy .value').text(accuracyPercent + '%');
    $('.attempts .value').text(attempt_counter);
}

function reset_stats(){
    $('.accuracy .value').text('0%');
    $('.attempts .value').text('0');
    $('.matches .value').text('0');
}

function flipCardToBack(jQueryElement1,jQueryElement2) {
    $(jQueryElement1).removeClass('revealed');
    $(jQueryElement2).removeClass('revealed');
    resetFirstandSecondCardVar();
}

function checkWinCondition() {
    if (match_counter===total_possible_matches){
        console.log('WINNER WINNER CHICKEN DINNER');
    }
}

function resetGame() {
    //reset_stats();
    //display_stats();
    games_played++;
    //$('.games-played .value').text(games_played);

    //reset game.
    resetDeck()
    
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
    currentPlayer = !currentPlayer;
    currentPlayerPositionNotification(); // this will notify who should pick next.
}

function displayCard(_inputCardSrc){
    $('#imgCardModal').attr('src', _inputCardSrc);
    toggleModal('#cardModal')
    setTimeout(toggleModal, 1500,'#cardModal'); //un toggle modal
    setTimeout(resetFirstandSecondCardVar,2000); // gives a sec before announcing player turn

}

function currentPlayerPositionNotification(){
    screenClickable = !screenClickable;// allows player to click again afterwards.

    if (currentPlayer){
        toggleModal('#modalPlayer1');
        setTimeout(toggleModal,1500,'#modalPlayer1');
    }else{
        toggleModal('#modalPlayer2');
        setTimeout(toggleModal,1500,'#modalPlayer2');
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

    cardName[_cardName].ability();
    // switch(cardName){
//     case 'attack':
//         //
//         break;
//     case 'bahamut':
//         //damage everyone
//         break;
// }

}

