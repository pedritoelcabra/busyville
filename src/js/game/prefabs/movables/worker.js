'use strict';

var Pawn = require('./pawn');
var ItemFactory = require('../../classes/items/itemfactory');

var Worker = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');
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