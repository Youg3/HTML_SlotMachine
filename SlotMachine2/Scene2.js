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

		this.add.text(20, 20, "Game loaded...", {font: "25px Arial", fill: "yellow"});
	}

}