'use strict';

var HealthBar = function (owner) {

    this.owner = owner;

    Phaser.Image.call(this, this.owner.game, 0, - (this.owner.height / 2), 'health');
    this.height = 5;
    this.maxwidth = this.owner.width / 2;
    this.tint = 0x00FF00;
    this.game.add.existing(this);
    this.owner.addChild(this);

    this.updateHealthBar();
};

HealthBar.prototype = Object.create(Phaser.Image.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.updateHealthBar = function () {

    var health = this.owner.stats.get('health');
    var mhealth = this.owner.stats.getMax('health');
    var width = (this.maxwidth / this.owner.stats.getMax('health')) * this.owner.stats.get('health');
    this.width = (this.maxwidth / this.owner.stats.getMax('health')) * this.owner.stats.get('health');
    if (this.width > (this.maxwidth * 0.8)) {
        this.tint = 0x00FF00;
    } else if (this.width > (this.maxwidth * 0.6)) {
        this.tint = 0x004C00;
    } else if (this.width > (this.maxwidth * 0.4)) {
        this.tint = 0xDBCB2A;
    } else if (this.width > (this.maxwidth * 0.2)) {
        this.tint = 0xDB732A;
    } else {
        this.tint = 0xAF2121;
    }
};

module.exports = HealthBar;