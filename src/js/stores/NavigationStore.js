import Dispatcher from '../dispatchers/Dispatcher';
import NavigationConstants from '../constants/NavigationConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LoginStore from '../stores/LoginStore';
const CHANGE_EVENT = 'change-login';

var _navigationState = {
	lastPath: '/',
	currentPath: '/',
	data: null
};

function pushDestination (destination) {
	/*
	setTimeout is used as an alternative to setImmediate (which is not directly supported by all browsers).
	The dispatcher doesn't allow dispatching while a dispatch-event is in progress (due to data consistency
	in stores).
	By using setTimeout, browserHistory.push() will happen in the next eventloop iteration.
	*/
	setTimeout(function () {
		_navigationState.lastPath = _navigationState.currentPath;
		_navigationState.currentPath = destination;
		browserHistory.push(destination);
		NavigationStore.emitChange();
	}, 0);
}

/*
	This function checks if the previous page is a page that should be accessible to logged in users. If it is for example register or confirmation, it should
	be overridden. The list of overridden elements is located in NavigationConstants. Default is also located in NavigationConstants
*/

var NavigationStore = _.extend({}, EventEmitter.prototype, {
	getNavigationState: function () {
		return _navigationState;
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

NavigationStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case NavigationConstants.NAVIGATE:
		_navigationState.data = action.navigationData;
		pushDestination(action.destination);
		// NavigationStore.emitChange();
		break;
	case NavigationConstants.NAVIGATE_PREVIOUS:
		if (NavigationConstants.isLegalDestination(LoginStore.getLoginState().isLoggedIn, _navigationState.lastPath)) {
			console.error('BACK NOT IMPLMENTED');
		}
	// NavigationStore.emitChange();
		break;
	case NavigationConstants.SET_CURRENT_PATH:
	// _navigationState.redirectPath = _navigationState.currentPath;
		_navigationState.currentPath = action.destination;
		NavigationStore.emitChange();
		break;
	}
});

module.exports = NavigationStore;
