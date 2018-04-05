var preloader = {};

var GameMenu = require('../classes/menus/gamemenu');
var StateManager = require('../states/statemanager');
var easystarjs = require('easystarjs');

preloader.preload = function () {
    this.load.image('bg', 'images/bg.png');
    this.load.image('bg2', 'images/bg2.png');
    this.load.image('splash', 'images/splash.png');
    this.load.image('infowindow', 'images/infowindow.png');
    this.load.image('closebutton', 'images/closebutton.png');
    this.load.image('pawnIconEmpty', 'images/lpc/misc/pawnIconEmpty.png');
    this.load.image('pawnIconFull', 'images/lpc/misc/pawnIconFull.png');

    this.load.spritesheet('pawn1', 'images/pawn.png', 72, 96);
    this.load.spritesheet('pawn', 'images/pawn1.png', 64, 64);

    for (var i = 0; i < buttonFiles.length; i++) {
        this.load.image(buttonFiles[i], 'images/buttons/' + buttonFiles[i] + '.png');
    }
    for (var i = 0; i < plotFiles.length; i++) {
        this.load.image(plotFiles[i], 'images/lpc/plots/' + plotFiles[i] + '.png');
    }
    for (var i = 0; i < houseFiles.length; i++) {
        this.load.image(houseFiles[i], 'images/lpc/buildings/houses/' + houseFiles[i] + '.png');
    }
    for (var i = 0; i < decorFiles.length; i++) {
        this.load.image(decorFiles[i], 'images/lpc/buildings/decor/' + decorFiles[i] + '.png');
    }
    for (var i = 0; i < bodyFiles.length; i++) {
        this.load.spritesheet(bodyFiles[i], 'images/lpc/body/' + bodyFiles[i] + '.png', 64, 64);
    }
    for (var i = 0; i < pantFiles.length; i++) {
        this.load.spritesheet(pantFiles[i], 'images/lpc/pant/' + pantFiles[i] + '.png', 64, 64);
    }
    for (var i = 0; i < shirtFiles.length; i++) {
        this.load.spritesheet(shirtFiles[i], 'images/lpc/shirt/' + shirtFiles[i] + '.png', 64, 64);
    }
    for (var i = 0; i < hairFiles.length; i++) {
        this.load.spritesheet(hairFiles[i], 'images/lpc/hair/' + hairFiles[i] + '.png', 64, 64);
    }
    for (var i = 0; i < accessoryFiles.length; i++) {
        this.load.spritesheet(accessoryFiles[i], 'images/lpc/accessories/' + accessoryFiles[i] + '.png', 64, 64);
    }

    this.game.stage.disableVisibilityChange = false;
    this.game.collisionDebug = (typeof getVars.collision !== 'undefined');

    this.game.startingPawns = 5;
    this.game.startingAnimals = 2;
    this.game.worldSize = (typeof getVars.size !== 'undefined' ? getVars.size : 3);

    this.game.buildingInterval = 200;
    this.game.buildTickAmount = 200;
    this.game.scrollSpeed = 10;
    this.game.worldTileSize = 32;
    this.game.buildingPositionIterations = 100;
    this.game.worldWidth = 30 * this.game.worldSize * this.game.worldTileSize;
    this.game.worldHeight = 30 * this.game.worldSize * this.game.worldTileSize;
    this.game.worldTileWidth = this.game.worldWidth / this.game.worldTileSize;
    this.game.worldTileHeight = this.game.worldHeight / this.game.worldTileSize;

    this.game.easystar = new easystarjs.js();

    this.game.activityWeights = {
        "Wandering": 5,
        "Idling": 5,
        "Jogging": 1,
        "Building": 5,
        "Eating": 5
    };

    this.game.stateManager = new StateManager(this.game);
};

preloader.create = function () {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    this.game.state.start('game');
};

module.exports = preloader;
