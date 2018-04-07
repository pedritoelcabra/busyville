'use strict';

var CollisionMap = function (game) {

    this.game = game;

    this.passableTiles = [0];

    this.collisionArea = [];
    this.roadTiles = [];
    this.collisionSquares = [];
    this.freeSpaceMap = [];
    for(var i = 0; i < this.game.worldTileHeight ; i++){
        var collisionColumn = new Array(this.game.worldTileWidth);
        var roadColumn = new Array(this.game.worldTileWidth);
        var squareColumn = new Array(this.game.worldTileWidth);
        var spaceColumn = new Array(this.game.worldTileWidth);
        for(var t = 0; t < this.game.worldTileWidth ; t++){
            collisionColumn[t] = 0;
            roadColumn[t] = 0;
            spaceColumn[t] = {'x' : this.game.worldTileWidth, 'y' : this.game.worldTileHeight};
        }
        this.collisionArea.push(collisionColumn);
        this.roadTiles.push(roadColumn);
        this.collisionSquares.push(squareColumn);
        this.freeSpaceMap.push(spaceColumn);
    }

    this.game.easystar.setGrid(this.collisionArea);
    this.game.easystar.setAcceptableTiles(this.passableTiles);
    this.game.easystar.enableDiagonals();
};

CollisionMap.prototype.constructor = CollisionMap;

CollisionMap.prototype.addCollisionObject = function(sprite) {
    this.setSpriteCollision(sprite, 1);
};

CollisionMap.prototype.removeCollisionObject = function(sprite) {
    this.setSpriteCollision(sprite, 0);
};

CollisionMap.prototype.setSpriteCollision = function(sprite, value) {
    var startX = this.tileFromPixel(sprite.body.x);
    var startY = this.tileFromPixel(sprite.body.y);
    var sizeX = sprite.tileWidth();
    var sizeY = sprite.tileHeight();

    for(var i = startY; i < startY + sizeY; i++){
        for(var t = startX; t < startX + sizeX; t++){
            this.collisionArea[i][t] = value;
            if(this.game.collisionDebug){
                this.drawCollisionSquare(t, i, value);
            }
        }
    }

    this.updateSpaceMap();
};

CollisionMap.prototype.freeSpaceAtLocation = function(x, y, w, h) {
    for(var i = x; i < x + w; i++){
        if(this.freeSpaceMap[y][i].y < h){
            return false;
        }
    }
    for(var i = y; i < y + h; i++){
        if(this.freeSpaceMap[i][x].x < w){
            return false;
        }
    }
    return true;
};

CollisionMap.prototype.updateSpaceMap = function(pixel) {
    var xSpace = 0;
    for(var i = this.game.worldTileHeight - 1; i >= 0 ; i--){
        xSpace = 0;
        for(var t = this.game.worldTileWidth - 1 ; t >= 0 ; t--){
            if(this.collisionArea[i][t] > 0){
                xSpace = 0;
            }
            this.freeSpaceMap[i][t].x = xSpace;
            xSpace++;
        }
    }
    var ySpace = 0;
    for(var i = this.game.worldTileWidth - 1; i >= 0 ; i--){
        ySpace = 0;
        for(var t = this.game.worldTileHeight - 1 ; t >= 0 ; t--){
            if(this.collisionArea[t][i] > 0){
                ySpace = 0;
            }
            this.freeSpaceMap[t][i].y = ySpace;
            ySpace++;
        }
    }
};

CollisionMap.prototype.drawCollisionSquare = function(x, y, value) {
    if (!value) {
        this.collisionSquares[y][x].destroy();
        return;
    }
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect( this.pixelFromTile(x), this.pixelFromTile(y),
        this.game.worldTileSize, this.game.worldTileSize ) ;
    this.collisionSquares[y][x] = graphics;
};

CollisionMap.prototype.tileFromPixel = function(pixel) {
    return Math.floor(pixel / this.game.worldTileSize);
};

CollisionMap.prototype.pixelFromTile = function(tile) {
    return Math.floor(tile * this.game.worldTileSize);
};

CollisionMap.prototype.findPath = function(sx, sy, ex, ey, owner) {
    this.game.easystar.findPath(
        this.tileFromPixel(sx),
        this.tileFromPixel(sy),
        this.tileFromPixel(ex),
        this.tileFromPixel(ey),
        function( path ) {
        owner.setPath(path);
    });
    this.game.easystar.calculate();
    this.game.easystar.setAcceptableTiles(this.passableTiles);
};

CollisionMap.prototype.spriteIsAtTile = function(x, y, sprite) {
    return (x == this.tileFromPixel(sprite.body.x) && y == this.tileFromPixel(sprite.body.y));
};

CollisionMap.prototype.collidesPixel = function(x, y) {
    return this.collisionArea[this.tileFromPixel(y)][this.tileFromPixel(x)] > 0;
};

CollisionMap.prototype.isRoadTile = function(x, y) {
    return this.roadTiles[x][y] > 0;
};

CollisionMap.prototype.setRoadTile = function(x, y) {
    this.roadTiles[x][y] = 1;
};

CollisionMap.prototype.allowPassingAnyTile = function() {
    this.game.easystar.setAcceptableTiles([0,1,2,3,4,5,6,7]);
};

CollisionMap.prototype.smoothenPath = function(path) {
    if(!path || !path.length){
        return path;
    }
    var lastNode = path[0];
    var newPath = [];
    var count = 0;
    for(var i = 0; i < path.length; i++){
        if(i + 1 == path.length){
            newPath[count] = lastNode;
            newPath[count + 1] = path[i];
            return newPath;
        }
        if( (Math.abs(lastNode.x - path[i].x) < 1) || (Math.abs(lastNode.y - path[i].y) < 1) ){
            continue;
        }
        newPath[count] = lastNode;
        count++;
        lastNode = path[i];
    }
    console.log("error smoothing path");
    return path;
};

CollisionMap.prototype.smoothenDiagonals = function(path) {
    if(!path || path.length < 3){
        return path;
    }
    var newPath = [];
    newPath.push(path[0]);
    for(var i = 1; i + 1 < path.length; i++){
        if( (path[i].x - path[i+1].x) == (path[i-1].x - path[i].x)
            && (path[i].y - path[i+1].y) == (path[i-1].y - path[i].y) ){
            continue;
        }
        newPath.push(path[i]);
    }
    newPath.push(path[path.length - 1]);
    return newPath;
};






module.exports = CollisionMap;


