'use strict';

var Weapon = require('./weapon');

var Spear = function () {
    Weapon.call(this);

    this.name = 'Spear';
    this.className = 'Spear';
    this.graphic = 'spear';
    this.animation = 'thrust';
    this.attackSpeed = 0.7;
    this.attackAngle = 0.5;
    this.attackReach = 1.5;
    this.damage = 20;
};

Spear.prototype = Object.create(Weapon.prototype);
Spear.prototype.constructor = Spear;

module.exports = Spear;