'use strict';

var CloseButton = require('./closebutton');

var InfoWindow = function (game, pawn) {

    this.pawn = pawn;
    this.game = game;
    Phaser.Sprite.call( this, game, pawn.body.x - game.camera.x, pawn.body.y - game.camera.y , 'infowindow');

    this.scale.setTo(0.5,0.5);

    this.fixedToCamera = true;


    this.inputEnabled = true;
    this.input.enableDrag();
    this.events.onDragStart.add(this.startDrag, this);

    this.closeButton = new CloseButton(this.game, this);
    this.game.add.existing(this.closeButton);
    this.addChild(this.closeButton);
    this.closeButton.bringToTop();

    this.textStyle = { font: "20px Arial", fill: "#000000", fontStyle: "bold" };

    this.firstNameText = this.game.add.text(this.width - 10, 16, pawn.firstName, this.textStyle);
    this.addChild(this.firstNameText );
    this.lastNameText = this.game.add.text(this.width - 10, 38, pawn.lastName, this.textStyle);
    this.addChild(this.lastNameText );

    this.descriptions = [];
    this.lineCount = 0;
    if(pawn.activityBrain){
        for(var i = 0; i < pawn.activityBrain.activities.length ; i++){
            this.addLine(pawn.activityBrain.activities[i].preferenceString());
        }
    }

};

InfoWindow.prototype = Object.create(Phaser.Sprite.prototype);
InfoWindow.prototype.constructor = InfoWindow;

InfoWindow.prototype.addLine = function(textContent) {

    var text = this.game.add.text(20, 136 + (this.lineCount * 24), textContent, this.textStyle);

    this.descriptions.push(text);
    this.addChild(text);
    this.lineCount++;
};

InfoWindow.prototype.close = function() {
    this.destroy();
};

InfoWindow.prototype.startDrag = function() {
    this.bringToTop();
};


module.exports = InfoWindow;


