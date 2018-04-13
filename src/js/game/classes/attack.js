'use strict';

var HitBox = require('./hitbox');

var Attack = function (game, attacker, delay) {
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
    this.setUpAttack();

    if (this.checkHitEnemyUnit()) {
        return;
    }

    if (this.checkHitFriendlyUnit()) {
        return;
    }

    if (this.checkHitEnemyBuilding()) {
        return;
    }

    if (this.attacker.getWeapon().canBuild() && this.checkHitFriendlyBuilding()) {
        return;
    }
};

Attack.prototype.checkHitFriendlyUnit = function() {
    return false;
};

Attack.prototype.checkHitEnemyUnit = function() {
    this.targets = this.game.factionManager.checkUnitHitBoxCollision(this);
    if (!this.targets.length) {
        return false;
    }
    for (var i = 0; i < this.targets.length; i++) {
        this.targets[i].receiveAttack(this);
    }
    return true;
};

Attack.prototype.checkHitFriendlyBuilding = function() {
    this.target = this.game.buildingManager.checkBuildingHitBoxCollision(this);
    if (!this.target) {
        return false;
    }
    this.target.addConstructionProgress(1);
    return true;
};

Attack.prototype.checkHitEnemyBuilding = function() {
    return false;
};

Attack.prototype.getAttackPoints = function() {
    return this.points;
};

Attack.prototype.setUpAttack = function () {

    this.originX = this.attacker.getHitBox().x;
    this.originY = this.attacker.getHitBox().y;
    this.direction = this.attacker.isFacing;
    this.reach = this.attacker.getWeapon().getReach() * this.attacker.game.worldTileSize;

    this.points = this.attacker.getWeapon().getAttackPoints(
        this.originX + (this.attacker.getHitBox().w / 2),
        this.originY + (this.attacker.getHitBox().h / 2),
        this.direction,
        this.reach
    );

    if(this.game.collisionDebug > 2){
        var graphics = this.game.add.graphics(0,0);
        graphics.lineStyle(2, 0x00FF00, 1);
        graphics.drawPolygon(this.points);
    }
};

Attack.prototype.constructor = Attack;

module.exports = Attack;
