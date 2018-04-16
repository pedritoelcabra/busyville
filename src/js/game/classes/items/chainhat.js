'use strict';

var Head = require('./head');
var Randomizer = require('../randomizer');

var ChainHat = function () {
    Head.call(this);

    this.name = 'Chain Hat';
    this.graphic = 'chainhat';
};

ChainHat.prototype = Object.create(Head.prototype);
ChainHat.prototype.constructor = ChainHat;

module.exports = ChainHat;