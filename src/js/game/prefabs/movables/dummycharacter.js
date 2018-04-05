'use strict';

var Player = require('./player');
var Pawn = require('./pawn');

var DummyCharacter = function (game, x, y) {

    Player.call( this, game, x, y);

};

DummyCharacter.prototype = Object.create(Player.prototype);
DummyCharacter.prototype.constructor = DummyCharacter;

DummyCharacter.prototype.update = function() {

};

DummyCharacter.prototype.getValidEquipment = function(type) {
    return Pawn.prototype.getValidEquipment.call(this, type);
};

module.exports = DummyCharacter;