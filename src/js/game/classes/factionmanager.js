'use strict';

var FactionManager = function (game) {

    this.game = game;

    this.factions = {
        'neutral' : 0,
        'player' : 1,
        'orc' : 2
    };

    this.relations = {};

    this.hostilityThreshold = -10;

    this.units = [];

    this.closestDist = 0;
    this.closestUnit = 0;
    this.thisDist = 0;

    this.setUpRelations();
};

FactionManager.constructor = FactionManager;

FactionManager.prototype.setUpRelations = function() {
    for (var key in this.factions) {
        if (!this.factions.hasOwnProperty(key)) {
            continue;
        }
        var relationObj = {};
        for (var key2 in this.factions) {
            if (!this.factions.hasOwnProperty(key2)) {
                continue;
            }
            if (key !== key2) {
                relationObj[this.factions[key2]] = 0;
            }
        }
        this.relations[this.factions[key]] = relationObj;
    }
};

FactionManager.prototype.getFaction = function(name) {
    return this.factions[name];
};

FactionManager.prototype.getRelation = function(factionA, factionB) {
    return this.relations[factionA][factionB];
};

FactionManager.prototype.setRelation = function(factionA, factionB, relation, mutual) {
    this.relations[this.factions[factionA]][this.factions[factionB]] = relation;
    if (typeof mutual !== 'undefined' && mutual === true) {
        this.relations[this.factions[factionB]][this.factions[factionA]] = relation;
    }
};

FactionManager.prototype.modifyRelation = function(factionA, factionB, relation, mutual) {
    this.relations[this.factions[factionA]][this.factions[factionB]] += relation;
    if (typeof mutual !== 'undefined' && mutual === true) {
        this.relations[this.factions[factionB]][this.factions[factionA]] += relation;
    }
};

FactionManager.prototype.isHostileTowards = function(factionA, factionB) {
    return this.relations[factionA][factionB] <= this.hostilityThreshold;
};

FactionManager.prototype.addUnit = function(unit) {
    this.units.push(unit);
};

FactionManager.prototype.getClosestEnemyForUnit = function(unit) {
    this.closestDist = 999999;
    this.closestUnit = 0;
    for (var i = 0; i < this.units.length; i++) {
        if (!this.units[i].isAlive()) {
            continue;
        }
        if (unit.getFaction() === this.units[i].getFaction()) {
            continue;
        }
        if (!this.isHostileTowards(unit.getFaction(), this.units[i].getFaction())) {
            continue;
        }
        this.thisDist = Math.max(Math.abs(unit.x - this.units[i].x), Math.abs(unit.y - this.units[i].y));
        if (this.thisDist > unit.checkForEnemyRange) {
            continue;
        }
        if (this.closestDist < this.thisDist) {
            continue;
        }
        this.closestDist = this.thisDist;
        this.closestUnit = this.units[i];
    }
    return this.closestUnit;
};

FactionManager.prototype.checkUnitHitBoxCollision = function(hitBox, excludedUnit) {
    for (var i = 0; i < this.units.length; i++) {
        if (!this.units[i].isAlive()) {
            continue;
        }
        if (this.units[i] === excludedUnit) {
            continue;
        }
        if (this.game.collisionMap.hitBoxesCollide(hitBox, this.units[i].getHitBox())) {
            return this.units[i];
        }
    }
    return false;
};

module.exports = FactionManager;