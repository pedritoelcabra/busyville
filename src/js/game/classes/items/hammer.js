'use strict';

var Weapon = require('./weapon');

var Hammer = function () {
    Weapon.call(this);

    this.name = 'Hammer';
    this.className = 'Hammer';
    this.graphic = 'woodwand';
    this.animation = 'slash';
    this.attackSpeed = 1.3;
    this.attackAngle = 1;
    this.attackReach = 1;
    this.build = true;
    this.damage = 10;
};

Hammer.prototype = Object.create(Weapon.prototype);
Hammer.prototype.constructor = Hammer;

module.exports = Hammer;