var renderImage = {
	canvas: document.getElementById("draganddropcanvas");
	context: canvas.getContext("2d"),	
	staticObjects: [],
	renderLayers: []
};

function addObject(obj){
	renderLayers[obj.layer].push(obj);
}
var render = function(){
	renderImage.context.clearRect(0,0,renderImage.canvas.width,renderImage.canvas.height);
	renderLayers.forEach(function(layer){
		layer.forEach(function(obj){
			renderImage.context.fillStyle = "#FF0000";
			renderImage.context.fillRect(obj.x,obj.y,obj.width,obj.height);
		});
	});
}

addObject({
	x: 0,
	y: 0,
	height: 100,
	width: 100,
	layer: 0
});
setInterval(render, 100);