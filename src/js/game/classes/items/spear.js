'use strict';

var Item = require('./item');

var Spear = function () {
    Item.call(this);

    this.name = 'Spear';
    this.slot = 'weapon';
    this.graphic = 'spear';
    this.animation = 'thrust';
    this.attackSpeed = 0.7;
    this.attackBoxWidth = 1;
    this.attackBoxLength = 2;
};

Spear.prototype = Object.create(Item.prototype);
Spear.prototype.constructor = Spear;

module.exports = Spear;