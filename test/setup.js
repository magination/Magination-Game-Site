var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>', {
	url: 'http://localhost:8080'
});
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
