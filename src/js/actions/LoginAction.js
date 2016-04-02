var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var Cookie = require('react-cookie');
var LoginActions = {
	loginSuccess: function(data){
		if(data.token == undefined || data.token == null){
			alert('Weird error with cookie');
			//loginError();
			return;
		}
		Cookie.save(LoginConstants.COOKIE_TOKEN, data.token);
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_SUCCESS,
			token: data.token
		});
	},
	logoutSuccess: function(){
		Cookie.remove(LoginConstants.COOKIE_TOKEN);
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGOUT_SUCCESS
		});
	},
	setLoginProfile: function(data){
		Dispatcher.dispatch({
			actionType: LoginConstants.SET_PROFILE,
			profile: data.profile
		});
	}
};

module.exports = LoginActions;