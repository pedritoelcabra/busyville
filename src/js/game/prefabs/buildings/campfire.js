'use strict';

var Building = require('../../prefabs/buildings/building');

var CampFire = function (game, x, y) {

    Building.call( this, game, x, y, "campfire");

    this.animations.add('burn', [ 0,1,2,3,4,5,6,7 ], 10, false);
    this.animations.play('burn', 8, true);

    this.firstName = "Campfire";

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

};

CampFire.prototype = Object.create(Building.prototype);
CampFire.prototype.constructor = CampFire;

CampFire.prototype.update = function() {
};

CampFire.prototype.canBeBuilt = function() {
    return true;
};

CampFire.prototype.create = function(x,y) {
    return new CampFire(this.game, x, y);
};

module.exports = CampFire;


