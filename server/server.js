var express = require('express'),
	path = require('path');

var jsx = require('node-jsx');
var app = express();

app.use('/public', express.static(path.join(__dirname, '../build')));

var possiblePaths = ['/', '/browse', '/login', '/upload'];
app.get(possiblePaths, function(req,res){
	res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});

app.listen(8080, function(){ 
	console.log("Listening");
});