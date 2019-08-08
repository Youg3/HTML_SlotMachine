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

		this.testgroup = this.add.sprite(config.width / 2 -150, config.height / 2, "starbomb").setAngle(90);
		this.testgroup2 = this.add.sprite(config.width / 2 -100, config.height / 2 - 25, "starbomb").setAngle(90);

		var stars = this.physics.add.staticGroup({
			key: 'starbomb',
			repeat: 10,
			setXY: {x:100, y: 100, stepY: 40}
		});



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

		this.testgroup.y -= 50;
		if(this.testgroup.y < -5){
			this.testgroup.y = 625;
		}
		winClaimed = false;
	}
	
	jackpot()
	{
		gameTokens += 50;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;
	}

	update() 
	{
		if(winClaimed == false)
		{

			if(this.testgroup.y == this.testgroup2.y)
			{
				console.log("jackpot");
				this.jackpot();
				winClaimed = true;
			}
		}
	}
}