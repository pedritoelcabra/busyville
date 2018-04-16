'use strict';

var Item = require('./item');

var Weapon = function () {
    this.animation = '';
    this.attackSpeed = 1;
    this.attackAngle = 1;
    this.attackReach = 1;
    this.knockBackPower = 1;
    this.damage = 1;
    this.build = false;
};

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.getAnimation = function() {
    return this.animation;
};

Weapon.prototype.getAttackSpeed = function() {
    return this.attackSpeed;
};

Weapon.prototype.getAngle = function() {
    return this.attackAngle;
};

Weapon.prototype.getReach = function() {
    return this.attackReach;
};

Weapon.prototype.getKnockBackPower= function() {
    return this.knockBackPower;
};

Weapon.prototype.getDamage= function() {
    return this.damage;
};

Weapon.prototype.canBuild = function() {
    return this.build;
};

Weapon.prototype.getAttackPoints= function(x, y, angle, reach) {

    var angleA = angle - (this.attackAngle / 2);
    var pointAX = x + ( reach * Math.cos(angleA));
    var pointAY = y + ( reach * Math.sin(angleA));

    var angleB = angle + (this.attackAngle / 2);
    var pointBX = x + ( reach * Math.cos(angleB));
    var pointBY = y + ( reach * Math.sin(angleB));

    var midPointX = (x + pointAX + pointBX) / 3;
    var midPointY = (y + pointAY + pointBY) / 3;

    return [
        new Phaser.Point(x, y),
        new Phaser.Point(pointAX, pointAY),
        new Phaser.Point(pointBX, pointBY),
        new Phaser.Point(midPointX, midPointY)
    ];
};

module.exports = Weapon;