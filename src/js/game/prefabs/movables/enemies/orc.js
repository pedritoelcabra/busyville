'use strict';

var Pawn = require('./../pawn');
var ItemFactory = require('../../../classes/items/itemfactory');
var MeleeEnemyBrain = require('../../../classes/meleeenemybrain');

var Orc = function (game, x, y) {

    Pawn.call( this, game, x, y);

    this.setFaction('orc');
};

Orc.prototype = Object.create(Pawn.prototype);
Orc.prototype.constructor = Orc;

Orc.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'shirt':
            return [];
        case 'weapon':
            return [ItemFactory.getNew('Spear')];
        case 'head':
            return [];
        case 'pants':
            return [];
        case 'feet':
            return [];
        case 'hair':
            return [];
        case 'body':
            return [ItemFactory.getNew('OrcBody')];
    }
    return Pawn.prototype.getValidEquipment.call(this, type);
};

Orc.prototype.setBrain = function() {
    this.activityBrain = new MeleeEnemyBrain(this);
};

module.exports = Orc;


