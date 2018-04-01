'use strict';

var Pawn = require('./pawn');

var Worker = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');
};

Worker.prototype = Object.create(Pawn.prototype);
Worker.prototype.constructor = Worker;

module.exports = Worker;


