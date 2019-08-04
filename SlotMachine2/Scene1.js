// JavaScript source code

class Scene1 extends Phaser.Scene 
{
	constructor() //function to inherit all chara from Class Scene in Phaser
	{
		super("bootGame");
	}

	preload() 
	{
		this.load.image("background", "assets/background.png");
		this.load.spritesheet("ship", "assets/spritesheets/ship.png", {frameWidth: 16, frameHeight:16});
		this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {frameWidth:32, frameHeight:32});
		this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {frameWidth:32, frameHeight:16});
		this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {frameWidth: 16, frameHeight:16});
		this.load.spritesheet("powerups", "assets/spritesheets/power-up.png", {frameWidth: 16, frameHeight:16});
		this.load.spritesheet("player", "assets/spritesheets/player.png", {frameWidth: 16, frameHeight:24}); //player spritesheet
		this.load.spritesheet("beam", "assets/spritesheets/beam.png", {frameWidth: 16, frameHeight:16}); //player spritesheet
		this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");//uses a bitmap and xml file for the font
	}

	create() 
	{
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame"); //calls Scene2

		this.score = 0;

		//score label var: X,Y, use pixelFont, Spell out this word, font size
		this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);

		//animations
		this.anims.create({
			key: "ship1_anim",
			frames: this.anims.generateFrameNumbers("ship"),
			frameRate: 20,
			repeat: -1 //repeats indefinitely
		});
		this.anims.create({
			key: "ship2_anim",
			frames: this.anims.generateFrameNumbers("ship2"),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: "ship3_anim",
			frames: this.anims.generateFrameNumbers("ship3"),
			frameRate: 20,
			repeat: -1
		});
		//EXPLOSION
		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 20,
			repeat: 0, //doesn't repeat unless called
			hideOnComplete: true
		});
		//POWER-UP	
		this.anims.create({
			key: "red", //start: and end: specify which sprites to use in the same spritesheet
			frames: this.anims.generateFrameNumbers("powerups", {start: 0, end: 1}),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: "grey",
			frames: this.anims.generateFrameNumbers("powerups", {start: 2, end: 3}),
			frameRate: 20,
			repeat: -1
		});
		//PLAYER
		this.anims.create({
			key: "thrust",
			frames: this.anims.generateFrameNumbers("player"),
			frameRate: 20,
			repeat: -1
		});
		//BEAM 
		this.anims.create({
			key: "beam_anim",
			frames: this.anims.generateFrameNumbers("beam"),
			frameRate: 20,
			repeat: -1
		});

	}

}

