'use strict';

var Feet = require('./feet');
var Randomizer = require('../randomizer');

var BlackShoes = function () {
    Feet.call(this);

    this.name = 'Black Shoes';
    this.className = 'BlackShoes';
    this.graphic = 'black_shoes';
};

BlackShoes.prototype = Object.create(Feet.prototype);
BlackShoes.prototype.constructor = BlackShoes;

module.exports = BlackShoes;