'use strict';

var Randomizer = require('../classes/randomizer');
var HitBox = require('../classes/hitbox');

var Decor = function (game, x, y, type) {

    this.game = game;

    this.decorType = type;
    this.x = this.game.collisionMap.tileFromPixel(x) * this.game.worldTileSize;
    this.y = this.game.collisionMap.tileFromPixel(y) * this.game.worldTileSize;

    this.adyacentTiles = [];
    this.destroyed = false;

    this.base = this.game.make.image(x, y, type + '_base');
    this.float = this.game.make.image(x, y, type + '_float');
    this.game.add.existing(this.base);
    this.game.decorBases.add(this.base);
    this.game.add.existing(this.float);
    this.game.decorFloats.add(this.float);

    this.imageX = this.x - ((this.base.width - this.game.worldTileSize) / 2);
    this.imageY = this.y - (this.base.height - this.game.worldTileSize);
    this.base.x = this.float.x = this.imageX;
    this.base.y = this.float.y = this.imageY;

    this.setCollision();
};

Decor.prototype.constructor = Decor;

Decor.prototype.setCollision = function() {
    this.hitBox = new HitBox(this.x, this.y, this.game.worldTileSize, this.game.worldTileSize);

    if(this.game.collisionDebug > 0){
        this.collisionDebugHitBox = this.hitBox.drawHitBox(this);
        this.collisionDebugHitBox.x = this.x;
        this.collisionDebugHitBox.y = this.y;
        this.game.add.existing(this.collisionDebugHitBox);
    }

    this.game.collisionMap.setTileCollision(
        this.game.collisionMap.tileFromPixel(this.x),
        this.game.collisionMap.tileFromPixel(this.y),
        true
    );
};

Decor.prototype.isDestroyed = function() {
    return this.destroyed;
};

Decor.prototype.tileX = function() {
    return this.game.collisionMap.tileFromPixel(this.x);
};

Decor.prototype.tileY = function() {
    return this.game.collisionMap.tileFromPixel(this.y);
};

Decor.prototype.tileWidth = function() {
    return this.game.collisionMap.tileFromPixel(this.width + 1);
};

Decor.prototype.tileHeight = function() {
    return this.game.collisionMap.tileFromPixel(this.height + 1);
};

Decor.prototype.setAdyacentTiles = function() {
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

Decor.prototype.getRandomAdyacentTile = function() {
    if(this.adyacentTiles.length == 0){
        this.setAdyacentTiles();
    }
    return Randomizer.arrayRand(this.adyacentTiles);
};


module.exports = Decor;


