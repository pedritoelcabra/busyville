'use strict';

var Activity = require('../activities/activity');

var Spit = function (owner) {
    this.maxTimeInAction = 100;
    this.nameString = "Spitting";
    this.minimumPreference = 10;
    Activity.call(this, owner);
};

Spit.prototype = Object.create(Activity.prototype);
Spit.prototype.constructor = Spit;

Spit.prototype.checkIfEnded = function() {
    if(this.timeInAction > this.maxTimeInAction){
        return true;
    }
    return false;
};

module.exports = Spit;