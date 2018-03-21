var preloader = {};

var easystarjs = require('easystarjs');

preloader.preload = function () {
    this.load.image('logo', 'images/phaser.png');
    this.load.image('bg', 'images/bg.png');
    this.load.image('bg2', 'images/bg2.png');
    this.load.image('splash', 'images/splash.png');
    this.load.image('infowindow', 'images/infowindow.png');
    this.load.image('closebutton', 'images/closebutton.png');
    this.load.image('castle', 'images/lpc/buildings/castle.png');
    this.load.image('watchtower', 'images/lpc/buildings/watchtower.png');

    this.load.spritesheet('pawn1', 'images/pawn.png', 72, 96);
    this.load.spritesheet('pawn', 'images/pawn1.png', 64, 64);
    this.load.spritesheet('campfire', 'images/lpc/buildings/campfire.png', 38, 74);

    this.load.spritesheet('woodwand', 'images/lpc/weapons/woodwand_male.png', 64, 64);

    this.game.farmAnimals = ['sheep', 'pig', 'cow', 'llama', 'chicken'];

    for(var i = 0; i < this.game.farmAnimals.length; i++){
        this.load.spritesheet(this.game.farmAnimals[i], 'images/animals/'+this.game.farmAnimals[i]+'.png', 94, 94);
    }
    for(var i = 0; i < houseFiles.length; i++){
        this.load.image(houseFiles[i], 'images/lpc/buildings/houses/'+houseFiles[i]+'.png');
    }
    for(var i = 0; i < decorFiles.length; i++){
        this.load.image(decorFiles[i], 'images/lpc/buildings/decor/'+decorFiles[i]+'.png');
    }
    for(var i = 0; i < bodyFiles.length; i++){
        this.load.spritesheet(bodyFiles[i], 'images/lpc/body/'+bodyFiles[i]+'.png', 64, 64);
    }
    for(var i = 0; i < pantFiles.length; i++){
        this.load.spritesheet(pantFiles[i], 'images/lpc/pant/'+pantFiles[i]+'.png', 64, 64);
    }
    for(var i = 0; i < shirtFiles.length; i++){
        this.load.spritesheet(shirtFiles[i], 'images/lpc/shirt/'+shirtFiles[i]+'.png', 64, 64);
    }
    for(var i = 0; i < hairFiles.length; i++){
        this.load.spritesheet(hairFiles[i], 'images/lpc/hair/'+hairFiles[i]+'.png', 64, 64);
    }

    this.game.stage.disableVisibilityChange = false;
    this.game.collisionDebug = (typeof getVars.collision !== 'undefined');

    this.game.startingPawns = 5;
    this.game.startingAnimals = 2;
    this.game.worldSize = (typeof getVars.size !== 'undefined' ? getVars.size : 5);

    this.game.buildingInterval = 200;
    this.game.spaceAroundBuildings = 0;
    this.game.buildTickAmount = 200;
    this.game.scrollSpeed = 10;
    this.game.buildingPositionIterations =100;
    this.game.worldWidth = 800 * this.game.worldSize;
    this.game.worldHeight = 600 * this.game.worldSize;
    this.game.worldTileSize = 20;
    this.game.worldTileWidth = this.game.worldWidth / this.game.worldTileSize;
    this.game.worldTileHeight = this.game.worldHeight / this.game.worldTileSize;

  this.game.easystar = new easystarjs.js();

  this.game.activityWeights = {
    "Wandering" : 5,
    "Idling" : 5,
    "Jogging" : 1,
    "Building" : 5,
    "Eating" : 5,
  }


};

preloader.create = function () {
  this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

  this.game.state.start('game');
};

module.exports = preloader;
