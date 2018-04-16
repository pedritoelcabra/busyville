'use strict';

var Hair = require('./hair');
var Randomizer = require('../randomizer');

var HumanHair = function () {
    Hair.call(this);

    this.name = 'Hair';
    this.graphic = Randomizer.arrayRand(hairFiles);
};

HumanHair.prototype = Object.create(Hair.prototype);
HumanHair.prototype.constructor = HumanHair;

module.exports = HumanHair;