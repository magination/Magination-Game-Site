var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
	loginSuccess: function(){
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_SUCCESS
		});
	},
	loginError: function(error){
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_ERROR,
			error: error
		});
	},
	logoutSuccess: function(){
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGOUT_SUCCESS
		});
	}
};

module.exports = LoginActions;