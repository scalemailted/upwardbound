class PlayScene extends Phaser.Scene
{
	constructor()
	{
		super('play');
	}

	preload()
	{
		this.load.path = 'assets/';
		this.load.image('background', 'background.png');
		this.load.image('player','player.png');
		this.load.image('enemy','enemy.png');
		this.load.image('projectile', 'poop.png');
	}

	create()
	{
		this.create_map();
        this.player = new Player(this);	
		this.create_enemies();
		this.setup_physics();
	}

	update(time)
	{
		this.player.move();
		this.background.tilePositionX -= 3;
		this.player.attack(time);
	}
 
	create_map()
	{
		this.background = this.add.tileSprite(640/2, 480/2, 640, 480, 'background');
	}

	create_enemies()
	{
		this.enemies = [];
	
		var event = new Object();
		event.delay = 400;
		event.callback = this.spawn_enemy;
		event.callbackScope = this;
		event.loop = true;
		
		this.time.addEvent(event, this);
	}

	
	spawn_enemy()
	{
		var position = new Object();
		//position.x = Phaser.Math.Between(0,640);
		position.y = Phaser.Math.Between(0,480);
		position.x = 640;
		var monster = new Enemy(this, position);
		this.enemies.push(monster);
	}
	setup_physics()
	{
		this.physics.add.overlap(this.player, this.enemies, this.game_over, null, this);
		this.physics.add.overlap(this.player.projectiles, this.enemies, this.slay_enemy, null, this)
	}
	
	
	game_over()
	{
		this.scene.restart();
	}
	
	slay_enemy(projectile, enemy)
	{
		enemy.destroy();
		projectile.destroy();
	}
}