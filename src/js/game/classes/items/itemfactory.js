'use strict';

var Hammer = require('./hammer');
var Spear = require('./spear');

var ItemFactory = function () {
    this.name = '';
    this.slot = '';
    this.graphic = '';
};

ItemFactory.prototype.constructor = ItemFactory;

ItemFactory.getNew = function(name) {
    return eval('new ' + name + '()');
};

module.exports = ItemFactory;