'use strict';

var Clothing = require('../prefabs/clothing');
var ItemFactory = require('./items/itemfactory');

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

Equipment.prototype.equipInitialGear = function () {
    for (var key in this.items) {
        this.replaceComponent(this.owner.getValidEquipment(key));
    }
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

    var component = new Clothing(this.game, this.owner, name);
    component.anchor.y = 0.5;
    component.anchor.x = 0.25;

    this.game.add.existing(component);
    this.owner.addChild(component);
    this.slots[slot] = component;
};

Equipment.prototype.replaceComponent = function (name) {
    if (name === '') {
        return;
    }
    this.equipItem(ItemFactory.getNew(name));
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

Equipment.prototype.getWeaponFrameCount = function () {
    if (this.items.weapon) {
        return this.slots.weapon.getAnimationFrameCount(this.items.weapon.getAnimation());
    }
    return 0;
};

Equipment.prototype.getWeaponAnimation = function () {
    if (this.items.weapon) {
        return this.items.weapon.getAnimation();
    }
    return false;
};

Equipment.prototype.getWeaponSpeed = function () {
    if (this.items.weapon) {
        return this.items.weapon.getAttackSpeed();
    }
    return 1;
};

Equipment.prototype.getWeapon = function () {
    if (this.items.weapon) {
        return this.items.weapon;
    }
    return false;
};

Equipment.prototype.hasSlotEquipped = function (slot) {
    return this.slots[slot];
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
    for (var key in this.items) {
        if (this.items.hasOwnProperty(key) && this.items[key]) {
            var itemObj = {
                'item' : this.items[key].constructor.name,
                'graphic' : this.items[key].graphic
            };
            stringObj[key] = itemObj;
        }
    }
    return JSON.stringify(stringObj);
};

Equipment.prototype.loadEquipmentString = function (string) {
    var stringObj = JSON.parse(string);
    for (var key in stringObj) {
        if (stringObj.hasOwnProperty(key) && stringObj[key]) {
            var item = ItemFactory.getNew(stringObj[key].item);
            item.setGraphic(stringObj[key].graphic);
            this.equipItem(item);
        }
    }
};

Equipment.prototype.constructor = Equipment;

module.exports = Equipment;


