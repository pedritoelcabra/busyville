'use strict';

var Movable = require('./movable');
var Randomizer = require('../../classes/randomizer');
var InfoWindow = require('../../classes/menus/infowindow');
var WorkerBrain = require('../../classes/workerbrain');
var Equipment = require('../../classes/equipment');
var Attack = require('../../classes/attack');
var HitBox = require('../../classes/hitbox');
var ItemFactory = require('../../classes/items/itemfactory');

var Pawn = function (game, x, y) {

    Movable.call( this, game, x, y, 'pawn');

    this.sex = Math.random() > 0.5;

    this.csBetweenAnimation = 12;

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.body.allowRotation = false;

    this.hitBox = new HitBox(x, y, this.game.worldTileSize, this.game.worldTileSize);

    this.baseSpeed = 100;
    this.moveSpeed = this.baseSpeed;

    // in ms
    this.attackSpeed = 1000;
    this.checkForEnemyFrequency = 1000;

    this.lastCheckedForEnemy = 0;
    this.checkForEnemyRange = 500;

    this.equipment = new Equipment(this);

    this.equipInitialGear();

    if(this.game.collisionDebug){

        var graphics = this.game.add.graphics(0,0);
        graphics.lineStyle(2, 0x00FF00, 1);
        graphics.drawRect( 0,0,
            this.game.worldTileSize, this.game.worldTileSize ) ;
        this.addChild(graphics);
    }

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    this.firstName = this.sex ? Randomizer.firstMaleName() : Randomizer.firstFemaleName();
    this.lastName = Randomizer.lastName();

    this.setBrain();
    this.setActivity(this.activityBrain.chooseActivity(true));

    this.game.units.add(this);
    if (this.game.factionManager) {
        this.game.factionManager.addUnit(this);
    }
};

Pawn.prototype = Object.create(Movable.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.updateAttack = function() {

    if (this.isDead) {
        return;
    }

    if (this.launchAttack === true) {
        this.setAnimation();
    }

    if (this.isAttacking && (this.game.microTime - this.lastAttacked) >= this.attackSpeed) {
        this.stopAttack();
    }
};

Pawn.prototype.setBrain = function() {
    this.activityBrain = new WorkerBrain(this);
};

Pawn.prototype.getHitBox = function() {
    this.hitBox.x = this.x;
    this.hitBox.y = this.y;
    this.hitBox.mx = this.x + (this.hitBox.w / 2);
    this.hitBox.my = this.y + (this.hitBox.h / 2);
    return this.hitBox;
};

Pawn.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'body': return [ItemFactory.getNew('HumanBody')];
        case 'pants':
            return pantFiles;
        case 'shirt':
            return [
                'brown_longsleeve',
                'maroon_longsleeve',
                'teal_longsleeve',
                'white_longsleeve'
            ];
        case 'hair':
            return hairFiles;
    }
    return [];
};

Pawn.prototype.equipInitialGear = function() {
    this.equipment.replaceComponent("body", Randomizer.arrayRand(this.getValidEquipment('body')));
    this.equipment.replaceComponent("pants", Randomizer.arrayRand(this.getValidEquipment('pants')));
    this.equipment.replaceComponent("shirt", Randomizer.arrayRand(this.getValidEquipment('shirt')));
    this.equipment.replaceComponent("hair", Randomizer.arrayRand(this.getValidEquipment('hair')));
    this.equipment.replaceComponent("head", Randomizer.arrayRand(this.getValidEquipment('head')));
    this.equipment.replaceComponent("feet", Randomizer.arrayRand(this.getValidEquipment('feet')));
    this.equipment.replaceComponent("weapon", Randomizer.arrayRand(this.getValidEquipment('weapon')));
};

Pawn.prototype.getCurrentlyEquipped = function (slot) {
    return this.equipment.hasSlotEquipped(slot).clothingType;
};

Pawn.prototype.checkForEnemiesInRange = function (force) {
    if (typeof force === 'undefined') {
        force = false;
    }
    if (!force && this.recentlyCheckedForEnemies()) {
        return false;
    }
    this.lastCheckedForEnemy = this.game.microTime;
    return this.game.factionManager.getClosestEnemyForUnit(this);
};

Pawn.prototype.recentlyCheckedForEnemies = function () {
    return (this.lastCheckedForEnemy + this.checkForEnemyFrequency > this.game.microTime);
};

