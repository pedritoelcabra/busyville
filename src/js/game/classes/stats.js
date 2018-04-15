'use strict';

var Stats = function (owner) {
    this.owner = owner;

    this.maxStats = {};

    this.stats = {};

    for (var key in this.owner.baseStats) {
        if (this.owner.baseStats.hasOwnProperty(key)) {
            this.maxStats[key] = this.owner.baseStats[key];
            this.stats[key] = this.owner.baseStats[key];
        }
    }
};

Stats.prototype.setMax = function(key, val){
    debugger;
    if (val < 0) {
        val = 0;
    }
    this.maxStats[key] = val;
};

Stats.prototype.set = function(key, val){
    if (val < 0) {
        val = 0;
    }
    if (val > this.maxStats[key]) {
        val = this.maxStats[key];
    }
    this.stats[key] = val;
};

Stats.prototype.damageStat = function(key, val){

    if (val <= 0) {

    }
    else if (val >= this.stats[key]) {
        this.stats[key] = 0;
    }
    else {
        this.stats[key] -= val;
    }

    if (key === 'health') {
        this.owner.healthBar.updateHealthBar();
    }
};

Stats.prototype.setInit = function(key, val){
    this.setMax(key, val);
    this.set(key, val);
};

Stats.prototype.getMax = function(key){
    return this.maxStats[key];
};

Stats.prototype.get = function(key){
    return this.stats[key];
};

Stats.prototype.constructor = Stats;

module.exports = Stats;