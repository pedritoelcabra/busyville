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

Randomizer.arrayRand = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

Randomizer.chanceRoll = function(chance) {
    return Math.random() < chance;
};

module.exports = Randomizer;