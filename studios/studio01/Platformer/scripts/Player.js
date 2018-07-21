class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene)
	{
		super(scene, 0,0 ,'player');
		
		var start = scene.map.findObject('items', obj => obj.name === 'player');
		this.x = start.x;
		this.y = start.y;
		//console.log(this.x + " " + this.y)
		this.depth = 1;
		this.speed = 200;
		
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.arrow_keys = scene.input.keyboard.addKeys('up,left,right');
	}
	
	move()
	{
		if (this.body === undefined)
		{
			return 
		}
		
		this.body.velocity.x = 0;
		
		if(this.arrow_keys.up.isDown && (this.body.onFloor() || this.body.touching.down)		)
		{
			this.body.velocity.y = -this.speed * 2;
		}
		if (this.arrow_keys.left.isDown)
		{
			this.body.velocity.x = -this.speed;
			this.flipX = false;
		}
		if(this.arrow_keys.right.isDown)
		{
			this.body.velocity.x = this.speed;
			this.flipX = true;
	    }
	}		
}