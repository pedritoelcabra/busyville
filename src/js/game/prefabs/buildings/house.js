'use strict';

var Building = require('../../prefabs/buildings/building');
var Randomizer = require('../../classes/randomizer');

var House = function (game, x, y) {

    this.firstName = Randomizer.arrayRand(houseFiles);
    Building.call( this, game, x, y, this.firstName);


    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

House.prototype.update = function() {
};

Building.prototype.canBeBuilt = function() {
    return true;
};

House.prototype.create = function(x,y) {
    return new House(this.game, x, y);
};

module.exports = House;


