var Dispatcher = require('../dispatchers/Dispatcher');
var NavigationConstants = require('../constants/NavigationConstants');
var NavigationActions = {
	navigate: function(data){
		Dispatcher.dispatch({
			actionType: NavigationConstants.NAVIGATE,
			destination: data.destination
		});
	},
	setNextRedirect: function(data){
		Dispatcher.dispatch({
			actionType: NavigationConstants.SET_NEXT_REDIRECT,
			destination: data.destination
		});
	}
};

module.exports = NavigationActions;