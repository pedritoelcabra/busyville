'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');
var Jog = require('../classes/activities/jog');
var Eat = require('../classes/activities/eat');
var Spit = require('../classes/activities/spit');

var ActivityBrain = require('../classes/activitybrain');

var AnimalBrain = function (owner) {

    this.owner = owner;

    ActivityBrain.call();

    this.activities = [
        new Wander(this.owner),
        new Idle(this.owner),
        new Jog(this.owner),
    ];

    if(this.owner.type == "cow" || this.owner.type == "sheep" || this.owner.type == "pig"){
        this.activities.push(new Eat(this.owner));
    }

    if(this.owner.type == "llama"){
        this.activities.push(new Spit(this.owner));
    }
};

AnimalBrain.prototype = Object.create(ActivityBrain.prototype);
AnimalBrain.prototype.constructor = AnimalBrain;

module.exports = AnimalBrain;


