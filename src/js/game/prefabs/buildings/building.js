'use strict';

var InfoWindow = require('../../prefabs/infowindow');
var Randomizer = require('../../classes/randomizer');

var Building = function (game, x, y, type) {
    this.game = game;
    Phaser.Sprite.call( this, game, x, y, type);
    this.constructionCost = this.height;
    this.constructionProgress = 0;
    this.constructionSpeed = 10;
    this.game.physics.arcade.enable(this);
    this.adyacentTiles = [];
    this.maskProgress();
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building;

Building.prototype.update = function() {
};

Building.prototype.tileX = function() {
    return this.game.collisionMap.tileFromPixel(this.x);
};

Building.prototype.tileY = function() {
    return this.game.collisionMap.tileFromPixel(this.y);
};

Building.prototype.tileWidth = function() {
    return this.game.collisionMap.tileFromPixel(this.width) + 1;
};

Building.prototype.tileHeight = function() {
    return this.game.collisionMap.tileFromPixel(this.height) + 1;
};

Building.prototype.init = function() {
    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);
    this.game.collisionMap.addCollisionObject(this);
};

Building.prototype.clicked = function() {
    var window = new InfoWindow(this.game, this);
    this.game.add.existing(window);
    this.game.menus.push(window);
};

Building.prototype.setAdyacentTiles = function() {
    var coords = [];
    var offset = this.game.spaceAroundBuildings;
    for(var i = this.tileX() ; i < this.tileX() + this.tileWidth(); i++){
        if(this.tileY() > offset + 1){
            coords.push({"x" : i, "y" : this.tileY() - offset - 1});
        }
        if(this.tileY() + this.tileHeight() < this.game.worldTileHeight - offset){
            coords.push({"x" : i, "y" : this.tileY() + this.tileHeight() + offset});
        }
    }
    for(var i = this.tileY() ; i < this.tileY() + this.tileHeight(); i++){
        if(this.tileX() > offset){
            coords.push({"x" : this.tileX() - offset - 1, "y" : i});
        }
        if(this.tileX() + this.tileWidth() < this.game.worldTileWidth - offset){
            coords.push({"x" : this.tileX() + this.tileWidth() + offset, "y" : i});
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
            this.game.buildingManager.amountOfHousing += (this.tileHeight() + this.tileWidth());
        }
        this.maskProgress();
    }
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



module.exports = Building;


