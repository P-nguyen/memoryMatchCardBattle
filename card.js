var cardName = {
    attack: {name: 'attack',
        address:'images/cards/attackCard.jpg',
        effect: 1,
        ability: function () {
            debugger;
            if ( targetPlayer.cardHeld === 'shield'){
                setTimeout(cardName.shield.sound,1000);
            }else{
                targetPlayer.health -= currentPlayer.currentAttackPower;
            }
        },
        sound: function () {
            audioSword.play();
        }},
    shield: {name: 'shield',
        address:'images/cards/shieldCard.jpg' ,
        effect: 0,
        ability: function () {
            currentPlayer.cardHeld = 'shield';
            playerHeldCardEquipped( this.address );
            //play shield equip noise.
        },
        sound: function () {
            audioShield.play();
        }},
    heal: {name: 'heal',
        address:'images/cards/healCard.jpg',
        effect: 2,//how much it heals
        ability: function () {
            currentPlayer.health += this.effect;
            //heal noise
        },
        sound: function () {
            audioHeal.play();
        }},
    bahamut: {name: 'bahamut',
        address:'images/cards/bahamutCard.jpg',
        effect: 2,
        ability: function(){
            //damage both players.
            for (var i = 0; i < 2; i++){
                totalPlayers[i].health -= this.effect;
            }
            setTimeout(resetDeck, 2000);
            resetPlayerAbilitys();
        },
        sound: function () {
            audioBahamut.play();
        }},
    doubleStrike: {name: 'doubleStrike',
        address: 'images/cards/doubleStrikeCard.jpg',
        effect: 4,
        ability: function () {
            currentPlayer.cardHeld = 'doubleStrike';
            currentPlayer.currentAttackPower = this.effect;
            playerHeldCardEquipped( this.address );
        },
        sound: function () {
            audioDblStrike.play();
        }},
    tripleStrike: {name: 'tripleStrike',
        address: 'images/cards/tripleStrikeCard.jpg',
        effect: 6,
        ability: function () {
            currentPlayer.cardHeld = 'tripleStrike';
            currentPlayer.currentAttackPower = this.effect;
            playerHeldCardEquipped( this.address );
        },
        sound: function () {
            audioTriStrike.play();
        }},
};

var audioSword =  new Audio('audio/sword.mp3');
var audioShield =  new Audio('audio/shield.mp3');
var audioHeal =  new Audio('audio/heal.mp3');
var audioBahamut =  new Audio('audio/bahamut.mp3');
var audioDblStrike =  new Audio('audio/dblStrike.mp3');
var audioTriStrike =  new Audio('audio/triStrike.mp3');

function Player( _name , _playerPosString) {
    this.name = _name;
    this.playerPos = _playerPosString;
    this.health = 10;
    this.cardHeld = null; //holds name of card
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
        this.currentAttackPower = 2;
    }
    this.resetPlayerHealth = function (){
        this.health = 10;
    }
}

function playerHeldCardEquipped( _imgAddress ){
    //if card has revealed.
    //then unreveal wait and reveal again.
    var cardslotElement = currentPlayer.playerPos + ' .card > .back';
    $(cardslotElement).attr('src', _imgAddress);
    var cardselector = currentPlayer.playerPos + ' .card'
    $(cardselector).addClass('revealed');
}