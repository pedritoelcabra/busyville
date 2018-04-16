'use strict';

var Item = require('./item');

var Head = function () {
    Item.call(this);

    this.slot = 'head';
};

Head.prototype = Object.create(Item.prototype);
Head.prototype.constructor = Head;


module.exports = Head;