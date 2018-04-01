var _ = require('lodash');
var properties = require('./properties');

var states = {
    boot: require('./states/boot.js'),
    preloader: require('./states/preloader.js'),
    game: require('./states/game.js'),
    charcreation: require('./states/charcreation.js'),
    busyville: require('./states/busyville.js')
};

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game');

// Automatically register each state.
_.each(states, function (state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
