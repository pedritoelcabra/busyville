'use strict';

var Pawn = require('./pawn');
var WarriorBrain = require('../../classes/warriorbrain');

var Warrior = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');
};

Warrior.prototype = Object.create(Pawn.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'shirt':
            return ['leather'];
        case 'weapon':
            return ['spear'];
        case 'head':
            return ['chainhat'];
        case 'feet':
            return ['black_shoes'];
        case 'hair':
            return [];
    }
    return Pawn.prototype.getValidEquipment.call(this, type);
};

Warrior.prototype.setBrain = function() {
    this.activityBrain = new WarriorBrain(this);
};

module.exports = Warrior;


