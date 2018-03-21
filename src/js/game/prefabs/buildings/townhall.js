'use strict';

var Building = require('../../prefabs/buildings/building');
var Randomizer = require('../../classes/randomizer');

var Townhall = function (game, x, y) {

    this.firstName = 'Townhall';
    Building.call( this, game, x, y, this.firstName);

    this.housing = 3;

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

Townhall.prototype = Object.create(Building.prototype);
Townhall.prototype.constructor = Townhall;

Townhall.prototype.update = function() {
};

Building.prototype.canBeBuilt = function() {
    return true;
};

Townhall.prototype.create = function(x,y) {
    return new Townhall(this.game, x, y);
};

module.exports = Townhall;


