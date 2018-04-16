'use strict';

var Item = function () {
    this.name = '';
    this.slot = '';
    this.graphic = '';
};

Item.prototype.constructor = Item;

Item.prototype.getName = function() {
    return this.name;
};

Item.prototype.getSlot = function() {
    return this.slot;
};

Item.prototype.getGraphic = function() {
    return this.graphic;
};

module.exports = Item;