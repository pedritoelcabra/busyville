'use strict';

var Pawn = require('./../pawn');
var MeleeEnemyBrain = require('../../../classes/meleeenemybrain');
var Randomizer = require('../../../classes/randomizer');

var Orc = function (game, x, y) {

    Pawn.call( this, game, x, y);

    this.firstName = Randomizer.orcName();
    this.lastName = Randomizer.orcEphitet();

    this.setFaction('orc');
};

Orc.prototype = Object.create(Pawn.prototype);
Orc.prototype.constructor = Orc;

Orc.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'weapon': return 'Spear';
        case 'body': return 'OrcBody';
    }
    return '';
};

Orc.prototype.setBrain = function() {
    this.activityBrain = new MeleeEnemyBrain(this);
};

module.exports = Orc;


