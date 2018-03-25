'use strict';

var Menu = require('../prefabs/menu');
var BuildingMenu = require('../prefabs/buildingmenu');

var GameMenu = function (game) {

    Menu.call( this, game);

    this.submenus = {};

    this.xoff = 20;
    this.yoff = 20;
    this.maxCols = 0;
    this.buttonSeparation = 20;
};

GameMenu.prototype = Object.create(Menu.prototype);
GameMenu.prototype.constructor = GameMenu;

GameMenu.prototype.update = function() {
};

GameMenu.prototype.pressedButton = function(button) {
    if (typeof this.submenus[button.getType() + 'Menu'] === 'undefined') {
        this.buildSubMenu(button);
    }
    this.submenus[button.getType() + 'Menu'].toggleMenu();
};

GameMenu.prototype.buildSubMenu = function(button) {
    var newMenu = false;
    if (button.getType() === 'building') {
        newMenu = new BuildingMenu(this.game);
    }
    if (!newMenu) {
        newMenu = new Menu(this.game);
    }
    newMenu.setX(this.xoff + this.buttonSeparation);
    newMenu.setY(this.yoff + this.buttonSeparation + this.buttonSeparation + button.height);
    newMenu.buildButtons();
    newMenu.hideMenu();
    this.submenus[button.getType() + 'Menu'] = newMenu;
};

GameMenu.prototype.getButtons = function() {
    return this.constructor.gameMenuButtons();
};

GameMenu.gameMenuButtons = function() {
    return [
        'system',
        'building'
    ];
};

module.exports = GameMenu;


