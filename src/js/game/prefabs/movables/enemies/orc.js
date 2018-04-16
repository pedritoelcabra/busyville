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
        case 'weapon':
            return [ItemFactory.getNew('Spear')];
        case 'body':
            return [ItemFactory.getNew('OrcBody')];
    }
    return [];
};

Orc.prototype.setBrain = function() {
    this.activityBrain = new MeleeEnemyBrain(this);
};

module.exports = Orc;


