'use strict';

var Hammer = require('./hammer');
var Spear = require('./spear');

var ItemFactory = function () {
};

ItemFactory.prototype.constructor = ItemFactory;

ItemFactory.getNew = function(name) {
    return eval('new ' + name + '()');
};

module.exports = ItemFactory;