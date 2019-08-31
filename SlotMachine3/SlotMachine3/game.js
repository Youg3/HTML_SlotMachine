// JavaScript source code

//global variables
var gameTokens = 50;
var jackpotTokens = 10;
var count = 0;
var autoWin = 15;

var config = 
{
	width: 410,
	height: 425,
	backgroundColour: 0x000000,
	scene: [Scene1, Scene2], //scenes held in an array
	physics: {
		default: "arcade",
		arcade:{ debug:false}
	}
}

var game = new Phaser.Game(config);
