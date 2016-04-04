var express = require('express');
var path = require('path');

var app = express();

app.use('/public', express.static(path.join(__dirname, '../build')));

var possiblePaths = ['/', '/browse', '/login', '/upload', '/confirmation/:id'];
app.get(possiblePaths, function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});

app.listen(8080, function () {
	console.log('Listening');
});
