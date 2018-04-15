'use strict';

var Item = function () {
    this.name = '';
    this.slot = '';
    this.graphic = '';
    this.animation = '';
    this.attackSpeed = 1;
    this.attackAngle = 1;
    this.attackReach = 1;
    this.knockBackPower = 1;
    this.damage = 1;
    this.build = false;
};

Item.prototype.constructor = Item;

Item.prototype.getName = function() {
    return this.name;
};

Item.prototype.getSlot = function() {
    return this.slot;
};

Item.prototype.getGraphic = function() {
    return this.graphic;
};

Item.prototype.getAnimation = function() {
    return this.animation;
};

Item.prototype.getAttackSpeed = function() {
    return this.attackSpeed;
};

Item.prototype.getAngle = function() {
    return this.attackAngle;
};

Item.prototype.getReach = function() {
    return this.attackReach;
};

Item.prototype.getKnockBackPower= function() {
    return this.knockBackPower;
};

Item.prototype.getDamage= function() {
    return this.damage;
};

Item.prototype.canBuild = function() {
    return this.build;
};

Item.prototype.getAttackPoints= function(x, y, angle, reach) {

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

module.exports = Item;