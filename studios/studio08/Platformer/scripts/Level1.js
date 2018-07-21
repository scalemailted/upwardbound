class Level1 extends Phaser.Scene
{
	constructor(name='Level1')
	{
		super(name);
		this.map_key = 'map1';
		this.map_json = 'level1.json';
	}
		
	preload()
	{
		this.load.path = 'assets/';	
		this.load.tilemapTiledJSON(this.map_key, this.map_json);
		this.load.image('tiles', 'tiles.png');
		this.load.image('player', 'player.png');
		
		var tile_size = new Object();
		tile_size.frameWidth = 32;
		tile_size.frameHeight = 32;
		this.load.spritesheet('itemMap', 'items.png',tile_size);
		this.load.spritesheet('tileMap', 'tiles.png', tile_size);
	}
		
	create()
	{
		this.create_map();	

		this.player = new Player (this);
		this.create_objects();
		this.setup_physics();
		this.setup_camera();
	}
		
	update()
	{
		this.player.move();
		this.game_over();
	}

	create_map()
	{
		var map_data = new Object();
		map_data.key = this.map_key;
		
		this.map = this.make.tilemap( map_data );
		
		var ground_tiles = this.map.addTilesetImage('tiles');
		this.ground_layer = this.map.createStaticLayer('tiles', ground_tiles);
		this.ground_layer.setCollisionByProperty({terrain:['block']});
	}
	
	setup_physics()
	{
		this.physics.world.gravity.y = 600;
		this.physics.add.collider(this.player,this.ground_layer);
		this.physics.add.collider(this.player, this.group_falling, this.add_gravity, null, this);
		this.physics.add.overlap(this.player, this.group_deadly1, this.game_over, null, this);
		this.physics.add.overlap(this.player,this.group_coins,this.coin_take,null,this);
		this.physics.add.overlap(this.player,this.goal,this.next_scene,null,this);
	}
	setup_camera()
	{
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setBounds(0,0, this.map.widthInPixels,this.map.heightInPixels);
		this.cameras.main.setBackgroundColor('rgb(0, 172, 230)')
			
	}
	game_over(player=null, hazard=null)
	{
		if(this.player.y>this.map.heightInPixels)
		{
			this.scene.restart();
		}
		if (hazard !==null)
		{
			this.scene.restart();
		}	
		
	}

	create_objects()
	{
		var falling_image = new Object();
		falling_image.key = 'tileMap';
		falling_image.frame = 1;
		this.group_falling = this.map.createFromObjects('items','falling-bricks',falling_image);0
		this.setup_objects(this.group_falling);

        var deadly1_image = new Object();		
		deadly1_image.key = 'itemMap';
		deadly1_image.frame = 5
		this.group_deadly1 = this.map.createFromObjects('items', 'bomb', deadly1_image);
		this.setup_objects(this.group_deadly1);
		
		var collectables = new Object ();
		collectables.key = 'itemMap';
		collectables.frame = 6;
		this.group_coins =this.map.createFromObjects('items', 'coin',collectables);
		this.setup_objects(this.group_coins);
		
		var exit = new Object();
		exit.key = 'itemMap';
		exit.frame =3;
		this.goal=this.map.createFromObjects('items', 'exit' ,exit);
		this.setup_objects(this.goal);
	}
	
	setup_objects(obj_group)
	
	{
			for (var obj of obj_group)
		{ 
			this.physics.add.existing(obj);
			obj.body.immovable = true;
			obj.body.allowGravity = false;
		}	
	}
					
	add_gravity(player, hazard)
	{
		hazard.body.gravity.y = -1;
		hazard.body.allowGravity = true;
	}
	coin_take(player,coin)
	{
		coin.destroy();
	}
	next_scene()
	{
		this.scene.start('Level2');
	}
}	
		
		