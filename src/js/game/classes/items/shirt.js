'use strict';

var Item = require('./item');

var Shirt = function () {
    Item.call(this);

    this.slot = 'shirt';
};

Shirt.prototype = Object.create(Item.prototype);
Shirt.prototype.constructor = Shirt;


module.exports = Shirt;