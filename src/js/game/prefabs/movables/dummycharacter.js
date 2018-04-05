'use strict';

var Player = require('./player');

var DummyCharacter = function (game, x, y) {

    Player.call( this, game, x, y);

};

DummyCharacter.prototype = Object.create(Player.prototype);
DummyCharacter.prototype.constructor = DummyCharacter;

DummyCharacter.prototype.update = function() {

};

module.exports = DummyCharacter;


