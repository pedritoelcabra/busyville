'use strict';

var Idle = require('../classes/activities/idle');

var ActivityBrain = function () {

};

ActivityBrain.prototype.chooseActivity = function(baseActivity){
    if(baseActivity){
        return this.activities[0];
    }
    var bestActivity = -1;
    var bestScore = 0;
    var thisScore = 0;
    for(var i = 0; i < this.activities.length ; i++){
        thisScore = this.activities[i].score();
        if(thisScore > bestScore){
            bestScore = thisScore;
            bestActivity = i;
        }
    }
    if (bestActivity >= 0) {
        return this.activities[bestActivity];
    }
    for(var i = 0; i < this.idleActivities.length ; i++){
        thisScore = this.idleActivities[i].score();
        if(thisScore > bestScore){
            bestScore = thisScore;
            bestActivity = i;
        }
    }
    if (bestActivity >= 0) {
        return this.idleActivities[bestActivity];
    }
    return false;
};

ActivityBrain.prototype.constructor = ActivityBrain;

module.exports = ActivityBrain;


