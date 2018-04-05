
var DummyCharacter = require('../prefabs/movables/dummycharacter');
var MenuButton = require('../prefabs/menubutton');

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

    this.slots = [
        'hair',
        'shirt',
        'body',
        'pants'
    ];

    for (var i = 0; i < this.slots.length; i++) {
        var leftButton = new MenuButton(this.slots[i], this.game, this, leftButtonX, buttonY, 'left');
        this.game.add.existing(leftButton);
        var rightButton = new MenuButton(this.slots[i], this.game, this, rightButtonX, buttonY, 'right');
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
        this.playerPawn.getValidEquipment(button.buttonType),
        button.spriteName === 'right'
    );
};

charcreation.equipSlotItem = function (slot, options, isNext) {
    var index = options.indexOf(this.playerPawn.getCurrentlyEquipped(slot));
    if (isNext) {
        index++;
        if (index === options.length) {
            index = 0;
        }
    }
    else {
        index--;
        if (index < 0) {
            index = options.length - 1;
        }
    }
    this.playerPawn.equip(slot, options[index]);
};

module.exports = charcreation;