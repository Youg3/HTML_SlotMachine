// JavaScript source code

//image variables
var testImage;
var testgroup;
var testgroup2;
var testgroup3;

//var spindleNumbers = new Array;

//spritesheet variables
var manTest;
var manTest2;
var spindleAnimGrp;

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

		testgroup = this.add.sprite(config.width / 2 -150, config.height / 2, "starbomb").setAngle(90);
		testgroup2 = this.add.sprite(config.width / 2 -100, config.height / 2, "starbomb").setAngle(90);
		testgroup3 = this.add.sprite(config.width / 2 -200, config.height / 2, "starbomb").setAngle(90);
		manTest = this.add.sprite(config.width -50, 100, "dude");
		manTest2 = this.add.sprite(config.width -100, 100, "dude");

		spindleAnimGrp = this.physics.add.group();
		//spindleAnimGrp.add(manTest);
		spindleAnimGrp.add(manTest2);

		//display game tokens
		this.tokenLabel = this.add.bitmapText(100, 20, "pixelFont", "Tokens Remaining: " + gameTokens, 32);

		//plays pull lever function
		this.input.on('gameobjectdown', this.pullLever, this);
		

		//manTest.play("right");
		//manTest2.play("right");
		manTest.alpha = 0;
		manTest2.alpha = 0;
		spindleAnimGrp.setAlpha = 0;
	}

	pullLever() 
	{
		//call sound func
		this.leverPullSound();

		//manTest.alpha = 1;
		//spindleAnimGrp.alpha = 1;
		this.spindleAnim();

		//update score
		gameTokens -= 1;
		this.tokenLabel.text = "Tokens Remaining: " + gameTokens;
		//calls spindle move func
		this.spindleMove();
	}

	spindleAnim()
	{
		manTest.alpha = 1;
		manTest2.alpha = 1;
		manTest.play("right");
		manTest2.play("right");
	}
	
	//pick: function (array){
	//	return array[this.spindleNumbers(0,array.length -1)];
	//}

	spindleMove()
	{
		//perhaps a tween or animation here?
		//var id = Phaser.Math.Between(0,3);

		var fn = Phaser.Math.Between(1,4)*50;
		console.log("fn ", fn);
		console.log("sprite ", testgroup.y);
		var i = testgroup.y - fn;
		console.log(i);

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

			console.log("toptween ", tween2.getValue(y));
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
		}

		console.log("after tween ",testgroup.y);

		//testgroup.y -= Phaser.Math.Between(1,4)*50;
		testgroup2.y += Phaser.Math.Between(1,4)*50;
		//testgroup3.y -= Phaser.Math.Between(1,4)*50;

		testgroup3.y = 400;

		//if(testgroup.y < 50){
		//	testgroup.y = 400;
		//}
		if(testgroup2.y > 400){
			testgroup2.y = 50;
		}
		if(testgroup3.y < 50){
			testgroup3.y = 400;
		}
		//this works though has a issue of running twice... why?
		if(testgroup.y == testgroup2.y && testgroup2.y == testgroup3.y)
		{
			console.log("jackpot");
			this.jackpot();
		}
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
		leverPull.on('complete', function(sound){testImage.alpha = 1, manTest.alpha = 0, manTest2.alpha = 0;}); //callback func to re-enable the lever
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
			testImage.disableInteractive();//disables interactive nature of lever

		}else if(testImage.alpha ==1){
			console.log("alpha == 1");
			testImage.setInteractive();//re-activates leverpull
		}
	}
}