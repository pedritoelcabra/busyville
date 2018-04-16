'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');
var Attack = require('../classes/activities/attack');

var ActivityBrain = require('../classes/activitybrain');

var WarriorBrain = function (owner) {

    this.owner = owner;

    ActivityBrain.call(this);

    this.attackResponse = new Attack(this.owner);

    this.activities = [
        this.attackResponse
    ];


    this.idleActivities = [
        new Wander(this.owner),
        new Idle(this.owner)
    ];
};

WarriorBrain.prototype = Object.create(ActivityBrain.prototype);
WarriorBrain.prototype.constructor = WarriorBrain;

module.exports = WarriorBrain;


