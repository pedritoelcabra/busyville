'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');
var Attack = require('../classes/activities/attack');

var ActivityBrain = require('../classes/activitybrain');

var MeleeEnemyBrain = function (owner) {

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

MeleeEnemyBrain.prototype = Object.create(ActivityBrain.prototype);
MeleeEnemyBrain.prototype.constructor = MeleeEnemyBrain;

module.exports = MeleeEnemyBrain;


