'use strict';

var Pawn = require('./pawn');
var ItemFactory = require('../../classes/items/itemfactory');
var WarriorBrain = require('../../classes/warriorbrain');

var Warrior = function (game, x, y) {

    Pawn.call( this, game, x, y);
};

Warrior.prototype = Object.create(Pawn.prototype);
Warrior.prototype.constructor = Warrior;

Warrior.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'shirt': return [ItemFactory.getNew('LeatherArmor')];
        case 'weapon': return [ItemFactory.getNew('Spear')];
        case 'head': return [ItemFactory.getNew('ChainHat')];
        case 'feet': return [ItemFactory.getNew('BlackShoes')];
        case 'hair': return [];
    }
    return Pawn.prototype.getValidEquipment.call(this, type);
};

Warrior.prototype.setBrain = function() {
    this.activityBrain = new WarriorBrain(this);
};

module.exports = Warrior;


