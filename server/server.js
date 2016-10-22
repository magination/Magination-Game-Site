var express = require('express');
var path = require('path');
var app = express();
var ua = require('universal-analytics');
var visitor = ua('UA-44245810-5');

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/public', express.static(path.join(__dirname, '../build')));

app.get('/analytics', function(req, res) {
	visitor.pageview(req.query.path).send();
})

app.get

app.get('*', function (req, res) {
	visitor.pageview(req.path).send();
	res.sendFile('index.html', { root: path.join(__dirname, '../src') });
});

var port = 3004;
app.listen(port, function (err) {
	if (err) console.log(err);
	else console.log('Server listening on port: ' + port);
});
