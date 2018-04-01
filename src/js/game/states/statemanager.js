
var StateManager = function (game) {
    this.game = game;
};

StateManager.prototype.constructor = StateManager;

StateManager.prototype.addGroups = function () {
    this.game.bg = this.game.add.group();
    this.game.world.bringToTop(this.game.bg);
    this.game.plots = this.game.add.group();
    this.game.world.bringToTop(this.game.plots);
    this.game.roads = this.game.add.group();
    this.game.world.bringToTop(this.game.roads);
    this.game.buildings = this.game.add.group();
    this.game.world.bringToTop(this.game.buildings);
    this.game.objects = this.game.add.group();
    this.game.world.bringToTop(this.game.objects);
    this.game.units = this.game.add.group();
    this.game.world.bringToTop(this.game.units);
};

module.exports = StateManager;
