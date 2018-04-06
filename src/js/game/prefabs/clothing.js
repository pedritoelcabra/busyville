'use strict';

var Clothing = function (game, pawn, type) {

    this.pawn = pawn;
    this.game = game;
    this.clothingType = type;
    Phaser.Sprite.call(this, game, 0, 0, type);

    this.rowLength = 13;
    this.repeatAnimation = false;
    this.frameRate = 10;

    this.addAnimation('up', 8, 9);
    this.addAnimation('stillup', 8, 1);
    this.addAnimation('slashup', 12, 6);
    this.addAnimation('thrustup', 4, 8);

    this.addAnimation('left', 9, 9);
    this.addAnimation('stillleft', 9, 1);
    this.addAnimation('slashleft', 13, 6);
    this.addAnimation('thrustleft', 5, 8);

    this.addAnimation('down', 10, 9);
    this.addAnimation('stilldown', 10, 1);
    this.addAnimation('slashdown', 14, 6);
    this.addAnimation('thrustdown', 6, 8);

    this.addAnimation('right', 11, 9);
    this.addAnimation('stillright', 11, 1);
    this.addAnimation('slashright', 15, 6);
    this.addAnimation('thrustright', 7, 8);

    this.animations.play('stilldown', 4, false);
};

Clothing.prototype = Object.create(Phaser.Sprite.prototype);
Clothing.prototype.constructor = Clothing;

Clothing.prototype.addAnimation = function(name, row, length) {
    var arr = [];
    var offset = row * this.rowLength;
    for(var i = 0; i < length; i++){
        arr.push(offset + i);
    }
    this.animations.add(name, arr, this.framerate, this.repeat);
};

Clothing.prototype.getAnimationFrameCount = function(name) {
    switch (name) {
        case 'slash': return 6;
        case 'thrust': return 8;
    }
    return 0;
};

Clothing.prototype.replaceTexture = function(name) {
    this.clothingType = name;
    this.loadTexture(name, 0);
};

module.exports = Clothing;


