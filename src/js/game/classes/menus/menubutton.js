'use strict';

var MenuButton = function (type, game, parentMenu, x, y, spriteName) {

    if (typeof spriteName === 'undefined') {
        spriteName = type;
    }

    this.spriteName = spriteName;
    this.parentMenu = parentMenu;
    this.buttonType = type;
    this.game = game;

    Phaser.Sprite.call( this, game, x , y, this.spriteName);

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

MenuButton.prototype.clicked = function() {

    this.game.cursorManager.updateLastHandledClick();
    if (this.game.input.activePointer.leftButton.isDown) {
        this.parentMenu['pressedButton'](this);
    }
};


module.exports = MenuButton;


