Stage(function(stage){

	stage.viewbox(50,50).pin('handle',-0.5);

	Stage.image('x').appendTo(stage).pin('handle',0.5);

	stage.on('click',function(){ 		// Mouse-Click : stage
		console.log("MouseClicked"); 
	});

});

Stage({
	textures : {
		'x' : Stage.canvas(function(ctx){
			ratio = 10 ; 
			this.size(10,10,ratio);
			ctx.scale(ratio,ratio);

			ctx.moveTo(0,0);
			ctx.lineTo(10,10);
			ctx.moveTo(10,0);
			ctx.lineTo(0,10);

			ctx.lineWidth = 1;
			ctx.stroke();
		})
	}
});
