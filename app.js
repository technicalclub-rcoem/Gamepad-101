Stage(function(stage){
	Tiles = [];
	turn = 1;

	stage.viewbox(50,50).pin('handle',-0.5);

	
	createTileGrid = function(obj){
		var space = Stage.image('bg').appendTo(stage).pin('handle',0.5);
		space.pin({
			offsetX : obj.i *10,
			offsetY : obj.j *10
		});

		var tile = Stage.image('-').appendTo(stage).pin('handle',0.5);
		tile.pin({
			offsetX : obj.i *10,
			offsetY : obj.j *10
		});

		tile.on('click',function(){ 		// Mouse-Click : stage
			console.log("MouseClicked");
			if(turn == 1){
				this.image('x');
				turn = 2 ;
			}
			else{
				this.image('o');
				turn = 1 ; 
			}

		});
	}

	for(var i=-1;i<=1;i++){
		Tiles[i]=[];
		for(var j=-1;j<=1;j++){
			tile = Tiles[i][j]={
				i:i,
				j:j
			};

			createTileGrid(tile);
		}
	}
});

Stage({
	textures : {
		'bg' : Stage.canvas(function(ctx){
			ratio = 10 ; 
			this.size(10,10,ratio);
			ctx.scale(ratio,ratio);

			ctx.moveTo(0,0);
			ctx.lineTo(0,10);
			ctx.moveTo(0,10);
			ctx.lineTo(10,10);
			ctx.moveTo(10,10);
			ctx.lineTo(10,0);
			ctx.moveTo(10,0);
			ctx.lineTo(0,0);

			ctx.lineWidth = 1;
			ctx.stroke();
		}),
		'x' : Stage.canvas(function(ctx){
			ratio = 10 ; 
			this.size(10,10,ratio);
			ctx.scale(ratio,ratio);

			ctx.moveTo(2,2);
			ctx.lineTo(8,8);
			ctx.moveTo(8,2);
			ctx.lineTo(2,8);

			ctx.lineWidth = 1;
			ctx.stroke();
		}),
		'o' : Stage.canvas(function(ctx){
			ratio = 10 ; 
			this.size(10,10,ratio);
			ctx.scale(ratio,ratio);
			ctx.arc(5,5,3.5,0,2*Math.PI);

			ctx.lineWidth = 1;
			ctx.stroke();
		}),
		'-' : Stage.canvas(function(ctx){
			ratio =10;
			this.size(10,10);
			ctx.scale(ratio,ratio);
		})
	}
});
