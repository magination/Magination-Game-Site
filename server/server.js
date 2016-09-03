var express = require('express');
var path = require('path');
var https = require('https');
var fs = require('fs');
var app = express();

app.use('/public', express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});

app.listen(8080, function() {
	console.log('Running on port:8080');
});
