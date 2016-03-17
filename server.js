var express = require('express'),
	path = require('path');

var jsx = require('node-jsx');
var app = express();

app.use('/public', express.static(__dirname + '/build'));

require('./routes/router')(app);

app.listen(8080, function(){
	console.log("Listening");
});