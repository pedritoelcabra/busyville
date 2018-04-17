
var DummyCharacter = require('../prefabs/movables/dummycharacter');
var ItemFactory = require('../classes/items/itemfactory');
var MenuButton = require('../classes/menus/menubutton');

var charcreation = {};

charcreation.create = function () {

    this.game.stateManager.addGroups();

    this.game.camera.bounds.setTo(0, 0, this.game.width, this.game.height);

    this.playerPawn = new DummyCharacter (this.game, 0, 0);
    this.playerPawn.scale.setTo(4);
    this.playerPawn.x = (this.game.width / 4) - (this.playerPawn.width / 2);
    this.playerPawn.y = (this.game.height / 2) - (this.playerPawn.height / 2);
    this.animation = 0;
    this.lastAnimationChange = new Date().getTime();
    this.playerPawn.isMoving = true;

    this.directions = [
        1,
        0,
        -1,
        -2.5
    ];
    this.playerPawn.setAnimation();

    var buttonY = this.game.height / 6;
    var leftButtonX = this.game.width / 2;
    var rightButtonX = (this.game.width / 4) + (this.game.width / 2);

    this.slots = {
        'hair': 'HumanHair',
        'body': 'HumanBody',
        'shirt': 'ClothShirt',
        'pants': 'ClothPants'
    };

    this.validEquipment = {
        'hair': ItemFactory.getNew('HumanHair').getGraphics(),
        'pants': ItemFactory.getNew('ClothPants').getGraphics(),
        'shirt': ItemFactory.getNew('ClothShirt').getGraphics(),
        'body': ItemFactory.getNew('HumanBody').getGraphics()
    };

    for (var key in this.validEquipment) {
        if (!this.validEquipment.hasOwnProperty(key)) {
            continue;
        }
        var leftButton = new MenuButton(key, this.game, this, leftButtonX, buttonY, 'left');
        this.game.add.existing(leftButton);
        var rightButton = new MenuButton(key, this.game, this, rightButtonX, buttonY, 'right');
        this.game.add.existing(rightButton);
        buttonY += 50;
    }

    var okButton = new MenuButton('start', this.game, this, leftButtonX - 50, buttonY + 100, 'check');
    this.game.add.existing(okButton);
};

charcreation.update = function () {
    var timer = new Date().getTime() - this.lastAnimationChange;
    if (timer > 2000) {
        this.lastAnimationChange = new Date().getTime();
        this.animation++;
        if (this.animation === this.directions.length) {
            this.animation = 0;
            if (this.playerPawn.isMoving) {
                this.playerPawn.isMoving = false;
                this.playerPawn.isSlashing = true;
            }
            else if (this.playerPawn.isSlashing) {
                this.playerPawn.isSlashing = false;
                this.playerPawn.isThrusting = true;
            }
            else if (this.playerPawn.isThrusting) {
                this.playerPawn.isThrusting = false;
                this.playerPawn.isMoving = true;
            }
        }
        this.playerPawn.isFacing = this.directions[this.animation];
        this.playerPawn.setAnimation();
    }
};

charcreation.pressedButton = function (button) {
    if (button.buttonType === 'start') {
        this.game.stateManager.addGroups();
        this.game.state.start('busyville');
        this.game.playerStartEquipment = this.playerPawn.getEquipmentString();
        return;
    }
    this.equipSlotItem(
        button.buttonType,
        button.spriteName === 'right'
    );
};

charcreation.equipSlotItem = function (slot, isNext) {
    var index = this.validEquipment[slot].indexOf(this.playerPawn.equipment.slots[slot].clothingType);
    if (isNext) {
        index++;
        if (index === this.validEquipment[slot].length) {
            index = 0;
        }
    }
    else {
        index--;
        if (index < 0) {
            index = this.validEquipment[slot].length - 1;
        }
    }
    var item = ItemFactory.getNew(this.slots[slot]);
    item.setGraphic(this.validEquipment[slot][index]);
    this.playerPawn.equip(item);
};

module.exports = charcreation;