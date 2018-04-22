'use strict';

var Pants = require('./pants');
var Randomizer = require('../randomizer');

var ClothPants = function () {
    Pants.call(this);

    this.name = 'Cloth Pants';
    this.className = 'ClothPants';

    this.graphicFlavors = pantFiles;

    this.setRandomFlavorGraphic();
};

ClothPants.prototype = Object.create(Pants.prototype);
ClothPants.prototype.constructor = ClothPants;

module.exports = ClothPants;