/* globals describe before it */
// require('./testdom')('<html><body></body></html>');
var React = require('react');
var assert = require('assert');
var ReactRouter = require('../src/js/ReactRouter');
var TestUtils = require('react-addons-test-utils');

describe('Rendering component', function () {
	before('Render the app', function () {
		var renderedComponent = TestUtils.renderIntoDocument(
			<ReactRouter />
		);
		var routerComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'container')[0];
		this.routerComponent = routerComponent;
	});
	it('react-container-attached', function () {
		assert(this.routerComponent !== undefined);
	});
});
