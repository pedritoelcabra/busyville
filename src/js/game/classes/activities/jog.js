'use strict';

var Activity = require('../activities/activity');

var Jog = function (owner) {
    this.maxTimeInAction = 500;
    this.nameString = "Jogging";
    this.minimumPreference = -10;
    Activity.call(this, owner);
};

Jog.prototype = Object.create(Activity.prototype);
Jog.prototype.constructor = Jog;

Jog.prototype.executeActivity = function() {
    this.owner.moveSpeed = this.owner.baseSpeed * 2;
    this.onUpdate();
};

Jog.prototype.onUpdate = function() {
    if( this.pathIsAvailable() ){
        this.owner.walkPath();
        return;
    }
    this.owner.moveToRandomPosition();
};

Jog.prototype.executeEnd = function() {
    this.owner.moveSpeed = this.owner.baseSpeed;
    this.owner.stopMovement();
};

Jog.prototype.checkIfEnded = function() {
    if(this.timeInAction > this.maxTimeInAction){
        return true;
    }
    return false;
};

module.exports = Jog;