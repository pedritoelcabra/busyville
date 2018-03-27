'use strict';

var CampFire = require('../prefabs/buildings/campfire');
var House = require('../prefabs/buildings/house');
var Road = require('../prefabs/buildings/road');
var Castle = require('../prefabs/buildings/castle');
var WatchTower = require('../prefabs/buildings/watchtower');
var Decor = require('../prefabs/buildings/decor');
var Townhall = require('../prefabs/buildings/townhall');
var Randomizer = require('../classes/randomizer');

var BuildingManager = function (game) {

    this.game = game;

    this.game.constructions = [];

    this.queuedForDeletion = [];

    this.currentConstruction = null;

    this.availableBuildings = {
        'House' : new House(this.game, 0, 0),
        'Townhall' : new Townhall(this.game, 0, 0),
    };

    this.cursorBuilding = false;

    this.amountOfHousing = 0;

    this.amounts = {"all" : 0};
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

    for (var i = 0; i < this.queuedForDeletion.length; i++) {
        this.queuedForDeletion[i].preDestroy();
        this.queuedForDeletion[i].destroy();
    }
    this.queuedForDeletion = [];
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
    this.currentConstruction = building;
    if(this.amounts[building.firstName]){
        this.amounts[building.firstName]++;
    }else{
        this.amounts[building.firstName] = 1;
    }
    this.amounts["all"]++;
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
        return;
    }
    this.cursorBuilding.destroy();
    this.cursorBuilding = false;
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
    console.log(this.cursorBuilding.getType());
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

BuildingManager.prototype.queueForDeletion = function(building) {
    this.queuedForDeletion.push(building);
};

///////////////////////////////////////////


















BuildingManager.prototype.placeRandomBuilding = function() {
    var buildings = this.getAvailableBuildingNames();
    var buildingName = Randomizer.arrayRand(buildings);
    var building = this.availableBuildings[buildingName].create(0,0);
    building = this.tryToFindSuitablePositionForBuilding(building);
    this.addBuilding(building);
};

BuildingManager.prototype.tryToFindSuitablePositionForBuilding = function(building) {
    var sizeX = building.tileWidth();
    var sizeY = building.tileHeight();
    var x, y;
    var xDist, yDist;
    var bestpos = null;
    var bestScore = 999999;
    var currentScore = 0;
    for(var i = 0; i < this.game.buildingPositionIterations; i++){
        x = Math.floor(Math.random() * (this.game.worldWidth  - building.width - this.game.worldTileSize*4))
            + (this.game.worldTileSize*2);
        y = Math.floor(Math.random() * (this.game.worldHeight - building.height - this.game.worldTileSize*4))
            + (this.game.worldTileSize*2);
        if(this.game.collisionMap.freeSpaceAtLocation(
            this.game.collisionMap.tileFromPixel(x) - 2,
            this.game.collisionMap.tileFromPixel(y) - 2,
                sizeX + 4 , sizeY + 4)){

            xDist = Math.abs(this.game.worldWidth / 2 - x);
            yDist = Math.abs(this.game.worldHeight / 2 - y);
            currentScore = Math.sqrt((xDist * xDist) + (yDist * yDist));
            if(currentScore < bestScore){
                bestScore = currentScore;
                bestpos = { "x": x, "y": y};
            }
        }
    }
    if(!bestpos){
        return bestpos;
    }
    building.body.x = bestpos.x;
    building.body.y = bestpos.y;
    building.x = bestpos.x;
    building.y = bestpos.y;
    return building;
};

BuildingManager.prototype.amountOfBuildings = function(type) {
    return this.amounts[type];
};

BuildingManager.prototype.getUnfinishedBuilding = function() {
    for (var i = 0; i < this.game.constructions.length; i++) {
        if(!this.game.constructions[i].isFinished()){
            return this.game.constructions[i];
        }
    }
    return null;
};



module.exports = BuildingManager;


