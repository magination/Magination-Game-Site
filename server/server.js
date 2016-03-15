var express = require('express');
var jsx = require('node-jsx');
var app = express();

app.get('/', function(req,res){
	res.send('');
});

app.listen(8080, function(){
	console.log("Listening");
});