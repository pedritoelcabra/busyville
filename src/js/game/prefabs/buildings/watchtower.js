'use strict';

var Building = require('../../prefabs/buildings/building');

var WatchTower = function (game, x, y) {

    Building.call( this, game, x, y, "watchtower");

    this.firstName = "WatchTower";

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

WatchTower.prototype = Object.create(Building.prototype);
WatchTower.prototype.constructor = WatchTower;

WatchTower.prototype.update = function() {
};

WatchTower.prototype.canBeBuilt = function() {
    return true;
};

WatchTower.prototype.create = function(x,y) {
    return new WatchTower(this.game, x, y);
};

module.exports = WatchTower;


