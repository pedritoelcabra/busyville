
var Randomizer = require('../classes/randomizer');
var Orc = require('../prefabs/movables/enemies/orc');
var Player = require('../prefabs/movables/player');
var CollisionMap = require('../classes/collisionmap');
var BuildingManager = require('../classes/buildingmanager');
var FactionManager = require('../classes/factionmanager');
var GameMenu = require('../classes/menus/gamemenu');
var CursorManager = require('../prefabs/cursormanager');

var busyville = {};

busyville.create = function () {

    this.game.canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    this.game.stateManager.addGroups();

    this.bg = this.game.add.tileSprite(0, 0, this.game.worldWidth, this.game.worldHeight, 'bg');
    this.game.bg.add(this.bg);

    this.game.world.setBounds(0, 0, this.game.worldWidth, this.game.worldHeight);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.camera.x = this.game.world.centerX - this.game.width / 2;
    this.game.camera.y = this.game.world.centerY - this.game.height / 2;

    this.game.menus = [];

    this.game.cursorManager = new CursorManager(this.game);
    this.game.cursorManager.update();

    this.game.buildingManager = new BuildingManager(this.game);
    this.game.factionManager = new FactionManager(this.game);

    this.game.factionManager.setRelation('player', 'orc', -20, true);

    this.game.collisionMap = new CollisionMap(this.game);

    this.game.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);
    this.game.player.init();
    this.game.player.loadEquipmentString(this.game.playerStartEquipment);

    this.orcCount = 1;

    this.game.gameMenu = new GameMenu(this.game);
    this.game.gameMenu.buildButtons();

    this.game.camera.follow(this.game.player);

    this.game.input.mouse.capture = true;
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

    this.game.microTime = new Date().getTime();
    this.game.secondTime = Math.round(this.game.microTime / 1000);

    if (this.game.input.activePointer.rightButton.isDown) {
        this.game.gameMenu.rightButtonClicked();
    }
    if (this.game.input.activePointer.leftButton.isDown) {
        this.game.player.leftButtonClicked();
    }

    this.game.player.movingUp = this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.W);
    this.game.player.movingDown = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.S);
    this.game.player.movingLeft = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.A);
    this.game.player.movingRight = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
     || this.game.input.keyboard.isDown(Phaser.Keyboard.D);

    this.game.buildingManager.update();

    var currentOrcCount = this.game.factionManager.aliveUnitCount('orc');
    var tries = 0;
    while (tries < 10 && currentOrcCount < this.orcCount) {
        tries ++;
        var randomX = Randomizer.getRandomInt(this.game.worldTileWidth - 2) + 1;
        var randomY = Randomizer.getRandomInt(this.game.worldTileHeight - 2) + 1;

        if (!this.game.collisionMap.collidesTile(randomX, randomY)) {
            var orc = new Orc(this.game, randomX * this.game.worldTileSize, randomY * this.game.worldTileSize);
            currentOrcCount++;
        }

    }
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

busyville.pauseGame = function () {
    this.game.paused = !this.game.paused;
};

module.exports = busyville;