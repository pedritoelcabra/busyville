'use strict';

var Item = require('./item');

var Feet = function () {
    Item.call(this);

    this.slot = 'feet';
};

Feet.prototype = Object.create(Item.prototype);
Feet.prototype.constructor = Feet;


module.exports = Feet;