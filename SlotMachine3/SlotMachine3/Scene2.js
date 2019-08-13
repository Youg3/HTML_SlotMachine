// JavaScript source code

class Scene2 extends Phaser.Scene 
{
	constructor() {super("playGame");}

	create() 
	{
		//LOAD BACKGROUND IMAGE FIRST HERE

		//this.add.text(20, 20, "game loaded");
		
		this.winClaimed = true;

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

		this.testgroup = this.add.sprite(config.width / 2 -150, config.height / 2, "starbomb").setAngle(90);
		this.testgroup2 = this.add.sprite(config.width / 2 -100, config.height / 2 - 25, "starbomb").setAngle(90);

		var stars = this.physics.add.staticGroup({
			key: 'starbomb',
			repeat: 10,
			setXY: {x:100, y: 100, stepY: 40}
		});



		//display game tokens
		this.tokenLabel = this.add.bitmapText(100, 20, "pixelFont", "Tokens Remaining: " + gameTokens, 32);

		/*if(this.leverPull.isPlaying)
		{
			this.testImage.alpha = 0.5;
		}else
		{
			this.testImage.alpha = 1;
			this.input.on('gameobjectdown', this.pullLever, this);
		}--- DOESN'T WORK CURRENTLY --- */

		//plays pull lever function
		this.input.on('gameobjectdown', this.pullLever, this);
		
	}

	pullLever() {
		console.log("leverPull");
		this.leverPull.play();

		//update score
		gameTokens -= 1;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;

		this.testgroup.y -= 50;

		if(this.testgroup.y < -5){
			this.testgroup.y = 625;
		}
		//this works though has a issue of running twice... why?
		if(this.testgroup.y == this.testgroup2.y)
		{
			console.log("jackpot");
			this.jackpot();
			//winClaimed = true;
		}

		winClaimed = false;
	}
	
	jackpot()
	{
		gameTokens += jackpotTokens;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;
	}

	update() 
	{

	}
}