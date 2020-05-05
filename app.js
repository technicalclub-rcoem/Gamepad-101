Stage(function(stage){

	stage.viewbox(50,50).pin('handle',-0.5);

	stage.on('click',function(){ 		// Mouse-Click : stage
		console.log("MouseClicked"); 
	});

});

