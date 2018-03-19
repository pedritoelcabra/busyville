'use strict';

var ActivityBrain = function () {

};

ActivityBrain.prototype.chooseActivity = function(baseActivity){
    if(baseActivity){
        return this.activities[0];
    }
    var bestActivity = 0;
    var bestScore = 0;
    var thisScore = 0;
    for(var i = 0; i < this.activities.length ; i++){
        thisScore = this.activities[i].score();
        if(thisScore > bestScore){
            bestScore = thisScore;
            bestActivity = i;
        }
    }
    return this.activities[bestActivity];
}

ActivityBrain.prototype.constructor = ActivityBrain;

module.exports = ActivityBrain;


