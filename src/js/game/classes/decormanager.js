'use strict';

var Tree = require('../prefabs/tree');
var Randomizer = require('./randomizer');

var DecorManager = function (game) {

    this.game = game;

    this.trees = [
        'tree1',
        'tree2'
    ];
};

DecorManager.prototype.constructor = DecorManager;

DecorManager.prototype.addRandomTrees = function(count) {
    var iterations = 0;
    var x, y;
    while (count > 0 && iterations < 1000) {
        iterations++;
        x = Randomizer.getRandomInt(this.game.worldWidth);
        y = Randomizer.getRandomInt(this.game.worldHeight);
        if (this.addTree(Randomizer.arrayRand(this.trees), x, y)) {
            count--;
        }
    }
};

DecorManager.prototype.addTree = function(type, x, y) {
    if (this.game.collisionMap.collidesPixel(x, y)) {
        return false;
    }
    var decor = new Tree(this.game, x, y, type);
    return true;
};

module.exports = DecorManager;


