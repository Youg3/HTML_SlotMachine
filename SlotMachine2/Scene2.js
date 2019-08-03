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
		this.ships1 = this.add.image(config.width /2 - 50, config.height /2, "ship");
		this.ships2 = this.add.image(config.width /2, config.height /2, "ship2");
		this.ships3 = this.add.image(config.width /2 + 50, config.height /2, "ship3");


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

	update() {
		this.moveShip(this.ships1, 1);
		this.moveShip(this.ships2, 2);
		this.moveShip(this.ships3, 3);

		//decrease Y position of the background texture map so it scrolls down
		this.background.tilePositionY -= 0.5;
	}

}