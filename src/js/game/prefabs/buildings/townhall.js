'use strict';

var Building = require('../../prefabs/buildings/building');
var Randomizer = require('../../classes/randomizer');

var Townhall = function (game, x, y) {

    this.plotType = '6x7';

    this.roadTiles = [
        {'x' : 3, 'y' : 7},
        {'x' : 2, 'y' : 7},
        {'x' : 3, 'y' : 6},
        {'x' : 2, 'y' : 6}
    ];

    this.firstName = 'Townhall';
    Building.call( this, game, x, y, this.firstName);

    this.doorTile = {'x' : 2, 'y' : 7};

    this.housing = 3;
    this.inhabitantCost = 6;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

Townhall.prototype = Object.create(Building.prototype);
Townhall.prototype.constructor = Townhall;

Building.prototype.canBeBuilt = function() {
    return true;
};

Townhall.prototype.create = function(x,y) {
    return new Townhall(this.game, x, y);
};

module.exports = Townhall;


