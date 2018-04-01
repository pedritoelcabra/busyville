'use strict';

var Pawn = require('./pawn');
var ActivityBrain = require('../../classes/activitybrain');

var Player = function (game, x, y) {

    Pawn.call( this, game, x, y, 'pawn');

    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;

    this.baseSpeed = 200;
    this.moveSpeed = this.baseSpeed;
    this.diagonalSpeed = this.baseSpeed;

    this.tileSize = this.game.worldTileSize;
    this.halfTile = this.game.worldTileSize / 2;
};

Player.prototype = Object.create(Pawn.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    this.updateMovement();
};

Player.prototype.setActivity = function() {
};

Player.prototype.setBrain = function() {
    this.activityBrain = new ActivityBrain(this);
};

Player.prototype.updateMovement = function() {
    this.oldMoving = this.isMoving;
    this.oldFacing = this.isFacing;
    this.isMoving = false;

    this.blockedLeft = this.game.collisionMap.collidesPixel(this.body.x - 1, this.body.y + this.halfTile);
    this.blockedRight = this.game.collisionMap.collidesPixel(this.body.x + this.tileSize + 1, this.body.y  + this.halfTile);
    this.blockedUp = this.game.collisionMap.collidesPixel(this.body.x + this.halfTile, this.body.y - 1);
    this.blockedDown = this.game.collisionMap.collidesPixel(this.body.x + this.halfTile, this.body.y + this.tileSize + 1);

    if (this.movingUp && this.movingLeft && !this.blockedLeft && !this.blockedUp) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.diagonalSpeed, -this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingUp && this.movingRight && !this.blockedUp && !this.blockedRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.diagonalSpeed, -this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown && this.movingRight && !this.blockedDown && !this.blockedRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.diagonalSpeed, this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown && this.movingLeft && !this.blockedLeft && !this.blockedDown) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.diagonalSpeed, this.diagonalSpeed);
        this.isMoving = true;
    }
    else if (this.movingDown && !this.blockedDown) {
        this.isFacing = 1.5;
        this.body.velocity.setTo(0, this.moveSpeed);
        this.isMoving = true;
    }
    else if (this.movingRight && !this.blockedRight) {
        this.isFacing = 0;
        this.body.velocity.setTo(this.moveSpeed, 0);
        this.isMoving = true;
    }
    else if (this.movingLeft && !this.blockedLeft) {
        this.isFacing = 3;
        this.body.velocity.setTo(-this.moveSpeed, 0);
        this.isMoving = true;
    }
    else if (this.movingUp && !this.blockedUp) {
        this.isFacing = -1.5;
        this.body.velocity.setTo(0, -this.moveSpeed);
        this.isMoving = true;
    }

    if (!this.oldMoving !== this.isMoving || this.oldFacing !== this.isFacing) {
        this.setAnimation();
    }

    if (!this.isMoving) {
        this.body.velocity.setTo(0);
    }
};

module.exports = Player;


