'use strict';

var Item = require('./item');

var Pants = function () {
    Item.call(this);

    this.slot = 'pants';
};

Pants.prototype = Object.create(Item.prototype);
Pants.prototype.constructor = Pants;


module.exports = Pants;