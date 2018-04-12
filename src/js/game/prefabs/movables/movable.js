var Movable = function (game, x, y, sprite) {

    Phaser.Sprite.call(this, game, x, y, sprite);

    this.pendingPath = [];
    this.pathFinding = false;
    this.pathProgress = 0;
    this.faction = 0;
};

Movable.prototype = Object.create(Phaser.Sprite.prototype);
Movable.prototype.constructor = Movable;

Movable.prototype.update = function () {
    this.updateAttack();
    if (!this.activity.update()) {
        this.setActivity(this.activityBrain.chooseActivity());
    }
};

Movable.prototype.setFaction = function(faction) {
    this.faction = this.game.factionManager.getFaction(faction);
};

Movable.prototype.getFaction = function() {
    return this.faction;
};

Movable.prototype.stopMovement = function () {
    this.isEating = false;
    this.isMoving = false;
    this.isSlashing = false;
    this.isThrusting = false;
    this.body.velocity.setTo(0, 0);
    this.setAnimation();
};

Movable.prototype.setActivity = function (activity) {
    if (!activity) {
        return;
    }
    if (this.activity != null) {
        this.activity.executeEnd();
    }
    this.activity = activity;
    this.activity.execute();
};

Movable.prototype.moveToTile = function (x, y) {
    this.isFacing = this.game.physics.arcade.moveToXY(
        this,
        this.game.collisionMap.pixelFromTile(x) + this.game.worldTileSize / 2,
        this.game.collisionMap.pixelFromTile(y) + this.game.worldTileSize / 2,
        this.moveSpeed,
        0
    );
    this.isMoving = true;
    this.setAnimation();
};

Movable.prototype.walkPath = function () {
    if (this.pathFinding) {
        return;
    }
    var currentTileX = this.game.collisionMap.tileFromPixel(this.x);
    var currentTileY = this.game.collisionMap.tileFromPixel(this.y);
    if (currentTileX == this.pendingPath[this.pathProgress].x &&
        currentTileY == this.pendingPath[this.pathProgress].y) {
        this.pathProgress++;
        if (this.pathProgress == this.pendingPath.length) {
            this.pendingPath = [];
            this.stopMovement();
            return;
        }
    }
    this.moveToTile(this.pendingPath[this.pathProgress].x, this.pendingPath[this.pathProgress].y);
};

Movable.prototype.pathToTile = function (x, y) {
    this.pathToPosition(this.game.collisionMap.pixelFromTile(x),
                        this.game.collisionMap.pixelFromTile(y));
};

Movable.prototype.pathToPosition = function (x, y) {
    this.pathFinding = true;
    if (this.game.collisionMap.collidesPixel(this.x, this.y)) {
        this.game.collisionMap.allowPassingAnyTile();
    }
    this.game.collisionMap.findPath(this.x, this.y, x, y, this);
};

Movable.prototype.setPath = function (path) {
    if (!this.pendingPath) {
        this.pendingPath = [];
    }
    this.pendingPath = path;
    this.pendingPath = this.game.collisionMap.smoothenDiagonals(this.pendingPath);
    this.pathFinding = false;
    this.pathProgress = 0;
};

Movable.prototype.clearPath = function () {
    this.pendingPath = [];
};

Movable.prototype.moveToRandomPosition = function () {
    var x = this.x + Math.floor(Math.random() * 800) - 400;
    var y = this.y + Math.floor(Math.random() * 800) - 400;
    if (x < 0) {
        x = -x;
    }
    if (x >= this.game.worldWidth) {
        x -= x - this.game.worldWidth + 1;
    }
    if (y < 0) {
        y = -y;
    }
    if (y >= this.game.worldHeight) {
        y -= y - this.game.worldHeight + 1;
    }
    this.pathToPosition(x, y);
};

module.exports = Movable;