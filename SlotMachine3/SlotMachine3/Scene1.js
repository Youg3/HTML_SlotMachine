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
		this.load.audio("spindlesSound",["assets/audio/spindlesSound.ogg","assets/audio/spindlesSound.mp3"]);

		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");//xml map for font
		this.load.image("star", "assets/star.png");//test image, remove later
		this.load.image("starbomb", "assets/starbomb.png");//test image for lever
		//spritesheet animation
		this.load.spritesheet("dude", "assets/spritesheets/dude.png", {frameWidth:32, frameHeight:48});
		this.load.spritesheet("lever_spritesheet", "assets/spritesheets/lever_spritesheet_4x1.png", {frameWidth:146, frameHeight:565});
		this.load.spritesheet("spindle", "assets/spritesheets/lever_spritesheet_4x1.png", {frameWidth:146, frameHeight:565}); //"assets/spritesheets/spindle_spritesheet.png", {frameWidth:117, frameHeight:290});

	}
	
	create() 
	{
		this.add.text(20, 20, "Loading Game...");
		this.scene.start("playGame"); //call scene 2

		//create animations here
		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", {start:5, end: 8}),
			frameRate: 10,
			repeat: 10
		});

		this.anims.create({
			key: "leverDown",
			frames: this.anims.generateFrameNumbers("lever_spritesheet", {start:0, end: 3}),
			frameRate: 4,
			repeat: 0		
		});
		this.anims.create({
			key: "leverUp",
			frames: this.anims.generateFrameNumbers("lever_spritesheet", {start:3, end: 0}),
			frameRate: 4,
			repeat: 0		
		});

	}
}