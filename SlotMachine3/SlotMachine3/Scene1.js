// JavaScript source code

class Scene1 extends Phaser.Scene 
{

	constructor() {super("bootGame");}

	preload() 
	{
		//preload assets here
		this.load.audio("music", "assets/audio/music.mp3");
	}
	
	create() {
		this.add.text(20, 20, "Loading Game...");
		this.scene.start("playGame"); //call scene 2
	}
}