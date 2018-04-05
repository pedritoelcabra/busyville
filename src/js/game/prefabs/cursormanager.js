'use strict';

var CursorManager = function (game) {

    this.game = game;
};

CursorManager.prototype.constructor = CursorManager;

CursorManager.prototype.setStandard = function () {
    this.game.canvas.style.cursor = "url('images/buttons/mouse_pointer.png'), default";
};

CursorManager.prototype.setDemolish = function () {
    this.game.canvas.style.cursor = "url('images/buttons/mouse_delete.png'), pointer";
};

CursorManager.prototype.update = function() {

    if (this.game.demolishingBuildings) {
        this.setDemolish();
        return;
    }

    this.setStandard();
};

module.exports = CursorManager;


