'use strict';


var Animatable = function () {
};

Animatable.addAnimation = function(name, row, length, framerate, repeat) {
    var arr = [];
    var offset = row * this.rowLength;
    for(var i = 0; i < length; i++){
        arr.push(offset + i);
    }
    this.animations.add(name, arr, framerate, repeat);
};



module.exports = Animatable;


