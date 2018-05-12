var cardName = {
    attack: {name: 'attack',
        address:'images/Cards/attackCard.jpg',
        effect: 1,
        storedCard: ''},
    shield: {name: 'shield',
        address:'images/Cards/shieldCard.jpg' ,
        effect: 0,
        storedCard: ''},
    heal: {name: 'heal',
        address:'images/Cards/healCard.jpg',
        effect: 1,//how much it heals
        storedCard: ''},
    bahamut: {name: 'bahamut',
        address:'images/Cards/bahamutCard.jpg',
        effect: 1,
        ability: function(){
            //damage both players.
            for (var i = 0; i < 2; i++){
                totalPlayers[i].health -= this.effect;
            }
            setTimeout(resetDeck, 2000);
        }},
    doubleStrike: {name: 'doubleStrike',
        address: 'images/Cards/doubleStrikeCard.jpg',
        effect: 2,
        storedCard: ''},
    tripleStrike: {name: 'tripleStrike',
        address: 'images/Cards/tripleStrikeCard.jpg',
        effect: 3,
        storedCard: ''},
};

function Player( _name , _playerPosString) {
    this.name = _name;
    this.playerPos = _playerPosString;
    this.health = 10;
    this.cardHeld = null; //holds name of card
    this.cardAddress = null; //holds address of card
    this.currentAttackPower = 1;

    this.updateStatDisplay = function(){
        var healthSelector = _playerPosString+' .playerStat h3';
        $(healthSelector).text(this.health);
    }
    this.updatePlayerStats = function () {
        //check if cardAbility has anything.
        this.cardAbility(this.cardHeld);
        //if so affect health or currentAttackPower
    }
    this.resetCard_Atk = function () {
        this.cardHeld = null;
        this.cardAddress = null;
        this.currentAttackPower = 1;
    }
    this.attackPerson = function(target){ //attack other person.

        //check if person has a shield.
        //if not:
            //target.health -= 1;
        //if does:
            //return and do nothing.
    }

}

Player.prototype.cardAbility = function (_cardName) {
    //this will check the card in a switch statment
    console.log(_cardName)
}