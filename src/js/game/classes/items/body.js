'use strict';

var Item = require('./item');

var Body = function () {
    Item.call(this);

    this.slot = 'body';
};

Body.prototype = Object.create(Item.prototype);
Body.prototype.constructor = Body;


module.exports = Body;