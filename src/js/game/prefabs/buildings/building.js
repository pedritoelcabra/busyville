'use strict';

var InfoWindow = require('../../prefabs/infowindow');
var Randomizer = require('../../classes/randomizer');
var Inhabitant = require('../../classes/inhabitant');

var Building = function (game, x, y, type) {

    this.doorTile = {'x' : 0, 'y' : 0};
    this.inhabitantSpeed = 10;
    this.currentInhabitant = null;
    this.currentSecond = null;
    this.buildingType = type;
    this.game = game;
    Phaser.Sprite.call( this, this.game, x, y, type);
    this.constructionCost = this.height;
    this.constructionProgress = 0;
    this.constructionSpeed = 10;
    this.game.physics.arcade.enable(this);
    this.adyacentTiles = [];
    this.inhabitants = [];
    this.destroyed = false;
    this.maskProgress();
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building;

Building.prototype.update = function() {

    if (this.game.secondTime === this.currentSecond) {
        return;
    }
    this.currentSecond = this.game.secondTime;

    if (!this.currentInhabitant && this.inhabitants.length) {
        for (var i = 0; i < this.inhabitants.length; i++) {
            if (!this.inhabitants[i].hasInhabitant()) {
                this.currentInhabitant = this.inhabitants[i];
                break;
            }
        }
    }
    if (this.currentInhabitant) {
        this.currentInhabitant.addProgress();
        if (this.currentInhabitant.isFinished()) {
            this.currentInhabitant = null;
        }
    }
};

Building.prototype.preDestroy = function() {
};

Building.prototype.isDestroyed = function() {
    return this.destroyed;
};

Building.prototype.getType = function() {
    return this.buildingType;
};

Building.prototype.tileX = function() {
    return this.game.collisionMap.tileFromPixel(this.x);
};

Building.prototype.tileY = function() {
    return this.game.collisionMap.tileFromPixel(this.y);
};

Building.prototype.tileWidth = function() {
    return this.game.collisionMap.tileFromPixel(this.width + 1);
};

Building.prototype.tileHeight = function() {
    return this.game.collisionMap.tileFromPixel(this.height + 1);
};

Building.prototype.init = function() {

    if (typeof this.plotType !== 'undefined') {
        this.plot = new Phaser.Image(this.game, this.x, this.y, this.plotType);
        this.game.add.existing(this.plot);
        this.game.plots.add(this.plot);
    }

    if (typeof this.roadTiles !== 'undefined') {
        for (var i = 0; i < this.roadTiles.length; i++) {
            this.game.buildingManager.addRoadTile(
                this.roadTiles[i].x + this.tileX(),
                this.roadTiles[i].y + this.tileY()
            );
        }
    }

    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);
    this.game.collisionMap.addCollisionObject(this);
};

