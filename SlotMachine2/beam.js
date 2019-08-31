// extend class sprite with this class

class Beam extends Phaser.GameObjects.Sprite
{
	constructor(scene) 
	{
		//get position of ship
		var x = scene.player.x;
		var y = scene.player.y;

		//pass same param to father using super
		super(scene, x, y, "beam");
		//add to scene
		scene.add.existing(this);

		//play animation, move forward, physics
		this.play("beam_anim");
		scene.physics.world.enableBody(this);
		this.body.velocity.y = - 250;
		scene.projectiles.add(this); //add the Game Object to group

	}

	update() 
	{	//remove beam from game once off screen
		if (this.y < 32) {
			this.destroy();
		}
	}
}
