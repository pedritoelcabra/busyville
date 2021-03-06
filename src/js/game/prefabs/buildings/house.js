'use strict';

var Building = require('../../prefabs/buildings/building');
var Randomizer = require('../../classes/randomizer');
var Worker = require('../movables/worker');

var House = function (game, x, y) {

    this.plotType = '4x5';

    this.roadTiles = [
        {'x' : 1, 'y' : 5},
        {'x' : 2, 'y' : 5},
        {'x' : 1, 'y' : 4},
        {'x' : 2, 'y' : 4}
    ];

    this.firstName = Randomizer.arrayRand(['House', 'House1']);
    Building.call( this, game, x, y, this.firstName);

    this.constructionCost = 20;

    this.doorTile = {'x' : 1, 'y' : 5};

    this.housing = 1;
    this.inhabitantCost = 2;

    this.buildingType = 'House';
    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);
};

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

House.prototype.canBeBuilt = function() {
    return true;
};

House.prototype.createInhabitant = function () {
    return new Worker(this.game, this.getDoor().x, this.getDoor().y);
};

House.prototype.create = function(x,y) {
    return new House(this.game, x, y);
};

module.exports = House;


