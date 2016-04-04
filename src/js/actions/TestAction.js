var Dispatcher = require('../dispatchers/Dispatcher');
var TestConstants = require('../constants/TestConstants');

var TestActions = {
	test: function (text) {
		console.log('dispatching');
		Dispatcher.dispatch({
			actionType: TestConstants.TEST_SUCCESS,
			data: text
		});
	}
};

module.exports = TestActions;
