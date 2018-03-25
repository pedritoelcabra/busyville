'use strict';

var MenuButton = require('../prefabs/menubutton');

var Menu = function (game) {

    this.buttonWidth = 64;
    this.buttonHeight = 64;

    this.hidden = false;

    this.xoff = 20;
    this.yoff = 20;
    this.maxCols = 0;
    this.buttonSeparation = 20;

    this.game = game;
    this.buttons = [];
};

Menu.prototype = Object.create(Phaser.Sprite.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.setX = function (newX) {
    this.xoff = newX;
    return this;
};

Menu.prototype.setY = function (newY) {
    this.yoff = newY;
    return this;
};

Menu.prototype.setCols = function (newCols) {
    this.maxCols = newCols;
    return this;
};

Menu.prototype.setSeparation = function (newSep) {
    this.buttonSeparation = newSep;
    return this;
};

Menu.prototype.getButtons = function() {
    return [];
};

Menu.prototype.hideMenu = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].visible = false;
    }
    this.hidden = true;
};

Menu.prototype.showMenu = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].visible = true;
    }
    this.hidden = false;
};

Menu.prototype.toggleMenu = function() {
    if (this.hidden) {
        this.showMenu();
        return;
    }
    this.hideMenu();
};

Menu.prototype.pressedButton = function(button) {
};

Menu.prototype.buildButtons = function () {
    var buttons = this.getButtons();

    var colAmount = 0;
    var xoff = this.xoff;
    var yoff = this.yoff;
    for (var i = 0; i < buttons.length; i++) {
        var newButton = new MenuButton(buttons[i], this.game, this, xoff, yoff);
        newButton.width = this.buttonWidth;
        newButton.height = this.buttonHeight;
        xoff += newButton.width + this.buttonSeparation;
        this.game.add.existing(newButton);
        this.game.menus.push(newButton);
        this.buttons.push(newButton);
        colAmount++;
        if (this.maxCols && colAmount === this.maxCols) {
            colAmount = 0;
            xoff = this.xoff;
            yoff = yoff + newButton.height + this.buttonSeparation;
        }
    }
    return this;
};


module.exports = Menu;


