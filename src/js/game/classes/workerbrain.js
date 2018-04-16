'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');
var Build = require('../classes/activities/build');
var Attack = require('../classes/activities/attack');

var ActivityBrain = require('../classes/activitybrain');

var WorkerBrain = function (owner) {

    this.owner = owner;

    ActivityBrain.call(this);

    this.activities = [
        new Build(this.owner)
    ];

    this.idleActivities = [
        new Wander(this.owner),
        new Attack(this.owner),
        new Idle(this.owner)
    ];
};

WorkerBrain.prototype = Object.create(ActivityBrain.prototype);
WorkerBrain.prototype.constructor = WorkerBrain;

module.exports = WorkerBrain;


