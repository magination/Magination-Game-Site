import Dispatcher from '../dispatchers/Dispatcher';
import NavigationConstants from '../constants/NavigationConstants';
const NavigationActions = {
	navigate: function (data) {
		Dispatcher.dispatch({
			actionType: NavigationConstants.NAVIGATE,
			destination: data.destination,
			navigationData: data.data
		});
	},
	navigateToPrevious: function (data) {
		Dispatcher.dispatch({
			actionType: NavigationConstants.NAVIGATE_PREVIOUS
		});
	},
	setCurrentPath: function (data) {
		Dispatcher.dispatch({
			actionType: NavigationConstants.SET_CURRENT_PATH,
			destination: data.destination
		});
	}
};

module.exports = NavigationActions;
