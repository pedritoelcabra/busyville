'use strict';

var Building = require('../../prefabs/buildings/building');

var Castle = function (game, x, y) {

    Building.call( this, game, x, y, "castle");

    this.firstName = "Castle";

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

Castle.prototype = Object.create(Building.prototype);
Castle.prototype.constructor = Castle;

Castle.prototype.update = function() {
};

Castle.prototype.canBeBuilt = function() {
    if(this.game.buildingManager.amountOfBuildings(this.firstName) > 0){
        return false;
    }
    if(this.game.buildingManager.amountOfBuildings("all") < 50){
        return false;
    }
    return true;
};

Castle.prototype.create = function(x,y) {
    return new Castle(this.game, x, y);
};

module.exports = Castle;


