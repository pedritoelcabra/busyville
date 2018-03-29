'use strict';

var Movable = require('./movable');
var Randomizer = require('../../classes/randomizer');
var InfoWindow = require('../infowindow');
var HumanBrain = require('../../classes/humanbrain');
var Equipment = require('../../classes/equipment');

var Pawn = function (game, x, y) {

    Movable.call( this, game, x, y, 'pawn');

    this.csBetweenAnimation = 12;

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.body.allowRotation = false;

    this.isMoving = false;
    this.isSlashing = false;
    this.isThrusting = false;
    this.isFacing = 1.57;

    this.baseSpeed = 100;
    this.moveSpeed = this.baseSpeed;

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

    this.activityBrain = new HumanBrain(this);

    this.sex = Math.random() > 0.5;
    this.firstName = this.sex ? Randomizer.firstMaleName() : Randomizer.firstFemaleName();
    this.lastName = Randomizer.lastName();
    this.setActivity(this.activityBrain.chooseActivity(true));

    this.game.units.add(this);
};

Pawn.prototype = Object.create(Movable.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getValidEquipment = function(type) {
    switch (type) {
        case 'body' : return bodyFiles;
        case 'pants' : return pantFiles;
        case 'shirt' : return shirtFiles;
        case 'hair' : return hairFiles;
    }
    return [];
};

Pawn.prototype.equipInitialGear = function() {
    this.equipment.replaceComponent("body", Randomizer.arrayRand(this.getValidEquipment('body')));
    this.equipment.replaceComponent("pants", Randomizer.arrayRand(this.getValidEquipment('pants')));
    this.equipment.replaceComponent("shirt", Randomizer.arrayRand(this.getValidEquipment('shirt')));
    this.equipment.replaceComponent("hair", Randomizer.arrayRand(this.getValidEquipment('hair')));
};

Pawn.prototype.clicked = function() {
    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

Pawn.prototype.setAnimation = function(){
    if(this.isFacing > -0.78 && this.isFacing < 0.78){
        if(this.isMoving){
            this.playAnimation('right', this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashright', 6, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustright', 6, true);
        }else{
            this.playAnimation('stillright',  1, false);
        }
    }else if(this.isFacing < -0.78 && this.isFacing > -2.35){
        if(this.isMoving){
            this.playAnimation('up',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashup', 6, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustup', 6, true);
        }else{
            this.playAnimation('stillup', 1, false);
        }
    }else if(this.isFacing > 0.78 && this.isFacing < 2.35){
        if(this.isMoving){
            this.playAnimation('down',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashdown', 6, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustdown', 6, true);
        }else{
            this.playAnimation('stilldown', 1, false);
        }
    }else{
        if(this.isMoving){
            this.playAnimation('left',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isSlashing){
            this.playAnimation('slashleft', 6, true);
        }else if(this.isThrusting){
            this.playAnimation('thrustleft', 6, true);
        }else{
            this.playAnimation('stillleft', 1, false);
        }
    }
};

Pawn.prototype.playAnimation = function(animation, framerate, repeat){
    this.equipment.playAnimation(animation, framerate, repeat);
};

module.exports = Pawn;


