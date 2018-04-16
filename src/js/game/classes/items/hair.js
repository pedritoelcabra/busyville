'use strict';

var Item = require('./item');

var Hair = function () {
    Item.call(this);

    this.slot = 'hair';
};

Hair.prototype = Object.create(Item.prototype);
Hair.prototype.constructor = Hair;


module.exports = Hair;