$().ready(initiateGame);

//global variables
var first_card_clicked =null;
var second_card_clicked = null;
var cardOrder = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var total_possible_matches = cardOrder.length/2;//number of total possible matches (in this case 2)
var match_counter = 0;
var attempt_counter = 0;
var games_played = 0;

function initiateGame() {
    addEventHandler();
    //addCardsToGameArea();
    addObjectToCard();
}

function addEventHandler() {
    $('.game-area').on('click', '.card', flipCardToFront);
    $('.reset').on('click', resetGame);
}


function addObjectToCard() {
    // var cards = $('.card');
    //     for (var i = 0; i< cards.length; i++) {
    //         $(cards[i]).data(new Card(cardOrder[i]));
    //     }
    //debugger;
    var cards = $('.card > .back');
    for (var i = 0; i< cards.length; i++) {
        $(cards[i]).addClass(cardName[cardOrder[i]].name);
        $(cards[i]).attr('id', cardName[cardOrder[i]].name )
    }
}

var cardName = {
    0: {name: 'attack', effect: ''},
    1: {name: 'shield', effect: ''},
    2: {name: 'terra', effect: ''},
    3: {name: 'edgar', effect: ''},
    4: {name: 'darkKnight', effect: ''},
    5: {name: 'king', effect: ''},
    6: {name: 'terra2', effect: ''},
    7: {name: 'ramuth', effect: ''},
    };

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
        //currentCard.data('flipped',true)
    }else if (currentCard.hasClass('revealed')=== false){
        second_card_clicked = currentCard;
        currentCard.addClass('revealed'); // reveal the current card by adding class.
        attempt_counter++; //increments attempts since this is the second card.
        //debugger;
        if (first_card_clicked["0"].children["0"].id === second_card_clicked["0"].children["0"].id){
            match_counter++;
            resetFirstandSecondCardVar();
            checkWinCondition();
        }else{
            setTimeout(function(){flipCardToBack(first_card_clicked, second_card_clicked)}, 1000);
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
}