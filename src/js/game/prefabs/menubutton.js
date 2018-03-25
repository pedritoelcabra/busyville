'use strict';

var MenuButton = function (type, game, parentMenu, x, y) {

    this.parentMenu = parentMenu;

    this.buttonType = type;
    this.game = game;

    Phaser.Sprite.call( this, game, x , y, type);

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
    this.parentMenu['pressedButton'](this);
};


module.exports = MenuButton;