Building.prototype.clicked = function() {

    if (!this.game.input.activePointer.leftButton.isDown) {
        return;
    }

    if (this.game.demolishingBuildings) {

        this.destroyed = true;

        this.game.collisionMap.removeCollisionObject(this);

        if (typeof this.plot !== 'undefined') {
            this.plot.destroy();
        }

        if (typeof this.mask !== 'undefined') {
            this.mask.destroy();
        }
        this.destroy();

        return;
    }

    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

Building.prototype.setAdyacentTiles = function() {
    var coords = [];
    for(var i = this.tileX() ; i < this.tileX() + this.tileWidth(); i++){
        if(this.tileY() > 1){
            coords.push({"x" : i, "y" : this.tileY() - 1});
        }
        if(this.tileY() + this.tileHeight() < this.game.worldTileHeight){
            coords.push({"x" : i, "y" : this.tileY() + this.tileHeight()});
        }
    }
    for(var i = this.tileY() ; i < this.tileY() + this.tileHeight(); i++){
        if(this.tileX() > 0){
            coords.push({"x" : this.tileX() - 1, "y" : i});
        }
        if(this.tileX() + this.tileWidth() < this.game.worldTileWidth){
            coords.push({"x" : this.tileX() + this.tileWidth(), "y" : i});
        }
    }
    if(this.game.collisionDebug){
        for(var i = 0; i < coords.length; i++){
            this.drawCollisionSquare(coords[i].x, coords[i].y);
        }
    }
    this.adyacentTiles = coords;
};

Building.prototype.getRandomAdyacentTile = function() {
    if(this.adyacentTiles.length == 0){
        this.setAdyacentTiles();
    }
    return Randomizer.arrayRand(this.adyacentTiles);
};

Building.prototype.isFinished = function() {
    return this.constructionProgress >= this.constructionCost;
};

Building.prototype.completeConstruction = function() {
    this.addConstructionProgress(this.constructionCost - this.constructionProgress);
};

Building.prototype.addConstructionProgress = function(value) {
    if(!this.isFinished() && value){
        this.constructionProgress += this.constructionSpeed * value;
        if(this.isFinished()){
            this.onFinishedConstruction();
        }
        this.maskProgress();
    }
};

Building.prototype.onFinishedConstruction = function() {
    this.updateInhabitants();
};

Building.prototype.maskProgress = function() {
    if(this.isFinished()){
        this.mask.destroy();
        return;
    }
    var mask = this.game.add.graphics(this.x, this.y);
    mask.beginFill(0xffffff);
    mask.moveTo(0, this.height);
    mask.lineTo(this.width, this.height);
    mask.lineTo(this.width, this.height - this.constructionProgress);
    mask.lineTo(0, this.height - this.constructionProgress);
    mask.lineTo(0, this.height);
    mask.endFill();
    if(this.mask){
        this.mask.destroy();
    }
    this.mask = mask;
};

Building.prototype.drawCollisionSquare = function(x,y) {
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(2, 0xFF0000, 1);
    graphics.drawRect( this.game.collisionMap.pixelFromTile(x), this.game.collisionMap.pixelFromTile(y),
        this.game.worldTileSize, this.game.worldTileSize ) ;
};

Building.prototype.isBlocked = function() {
    return !this.game.collisionMap.freeSpaceAtLocation(
        this.game.collisionMap.tileFromPixel(this.x),
        this.game.collisionMap.tileFromPixel(this.y),
        this.tileWidth(),
        this.tileHeight()
    );
};

Building.prototype.updateInhabitants = function () {
    if (!this.isFinished()) {
        return;
    }
    if (this.housing < 1) {
        return;
    }
    if (!this.inhabitants.length) {
        this.setupInhabitantIcons();
    }
};

Building.prototype.getDoor = function () {
    return {
        'x' : this.game.collisionMap.pixelFromTile(this.doorTile.x) + this.x + (this.game.worldTileSize / 2),
        'y' : this.game.collisionMap.pixelFromTile(this.doorTile.y) + this.y + (this.game.worldTileSize / 2)
    }
};

Building.prototype.createInhabitant = function () {
    throw "Called Building.createInhabitant, this should be overridden!";
};

Building.prototype.setupInhabitantIcons = function () {
    var dummyIcon = new Phaser.Image(
        this.game,
        0,
        0,
        'pawnIconEmpty'
    );
    var iconWidth = dummyIcon.width;
    var currentLeftX = this.width / 2;
    var currentRightX = currentLeftX + iconWidth / 2;
    var currentY = dummyIcon.height + 5;
    for (var i = 0; i < this.housing; i++) {
        if (!i && this.housing % 2) {
            currentLeftX -= iconWidth / 2;
            currentRightX -= iconWidth / 2;
        }
        var inhabitant = new Inhabitant(
            this,
            ( i % 2 ?  currentRightX : currentLeftX) + this.x,
            currentY + this.y
        );
        this.inhabitants.push(inhabitant);
        currentLeftX -= iconWidth / 2;
        currentRightX += iconWidth / 2;
    }
};


module.exports = Building;


