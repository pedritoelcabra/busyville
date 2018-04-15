'use strict';

var Item = require('./item');

var Hammer = function () {
    Item.call(this);

    this.name = 'Hammer';
    this.slot = 'weapon';
    this.graphic = 'woodwand';
    this.animation = 'slash';
    this.attackSpeed = 1.3;
    this.attackAngle = 1;
    this.attackReach = 1;
    this.build = true;
    this.damage = 10;
};

Hammer.prototype = Object.create(Item.prototype);
Hammer.prototype.constructor = Hammer;

module.exports = Hammer;