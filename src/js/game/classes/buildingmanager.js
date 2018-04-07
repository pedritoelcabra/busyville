'use strict';

var House = require('../prefabs/buildings/house');
var Road = require('../prefabs/buildings/road');
var WatchTower = require('../prefabs/buildings/watchtower');
var TownHall = require('../prefabs/buildings/townhall');

var BuildingManager = function (game) {

    this.game = game;

    this.game.constructions = [];

    this.availableBuildings = {
        'House' : new House(this.game, 0, 0),
        'TownHall' : new TownHall(this.game, 0, 0),
        'WatchTower' : new WatchTower(this.game, 0, 0)
    };

    this.cursorBuilding = false;
};

BuildingManager.prototype.constructor = BuildingManager;

BuildingManager.prototype.update = function() {

    if (this.cursorBuilding !== false) {
        if (this.game.input.activePointer.rightButton.isDown) {
        }
        else {
            this.updateCursorBuilding();
        }
    }
};

BuildingManager.prototype.updateCursorBuilding = function() {

    this.cursorBuilding.position.set(
        Math.floor((this.game.input.mousePointer.worldX - (this.cursorBuilding.width / 2))
            / this.game.worldTileSize) * this.game.worldTileSize,
        Math.floor((this.game.input.mousePointer.worldY - (this.cursorBuilding.height / 2))
            / this.game.worldTileSize) * this.game.worldTileSize
    );

    if(this.cursorBuilding.isBlocked()){
        this.cursorBuilding.alpha = 0.3;
        this.cursorBuilding.tint = 0xFF0000;
    }
    else {
        this.cursorBuilding.alpha = 0.6;
        this.cursorBuilding.tint = 0xFFFFFF;
    }
};

BuildingManager.prototype.getAvailableBuildingNames = function() {
    var available = [];
    for (var key in this.availableBuildings) {
        if (this.availableBuildings.hasOwnProperty(key)) {
            if(this.availableBuildings[key].canBeBuilt()){
                available.push(key);
            }
        }
    }
    return available;
};

BuildingManager.prototype.addBuilding = function(building) {
    if(!building){
        return;
    }
    building.init();
    this.game.constructions.push(building);
    this.game.add.existing(building);
    this.game.buildings.add(building);
    return building;
};

BuildingManager.prototype.setCursorBuilding = function(type) {
    this.removeCursorBuilding();
    if(typeof this.availableBuildings[type] === 'undefined'){
        return;
    }
    this.cursorBuilding = this.availableBuildings[type].create(this.game, 0, 0);
    this.cursorBuilding.mask.destroy();
    this.cursorBuilding.events.destroy();
    this.cursorBuilding.events.onInputDown.add(this.plantCursorBuilding, this);
    this.game.add.existing(this.cursorBuilding);
};

BuildingManager.prototype.removeCursorBuilding = function() {
    if (!this.cursorBuilding) {
        return false;
    }
    this.cursorBuilding.destroy();
    this.cursorBuilding = false;
    return true;
};

BuildingManager.prototype.plantCursorBuilding = function() {
    if (!this.cursorBuilding) {
        return;
    }
    if (this.cursorBuilding.isBlocked()) {
        return;
    }
    if (!this.game.input.activePointer.leftButton.isDown) {
        return;
    }
    this.addBuildingByName(this.cursorBuilding.x, this.cursorBuilding.y, this.cursorBuilding.getType());
};

BuildingManager.prototype.addBuildingByName = function(x, y, name) {
    var building = this.availableBuildings[name].create(x, y);
    this.addBuilding(building);
    return building;
};

BuildingManager.prototype.addRoadTile = function(x, y) {
    if (this.game.collisionMap.isRoadTile(x, y)) {
        return;
    }
    var roadTile = new Phaser.Image(
        this.game,
        this.game.collisionMap.pixelFromTile(x),
        this.game.collisionMap.pixelFromTile(y),
        'Road'
    );
    this.game.add.existing(roadTile);
    this.game.roads.add(roadTile);
    this.game.collisionMap.setRoadTile(x, y);
};

BuildingManager.prototype.getUnfinishedBuilding = function() {
    for (var i = 0; i < this.game.constructions.length; i++) {
        if(!this.game.constructions[i].isFinished() && !this.game.constructions[i].isDestroyed()){
            return this.game.constructions[i];
        }
    }
    return null;
};

BuildingManager.prototype.checkBuildingHitBoxCollision = function(hitbox) {
    for (var i = 0; i < this.game.constructions.length; i++) {
        if (!this.game.constructions[i].isDestroyed()
            && this.game.collisionMap.hitBoxesCollide(hitbox, this.game.constructions[i].hitBox)) {
            return this.game.constructions[i];
        }
    }
    return false;
};


module.exports = BuildingManager;


