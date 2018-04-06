'use strict';

var CursorManager = function (game) {

    this.game = game;
    this.lastHandledClick = 0;
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

CursorManager.prototype.updateLastHandledClick = function() {
    this.lastHandledClick = this.game.microTime;
};

CursorManager.prototype.checkClickHasNotBeenHandled = function() {
    return (this.game.microTime - this.lastHandledClick) > 200;
};

module.exports = CursorManager;


