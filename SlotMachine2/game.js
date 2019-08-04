var gameSettings = {
	playerSpeed: 200,
}

var config = 
{
	width: 256,
	height: 272,
	backgroundColour: 0x000000,
	scene: [Scene1, Scene2], //scenes held in an array
	physics: {
		default: "arcade",
		arcade:{ debug:false}
	}
}

var game = new Phaser.Game(config);
