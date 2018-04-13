'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');

var ActivityBrain = require('../classes/activitybrain');

var WarriorBrain = function (owner) {

    this.owner = owner;

    ActivityBrain.call(this);

    this.activities = [
        new Attack(this.owner)
    ];

    this.idleActivities = [
        new Wander(this.owner),
        new Idle(this.owner)
    ];
};

WarriorBrain.prototype = Object.create(ActivityBrain.prototype);
WarriorBrain.prototype.constructor = WarriorBrain;

module.exports = WarriorBrain;


