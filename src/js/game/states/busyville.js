var Pawn = require('../prefabs/pawn');
var Player = require('../prefabs/player');
var Randomizer = require('../classes/randomizer');
var FarmAnimal = require('../prefabs/farmanimal');
var CollisionMap = require('../classes/collisionmap');
var BuildingManager = require('../classes/buildingmanager');

var busyville = {};

busyville.create = function () {

    this.game.bg = this.game.add.group();
    this.game.buildings = this.game.add.group();
    this.game.objects = this.game.add.group();
    this.game.units = this.game.add.group();

    this.bg = this.game.add.tileSprite(0, 0, this.game.worldWidth, this.game.worldHeight, 'bg');
    this.game.bg.add(this.bg);

    this.game.world.setBounds(0, 0, this.game.worldWidth, this.game.worldHeight);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.camera.x = this.game.world.centerX - this.game.width / 2;
    this.game.camera.y = this.game.world.centerY - this.game.height / 2;

    this.game.menus = [];

    this.game.buildingManager = new BuildingManager(this.game);

    this.game.collisionMap = new CollisionMap(this.game);

    this.game.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);

    this.game.buildingManager.addBuildingByName(this.game.world.centerX, this.game.world.centerY, "Townhall")
        .completeConstruction();

    this.game.camera.follow(this.game.player);

    // this.setUpBuildings();
    // this.setUpPawns();
};

busyville.drawSinglePixelOnMask = function (x, y) {
    this.bg2.mask.beginFill(0xffffff);
    this.bg2.mask.moveTo(x, y);
    this.bg2.mask.lineTo(x + 1, y);
    this.bg2.mask.lineTo(x + 1, y + 1);
    this.bg2.mask.lineTo(x, y + 1);
    this.bg2.mask.lineTo(x, y);
    this.bg2.mask.endFill();
};

busyville.update = function () {
    this.game.player.movingUp = this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.Z);
    this.game.player.movingDown = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.S);
    this.game.player.movingLeft = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.Q);
    this.game.player.movingRight = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.D);
    return;
};

busyville.deleteMenus = function () {
    for (var i = 0; i < this.game.menus.length; i++) {
        this.game.menus[i].closeButton.close();
    }
};

busyville.setUpInput = function () {
    var escape_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    escape_key.onDown.add(this.deleteMenus, this);

    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.pauseGame, this);
};

busyville.setUpPawns = function () {
    this.pawns = [];
    this.animals = [];
    for (var i = 0; i < this.game.startingPawns; i++) {
        this.addPawn();
    }
    for (var i = 0; i < this.game.startingAnimals; i++) {
        this.addAnimal();
    }
};

busyville.addAnimal = function () {
    var spawn = this.randomTileToSpawn();
    var animal = new FarmAnimal(this.game, this.game.collisionMap.pixelFromTile(spawn.x),
        this.game.collisionMap.pixelFromTile(spawn.y), Randomizer.arrayRand(this.game.farmAnimals));
    this.animals.push(animal);
    this.game.add.existing(animal);
};

busyville.addPawn = function () {
    var spawn = this.randomTileToSpawn();
    var pawn = new Pawn(this.game, this.game.collisionMap.pixelFromTile(spawn.x),
        this.game.collisionMap.pixelFromTile(spawn.y));
    this.pawns.push(pawn);
    this.game.add.existing(pawn);
};

busyville.randomTileToSpawn = function () {
    return this.game.constructions[0].getRandomAdyacentTile();
};

busyville.setUpBuildings = function () {
    this.buildingTimer = 0;
    this.game.buildingManager.addBuildingByName(this.game.world.centerX, this.game.world.centerY, "CampFire");
};

busyville.pauseGame = function () {
    // this.game.paused = !this.game.paused;
};

busyville.render = function () {
    // Camera
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
};

busyville.updateCameraPosition = function () {
};

module.exports = busyville;