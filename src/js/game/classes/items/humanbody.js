'use strict';

var Body = require('./body');
var Randomizer = require('../randomizer');

var HumanBody = function () {

    Body.call(this);

    this.name = 'Human Body';

    this.graphicFlavors = [
        'dark2',
        'dark',
        'light',
        'tanned2',
        'tanned'
    ];

    this.setRandomFlavorGraphic();
};

HumanBody.prototype = Object.create(Body.prototype);
HumanBody.prototype.constructor = HumanBody;

module.exports = HumanBody;