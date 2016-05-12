var express = require('express');
var path = require('path');
var https = require('https');
var fs = require('fs');
var app = express();

app.use('/public', express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});

var options = {
	key: fs.readFileSync('./server/https/key.pem'),
	cert: fs.readFileSync('./server/https/cert.pem')
};

https.createServer(options, app).listen(8080, function (err) {
	if (err) console.log(err);
	else console.log('Server listening...');
});

