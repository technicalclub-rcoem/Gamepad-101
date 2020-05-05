Stage(function(stage){
	var Tiles = [];
	var turn = 1;
	var filled = 0;
	var run = 0;

	stage.viewbox(50,50).pin('handle',-0.5);
	var space = Stage.image('bg0').appendTo(stage).pin('handle',0.5);		

	
	createTileGrid = function(obj){
		
		var tile = Stage.image(obj.sign).appendTo(stage).pin('handle',0.5);
	
		tile.pin({
			offsetX : obj.i *10,
			offsetY : obj.j *10
		});

		tile.i = obj.i;						//Position assigned on grid
		tile.j = obj.j;
		tile.sign = obj.sign;
		Tiles[obj.i][obj.j]=tile;

		tile.on('click',function(){ 		// Mouse-Click : stage
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
	}


	check = function(){
		if(Tiles[-1][-1].sign == Tiles[-1][0].sign && Tiles[-1][0].sign == Tiles[-1][1].sign && Tiles[-1][1].sign != '-'){
			console.log(Tiles[-1][-1].sign, " wins");
		}
		else if(Tiles[0][-1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[0][1].sign && Tiles[0][1].sign != '-'){
			console.log(Tiles[0][-1].sign, " wins");
		}
		else if(Tiles[1][-1].sign == Tiles[1][0].sign && Tiles[1][0].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			console.log(Tiles[1][-1].sign, " wins");
		}

		else if(Tiles[-1][-1].sign == Tiles[0][-1].sign && Tiles[0][-1].sign == Tiles[1][-1].sign && Tiles[1][-1].sign != '-'){
			console.log(Tiles[-1][-1].sign, " wins");
		}
		else if(Tiles[-1][0].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][0].sign && Tiles[1][0].sign != '-'){
			console.log(Tiles[-1][0].sign, " wins");
		}
		else if(Tiles[-1][1].sign == Tiles[0][1].sign && Tiles[0][1].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			console.log(Tiles[-1][1].sign, " wins");
		}

		else if(Tiles[-1][-1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][1].sign && Tiles[1][1].sign != '-'){
			console.log(Tiles[-1][-1].sign, " wins");
		}
		else if(Tiles[-1][1].sign == Tiles[0][0].sign && Tiles[0][0].sign == Tiles[1][-1].sign && Tiles[1][-1].sign != '-'){
			console.log(Tiles[-1][1].sign, " wins");
		}

		else if(filled==9){
			console.log("draw");
		}

	}



	restart = function(restart){
		
		if(run>0){			
			stage.remove(Tiles[-1][-1]);
			stage.remove(Tiles[-1][0]);
			stage.remove(Tiles[-1][1]);
			stage.remove(Tiles[0][-1]);
			stage.remove(Tiles[0][0]);
			stage.remove(Tiles[0][1]);
			stage.remove(Tiles[1][-1]);
			stage.remove(Tiles[1][0]);
			stage.remove(Tiles[1][1]);
			console.log("cleared");
		}
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


	restart(run);

});

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
