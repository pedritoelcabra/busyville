'use strict';

var CampFire = require('../prefabs/buildings/campfire');
var House = require('../prefabs/buildings/house');
var Castle = require('../prefabs/buildings/castle');
var WatchTower = require('../prefabs/buildings/watchtower');
var Decor = require('../prefabs/buildings/decor');
var Townhall = require('../prefabs/buildings/townhall');
var Randomizer = require('../classes/randomizer');

var BuildingManager = function (game) {

    this.game = game;

    this.game.constructions = [];

    this.currentConstruction = null;

    this.availableBuildings = {
        'House' : new House(this.game, 0, 0),
        'Townhall' : new Townhall(this.game, 0, 0),
    };

    this.amountOfHousing = 0;

    this.amounts = {"all" : 0};
};

BuildingManager.prototype.constructor = BuildingManager;

BuildingManager.prototype.addBuildingByName = function(x, y, name) {
    var building = this.availableBuildings[name].create(
        Math.floor(x / this.game.worldTileSize) * this.game.worldTileSize,
        Math.floor(y / this.game.worldTileSize) * this.game.worldTileSize);
    this.addBuilding(building);
    return building;
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
};

BuildingManager.prototype.placeRandomBuilding = function() {
    var buildings = this.getAvailableBuildings();
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

BuildingManager.prototype.getAvailableBuildings = function() {
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


