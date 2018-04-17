'use strict';

var Pawn = require('./pawn');
var Randomizer = require('../../classes/randomizer');

var Worker = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');

    this.firstName = this.sex ? Randomizer.firstMaleName() : Randomizer.firstFemaleName();
    this.lastName = Randomizer.lastName();
};

Worker.prototype = Object.create(Pawn.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'weapon': return 'Hammer';
    }
    return Pawn.prototype.getValidEquipment.call(this, type);
};

module.exports = Worker;