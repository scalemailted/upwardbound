class Player extends Phaser.Physics.Arcade.Sprite
{
   constructor(scene)
	{
           super(scene, 200, 300, 'jimmy');
           this.depth = 1;
           this.speed = 400;
		   this.projectiles = [];
		   this.scene = scene;
		   this.last_fired = 0;

      	   scene.add.existing(this);
           scene.physics.add.existing(this);
		   this.setCollideWorldBounds(true);
           this.arrow_keys = scene.input.keyboard.addKeys('up,down,left,right,space');
	}

   move(){
	   
  	this.body.velocity.x = 0;
	this.body.velocity.y = 0;

	if ( this.arrow_keys.up.isDown)
        {
	     this.body.velocity.y = -this.speed;
        }
	if ( this.arrow_keys.down.isDown)
        {
             this.body.velocity.y = this.speed;
        }
	if ( this.arrow_keys.left.isDown)
        {
             this.body.velocity.x = -this.speed;
		}
	if (this.arrow_keys.right.isDown)
       	{	
            this.body.velocity.x = this.speed;
		}
   }	

	attack(time)
	{
		if (this.arrow_keys.space.isDown && time - this.last_fired > 400)
		{
			var position = new Object();
			position.x = this.x;
			position.y = this.y;
			
			var weapon = new Projectile(this.scene, position);
			this.projectiles.push(weapon);
			this.last_fired = time;
	    }
		if (this.arrow_keys.space.isUp)    
	    { 
           this.last_fired = 0;
	   }
	}
	
}
