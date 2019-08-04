// JavaScript source code

class Scene2 extends Phaser.Scene 
{
	constructor() 
	{
		super("playGame");
	}

	create() 
	{
		//set background as a tilesprite to allow for scrolling
		this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
		this.background.setOrigin(0, 0); //reset background origin point to top left from centre

		//score background box
		var graphics = this.add.graphics();//define var with black fill
		graphics.fillStyle(0x000000, 1);//
		graphics.beginPath();//draw polygon lines with coordinates
		graphics.moveTo(0, 0);
		graphics.lineTo(config.width, 0);
		graphics.lineTo(config.width, 20);
		graphics.lineTo(0, 20);
		graphics.lineTo(0, 0);
		graphics.closePath();
		graphics.fillPath(); //fill drawn polygon

		this.score = 0;
		//score label var: X,Y, use pixelFont, Spell out this word, font size
		this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);

		//music
		this.beamSound = this.sound.add("audio_beam");
		this.pickupSound = this.sound.add("audio_pickup");
		this.explosionSound = this.sound.add("audio_explosion");

		this.music = this.sound.add("music");

		var musicConfig = 
		{
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: false,
			delay:0
		}

		this.music.play(musicConfig);

		//add ships using the global config var to position the ships
		this.ship1 = this.add.sprite(config.width /2 - 50, config.height /2, "ship").setInteractive();
		this.ship2 = this.add.sprite(config.width /2, config.height /2, "ship2").setInteractive();
		this.ship3 = this.add.sprite(config.width /2 + 50, config.height /2, "ship3").setInteractive();

		this.enemies = this.physics.add.group();//enemy ship group
		this.enemies.add(this.ship1);
		this.enemies.add(this.ship2);
		this.enemies.add(this.ship3);

		this.powerUps = this.physics.add.group();

		var maxObjects = 4;
		for (var i = 0; i <= maxObjects; i++) 
		{
			var powerUp = this.physics.add.sprite(16, 16, "powerups");
			this.powerUps.add(powerUp); //add to grouping
			powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

			//random chance for sprite
			if (Math.random() > 0.5) {
				powerUp.play("red");
			} else {
				powerUp.play("grey");
			}
			//set velocity, world area and bounce
			powerUp.setVelocity(100, 100);
			powerUp.setCollideWorldBounds(true);
			powerUp.setBounce(1);
		}

		this.ship1.play("ship1_anim");
		this.ship2.play("ship2_anim");
		this.ship3.play("ship3_anim");

		this.input.on('gameobjectdown', this.destroyShip, this);

		//this.add.text(20, 20, "Game loaded...", {font: "25px Arial", fill: "yellow"});

		this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
		this.player.play("thrust");
		this.cursorKeys = this.input.keyboard.createCursorKeys(); //var listener for keyboard event
		this.player.setCollideWorldBounds(true);

		//shoot
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//group that holds all beam instances in game
		this.projectiles = this.add.group();

