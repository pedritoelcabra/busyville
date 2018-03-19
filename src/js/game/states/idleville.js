
var Pawn = require('../prefabs/pawn');
var Randomizer = require('../classes/randomizer');
var FarmAnimal = require('../prefabs/farmanimal');
var CollisionMap = require('../classes/collisionmap');
var BuildingManager = require('../classes/buildingmanager');

var idleville = {};

idleville.create = function () {

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

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.menus = [];

    this.game.buildingManager = new BuildingManager(this.game);

    this.game.collisionMap = new CollisionMap(this.game);

    this.setUpBuildings();
    this.setUpPawns();
};

idleville.drawSinglePixelOnMask = function(x, y){
    this.bg2.mask.beginFill(0xffffff);
    this.bg2.mask.moveTo(x, y);
    this.bg2.mask.lineTo(x + 1, y);
    this.bg2.mask.lineTo(x + 1, y + 1);
    this.bg2.mask.lineTo(x, y + 1);
    this.bg2.mask.lineTo(x, y);
    this.bg2.mask.endFill();
}

 idleville.update = function() {
    this.updateCameraPosition();
     if(this.buildingTimer > this.game.buildingInterval){
         if(this.game.buildingManager.currentConstruction.isFinished()){
             this.game.buildingManager.placeRandomBuilding();
             this.buildingTimer = 0;
         }
         if(this.pawns.length < this.game.startingPawns + Math.sqrt(this.game.buildingManager.amountOfHousing)){
             this.addPawn();
         }
         if(this.animals.length < this.game.startingAnimals + Math.sqrt(this.game.buildingManager.amountOfHousing)){
             this.addAnimal();
         }
     }
     this.buildingTimer++;
}

 idleville.deleteMenus = function() {
     for(var i = 0; i < this.game.menus.length; i++){
         this.game.menus[i].closeButton.close();
     }
}

idleville.setUpInput = function() {
    var escape_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    escape_key.onDown.add(this.deleteMenus, this);

    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.pauseGame, this);
}

idleville.setUpPawns = function() {
    this.pawns = [];
    this.animals = [];
    for(var i = 0; i < this.game.startingPawns; i++){
        this.addPawn();
    }
    for(var i = 0; i < this.game.startingAnimals; i++){
        this.addAnimal();
    }
}

idleville.addAnimal = function() {
    var spawn = this.randomTileToSpawn();
    var animal = new FarmAnimal(this.game, this.game.collisionMap.pixelFromTile(spawn.x),
        this.game.collisionMap.pixelFromTile(spawn.y), Randomizer.arrayRand(this.game.farmAnimals));
    this.animals.push(animal);
    this.game.add.existing(animal);
}

idleville.addPawn = function() {
    var spawn = this.randomTileToSpawn();
    var pawn = new Pawn(this.game, this.game.collisionMap.pixelFromTile(spawn.x),
        this.game.collisionMap.pixelFromTile(spawn.y));
    this.pawns.push(pawn);
    this.game.add.existing(pawn);
}

idleville.randomTileToSpawn = function() {
    return this.game.constructions[0].getRandomAdyacentTile();
}

idleville.setUpBuildings = function() {
    this.buildingTimer = 0;
    this.game.buildingManager.addBuildingByName(this.game.world.centerX, this.game.world.centerY,"CampFire");
}

idleville.pauseGame = function() {
     // this.game.paused = !this.game.paused;
}

idleville.updateCameraPosition = function() {
    if (this.cursors.up.isDown)
    {
        this.game.camera.y -= this.game.scrollSpeed;
    }
    else if (this.cursors.down.isDown)
    {
        this.game.camera.y += this.game.scrollSpeed;
    }

    if (this.cursors.left.isDown)
    {
        this.game.camera.x -= this.game.scrollSpeed;
    }
    else if (this.cursors.right.isDown)
    {
        this.game.camera.x += this.game.scrollSpeed;
    }
}

idleville.render = function () {
    // Camera
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
}

module.exports = idleville;