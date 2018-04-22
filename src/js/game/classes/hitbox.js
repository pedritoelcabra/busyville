'use strict';

var HitBox = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
};

HitBox.prototype.constructor = HitBox;

HitBox.prototype.drawHitBox = function(owner) {
    var graphics = owner.game.add.graphics(0,0);
    graphics.lineStyle(2, 0x00FF00, 1);
    graphics.drawRect(0, 0, this.w, this.h) ;
    return graphics;
};

module.exports = HitBox;
