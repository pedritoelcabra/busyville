'use strict';

var HitBox = require('./hitbox');

var Attack = function (game, attacker, delay) {
    this.originX = attacker.x;
    this.originY = attacker.y;
    this.attacker = attacker;
    this.target = null;
    this.game = game;
    this.timer = this.game.time.create(false);
    this.timer.add(parseInt(delay), this.executeAttack, this);
    this.timer.start();
};

Attack.prototype.executeAttack = function(){
    this.weapon = this.attacker.getWeapon();
    if (!this.weapon) {
        return;
    }
    this.setUpAttackBox();

    if (this.checkHitEnemyUnit()) {
        return;
    }

    if (this.checkHitFriendlyUnit()) {
        return;
    }

    if (this.checkHitEnemyBuilding()) {
        return;
    }

    if (this.checkHitFriendlyBuilding()) {
        return;
    }

    return;
};

Attack.prototype.checkHitFriendlyUnit = function() {
    return false;
};

Attack.prototype.checkHitEnemyUnit = function() {
    this.target = this.game.factionManager.checkUnitHitBoxCollision(this.attackBox, this.attacker);
    if (!this.target) {
        return false;
    }
    this.target.receiveAttack(this);
    return true;
};

Attack.prototype.checkHitFriendlyBuilding = function() {
    this.target = this.game.buildingManager.checkBuildingHitBoxCollision(this.attackBox);
    if (!this.target) {
        return false;
    }
    this.target.addConstructionProgress(1);
    return true;
};

Attack.prototype.checkHitEnemyBuilding = function() {
    return false;
};

Attack.prototype.setUpAttackBox = function () {
    this.attackBox = new HitBox(0, 0, 0, 0);
    if (this.attacker.facingDirection() === 'up' || this.attacker.facingDirection() === 'down') {
        this.attackBox.h = this.weapon.getAttackReach() * this.game.worldTileSize;
        this.attackBox.w = this.weapon.getAttackWidth() * this.game.worldTileSize;
        this.attackBox.x = this.attacker.x + (this.game.worldTileSize / 2) - (this.attackBox.w / 2);
        if (this.attacker.facingDirection() === 'up') {
            this.attackBox.y = this.attacker.y - this.attackBox.h;
        } else {
            this.attackBox.y = this.attacker.y + this.game.worldTileSize;
        }
    } else {
        this.attackBox.w = this.weapon.getAttackReach() * this.game.worldTileSize;
        this.attackBox.h = this.weapon.getAttackWidth() * this.game.worldTileSize;
        this.attackBox.y = this.attacker.y + (this.game.worldTileSize / 2) - (this.attackBox.h / 2);
        if (this.attacker.facingDirection() === 'left') {
            this.attackBox.x = this.attacker.x - this.attackBox.w;
        } else {
            this.attackBox.x = this.attacker.x + this.game.worldTileSize;
        }
    }
};

Attack.prototype.constructor = Attack;

module.exports = Attack;
