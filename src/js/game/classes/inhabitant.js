'use strict';

var Pawn = require('../prefabs/pawn');

var Inhabitant = function (building, x, y) {

    this.building = building;
    this.game = building.game;
    this.movable = null;
    this.x = x;
    this.y = y;

    this.inhabitantProgress = 0;

    this.emptyIcon = new Phaser.Image(this.game, x, y, 'pawnIconEmpty');
    this.fullIcon = new Phaser.Image(this.game, x, y,'pawnIconFull');
    this.game.add.existing(this.emptyIcon);
    this.game.add.existing(this.fullIcon);
    this.maskProgress();
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

Inhabitant.prototype.maskProgress = function() {
    if(this.isFinished()){
        this.fullIcon.mask.destroy();
        return;
    }
    var maskHeight = parseInt((this.fullIcon.height / this.building.inhabitantCost) * this.inhabitantProgress);
    var mask = this.game.add.graphics(this.x, this.y);
    mask.beginFill(0xffffff);
    mask.moveTo(0, this.fullIcon.height);
    mask.lineTo(this.fullIcon.width, this.fullIcon.height);
    mask.lineTo(this.fullIcon.width, this.fullIcon.height - maskHeight);
    mask.lineTo(0, this.fullIcon.height - maskHeight);
    mask.lineTo(0, this.fullIcon.height);
    mask.endFill();
    if(this.fullIcon.mask){
        this.fullIcon.mask.destroy();
    }
    this.fullIcon.mask = mask;
};

Inhabitant.prototype.isFinished = function(){
    if (this.hasInhabitant()) {
        return true;
    }
    return this.inhabitantProgress >= this.building.inhabitantCost;
};

Inhabitant.prototype.addProgress = function(){
    this.inhabitantProgress++;
    this.maskProgress();
    if (this.isFinished()) {
        this.onFinishInhabitant();
    }
};

Inhabitant.prototype.onFinishInhabitant = function(){
    this.inhabitantProgress = 0;
    var buildingDoor = this.building.getDoor();
    this.movable = new Pawn(this.game, buildingDoor.x, buildingDoor.y);
    this.game.add.existing(this.movable);
};

Inhabitant.prototype.constructor = Inhabitant;

module.exports = Inhabitant;


