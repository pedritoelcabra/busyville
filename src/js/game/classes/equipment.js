'use strict';

var Clothing = require('../prefabs/clothing');

var Equipment = function (owner) {

    this.owner = owner;
    this.game = this.owner.game;

    this.slots = {
        "body" : null,
        "pants" : null,
        "shirt" : null,
        "hair" : null,
        "accessory" : null,
        "weapon" : null,
    }
};

Equipment.prototype.replaceComponent = function(slot, name){
    this.clearSlot(slot);
    var component = new Clothing(this.game, this.owner, name);
    component.anchor.y = 0.7;
    component.anchor.x = 0.35;
    this.game.add.existing(component);
    this.owner.addChild(component);
    this.slots[slot] = component;
}

Equipment.prototype.hasSlotEquipped = function(slot) {
    if(this.slots[slot]){
        return true;
    }
    return false;
};

Equipment.prototype.clearSlot = function(slot) {
    if(this.slots[slot]){
        this.slots[slot].destroy();
        this.slots[slot] = null;
    }
};

Equipment.prototype.playAnimation = function(animation, framerate, repeat){
    for (var key in this.slots) {
        if (this.slots.hasOwnProperty(key) && this.slots[key]) {
            this.slots[key].animations.play(animation, framerate, repeat);
        }
    }
}

Equipment.prototype.constructor = Equipment;

module.exports = Equipment;


