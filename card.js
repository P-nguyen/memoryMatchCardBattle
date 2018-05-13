var cardName = {
    attack: {name: 'attack',
        address:'images/Cards/attackCard.jpg',
        effect: 1,
        ability: function () {
            if ( targetPlayer.cardHeld == 'shield'){
                //playshield noise
            }else{
                targetPlayer.health -= currentPlayer.currentAttackPower;
                //play hurt noise
            }
        }},
    shield: {name: 'shield',
        address:'images/Cards/shieldCard.jpg' ,
        effect: 0,
        ability: function () {
            currentPlayer.cardHeld = 'shield';
            playerHeldCardEquipped( this.address );
            //play shield equip noise.
        }},
    heal: {name: 'heal',
        address:'images/Cards/healCard.jpg',
        effect: 1,//how much it heals
        ability: function () {
            currentPlayer.health += this.effect;
        }},
    bahamut: {name: 'bahamut',
        address:'images/Cards/bahamutCard.jpg',
        effect: 3,
        ability: function(){
            //damage both players.
            for (var i = 0; i < 2; i++){
                totalPlayers[i].health -= this.effect;
            }
            setTimeout(resetDeck, 2000);
            resetPlayerAbilitys();
        }},
    doubleStrike: {name: 'doubleStrike',
        address: 'images/Cards/doubleStrikeCard.jpg',
        effect: 2,
        ability: function () {
            currentPlayer.cardHeld = 'doubleStrike';
            currentPlayer.currentAttackPower *= this.effect;
            playerHeldCardEquipped( this.address );

            //play sound of strength
        }},
    tripleStrike: {name: 'tripleStrike',
        address: 'images/Cards/tripleStrikeCard.jpg',
        effect: 3,
        ability: function () {
            currentPlayer.cardHeld = 'tripleStrike';
            currentPlayer.currentAttackPower *= this.effect;
            playerHeldCardEquipped( this.address );

            //play sound of war.
            //replace the card on field.
        }},
};

function Player( _name , _playerPosString) {
    this.name = _name;
    this.playerPos = _playerPosString;
    this.health = 10;
    this.cardHeld = null; //holds name of card
    this.cardAddress = null; //holds address of card // remove this?
    this.currentAttackPower = 2;

    this.updateStatDisplay = function(){
        var healthSelector = this.playerPos + ' .playerStat h3';
        $(healthSelector).text(this.health);
        if(this.health <= 0){
            playerDeath = true;
        }
    }
    this.resetPlayerStats = function () {
        this.cardHeld = null;
        this.cardAddress = null;
        this.currentAttackPower = 2;
    }
    this.resetPlayerHealth = function (){
        this.health = 10;
    }
}

function playerHeldCardEquipped( _imgAddress ){
    //if card has revealed.
    //then unreveal wait and reveal again.

    var cardSlotElement = currentPlayer.playerPos + ' .card > .back';
    $(cardSlotElement).attr('src', _imgAddress);
    var cardSelector = currentPlayer.playerPos + ' .card'
    $(cardSelector).addClass('revealed');
}