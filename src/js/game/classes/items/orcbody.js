'use strict';

var Body = require('./body');
var Randomizer = require('../randomizer');

var OrcBody = function () {
    Body.call(this);

    this.name = 'Orc Body';
    this.className = 'OrcBody';
    this.graphic = Randomizer.arrayRand([
        'orc',
        'red_orc'
    ]);
};

OrcBody.prototype = Object.create(Body.prototype);
OrcBody.prototype.constructor = OrcBody;

module.exports = OrcBody;