// JavaScript source code

//image variables
var testImage;

//music variables
var music;
var leverPull;
var spindlesSound;
var jackpotSound;
var coinsSound;

class Scene2 extends Phaser.Scene 
{
	constructor() {super("playGame");}

	create() 
	{
		//LOAD BACKGROUND IMAGE FIRST HERE

		//this.add.text(20, 20, "game loaded");
		
		this.winClaimed = true;

		//load background music
		music = this.sound.add("music");
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
		music.play(musicConfig);

		//other sound effects
		leverPull = this.sound.add("leverpull");
		jackpotSound = this.sound.add("slotpayoff");
		coinsSound = this.sound.add("coins");

		testImage = this.add.sprite(config.width / 2 - 32, config.height / 2, "star").setInteractive();

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

	pullLever() 
	{
		//console.log("leverPull");
		//leverPull.play();

		this.leverPullSound();

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
	
	leverPullSound(fn)
	{
		leverPull.once('play', function(sound){
			console.log("leverPullSound");
			this.time.addEvent({
				delay: 2000,
				callback: fn,
				callbackScope: this	
			});
		}, this);
		leverPull.play();
		//check the sound is playing and set the lever to unclickable.
		if(leverPull.isPlaying){
			console.log("playing sound");
			testImage.alpha = 0.5;
		}
		leverPull.on('complete', function(sound){testImage.alpha = 1;}); //callback func to re-enable the lever
	}

	jackpotSound()
	{
		jackpotSound.play();
		
		//jackpotSound.onStop.addOnce(console.log("sound played"));
	}

	jackpot()
	{
		gameTokens += jackpotTokens;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;
		this.jackpotSound();
		jackpotSound.on('complete', function(sound) {
			console.log("callbackfunc");
		});
	}

	update() 
	{
		if(testImage.alpha < 1)
		{
			console.log("alpha below 1");
			testImage.disableInteractive();

		}else if(testImage.alpha ==1){
			console.log("alpha == 1");
			testImage.setInteractive();
		}
	}
}