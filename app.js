Stage(function(stage){
	var Tiles = [];
	var turn = 1;
	var filled = 0;
	var run = 0;

	//Creating a viewbox
	stage.viewbox(50,50).pin('handle',-0.5);
	
	// The '#'  texture loaded  --- see bottom of the page
	var space = Stage.image('bg0').appendTo(stage).pin('handle',0.5);		

	// the placeholder of the 'o' or 'x' wins result
	var resulttile = Stage.image('-').appendTo(stage).pin({handle: 0.5, offsetY :-20});

	
	//This method created one placeholder{TILE} for moves in the desired position
	createTileGrid = function(obj){
		
		var tile = Stage.image(obj.sign).appendTo(stage).pin('handle',0.5);
	
		tile.pin({
			offsetX : obj.i *10,
			offsetY : obj.j *10
		});

		tile.i = obj.i;						//Position assigned on grid
		tile.j = obj.j;
		tile.sign = obj.sign;
		
		
		tile.on('click',function(){ 		// adding the event to the tile click
			console.log("MouseClicked : i ="+tile.i+" , j="+tile.j+" , sign = "+tile.sign);
			console.log("filled",filled);
			if(filled>=9){
					filled=0;
					restart(run);
				}
			if(tile.sign == '-'){
				if(turn == 1){
					this.image('x');
					turn = 2 ;
					tile.sign = 'x';
				}
				else{
					this.image('o');
					turn = 1 ; 
					tile.sign = 'o';
				}
				Tiles[obj.i][obj.j]=tile;

				filled++;
				check();
			}

		});
		
		//Enlarges the texture it holds
		tile.enlarge = function(){
			tile.tween(200).pin({
			alpha : 1,
		    	scale : 1.2,
		});
		}

		//removes this tile from the stage
		tile.removetile = function(){
			stage.remove(tile);
		}

		//Assign every detail to global list of tiles >> Tiles[][]
		Tiles[obj.i][obj.j]=tile;

	}

	end_update = function(winmark){
		resulttile.image(winmark);
		filled=9;
	}

	// Check if the game has reached to a winning condition
	check = function(){
		if(Tiles[-1][-1].sign == Tiles[-1][0].sign && Tiles[-1][0].sign == Tiles[-1][1].sign && Tiles[-1][1].sign != '-'){
			end_update(Tiles[-1][-1].sign);
			Tiles[-1][-1].enlarge();
			Tiles[-1][0].enlarge();
			Tiles[-1][1].enlarge();
		}
		else if(Tiles[0][-1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[0][1].sign && Tiles[0][1].sign != '-'){
			end_update(Tiles[0][-1].sign);
			Tiles[0][-1].enlarge();
			Tiles[0][0].enlarge();
			Tiles[0][1].enlarge();
		}
		else if(Tiles[1][-1].sign == Tiles[1][0].sign && Tiles[1][0].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			end_update(Tiles[1][-1].sign);
			Tiles[1][-1].enlarge();
			Tiles[1][0].enlarge();
			Tiles[1][1].enlarge();
		}

		else if(Tiles[-1][-1].sign == Tiles[0][-1].sign && Tiles[0][-1].sign == Tiles[1][-1].sign && Tiles[1][-1].sign != '-'){
			end_update(Tiles[-1][-1].sign);
			Tiles[-1][-1].enlarge();
			Tiles[0][-1].enlarge();
			Tiles[1][-1].enlarge();
		}
		else if(Tiles[-1][0].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][0].sign && Tiles[1][0].sign != '-'){
			end_update(Tiles[-1][0].sign);
			Tiles[-1][0].enlarge();
			Tiles[0][0].enlarge();
			Tiles[1][0].enlarge();
		}
		else if(Tiles[-1][1].sign == Tiles[0][1].sign && Tiles[0][1].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			end_update(Tiles[-1][1].sign);
			Tiles[-1][1].enlarge();
			Tiles[0][1].enlarge();
			Tiles[1][1].enlarge();
		}

		else if(Tiles[-1][-1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			end_update(Tiles[-1][-1].sign);
			Tiles[-1][-1].enlarge();
			Tiles[0][0].enlarge();
			Tiles[1][1].enlarge();
		}
		else if(Tiles[-1][1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][-1].sign && Tiles[1][-1].sign != '-'){
			end_update(Tiles[-1][1].sign);
			Tiles[-1][1].enlarge();
			Tiles[0][0].enlarge();
			Tiles[1][-1].enlarge();
		}

		else if(filled==9){
			console.log("draw");
			filled = 9 ;
		}

	}

	show = function(pos){
		Tiles[0][0].enlarge();

	}


	//restart the game by removing and readding the tiles
	restart = function(restart){
		turn=1;
		
		//Because first run is always a start and not a restart
		if(run>0){	


			for(var i=-1;i<=1;i++){
				for(var j=-1;j<=1;j++){
					Tiles[i][j].removetile();
				}
			}

			console.log("cleared");
		}
		
		// the tiles in 3x3 grid and initialize with sign '-'
		for(var i=-1;i<=1;i++){
			Tiles[i]=[];
			for(var j=-1;j<=1;j++){
				
				tile ={
					i:i,
					j:j,
					sign : '-'
				};
				createTileGrid(tile);

			}
		}
		run++;
	}

	//entry point in the game
	restart(run);

});

//Holds all the textures in this game
Stage({
	textures : {
		'bg0' : Stage.canvas(function(ctx) {
	      var ratio = 20;
	      this.size(30, 30, ratio);
	      ctx.scale(ratio, ratio);
	      ctx.moveTo(10, 1);
	      ctx.lineTo(10, 29);
	      ctx.moveTo(20, 1);
	      ctx.lineTo(20, 29);
	      ctx.moveTo(1, 10);
	      ctx.lineTo(29, 10);
	      ctx.moveTo(1, 20);
	      ctx.lineTo(29, 20);
	      ctx.lineWidth = 0.3;
	      ctx.lineCap = 'round';
	      ctx.strokeStyle = '#999';
	      ctx.stroke();
	    }),
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

			ctx.lineWidth = 0.5 ;
			ctx.strokeStyle = "#555";
			ctx.stroke();
		}),
		'o' : Stage.canvas(function(ctx){
			ratio = 10 ; 
			this.size(10,10,ratio);
			ctx.scale(ratio,ratio);
			ctx.arc(5,5,3,0,2*Math.PI);
			ctx.strokeStyle = "#555";

			ctx.lineWidth = 0.5;
			ctx.stroke();
		}),
		'-' : Stage.canvas(function(ctx){
			ratio =10;
			this.size(10,10);
			ctx.scale(ratio,ratio);
		})
	}
});
