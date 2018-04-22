'use strict';

var Randomizer = require('../randomizer');

var Item = function () {
    this.name = '';
    this.slot = '';
    this.graphic = '';
    this.graphicFlavors = [''];
};

Item.prototype.constructor = Item;

Item.prototype.getName = function() {
    return this.name;
};

Item.prototype.getItemClassName = function() {
    return this.className;
};

Item.prototype.getSlot = function() {
    return this.slot;
};

Item.prototype.getGraphic = function() {
    return this.graphic;
};

Item.prototype.setGraphic = function(graphic) {
    this.graphic = graphic;
};

Item.prototype.getGraphics = function() {
    return this.graphicFlavors;
};

Item.prototype.setRandomFlavorGraphic = function() {
    this.graphic = Randomizer.arrayRand(this.graphicFlavors);
};

module.exports = Item;