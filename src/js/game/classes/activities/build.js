'use strict';

var Activity = require('../activities/activity');
var Randomizer = require('../../classes/randomizer');

var Build = function (owner) {
    this.maxTimeInAction = 300;
    this.nameString = "Building";
    this.targetBuilding = null;
    this.targetTile = false;
    this.isBuilding = false;
    this.noAvailableBuildings = false;
    this.minimumPreference = 0;
    Activity.call(this, owner);
};

Build.prototype = Object.create(Activity.prototype);
Build.prototype.constructor = Build;

Build.prototype.executeActivity = function() {
    this.noAvailableBuildings = false;
};

Build.prototype.isValid = function() {
    return !(this.owner.game.buildingManager.getUnfinishedBuilding() === null);
};

Build.prototype.executeEnd = function() {
    this.targetBuilding = null;
    this.targetTile = false;
    this.isBuilding = false;
    this.owner.clearPath();
    this.owner.stopMovement();
};

Build.prototype.onUpdate = function() {
    if(this.targetBuilding && this.targetBuilding.isDestroyed()) {
        this.targetBuilding = null;
    }
    if(!this.targetBuilding){
        this.targetBuilding = this.owner.game.buildingManager.getUnfinishedBuilding();
        if(!this.targetBuilding){
            this.noAvailableBuildings = true;
            return;
        }
    }
    if(this.targetBuilding.isFinished()){
        this.noAvailableBuildings = true;
        return;
    }
    if(!this.targetTile){
        this.targetTile = this.targetBuilding.getRandomAdyacentTile();
        this.owner.pathToTile(
            this.targetTile.x,
            this.targetTile.y);
    }
    if( this.pathIsAvailable() ){
        this.owner.walkPath();
        return;
    }
    if( ! this.isBuilding){
        if(Randomizer.chanceRoll(0.5)){
            this.owner.isSlashing = true;
        }else{
            this.owner.isThrusting = true;
        }
        this.isBuilding = 1;
        if(!this.owner.equipment.hasSlotEquipped("weapon")){
            this.owner.equipment.replaceComponent("weapon", "woodwand");
        }
        this.owner.setAnimation();
    }else{
        this.isBuilding++;
        if(this.isBuilding > this.owner.game.buildTickAmount){
            this.isBuilding = 0;
            this.targetBuilding.addConstructionProgress(1);
            if(this.targetBuilding.isFinished()){
                this.noAvailableBuildings = true;
            }
        }
    }
};

Build.prototype.checkIfEnded = function() {
    if(this.noAvailableBuildings){
        return true;
    }
    if(this.timeInAction > this.maxTimeInAction){
        return true;
    }
    return false;
};

module.exports = Build;