import Dispatcher from '../dispatchers/Dispatcher';
import TestConstants from '../constants/TestConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change-test';

let _feedback = 'default';

var TestStore = _.extend({}, EventEmitter.prototype, {
	getFeedback: function () {
		return _feedback;
	},
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

TestStore.dispatchToken = Dispatcher.register(function (action) {
	console.log('in dispatcher');
	switch (action.actionType) {
	case TestConstants.TEST_SUCCESS:
		_feedback = action.data;
		TestStore.emitChange();
		break;
	case TestConstants.TEST_ERROR:
		_feedback = action.error;
		TestStore.emitChange();
		break;
	}
});

module.exports = TestStore;
