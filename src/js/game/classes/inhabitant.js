'use strict';

var Pawn = require('../prefabs/pawn');

var Inhabitant = function (building, x, y) {

    this.building = building;
    this.game = building.game;
    this.movable = null;
    this.x = x;
    this.y = y;

    this.inhabitantProgress = 0;
    this.inhabitantCost = 5;

    this.emptyIcon = new Phaser.Image(this.game, x, y, 'pawnIconEmpty');
    this.fullIcon = new Phaser.Image(this.game, x, y,'pawnIconFull');
    this.game.add.existing(this.fullIcon);
    this.game.add.existing(this.emptyIcon);
};

Inhabitant.prototype.residence = function(){
    return this.building;
};

Inhabitant.prototype.setPawn = function(movable){
    this.movable = movable;
};

Inhabitant.prototype.inhabitant = function(){
    return this.movable;
};

Inhabitant.prototype.hasInhabitant = function(){
    return this.movable !== null;
};

Inhabitant.prototype.isFinished = function(){
    if (this.hasInhabitant()) {
        return true;
    }
    return this.inhabitantProgress >= this.inhabitantCost;
};

Inhabitant.prototype.addProgress = function(){
    this.inhabitantProgress++;
    if (this.isFinished()) {
        this.onFinishInhabitant();
    }
};

Inhabitant.prototype.onFinishInhabitant = function(){
    this.inhabitantProgress = 0;
    this.movable = new Pawn(this.game, this.building.x, this.building.y);
    this.game.add.existing(this.movable);
};

Inhabitant.prototype.constructor = Inhabitant;

module.exports = Inhabitant;


