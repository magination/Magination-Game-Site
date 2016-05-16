/* globals describe before it */

// require('./testdom')('<html><body></body></html>'); MARK: this happens in mocha init instead
var React = require('react'); // eslint-disable-line no-unused-vars
var assert = require('assert');
var fs = require('fs');
var path = require('path');

/*
	LIST OF COMPONENTS THAT ARE TESTED:

	FLUX STRUCTURES:

	COMPONENTS TESTED SHALLOW: (Should test in ascending hierarchy, small components first, large last to quicker localize bugs)
		ATOMS:
		MOLECULES:
		ORGANISMS:
*/

describe('Flux Constants: ', function () {
	var files = [];
	var fluxConstantsPath = (path.join(__dirname, '../src/js/constants/'));
	before('Finding constant files', function () {
		files = fs.readdirSync(fluxConstantsPath);
	});
	it('Looking for duplicate event constants', function () {
		var constants = [];
		assert(files.every(function (file) {
			var fileConstants = require(fluxConstantsPath + file);
			for (var property in fileConstants) {
				if (constants.indexOf(fileConstants[property]) > -1) {
					throw new Error(file + ' property "' + property + '" has the value "' + fileConstants[property] + '"\n' +
						'\tThe same property value was found in ' + findFirstFileWithValue(fileConstants[property], files));
					// return false;
				}
				constants.push(fileConstants[property]);
			}
			return true;
		}));
	});
});

function findFirstFileWithValue (propertyValue, files) {
	var fluxConstantsPath = (path.join(__dirname, '../src/js/constants/'));
	for (var i = 0; i < files.length; i++) {
		var fileConstants = require(fluxConstantsPath + files[i]);
		for (var property in fileConstants) {
			if (fileConstants[property] === propertyValue) {
				return files[i] + ' property "' + property + '"';
			}
		}
	}
}
