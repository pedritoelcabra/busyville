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
        new Wander(this.owner),
        new Idle(this.owner),
        new Jog(this.owner),
        new Build(this.owner),
    ];
};

HumanBrain.prototype = Object.create(ActivityBrain.prototype);
HumanBrain.prototype.constructor = HumanBrain;

module.exports = HumanBrain;


