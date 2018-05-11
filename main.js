$().ready(initiateGame);

//global variables
var first_card_clicked =null;
var second_card_clicked = null;
var cardOrder = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var total_possible_matches = cardOrder.length/2;//number of total possible matches (in this case 2)
var match_counter = 0;
var attempt_counter = 0;
var games_played = 0;

function initiateGame() {
    addEventHandler();
    addImageAddressToCard();
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
    var cards = $('.card > .back');
    for (var i = 0; i< cards.length; i++) {
        $(cards[i]).attr('src', cardName[cardOrder[i]].address)//<img>
    }
}

function flipCardToFront() {
    //if both cards 'flipped' property is true, then get outta here.
    //false means the cardback is showing.
    //debugger;
    //_jQueryelement.hasClass('revealed')
    if (first_card_clicked != null && second_card_clicked != null){
        if (first_card_clicked.hasClass('revealed') === true && second_card_clicked.hasClass('revealed') === true){
            console.log('exiting!')
            return;
        }
    }

    var currentCard = $(this);
    if (first_card_clicked === null && currentCard.hasClass('revealed')=== false){
        first_card_clicked = currentCard;
        currentCard.addClass('revealed'); // reveal the current card by adding class.
    }else if (currentCard.hasClass('revealed')=== false){
        second_card_clicked = currentCard;
        currentCard.addClass('revealed'); // reveal the current card by adding class.
        attempt_counter++; //increments attempts since this is the second card.

        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')){
            match_counter++;
            resetFirstandSecondCardVar();
            checkWinCondition();
        }else{
            setTimeout(flipCardToBack, 1000, first_card_clicked, second_card_clicked);
        }
    }else{
        console.log('you clicked this already!');
    }
    display_stats();
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

function resetFirstandSecondCardVar() {
    first_card_clicked = null;
    second_card_clicked = null;
}

function checkWinCondition() {
    if (match_counter===total_possible_matches){
        console.log('WINNER WINNER CHICKEN DINNER');
    }
}

function resetGame() {
    reset_stats();
    display_stats();
    games_played++;
    $('.games-played .value').text(games_played);

    //reset game.
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
