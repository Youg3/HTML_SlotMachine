// JavaScript source code

//image variables
var testImage;
var testgroup;
var testgroup2;
var testgroup3;

//var spindleNumbers = new Array;

var slotmachineBase;
var spindle1;
var spindle2;
var spindle3;
var jackpotSign;

//spritesheet variables
var manTest;
var manTest2;
var spindleAnimGrp;
var leverDown;
var spindleAnim1;
var spindleAnim2;
var spindleAnim3;

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
		spindlesSound = this.sound.add("spindlesSound");

		testImage = this.add.sprite(config.width -200, config.height / 2, "star").setInteractive();

		slotmachineBase = this.add.sprite(config.width / 2,config.height / 2,"slotmachine").setScale(0.5);
		jackpotSign = this.add.sprite(config.width / 2, 50,"jackpotSign");

		//test objects
		testgroup = this.add.sprite(50, config.height / 2, "starbomb").setAngle(90);
		testgroup2 = this.add.sprite(100, config.height / 2, "starbomb").setAngle(90);
		testgroup3 = this.add.sprite(150, config.height / 2, "starbomb").setAngle(90);
		manTest = this.add.sprite(config.width -50, 100, "dude");
		manTest2 = this.add.sprite(config.width -200, 100, "dude");
		//game objects
		leverDown = this.add.sprite(config.width / 2 + 319, 200, "lever_spritesheet").setScale(0.5);
		spindleAnim1 = this.add.sprite(config.width - 100, config.height / 2, "spindle").setScale(0.5);
		//spindle strips
		spindle1 = this.add.sprite(config.width / 2 - 88, config.height / 2, "spindleStrip").setScale(0.5);
		spindle2 = this.add.sprite(config.width / 2, config.height / 2, "spindleStrip").setScale(0.5);
		spindle3 = this.add.sprite(config.width / 2 + 88, config.height / 2, "spindleStrip").setScale(0.5);


		spindleAnimGrp = this.physics.add.group();
		//spindleAnimGrp.add(manTest);
		spindleAnimGrp.add(manTest2);

		//display game tokens
		this.tokenLabel = this.add.bitmapText(100, 20, "pixelFont", "Tokens Remaining: " + gameTokens, 32);

		//plays pull lever function
		this.input.on('gameobjectdown', this.pullLever, this);
		

		manTest.play("right");
		manTest2.play("right");
		manTest.alpha = 1;
		//manTest2.alpha = 1;
		spindleAnimGrp.toggleVisible();

		spindleAnim1.play("spindleRun");

	}

	pullLever() 
	{
		//update score
		gameTokens -= 1;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;

		//call sound func
		this.leverPullSound();
		//play animation
		//leverDown.play("leverDown");
		//leverDown.play("leverDown");
		
		//this.spindleAnim();

		//calls spindle move func
		this.spindleMove();
	}

	spindleAnim()
	{
		//play animation and set to visible
		manTest.alpha = 1;
		manTest2.alpha = 1;
		manTest.play("right");
		manTest2.play("right");
		
		spindleAnim1.alpha = 1;
		spindleAnim1.play("spindleRun");

		//call spindle sound func
		this.spindleSound();
	}

	spindleSound()
	{
		//play spindle sound
		spindlesSound.play();
		if(spindlesSound.isPlaying)
		{
			console.log("Spindle Sounds Playing");
		}
		//callback func to set the spindle animation strip to invisible
		spindlesSound.on('complete', function(sound){manTest.alpha = 0, manTest2.alpha = 0, spindleAnim1.alpha = 0, testImage.aplha = 1, this.jackpot();}, this);
		//tried to make the function for jackpot only call once upon completion of this callback.  Keep getting a 'Listener' typeError, don't know why.
		//replace = this.jackpot();   with -> this.events.once('jackpot', this.jackpot()); 
	}

	spindleMove()
	{
		var fn = Phaser.Math.Between(1,4)*50;
		console.log("fn ", fn);
		console.log("spindle 1 current y: ", spindle2.y);
		var i = spindle2.y - fn;
		console.log("expected y loc: ", i);

		/*
			Could never get the tween to work.  Although the sprite would more and tween to end position, the sprite would never set it's Y position to 
			the ending position until the player pulled the lever again.  This meant that the JACKPOT condition could be met despite the spindles themselves
			not lining up.

		if(i < 50)
		{
			testgroup.y = 450;

			var tween2 = this.tweens.add({
				targets: testgroup,
				y: testgroup.y - fn,
				ease: 'Power0',
				duration: 1500,
				repeat: 0,
				onComplete: function(){console.log(tween2);},
				callbackScope: this});

			console.log("toptween ", tween2.y.getValue());
		}else
		{
			var tween1 = this.tweens.add({
				targets: testgroup,
				y: i,
				ease: 'Power1',
				duration: 1500,
				repeat: 0,
				callbackScope: this});
			console.log("Tween1 ",testgroup.y);
		}*/

		console.log("y location spindle1 ",spindle2.y);

		spindle1.y -= Phaser.Math.Between(1,4)*50;
		spindle2.y += Phaser.Math.Between(1,4)*50;
		spindle3.y -= Phaser.Math.Between(1,4)*50;

		if(spindle1.y < 160){
			spindle1.y = 450;
		}
		if(spindle2.y > 450){
			spindle2.y = 150;
		}
		if(spindle3.y < 160){
			spindle3.y = 450;
		}
		//this works though has a issue of running twice... why?
		/*if(spindle2.y == spindle2.y && spindle2.y == spindle3.y)
		{
			console.log("jackpot");
			//this.jackpot();
		}*/
	}

	waiting(){
		console.log("waiting");
	}

	leverPullSound()
	{
		leverPull.play(); //play track
		leverDown.play("leverDown"); //play lever animation
		//check the sound is playing and set the lever to unclickable.
		if(leverPull.isPlaying)
		{		
			console.log("playing sound");
			testImage.alpha = 0.5;
		}
		leverPull.on('complete', function(sound){console.log("lever pull sound complete"), this.spindleAnim();}, this);
	}

	jackpotSound()
	{
		jackpotSound.play();
		
		//jackpotSign.setTint(0xff0000);
		//jackpotSign.setTint(0xffff00);


	}

	jackpot()
	{
		//this works though has a issue of running twice... why?
		if(spindle1.y == spindle2.y && spindle2.y == spindle3.y)
		{
			console.log("jackpot");
			
			console.log(spindle1.y, spindle2.y, spindle3.y);

			gameTokens += jackpotTokens;
			this.tokenLabel.text = "Tokens Remaining: " + gameTokens;
			this.jackpotSound();
			testImage.alpha = 1;
			jackpotSound.on('complete', function(sound) {console.log("Jackpot Calculated");});
		}else
		{
			console.log("No Jackpot");
			testImage.alpha = 1;
		}

		//return;

	}

	update() 
	{
		if(testImage.alpha < 1)
		{
			//console.log("alpha below 1");
			testImage.disableInteractive();//disables interactive nature of lever

		}else if(testImage.alpha ==1){
			//console.log("alpha == 1");
			testImage.setInteractive();//re-activates leverpull
		}
	}
}