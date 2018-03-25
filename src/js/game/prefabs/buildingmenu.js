'use strict';

var Menu = require('../prefabs/menu');

var BuildingMenu = function (game) {

    Menu.call( this, game);

    this.xoff = 20;
    this.yoff = 20;
    this.maxCols = 0;
    this.buttonSeparation = 20;
};

BuildingMenu.prototype = Object.create(Menu.prototype);
BuildingMenu.prototype.constructor = BuildingMenu;

BuildingMenu.prototype.update = function() {
};

Menu.prototype.pressedButton = function(button) {
    this.game.buildingManager.setCursorBuilding(button.getType());
};

BuildingMenu.prototype.getButtons = function() {
    return this.game.buildingManager.getAvailableBuildingNames();
};

module.exports = BuildingMenu;


