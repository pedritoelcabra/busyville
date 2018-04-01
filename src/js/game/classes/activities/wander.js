'use strict';

var Activity = require('../activities/activity');

var Wander = function (owner) {
    this.maxTimeInAction = 500;
    this.nameString = "Wandering";
    Activity.call(this, owner);
    this.minimumPreference = 0;
};

Wander.prototype = Object.create(Activity.prototype);
Wander.prototype.constructor = Wander;

Wander.prototype.executeActivity = function () {
    this.owner.moveToRandomPosition();
};

Wander.prototype.executeEnd = function () {
    this.owner.stopMovement();
};

Wander.prototype.onUpdate = function () {
    if (this.pathIsAvailable()) {
        this.owner.walkPath();
    }
};

Wander.prototype.checkIfEnded = function () {
    if (!this.pathIsAvailable()) {
        return true;
    }
    return this.timeInAction > this.maxTimeInAction;
};

module.exports = Wander;