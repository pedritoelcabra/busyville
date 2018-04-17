'use strict';

var Pawn = require('./pawn');
var WarriorBrain = require('../../classes/warriorbrain');
var Randomizer = require('../../classes/randomizer');

var Warrior = function (game, x, y) {

    Pawn.call( this, game, x, y);

    this.firstName = this.sex ? Randomizer.firstMaleName() : Randomizer.firstFemaleName();
    this.lastName = Randomizer.warriorEphitet();
};

Warrior.prototype = Object.create(Pawn.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'shirt': return 'LeatherArmor';
        case 'weapon': return 'Spear';
        case 'head': return 'ChainHat';
        case 'feet': return 'BlackShoes';
        case 'hair': return '';
    }
    return Pawn.prototype.getValidEquipment.call(this, type);
};

Warrior.prototype.setBrain = function() {
    this.activityBrain = new WarriorBrain(this);
};

module.exports = Warrior;


