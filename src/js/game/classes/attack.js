'use strict';

var Attack = function (game, attacker, delay) {
    this.attacker = attacker;
    this.game = game;
    this.timer = this.game.time.create(false);
    this.timer.add(parseInt(delay), this.executeAttack, this);
    this.timer.start();
};

Attack.prototype.executeAttack = function(){

};

Attack.prototype.constructor = Attack;

module.exports = Attack;
