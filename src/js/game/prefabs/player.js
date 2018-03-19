'use strict';

var Movable = require('../prefabs/movable');
var Randomizer = require('../classes/randomizer');
var InfoWindow = require('../prefabs/infowindow');
var HumanBrain = require('../classes/humanbrain');
var Equipment = require('../classes/equipment');

var Player = function (game, x, y) {

    Movable.call( this, game, x, y, 'pawn');

    this.csBetweenAnimation = 12;

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = false;
    this.body.allowRotation = false;

    this.isMoving = false;
    this.isSlashing = false;
    this.isThrusting = false;
    this.isFacing = 1.57;

    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;

    this.baseSpeed = 200;
    this.moveSpeed = this.baseSpeed;
    this.diagonalSpeed = this.baseSpeed;

    this.equipment = new Equipment(this);
    this.equipment.replaceComponent("body", Randomizer.arrayRand(bodyFiles));
    this.equipment.replaceComponent("pants", Randomizer.arrayRand(pantFiles));
    this.equipment.replaceComponent("shirt", Randomizer.arrayRand(shirtFiles));
    this.equipment.replaceComponent("hair", Randomizer.arrayRand(hairFiles));

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
    // this.setActivity(this.activityBrain.chooseActivity(true));

    this.game.units.add(this);
};

Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    var oldMoving = this.isMoving;
    var oldFacing = this.isFacing;
    this.isMoving = false;

    if (this.movingUp && this.movingLeft) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.diagonalSpeed, -this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingUp && this.movingRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.diagonalSpeed, -this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown && this.movingRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.diagonalSpeed, this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown && this.movingLeft) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.diagonalSpeed, this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown) {
        this.isFacing = 1.5;
        this.body.velocity.setTo(0, this.moveSpeed);
        this.isMoving = true;
    }
    else if (this.movingRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.moveSpeed, 0);
        this.isMoving = true;
    }
    else if (this.movingLeft) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.moveSpeed, 0);
        this.isMoving = true;
    }
    else if (this.movingUp) {
        this.isFacing = -1.5;
        this.body.velocity.setTo(0, -this.moveSpeed);
        this.isMoving = true;
    }

    if (!oldMoving !== this.isMoving || oldFacing !== this.isFacing) {
        this.setAnimation();
    }

    console.log(this.body);

    if (!this.isMoving) {
        this.body.velocity.setTo(0);
    }
};

Player.prototype.clicked = function() {
    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

Player.prototype.setAnimation = function(){
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
}

Player.prototype.playAnimation = function(animation, framerate, repeat){
    this.equipment.playAnimation(animation, framerate, repeat);
}

module.exports = Player;


