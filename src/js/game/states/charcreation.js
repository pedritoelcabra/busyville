
var Pawn = require('../prefabs/movables/pawn');

var charcreation = {};

charcreation.create = function () {

    this.game.stateManager.addGroups();

    this.game.camera.bounds.setTo(0, 0, this.game.width, this.game.height);

    this.playerPawn = new Pawn (this.game, 0, 0);
    this.playerPawn.body.x = this.game.width / 2 - this.playerPawn.width / 2;
    this.playerPawn.body.y = this.game.heigh / 2 - this.playerPawn.height / 2;
};

charcreation.update = function () {

};

module.exports = charcreation;