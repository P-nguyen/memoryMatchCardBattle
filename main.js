$().ready(initiateGame);

function initiateGame() {
    addEventHandler();
}

function addEventHandler() {
    $('.card').on('click',flipCard);
}

function flipCard() {
    console.log(this);
    $(this).toggleClass('revealed');
}