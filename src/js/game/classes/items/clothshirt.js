'use strict';

var Shirt = require('./shirt');
var Randomizer = require('../randomizer');

var ClothShirt = function () {
    Shirt.call(this);

    this.name = 'Cloth Shirt';
    this.className = 'ClothShirt';

    this.graphicFlavors = [
        'brown_longsleeve',
        'maroon_longsleeve',
        'teal_longsleeve',
        'white_longsleeve'
    ];

    this.setRandomFlavorGraphic();
};

ClothShirt.prototype = Object.create(Shirt.prototype);
ClothShirt.prototype.constructor = ClothShirt;

module.exports = ClothShirt;