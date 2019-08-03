// JavaScript source code

class Scene1 extends Phaser.Scene 
{
	constructor() //function to inherit all chara from Class Scene in Phaser
	{
		super("bootGame");
	}

	preload() 
	{
		this.load.image("background", "assets/background.png");
		this.load.image("ship", "assets/ship.png");
		this.load.image("ship3", "assets/ship3.png");
		this.load.image("ship2", "assets/ship2.png");
	}

	create() 
	{
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame"); //calls Scene2
	}

}

