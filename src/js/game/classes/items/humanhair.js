'use strict';

var Hair = require('./hair');

var HumanHair = function () {
    Hair.call(this);

    this.name = 'Hair';
    this.className = 'HumanHair';

    this.graphicFlavors = hairFiles;

    this.setRandomFlavorGraphic();
};

HumanHair.prototype = Object.create(Hair.prototype);
HumanHair.prototype.constructor = HumanHair;

module.exports = HumanHair;