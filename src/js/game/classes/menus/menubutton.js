'use strict';

var MenuButton = function (type, game, parentMenu, x, y, spriteName, w, h, background) {

    if (typeof spriteName === 'undefined') {
        spriteName = type;
    }

    this.spriteName = spriteName;
    this.parentMenu = parentMenu;
    this.buttonType = type;
    this.game = game;
    var foreGround = this.game.make.image(0, 0, spriteName);

    if (typeof w === 'undefined') {
        w = foreGround.width;
    }
    if (typeof h === 'undefined') {
        h = foreGround.height;
    }

    var bmd = this.game.make.bitmapData(w, h);
    if (typeof background !== 'undefined') {
        bmd.copy(background);
    }

    var factor;
    var xOff = 2;
    var yOff = 2;
    if (foreGround.width > foreGround.height) {
        factor = foreGround.width / w;
        foreGround.width = w;
        foreGround.height = foreGround.height / factor;
        yOff += (h - foreGround.height) / 2;
    }
    else {
        factor = foreGround.height / h;
        foreGround.height = h;
        foreGround.width = foreGround.width / factor;
        xOff += (w - foreGround.width) / 2;
    }
    foreGround.width -= 4;
    foreGround.height -= 4;

    bmd = bmd.draw(foreGround, xOff, yOff);

    Phaser.Sprite.call( this, this.game, x , y, bmd);

    this.fixedToCamera = true;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);
};

MenuButton.prototype = Object.create(Phaser.Sprite.prototype);
MenuButton.prototype.constructor = MenuButton;

MenuButton.prototype.update = function() {
};

MenuButton.prototype.getType = function() {
    return this.buttonType;
};

MenuButton.prototype.setDimensions = function(w, h) {
    var factor = 1;
    if (this.width > this.height) {
        factor = this.width / w;
        this.width = w;
        this.height = this.height / factor;
    }
    else {
        factor = this.height / h;
        this.height = h;
        this.width = this.width / factor;
    }
};

MenuButton.prototype.clicked = function() {

    if (this.game.cursorManager) {
        this.game.cursorManager.updateLastHandledClick();
    }

    if (this.game.input.activePointer.leftButton.isDown) {
        this.parentMenu['pressedButton'](this);
    }
};


module.exports = MenuButton;


