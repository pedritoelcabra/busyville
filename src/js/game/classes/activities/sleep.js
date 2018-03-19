'use strict';

var Activity = require('../activities/activity');

var Sleep = function (owner) {
    this.maxTimeInAction = 2000;
    this.nameString = "Sleeping";
    this.minimumPreference = 0;
    Activity.call(this, owner);
};

Sleep.prototype = Object.create(Activity.prototype);
Sleep.prototype.constructor = Sleep;

Sleep.prototype.executeActivity = function() {
    this.owner.fallAsleep();
};

Sleep.prototype.executeEnd = function() {
    this.owner.wakeUp();
};

Sleep.prototype.checkIfEnded = function() {
    if(this.timeInAction > this.maxTimeInAction){
        return true;
    }
    return false;
};

module.exports = Sleep;