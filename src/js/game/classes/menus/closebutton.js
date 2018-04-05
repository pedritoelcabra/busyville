'use strict';

var CloseButton = function (game, owner) {

    this.owner = owner;
    Phaser.Sprite.call( this, game, owner.width + owner.width , 0, 'closebutton');
    this.x -= this.width;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.close, this);
};

CloseButton.prototype = Object.create(Phaser.Sprite.prototype);
CloseButton.prototype.constructor = CloseButton;

CloseButton.prototype.update = function() {
};

CloseButton.prototype.close = function() {
    this.owner.close();
    this.destroy();
};


module.exports = CloseButton;


