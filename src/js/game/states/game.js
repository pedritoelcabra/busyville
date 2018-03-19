var game = {};

game.create = function () {
  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash');
  logo.anchor.setTo(0.5, 0.5);
};

game.update = function () {
  if(this.game.input.activePointer.justPressed()) {
    this.game.state.start('busyville');
  }
};
module.exports = game;
