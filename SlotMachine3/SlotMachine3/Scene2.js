// JavaScript source code

class Scene2 extends Phaser.Scene 
{
	constructor() {super("playGame");}

	create() 
	{
		//LOAD BACKGROUND IMAGE FIRST HERE

		//this.add.text(20, 20, "game loaded");
		
		//load background music
		this.music = this.sound.add("music");
		//music config
		var musicConfig = 
		{
			mute: false,
			volume:0.5,
			rate:1,
			detune:0,
			seek:0,
			loop:true,
			delay:0
		}
		this.music.play(musicConfig);

		//other sound effects
		this.leverPull = this.sound.add("leverpull");

		this.testImage = this.add.sprite(config.width / 2 - 32, config.height / 2, "star").setInteractive();

		//display game tokens
		this.tokenLabel = this.add.bitmapText(100, 20, "pixelFont", "Tokens Remaining: " + gameTokens, 32);

		this.input.on('gameobjectdown', this.pullLever, this);
	}

	pullLever() {
		console.log("leverPull");
		this.leverPull.play();
		//update score
		gameTokens -= 1;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;

	}

	update() 
	{

	}
}