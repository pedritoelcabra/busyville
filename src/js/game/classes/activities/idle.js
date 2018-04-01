'use strict';

var Activity = require('../activities/activity');

var Idle = function (owner) {
    this.maxTimeInAction = 100;
    this.nameString = "Idling";
    this.minimumPreference = -10;
    Activity.call(this, owner);
};

Idle.prototype = Object.create(Activity.prototype);
Idle.prototype.constructor = Idle;

Idle.prototype.checkIfEnded = function () {
    if (this.timeInAction > this.maxTimeInAction) {
        return true;
    }
    return false;
};

module.exports = Idle;