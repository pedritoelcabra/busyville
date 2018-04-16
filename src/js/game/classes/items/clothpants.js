'use strict';

var Pants = require('./pants');
var Randomizer = require('../randomizer');

var ClothPants = function () {
    Pants.call(this);

    this.name = 'Cloth Pants';
    this.graphic = Randomizer.arrayRand(pantFiles);
};

ClothPants.prototype = Object.create(Pants.prototype);
ClothPants.prototype.constructor = ClothPants;

module.exports = ClothPants;