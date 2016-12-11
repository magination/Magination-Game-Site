import Dispatcher from '../dispatchers/Dispatcher';
import TestConstants from '../constants/TestConstants';

const TestActions = {
	test: function (text) {
		console.log('dispatching');
		Dispatcher.dispatch({
			actionType: TestConstants.TEST_SUCCESS,
			data: text
		});
	}
};

module.exports = TestActions;
