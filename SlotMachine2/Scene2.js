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
		this.anims.create({
			key: "explode",
			frames: this.anims.generateFrameNumbers("explosion"),
			frameRate: 20,
			repeat: 0, //doesn't repeat unless called
			hideOnComplete: true
		});
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
			repeat: -1,
		});

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
	}

}