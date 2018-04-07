'use strict';

var Item = require('./item');

var Hammer = function () {
    Item.call(this);

    this.name = 'Hammer';
    this.slot = 'weapon';
    this.graphic = 'woodwand';
    this.animation = 'slash';
    this.attackSpeed = 1.3;
    this.attackBoxWidth = 1;
    this.attackBoxLength = 1;
};

Hammer.prototype = Object.create(Item.prototype);
Hammer.prototype.constructor = Hammer;

module.exports = Hammer;