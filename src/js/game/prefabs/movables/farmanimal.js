'use strict';

var Movable = require('./movable');
var Randomizer = require('../../classes/randomizer');
var InfoWindow = require('../infowindow');
var AnimalBrain = require('../../classes/animalbrain');

var FarmAnimal = function (game, x, y, type) {

    Movable.call( this, game, x, y, type);

    this.type = type;

    this.anchor.y = 0.5;
    this.anchor.x = 0.40;

    this.rowLength = 4;
    this.repeatAnimation = false;
    this.frameRate = 5;

    this.addAnimation('up', 0, 4);
    this.addAnimation('stillup', 0, 1);
    this.animations.add('eatup', [ 16,17,18,19,18,19,18,19,18,17,16 ], this.framerate, this.repeat);

    this.addAnimation('left', 1, 4);
    this.addAnimation('stillleft', 1, 1);
    this.animations.add('eatleft', [ 20,21,22,23,22,23,22,23,22,21,20 ], this.framerate, this.repeat);

    this.addAnimation('down', 2, 4);
    this.addAnimation('stilldown', 2, 1);
    this.animations.add('eatdown', [ 24,25,26,27,26,27,26,27,26,25,24 ], this.framerate, this.repeat);

    this.addAnimation('right', 3, 4);
    this.addAnimation('stillright', 3, 1);
    this.animations.add('eatright', [ 28,29,30,31,30,31,30,31,30,29,28 ], this.framerate, this.repeat);

    this.animations.play('stilldown', 4, false);

    this.csBetweenAnimation = 12;

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.body.allowRotation = false;

    this.isEating = false;
    this.isMoving = false;
    this.isFacing = 1.57;

    this.baseSpeed = 50;
    this.moveSpeed = this.baseSpeed;

    if(this.game.collisionDebug){

        var graphics = this.game.add.graphics(0,0);
        graphics.lineStyle(2, 0x00FF00, 1);
        graphics.drawRect( 0,0,
            this.game.worldTileSize, this.game.worldTileSize ) ;
        this.addChild(graphics);
    }

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    this.activityBrain = new AnimalBrain(this);

    this.sex = Math.random() > 0.5;
    this.firstName = this.sex ? Randomizer.firstMaleName() : Randomizer.firstFemaleName();
    this.lastName = "the " + type.charAt(0).toUpperCase() + type.substr(1).toLowerCase();
    this.setActivity(this.activityBrain.chooseActivity(true));

    this.game.units.add(this);
};

FarmAnimal.prototype = Object.create(Movable.prototype);
FarmAnimal.prototype.constructor = FarmAnimal;

FarmAnimal.prototype.clicked = function() {
    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

FarmAnimal.prototype.setAnimation = function(){
    if(this.isFacing > -0.78 && this.isFacing < 0.78){
        if(this.isMoving){
            this.playAnimation('right', this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isEating){
            this.playAnimation('eatright', this.moveSpeed / this.csBetweenAnimation, true);
        }else{
            this.playAnimation('stillright',  1, false);
        }
    }else if(this.isFacing < -0.78 && this.isFacing > -2.35){
        if(this.isMoving){
            this.playAnimation('up',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isEating){
            this.playAnimation('eatup',  this.moveSpeed / this.csBetweenAnimation, true);
        }else{
            this.playAnimation('stillup', 1, false);
        }
    }else if(this.isFacing > 0.78 && this.isFacing < 2.35){
        if(this.isMoving){
            this.playAnimation('down',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isEating){
            this.playAnimation('eatdown',  this.moveSpeed / this.csBetweenAnimation, true);
        }else{
            this.playAnimation('stilldown', 1, false);
        }
    }else{
        if(this.isMoving){
            this.playAnimation('left',  this.moveSpeed / this.csBetweenAnimation, true);
        }else if(this.isEating){
            this.playAnimation('eatleft',  this.moveSpeed / this.csBetweenAnimation, true);
        }else{
            this.playAnimation('stillleft', 1, false);
        }
    }
}

FarmAnimal.prototype.playAnimation = function(animation, framerate, repeat){
    this.animations.play(animation, framerate, repeat);
}

FarmAnimal.prototype.addAnimation = function(name, row, length) {
    var arr = [];
    var offset = row * this.rowLength;
    for(var i = 0; i < length; i++){
        arr.push(offset + i);
    }
    this.animations.add(name, arr, this.framerate, this.repeat);
};

module.exports = FarmAnimal;


