// JavaScript source code

class Scene1 extends Phaser.Scene 
{

	constructor() {super("bootGame");}

	preload() 
	{
		//preload assets here
		this.load.audio("music", "assets/audio/music.mp3");
		this.load.audio("coins", ["assets/audio/coins.ogg","assets/audio/coins.mp3"]);
		this.load.audio("leverpull", ["assets/audio/leverpull.ogg","assets/audio/leverpull.mp3"]);
		this.load.audio("slotpayoff", ["assets/audio/slotpayoff.ogg","assets/audio/slotpayoff.mp3"]);

		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");//xml map for font
		this.load.image("star", "assets/star.png");//test image, remove later

	}
	
	create() {
		this.add.text(20, 20, "Loading Game...");
		this.scene.start("playGame"); //call scene 2
	}
}