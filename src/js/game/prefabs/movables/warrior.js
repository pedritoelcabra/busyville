'use strict';

var Pawn = require('./pawn');

var Warrior = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');
};

Warrior.prototype = Object.create(Pawn.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.getValidEquipment = function(type) {
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
            if (this.sex) {
                return ['leather_male'];
            }
            return ['leather_female'];
        case 'hair':
            return hairFiles;
        case 'weapon':
            return ['spear'];
        case 'head':
            if (this.sex) {
                return ['leather_cap_male'];
            }
            return ['leather_cap_female'];
        case 'feet':
            if (this.sex) {
                return ['black_shoes_male'];
            }
            return ['black_shoes_female'];
    }
    return [];
};

module.exports = Warrior;


