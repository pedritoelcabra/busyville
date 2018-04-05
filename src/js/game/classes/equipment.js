'use strict';

var Clothing = require('../prefabs/clothing');

var Equipment = function (owner) {

    this.owner = owner;
    this.game = this.owner.game;

    this.slots = {
        "body": null,
        "pants": null,
        "shirt": null,
        "hair": null,
        "accessory": null,
        "weapon": null,
        "head": null,
        "feet": null
    };

    this.defaults = {
        "body": null,
        "pants": null,
        "shirt": null,
        "hair": null,
        "accessory": null,
        "weapon": null,
        "head": null,
        "feet": null
    };

    this.items = {
        "body": null,
        "pants": null,
        "shirt": null,
        "hair": null,
        "accessory": null,
        "weapon": null,
        "head": null,
        "feet": null
    };
};

Equipment.prototype.replaceComponent = function (slot, name) {
    if (typeof name === 'object') {
        this.equipItem(name);
        return;
    }
    if (typeof slot === 'object') {
        this.equipItem(slot);
        return;
    }
    this.equipSlot(slot, name);
};


Equipment.prototype.equipSlot = function (slot, name) {

    if (!name) {
        return;
    }

    this.items[slot] = null;

    if (this.hasSlotEquipped(slot)) {
        this.slots[slot].replaceTexture(name);
        return;
    }
    console.log(slot);
    console.log(name);

    var component = new Clothing(this.game, this.owner, name);
    component.anchor.y = 0.5;
    component.anchor.x = 0.25;

    this.game.add.existing(component);
    this.owner.addChild(component);
    this.slots[slot] = component;
};

Equipment.prototype.equipItem = function (item) {

    this.items[item.getSlot()] = item;

    if (this.hasSlotEquipped(item.getSlot())) {
        this.slots[item.getSlot()].replaceTexture(item.getGraphic());
        return;
    }

    var component = new Clothing(this.game, this.owner, item.getGraphic());
    component.anchor.y = 0.5;
    component.anchor.x = 0.25;

    this.game.add.existing(component);
    this.owner.addChild(component);
    this.slots[item.getSlot()] = component;
};

Equipment.prototype.saveDefaults = function () {
    for (var key in this.slots) {
        if (this.slots[key]) {
            this.defaults[key] = this.slots[key];
        }
    }
    for (var key in this.items) {
        if (this.items[key]) {
            this.defaults[key] = this.items[key];
        }
    }
};

Equipment.prototype.hasSlotEquipped = function (slot) {
    return this.slots[slot];
};

Equipment.prototype.clearSlot = function (slot) {
    if (this.slots[slot]) {
        this.slots[slot].destroy();
        this.slots[slot] = null;
    }
};

Equipment.prototype.playAnimation = function (animation, framerate, repeat) {
    for (var key in this.slots) {
        if (this.slots.hasOwnProperty(key) && this.slots[key]) {
            this.slots[key].animations.play(animation, framerate, repeat);
        }
    }
};

Equipment.prototype.stopAnimation = function () {
    for (var key in this.slots) {
        if (this.slots.hasOwnProperty(key) && this.slots[key]) {
            this.slots[key].animations.stop(null, true);
        }
    }
};

Equipment.prototype.getEquipmentString = function () {
    var stringObj = {};
    for (var key in this.slots) {
        if (this.slots.hasOwnProperty(key) && this.slots[key]) {
            stringObj[key] = this.slots[key].clothingType;
        }
    }
    return JSON.stringify(stringObj);
};

Equipment.prototype.loadEquipmentString = function (string) {
    var stringObj = JSON.parse(string);
    for (var key in stringObj) {
        if (stringObj.hasOwnProperty(key) && stringObj[key]) {
            this.replaceComponent(key, stringObj[key]);
        }
    }
};

Equipment.prototype.constructor = Equipment;

module.exports = Equipment;


