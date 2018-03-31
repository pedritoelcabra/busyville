'use strict';

var Pawn = require('./pawn');

var Worker = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');
};

Worker.prototype = Object.create(Pawn.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'body':
            return [
                'dark',
                'light',
                'tanned'
            ];
        case 'pants':
            return pantFiles;
        case 'shirt':
            return shirtFiles;
        case 'hair':
            return hairFiles;
    }
    return [];
};

module.exports = Worker;


