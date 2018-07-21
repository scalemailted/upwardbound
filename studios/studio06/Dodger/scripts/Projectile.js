class Projectile extends Phaser.Physics.Arcade.Sprite
{
   constructor(scene, position)
   {
       super(scene, position.x, position.y, 'projectile')
	   this.depth = 0;
	   
	   scene.add.existing(this);
	   scene.physics.add.existing(this);
	   this.body.velocity.y = -300;
	   
	}
} 