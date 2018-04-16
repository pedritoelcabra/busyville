'use strict';

var Hammer = require('./hammer');
var Spear = require('./spear');
var HumanBody = require('./humanbody');
var OrcBody = require('./orcbody');
var ClothPants = require('./clothpants');
var ClothShirt = require('./clothshirt');
var HumanHair = require('./humanhair');
var LeatherArmor = require('./leatherarmor');
var ChainHat = require('./chainhat');
var BlackShoes = require('./blackshoes');

var ItemFactory = function () {
};

ItemFactory.prototype.constructor = ItemFactory;

ItemFactory.getNew = function(name) {
    return eval('new ' + name + '()');
};

module.exports = ItemFactory;