'use strict';

var Movable = require('./movable');
var Randomizer = require('../../classes/randomizer');
var InfoWindow = require('../../classes/menus/infowindow');
var WorkerBrain = require('../../classes/workerbrain');
var Equipment = require('../../classes/equipment');

var Pawn = function (game, x, y) {

    Movable.call( this, game, x, y, 'pawn');

    this.sex = Math.random() > 0.5;

    this.csBetweenAnimation = 12;

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.body.allowRotation = false;

    this.isMoving = false;
    this.isSlashing = false;
    this.isThrusting = false;
    this.isAttacking = false;
    this.launchAttack = false;
    this.isFacing = 1.57;

    this.baseSpeed = 100;
    this.moveSpeed = this.baseSpeed;

    // in ms
    this.attackSpeed = 1000;

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
};

Pawn.prototype = Object.create(Movable.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.setBrain = function() {
    this.activityBrain = new WorkerBrain(this);
};

Pawn.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'body':
            return [
                'dark2',
                'dark',
                'light',
                'tanned2',
                'tanned'
            ];
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

Pawn.prototype.equip = function (slot, name) {
    this.equipment.replaceComponent(slot, name);
    this.stopAnimation();
    this.setAnimation();
};

Pawn.prototype.clicked = function() {

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
};

Pawn.prototype.startAttack = function() {
    this.stopMovement();
    this.lastAttacked = this.game.microTime;
    this.isAttacking = true;
    this.launchAttack = true;
};

Pawn.prototype.getAttackSpeed = function() {
    return this.attackSpeed / this.equipment.getWeaponSpeed();
};

Pawn.prototype.setAnimation = function(){
    this.weaponAnimationSpeed = 6;
    if (this.launchAttack) {
        console.log(this.equipment.getWeaponAnimation());
        this.launchAttack = false;
        this.isMoving = false;
        if (this.equipment.getWeaponAnimation() == 'slash') {
            this.isSlashing = true;
        }
        if (this.equipment.getWeaponAnimation() == 'thrust') {
            this.isThrusting = true;
        }
        if (this.equipment.getWeaponFrameCount()) {
            this.weaponAnimationSpeed = Math.ceil(this.equipment.getWeaponFrameCount() * (1000 / this.getAttackSpeed()));
        }
        this.isFacing = Phaser.Math.angleBetween(
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.game.input.x,
            this.game.input.y
        );

    }
    if(this.isFacing > -0.78 && this.isFacing < 0.78){
        if(this.isMoving){
            this.playAnimation('right', this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashright', this.weaponAnimationSpeed, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustright', this.weaponAnimationSpeed, true);
        }else{
            this.playAnimation('stillright',  1, false);
        }
    }else if(this.isFacing < -0.78 && this.isFacing > -2.35){
        if(this.isMoving){
            this.playAnimation('up',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashup', this.weaponAnimationSpeed, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustup', this.weaponAnimationSpeed, true);
        }else{
            this.playAnimation('stillup', 1, false);
        }
    }else if(this.isFacing > 0.78 && this.isFacing < 2.35){
        if(this.isMoving){
            this.playAnimation('down',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashdown', this.weaponAnimationSpeed, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustdown', this.weaponAnimationSpeed, true);
        }else{
            this.playAnimation('stilldown', 1, false);
        }
    }else{
        if(this.isMoving){
            this.playAnimation('left',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashleft', this.weaponAnimationSpeed, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustleft', this.weaponAnimationSpeed, true);
        }else{
            this.playAnimation('stillleft', 1, false);
        }
    }
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

module.exports = Pawn;


