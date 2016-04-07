/* globals describe before it */

// require('./testdom')('<html><body></body></html>'); MARK: this happens in mocha init instead
var React = require('react'); // eslint-disable-line no-unused-vars
var assert = require('assert');
var ReactRouter = require('../src/js/ReactRouter');
var ListElement = require('../src/js/components/atoms/ListLinkElement.atom');
var TestUtils = require('react-addons-test-utils');

var shallowRenderer = TestUtils.createRenderer();

/*
	LIST OF COMPONENTS THAT ARE TESTED:

	FLUX STRUCTURES:

	COMPONENTS TESTED SHALLOW: (Should test in ascending hierarchy, small components first, large last to quicker localize bugs)
		ATOMS:
		MOLECULES:
		ORGANISMS:
*/

describe('General', function () {
	before('Rendering Components', function () {
		var renderedComponent = TestUtils.renderIntoDocument(
			<ReactRouter />
		);
		var routerComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'container')[0];
		this.routerComponent = routerComponent;
	});
	it('React container must not be undefined, will mean it mounted', function () {
		assert(this.routerComponent !== undefined);
	});
});

describe('Navigation', function () {
	before('Rendering Components', function () {
		var renderedComponent = TestUtils.renderIntoDocument(<ReactRouter />);

		var navbarComponent = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'nav')[0];
		this.navbarComponent = navbarComponent;
	});
	it('Navbar component exists', function () {
		assert(this.navbarComponent !== undefined);
	});
});

describe('ListLinkElement(shallow)', function () {
	before('Rendering Components', function () {
	});
	shallowRenderer.render(React.createElement(ListElement));
	var LinkListElement = shallowRenderer.getRenderOutput();
	it('ListLinkElement should be of type <li>, it is used in a listing environment', function () {
		assert(LinkListElement.type === 'li');
	});
});
