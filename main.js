$().ready(initiateGame);

//global variables
var first_card_clicked =null;
var second_card_clicked = null;
var total_possible_matches = 2;//number of total possible matches (in this case 2)
var match_counter = 0;

function initiateGame() {
    addEventHandler();
    //addCardsToGameArea();
    addObjectToCard();
}

function addEventHandler() {
    $('.game-area').on('click', '.card', flipCardToFront);
}

var cardOrder = [0,0,1,1]

function addObjectToCard() {
    var cards = $('.card');
        for (var i = 0; i< cards.length; i++) {
            $(cards[i]).data(new Card(cardOrder[i]));
        }
}
//var cards = {};

// function addCardsToGameArea() {
//     var rowContainer = $('<div class="row"></div>');
//         for (var i = 0; i < 3; i++) {
//             var cardContainer = $('<div class="cardContainer"></div>');
//             var card = $('<div class="card"></div>');
//             $(cardContainer).append(card);
//             $(card).append($('<div class="back">'));
//             $(card).append($('<div class="front">'));
//
//             rowContainer.append(cardContainer);
//
//             // cards['div'+i] = new Card('div'+i, i, card);//make card obj CHECKOUT LATER
//             // $(card).addClass('div'+i);
//            }
//         $('.game-area').append(rowContainer);
// }


function flipCardToFront() {
    //if both cards 'flipped' property is true, then get outta here.
    if ($(first_card_clicked).data('flipped') === true && $(second_card_clicked).data('flipped') === true){
        return;
    }

    var currentCard = $(this);
    currentCard.addClass('revealed');
    if (first_card_clicked === null && currentCard.data('flipped') === false){
        first_card_clicked = currentCard;
        currentCard.data('flipped',true)
    }else if (currentCard.data('flipped')=== false){
        second_card_clicked = currentCard;

        if ($(first_card_clicked).data('name') === $(second_card_clicked).data('name')){
            match_counter++;
            $(second_card_clicked).data('flipped',true)
            resetFirstandSecondCardVar();
            checkWinCondition();
        }else{
            $(second_card_clicked).data('flipped',true)
            setTimeout(function(){flipCardToBack(first_card_clicked,second_card_clicked)}, 1000);
        }
    }else{
        console.log('you clicked this already!');
    }
}

function flipCardToBack(jQueryElement1,jQueryElement2) {
    $(jQueryElement1).removeClass('revealed');
    $(jQueryElement2).removeClass('revealed');
    $(jQueryElement1).data('flipped',false)
    $(jQueryElement2).data('flipped',false)
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