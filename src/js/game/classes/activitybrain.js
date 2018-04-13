'use strict';

var ActivityBrain = function (owner) {
    this.activities = [];
    this.idleActivities = [];
};

ActivityBrain.prototype.chooseActivity = function(baseActivity){
    if(baseActivity){
        if (!this.activities.length) {
            return this.idleActivities[0];
        }
        return this.activities[0];
    }
    var bestActivity = -1;
    var bestScore = 0;
    var thisScore = 0;
    for(var i = 0; i < this.activities.length ; i++){
        thisScore = this.activities[i].score();
        console.log(this.activities[i]);
        console.log(thisScore);
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
            console.log(this.idleActivities[i]);
            console.log(thisScore);
            bestScore = thisScore;
            bestActivity = i;
        }
    }
    if (bestActivity >= 0) {
        return this.idleActivities[bestActivity];
    }
    if (this.activities.length) {
        return this.activities[0];
    }
    if (this.idleActivities.length) {
        return this.idleActivities[0];
    }
    return false;
};

ActivityBrain.prototype.constructor = ActivityBrain;

module.exports = ActivityBrain;


