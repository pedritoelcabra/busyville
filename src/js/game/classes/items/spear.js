'use strict';

var Item = require('./item');

var Spear = function () {
    Item.call(this);

    this.name = 'Spear';
    this.slot = 'weapon';
    this.graphic = 'spear';
    this.animation = 'slashing';
};

Spear.prototype = Object.create(Item.prototype);
Spear.prototype.constructor = Spear;

module.exports = Spear;