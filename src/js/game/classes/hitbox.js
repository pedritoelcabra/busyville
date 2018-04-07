'use strict';

var HitBox = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
};

HitBox.prototype.constructor = HitBox;

module.exports = HitBox;
