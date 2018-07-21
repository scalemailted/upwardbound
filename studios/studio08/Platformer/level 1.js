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
	}
		
	create()
	{
		this.create_map();	
	}
		
	update()
	{
			
	}

	create_map()
	{
		var map_data = new Object();
		map_data.key = this.map_key;
		
		this.map = this.make.tilemap( map_data );
		
		var ground_tiles = this.map.addTilessetImage('tiles');
		this.ground_layer = this.map.createStaticLayer('tiles', ground_tiles)
	}
}