		//collision between game objects
		this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
			projectile.destroy(); //call own function and destroy the beam
		});
		//check for powerup and player overlap instead of collision so that physics are not stimulated
		// first two params are what to check between, third is the callback func
		// with the last two params for the callback scope
		this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

		//player and enemy ship collision with callback func hurtPlayer
		this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
		//beam vs enemies
		this.physics.add.overlap(this.projectiles, this.enemies, this.enemyHit, null, this);
	}

	zeroPad(number, size) //func that adds zeros to the score label 
	{
		var stringNumber = String(number);
		while (stringNumber.length < (size || 2)) {
			stringNumber = "0" + stringNumber;
		}
		return stringNumber;
	}

	hurtPlayer(player, enemy) 
	{
		this.resetShipPos(enemy); //reset enemy ship position

		if (this.player.alpha < 1) {return;} //if player is transparent, can't be destroyed'

		var explosion = new Explosion(this, player.x, player.y);
		player.disableBody(true, true); //hide ship once hit and exploded
		this.explosionSound.play();

		this.score -= 50;
		var formatedScore = this.zeroPad(this.score, 6); //takes the score, formats with addtional 0s to the power of 6 
		this.scoreLabel.text = "SCORE " + formatedScore; //display score

		//a delay function that gives player time to react once respawned
		this.time.addEvent(
			{
				delay: 1000,
				callback: this.resetPlayer,
				callbackScope: this,
				loop: false
			});
	}

	resetPlayer() 
	{
		var x = config.width / 2 - 8;
		var y = config.height + 64;
		this.player.enableBody(true, x, y, true, true); //re-enable player
		//makes player transparent
		this.player.alpha = 0.5;

		//using a tween to act as a timer and animate at the same time
		//here it targets the player game objects
		//when player dies, object gets set to off screen then glides (tweens) on to screen
		//before starting the time for 1.5 seconds where the ship is transparent
		//resets transparency at the end of timer and player can is no longer invincible
		var tween = this.tweens.add({
			targets: this.player,
			y: config.height - 64,
			ease: 'Power1',
			duration: 1500,
			repeat: 0,
			onComplete: function() { this.player.alpha = 1; },
			callbackScope: this
		});
	}

	enemyHit(projectile, enemy) 
	{
		//explosion animation
		var explosion = new Explosion(this, enemy.x, enemy.y);

		//simply destroy shot and reset enemy ship
		projectile.destroy();
		this.resetShipPos(enemy);
		//increase score
		this.score += 15;
		var formatedScore = this.zeroPad(this.score, 6); //takes the score, formats with addtional 0s to the power of 6 
		this.scoreLabel.text = "SCORE " + formatedScore; //display score

		this.explosionSound.play();
	}

	pickPowerUp(player, powerUp) {
		powerUp.disableBody(true, true); //two params set to true make it inactive and hide from display
		this.pickupSound.play();
	}

	moveShip(ship, speed) 
	{
		ship.y += speed; //ship velocity

		if (ship.y > config.height) //resets the y position if off screen
		{
			this.resetShipPos(ship);
		}
	}

	resetShipPos(ship) {
		ship.y = 0;
		var randomX = Phaser.Math.Between(0, config.width);
		ship.x = randomX;
	}

	destroyShip(pointer, gameObject) {
		gameObject.setTexture("explosion");
		gameObject.play("explode");
	}

	update() {
		this.moveShip(this.ship1, 1);
		this.moveShip(this.ship2, 2);
		this.moveShip(this.ship3, 3);

		//decrease Y position of the background texture map so it scrolls down
		this.background.tilePositionY -= 0.5;

		this.movePlayerManager();

		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) 
		{
			//check if the player is active to allow shooting
			if (this.player.active) {
				this.shootBeam();
			}
		}

		//iterate through each element of the projectiles group
		for (var i = 0; i < this.projectiles.getChildren().length; i++) 
		{
			var beam = this.projectiles.getChildren()[i];
			beam.update(); //call the beam class update func
		}
	}

	movePlayerManager() 
	{
		this.player.setVelocity(0); //set velocity to null when nothing pressed
		//vertical
		if (this.cursorKeys.left.isDown) 
		{
			this.player.setVelocityX(-gameSettings.playerSpeed); //uses a set var from game.js
			//console.log("left");
		}else if (this.cursorKeys.right.isDown) 
		{
			this.player.setVelocityX(gameSettings.playerSpeed);
		}
		//horizontal
		if(this.cursorKeys.up.isDown)
		{
			this.player.setVelocityY(-gameSettings.playerSpeed);
		}else if(this.cursorKeys.down.isDown)
		{
			this.player.setVelocityY(gameSettings.playerSpeed);
		}
	}

	shootBeam() 
	{	//one way to do it
		//var beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");

		//another to inherit from the class Beam
		var beam = new Beam(this);
		console.log("Fire");
		this.beamSound.play();

	}
}