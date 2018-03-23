'use strict';

var Menu = require('../prefabs/menu');

var GameMenu = function (game) {

    this.xoff = 20;
    this.yoff = 20;
    this.buttonSeparation = 20;

    Menu.call( this, game);

};

GameMenu.prototype = Object.create(Menu.prototype);
GameMenu.prototype.constructor = GameMenu;

GameMenu.prototype.update = function() {
};

GameMenu.prototype.button_system = function() {
    console.log('system');
};

GameMenu.prototype.button_buildings = function() {
    console.log('buildings');
};

GameMenu.buttons = function() {
    return [
        'system',
        'buildings'
    ];
};

module.exports = GameMenu;


