module.exports = function(app){

	app.get('/', function(req,res){
		res.sendFile('index.html', { root: path.join(__dirname, './src') 
	});

};