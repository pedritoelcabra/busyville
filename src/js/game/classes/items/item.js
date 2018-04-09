'use strict';

var Item = function () {
    this.name = '';
    this.slot = '';
    this.graphic = '';
    this.animation = '';
    this.attackSpeed = 1;
    this.attackBoxWidth = 1;
    this.attackBoxLength = 1;
    this.knockBackPower = 1;
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

Item.prototype.getAttackWidth = function() {
    return this.attackBoxWidth;
};

Item.prototype.getAttackReach= function() {
    return this.attackBoxLength;
};

Item.prototype.getKnockBackPower= function() {
    return this.knockBackPower;
};

module.exports = Item;