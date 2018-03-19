'use strict';

var Building = require('../../prefabs/buildings/building');
var Randomizer = require('../../classes/randomizer');

var Decor = function (game, x, y) {

    this.firstName = Randomizer.arrayRand(decorFiles);
    Building.call( this, game, x, y, this.firstName);


    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

Decor.prototype = Object.create(Building.prototype);
Decor.prototype.constructor = Decor;

Decor.prototype.update = function() {
};

Decor.prototype.create = function(x,y) {
    return new Decor(this.game, x, y);
};

Decor.prototype.canBeBuilt = function() {
    if(this.game.buildingManager.amountOfBuildings("all") < 10){
        return false;
    }
    return true;
};

module.exports = Decor;


