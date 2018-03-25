'use strict';

var Building = require('../../prefabs/buildings/building');

var Road = function (game, x, y) {

    Building.call( this, game, x, y, 'Road');

    this.buildingType = 'Road';
};

Road.prototype = Object.create(Building.prototype);
Road.prototype.constructor = Road;

Road.prototype.update = function() {
};

Building.prototype.canBeBuilt = function() {
    return true;
};

Road.prototype.create = function(x,y) {
    return new Road(this.game, x, y);
};

module.exports = Road;


