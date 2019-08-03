// JavaScript source code

class Scene2 extends Phaser.Scene 
{
	constructor() 
	{
		super("playGame");
	}

	create() 
	{
		//set background
		this.background = this.add.image(0, 0, "background");
		this.background.setOrigin(0, 0); //reset background origin point to top left from centre

		//add ships using the global config var to position the ships
		this.ships1 = this.add.image(config.width /2 - 50, config.height /2, "ship");
		this.ships2 = this.add.image(config.width /2, config.height /2, "ship2");
		this.ships3 = this.add.image(config.width /2 + 50, config.height /2, "ship3");


		this.add.text(20, 20, "Game loaded...", {font: "25px Arial", fill: "yellow"});
	}

}