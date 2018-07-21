var config = new Object ();

config.type= Phaser.CANVAS;
config.pixelArt= true;
config.width = 32 * 24;
config.height = 32 * 16;
config.scene =[Level1,Level2,Level3];
config.physics = {default:'arcade'};

var game = new Phaser.Game(config);