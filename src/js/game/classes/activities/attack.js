'use strict';

var Activity = require('../activities/activity');
var Randomizer = require('../../classes/randomizer');

var Attack = function (owner) {
    this.maxTimeInAction = 0;
    this.nameString = "Attacking";
    this.target = null;
    this.targetTile = false;
    this.isAttacking = false;
    this.noAvailableAttackings = false;
    this.minimumPreference = 0;
    this.timeMoving = 0;
    Activity.call(this, owner);
};

Attack.prototype = Object.create(Activity.prototype);
Attack.prototype.constructor = Attack;

Attack.prototype.executeActivity = function() {
    this.noAvailableAttackings = false;
};

Attack.prototype.isValid = function() {
    return this.owner.checkForEnemiesInRange();
};

Attack.prototype.executeEnd = function() {
    this.target = null;
    this.targetTile = false;
    this.isAttacking = false;
    this.owner.clearPath();
    this.owner.stopMovement();
};

Attack.prototype.targetIsInRange = function(facing) {
    var points = this.owner.getWeapon().getAttackPoints(
        this.owner.x + (this.owner.getHitBox().w / 2),
        this.owner.y + (this.owner.getHitBox().h / 2),
        facing,
        this.owner.getWeapon().getReach() * this.owner.game.worldTileSize
    );
    return this.owner.game.collisionMap.attackHitsTarget(points, this.target.getHitBox());
};

Attack.prototype.isBusyMoving = function(facing) {
    if (!this.owner.isMoving) {
        return false;
    }
    if (this.timeMoving < 10) {
        this.timeMoving++;
        return true;
    }
    return false;
};

Attack.prototype.onUpdate = function() {
    if (this.owner.isAttacking) {
        return;
    }
    if (this.isBusyMoving()) {
        return;
    }
    if(this.target && !this.target.isAlive()) {
        this.target = null;
    }
    if(!this.target){
        this.target = this.owner.checkForEnemiesInRange(true);
        if(!this.target){
            this.noAvailableAttackings = true;
            return;
        }
    }
    var facing = Phaser.Math.angleBetween(
        this.owner.x,
        this.owner.y,
        this.target.x,
        this.target.y
    );

    if (this.targetIsInRange(facing)) {
        this.owner.isFacing = facing;
        this.owner.startAttack();
        return;
    }
    var newTarget = this.owner.checkForEnemiesInRange(true);
    if(newTarget !== this.target){
        this.target = newTarget;
        return;
    }
    this.idealX = this.owner.game.collisionMap.tileFromPixel(this.owner.x);
    this.idealY = this.owner.game.collisionMap.tileFromPixel(this.owner.y);
    this.targetX = this.owner.game.collisionMap.tileFromPixel(this.target.x);
    this.targetY = this.owner.game.collisionMap.tileFromPixel(this.target.y);
    if (this.targetX > this.idealX) {
        this.idealX++;
    }
    if (this.targetX < this.idealX) {
        this.idealX--;
    }
    if (this.targetY > this.idealY) {
        this.idealY++;
    }
    if (this.targetY < this.idealY) {
        this.idealY--;
    }
    if (!this.owner.game.collisionMap.collidesTile(this.idealX, this.idealY)) {
        this.owner.moveToTile(this.idealX, this.idealY);
        this.timeMoving = 0;
        return;
    } else {
        if (this.owner.isMoving) {
            this.owner.stopMovement();
        }
    }
};

Attack.prototype.checkIfEnded = function() {
    if(this.noAvailableAttackings){
        return true;
    }
    return false;
};

module.exports = Attack;