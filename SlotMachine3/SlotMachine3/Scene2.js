// JavaScript source code

class Scene2 extends Phaser.Scene 
{
	constructor() {super("playGame");}

	create() 
	{
		//LOAD BACKGROUND IMAGE FIRST HERE

		//this.add.text(20, 20, "game loaded");
		
		//load background music
		this.music = this.sound.add("music");
		//music config
		var musicConfig = 
		{
			mute: false,
			volume:1,
			rate:1,
			detune:0,
			seek:0,
			loop:true,
			delay:0
		}
		this.music.play(musicConfig);

		//display game tokens
		this.tokenLabel = this.add.bitmapText(100, 20, "pixelFont", "Tokens Remaining: " + gameTokens, 32);

	}

	update() {

	}
}