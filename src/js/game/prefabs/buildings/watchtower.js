'use strict';

var Building = require('../../prefabs/buildings/building');
var Warrior = require('../movables/warrior');

var WatchTower = function (game, x, y) {

    this.plotType = '4x7';

    this.roadTiles = [
        {'x' : 1, 'y' : 7},
        {'x' : 2, 'y' : 7},
        {'x' : 1, 'y' : 6},
        {'x' : 2, 'y' : 6}
    ];

    this.firstName = "WatchTower";

    Building.call( this, game, x, y, this.firstName);

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    this.doorTile = {'x' : 1, 'y' : 7};

    this.housing = 2;
    this.inhabitantCost = 10;
};

WatchTower.prototype = Object.create(Building.prototype);
WatchTower.prototype.constructor = WatchTower;

WatchTower.prototype.canBeBuilt = function() {
    return true;
};

WatchTower.prototype.createInhabitant = function () {
    return new Warrior(this.game, this.getDoor().x, this.getDoor().y);
};

WatchTower.prototype.create = function(x,y) {
    return new WatchTower(this.game, x, y);
};

module.exports = WatchTower;


