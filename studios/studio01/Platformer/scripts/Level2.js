class Level2 extends Level1
{
	constructor()
	{
		super('Level2');
		this.map_key='map2';
		this.map_json='level2.json';
	}
	
	
	create_objects()
	{
		var falling_image = new Object();
		falling_image.key = 'tileMap';
		falling_image.frame = 5;
		this.group_falling = this.map.createFromObjects('items','falling-brick',falling_image);
		this.setup_objects(this.group_falling);
		
		var deadly1_image = new Object();
		deadly1_image.key = 'itemMap'
		deadly1_image.frame = 4;
		this.group_deadly1 = this.map.createFromObjects('items','hotsauce',deadly1_image);
		this.setup_objects(this.group_deadly1);
		
		var deadly2_image = new Object();
		deadly2_image.key = 'itemMap'
		deadly2_image.frame = 5;
		this.group_deadly2 = this.map.createFromObjects('items','hot',deadly2_image);
		this.setup_objects(this.group_deadly2);
		
		var collectables = new Object();
		collectables.key = 'itemMap'
		collectables.frame = 0;
		this.group_coins = this.map.createFromObjects('items','money',collectables);
		this.setup_objects(this.group_coins);
		
		var exit=new Object();
		exit.key = 'itemMap'
		exit.frame = 6;
		this.goal=this.map.createFromObjects('items','exit',exit);
		this.setup_objects(this.goal);
	}
	
	next_scene(player,exit) 
	{
		this.scene.start('Level3');
	}
	
}