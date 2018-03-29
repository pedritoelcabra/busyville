'use strict';

var Activity = function (owner) {
    this.owner = owner;
    this.baseweight = owner.game.activityWeights[this.nameString];
    this.lastExecuted = Date.now();
    this.preference = Math.floor((Math.random() * 20) - 10);
    if(this.preference < this.minimumPreference){
        this.preference = this.minimumPreference;
    }
};

Activity.prototype.constructor = Activity;

Activity.prototype.execute = function() {
    this.lastExecuted = Date.now();
    this.timeInAction = 0;

    this.setMaxTimeInAction();
    this.executeActivity();
};

Activity.prototype.setMaxTimeInAction = function() {
    this.maxTimeInAction = Math.floor((Math.random() * this.maxTimeInAction) + this.maxTimeInAction);
};

Activity.prototype.executeActivity = function() {
};

Activity.prototype.executeEnd = function() {
};

Activity.prototype.onUpdate = function() {
};

Activity.prototype.update = function() {
    if(this.checkIfEnded()){
        this.executeEnd();
        return false;
    }
    this.timeInAction++;
    this.onUpdate();
    return true;
};

Activity.prototype.pathIsAvailable = function() {
    if( (this.owner.pendingPath && this.owner.pendingPath.length > 0) || this.owner.pathFinding){
        return true;
    }
    return false;
};

Activity.prototype.isValid = function() {
    return true;
};

Activity.prototype.score = function() {
    if (!this.isValid()) {
        return -1;
    }
    // preference is -10 to 10
    var pref = this.preference + 10;
    var random = Math.floor((Math.random() * 100));
    var score = random * pref * this.baseweight;
    console.log('scored ' + this.nameString + ': ' + score);
    return score;
};

Activity.prototype.preferenceString = function(){
    if(this.preference > 6){
        return "Loves " + this.nameString;
    }
    if(this.preference > 2){
        return "Enjoys " + this.nameString;
    }
    if(this.preference > -2){
        return "Doesn't mind " + this.nameString;
    }
    if(this.preference > -6){
        return "Dislikes " + this.nameString;
    }
    return "Detests " + this.nameString;
}

module.exports = Activity;