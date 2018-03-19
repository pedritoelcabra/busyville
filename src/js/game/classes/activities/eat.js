'use strict';

var Activity = require('../activities/activity');

var Eat = function (owner) {
    this.maxTimeInAction = 100;
    this.nameString = "Eating";
    this.minimumPreference = 10;
    Activity.call(this, owner);
};

Eat.prototype = Object.create(Activity.prototype);
Eat.prototype.constructor = Eat;

Eat.prototype.executeActivity = function() {
    this.owner.isEating = true;
    this.owner.setAnimation();
};

Eat.prototype.checkIfEnded = function() {
    if(this.timeInAction > this.maxTimeInAction){
        return true;
    }
    return false;
};

module.exports = Eat;