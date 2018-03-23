'use strict';

var MenuButton = require('../prefabs/menubutton');

var Menu = function (game) {

    this.game = game;

    this.buttons = [];

    var buttons = this.constructor.buttons();

    for(var i = 0; i < buttons.length; i++){
        var newButton = new MenuButton(buttons[i], this.game, this.xoff, this.yoff);
        this.xoff += newButton.width + this.buttonSeparation;
        this.game.add.existing(newButton);
        this.game.menus.push(newButton);
        this.buttons.push(newButton);
    }
};

Menu.prototype = Object.create(Phaser.Sprite.prototype);
Menu.prototype.constructor = Menu;

module.exports = Menu;


