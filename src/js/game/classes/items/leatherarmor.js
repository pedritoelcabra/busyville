'use strict';

var Shirt = require('./shirt');
var Randomizer = require('../randomizer');

var LeatherArmor = function () {
    Shirt.call(this);

    this.name = 'Leather Armor';
    this.className = 'LeatherArmor';
    this.graphic = 'leather';
};

LeatherArmor.prototype = Object.create(Shirt.prototype);
LeatherArmor.prototype.constructor = LeatherArmor;

module.exports = LeatherArmor;