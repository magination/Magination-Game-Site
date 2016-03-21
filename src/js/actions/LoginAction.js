var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var Cookie = require('react-cookie');
var LoginActions = {
	loginSuccess: function(cookie){
		if(cookie == undefined || cookie == null){
			alert('Weird error with cookie');
			loginError();
			return;
		}
		Cookie.save(LoginConstants.COOKIE_TOKEN, cookie.value);
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
		Cookie.remove(LoginConstants.COOKIE_TOKEN);
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGOUT_SUCCESS
		});
	},
};

module.exports = LoginActions;