Pawn.prototype.equip = function (slot, name) {
    this.equipment.replaceComponent(slot, name);
    this.stopAnimation();
    this.setAnimation();
};

Pawn.prototype.isAlive = function () {
    return !this.isDead;
};

Pawn.prototype.clicked = function() {

    if (!this.game.input.activePointer.rightButton.isDown) {
        return;
    }

    this.game.cursorManager.updateLastHandledClick();

    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

Pawn.prototype.stopAttack = function() {
    this.isSlashing = false;
    this.isThrusting = false;
    this.launchAttack = false;
    this.isAttacking = false;
    this.setAnimation();
};

Pawn.prototype.startAttack = function() {
    this.stopMovement();
    this.lastAttacked = this.game.microTime;
    this.isAttacking = true;
    this.launchAttack = true;
    this.currentAttack = new Attack(this.game, this, this.getAttackSpeed() / 2);
};

Pawn.prototype.getAttackSpeed = function() {
    return this.attackSpeed / this.equipment.getWeaponSpeed();
};

Pawn.prototype.getWeapon = function() {
    return this.equipment.getWeapon();
};

Pawn.prototype.setAnimation = function(){
    if (this.isDead) {
        if (!this.playedDeathAnimation) {
            this.playAnimation('die', 6, false);
            this.playedDeathAnimation = true;
        }
        return;
    }
    this.weaponAnimationSpeed = 6;
    if (this.launchAttack) {
        this.launchAttack = false;
        this.isMoving = false;
        if (this.equipment.getWeaponAnimation() === 'slash') {
            this.isSlashing = true;
        }
        if (this.equipment.getWeaponAnimation() === 'thrust') {
            this.isThrusting = true;
        }
        if (this.equipment.getWeaponFrameCount()) {
            this.weaponAnimationSpeed = Math.ceil(this.equipment.getWeaponFrameCount() * (1000 / this.getAttackSpeed()));
        }
    }

    if (this.isMoving) {
        this.playAnimation(this.facingDirection(), this.moveSpeed / this.csBetweenAnimation, true);
    } else if (this.isSlashing) {
        this.playAnimation('slash' + this.facingDirection(), this.weaponAnimationSpeed, true);
    } else if (this.isThrusting) {
        this.playAnimation('thrust' + this.facingDirection(), this.weaponAnimationSpeed, true);
    } else {
        this.playAnimation('still' + this.facingDirection(), 1, false);
    }
};

Pawn.prototype.facingDirection = function () {
    if (this.isFacing > -2.35 && this.isFacing <= -0.78) {
        return 'up';
    }
    if (this.isFacing > 0.78 && this.isFacing <= 2.35) {
        return 'down';
    }
    if (this.isFacing > -0.78 && this.isFacing <= 0.78) {
        return 'right';
    }
    return 'left';
};

Pawn.prototype.playAnimation = function(animation, framerate, repeat){
    this.equipment.playAnimation(animation, framerate, repeat);
};

Pawn.prototype.stopAnimation = function(){
    this.equipment.stopAnimation();
};

Pawn.prototype.getEquipmentString = function(){
    return this.equipment.getEquipmentString();
};

Pawn.prototype.loadEquipmentString = function(string){
    this.equipment.loadEquipmentString(string);
};

Pawn.prototype.setHome = function(inhabitantHome){
    this.inhabitantHome = inhabitantHome;
};

Pawn.prototype.receiveAttack = function(attack){
    this.knockBack(attack);
    this.stats.damageStat('health', attack.damage);
    this.activityBrain.triggerAttacked();
    if (this.stats.get('health') <= 0) {
        this.killingBlow(attack);
    }
};

Pawn.prototype.knockBack = function(attack){

    if (this.currentAttack) {
        this.currentAttack.cancel();
    }
    this.stopAttack();
    this.stopMovement();

    if (this.game.collisionMap.collidesPixel(this.x, this.y)) {
        return;
    }

    var angle = Phaser.Math.angleBetween(attack.originX, attack.originY, this.x, this.y);
    var pointX = this.x + ( attack.reach * Math.cos(angle));
    var pointY = this.y + ( attack.reach * Math.sin(angle));

    this.game.add.tween(this).to(
        {
            x: pointX,
            y: pointY
        },
        500,
        Phaser.Easing.Back.Out, true
    );
};

module.exports = Pawn;


