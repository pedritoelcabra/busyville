'use strict';

var Idle = require('../classes/activities/idle');
var Wander = require('../classes/activities/wander');
var Jog = require('../classes/activities/jog');
var Build = require('../classes/activities/build');

var ActivityBrain = require('../classes/activitybrain');

var HumanBrain = function (owner) {

    this.owner = owner;

    ActivityBrain.call();

    this.activities = [
        new Build(this.owner)
    ];

    this.idleActivities = [
        new Wander(this.owner),
        new Idle(this.owner)
    ];
};

HumanBrain.prototype = Object.create(ActivityBrain.prototype);
HumanBrain.prototype.constructor = HumanBrain;

module.exports = HumanBrain;


