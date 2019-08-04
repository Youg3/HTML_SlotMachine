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

		//add ships using the global config var to position the ships
		this.ship1 = this.add.sprite(config.width /2 - 50, config.height /2, "ship").setInteractive();
		this.ship2 = this.add.sprite(config.width /2, config.height /2, "ship2").setInteractive();
		this.ship3 = this.add.sprite(config.width /2 + 50, config.height /2, "ship3").setInteractive();

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

		this.add.text(20, 20, "Game loaded...", {font: "25px Arial", fill: "yellow"});

		this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
		this.player.play("thrust");
		this.cursorKeys = this.input.keyboard.createCursorKeys(); //var listener for keyboard event
		this.player.setCollideWorldBounds(true);

		//shoot
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		//group that holds all beam instances in game
		this.projectiles = this.add.group();
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

		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			this.shootBeam();
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

	}
}