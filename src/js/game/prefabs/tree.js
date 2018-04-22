'use strict';

var Decor = require('./decor');

var Tree = function (game, x, y, type) {

    this.game = game;
    Decor.call(this, game, x, y, type);
};

Tree.prototype = Object.create(Decor.prototype);
Tree.prototype.constructor = Tree;

module.exports = Tree;


