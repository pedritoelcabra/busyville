'use strict';

var Randomizer = function () {
};

Randomizer.constructor = Randomizer;

Randomizer.firstMaleName = function() {
    this.firstMaleNames = [
        "John",
        "David",
        "Samuel"
    ];
    var rand = Math.floor((Math.random() * this.firstMaleNames.length));
    return this.firstMaleNames[rand];
};

Randomizer.firstFemaleName = function() {
    this.firstFemaleNames = [
        "Sarah",
        "Jane",
        "Rosa"
    ];
    var rand = Math.floor((Math.random() * this.firstFemaleNames.length));
    return this.firstFemaleNames[rand];
};

Randomizer.lastName = function() {
    this.lastNames = [
        "Smith",
        "Baker",
        "Brown"
    ];
    var rand = Math.floor((Math.random() * this.lastNames.length));
    return this.lastNames[rand];
};

Randomizer.warriorEphitet = function() {
    this.warriorEphitets = [
        "the Strong",
        "the Valiant",
        "the Brave"
    ];
    var rand = Math.floor((Math.random() * this.warriorEphitets.length));
    return this.warriorEphitets[rand];
};

Randomizer.orcEphitet = function() {
    this.warriorEphitets = [
        "the Merciless",
        "the Smelly",
        "the Brawler"
    ];
    var rand = Math.floor((Math.random() * this.warriorEphitets.length));
    return this.warriorEphitets[rand];
};

Randomizer.orcName = function() {
    this.orcNames = [
        "Grug Ta",
        "Hrugg",
        "Kn Dur"
    ];
    var rand = Math.floor((Math.random() * this.orcNames.length));
    return this.orcNames[rand];
};

Randomizer.arrayRand = function(array) {
    if (!array.length) {
        return 0;
    }
    return array[Math.floor(Math.random() * array.length)];
};

Randomizer.chanceRoll = function(chance) {
    return Math.random() < chance;
};

Randomizer.getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

module.exports = Randomizer;