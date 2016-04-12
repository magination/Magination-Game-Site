var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var Cookie = require('react-cookie');
var LoginActions = {
	checkAutoLogin: function () {
		var token = Cookie.load(LoginConstants.COOKIE_TOKEN);
		var id = Cookie.load(LoginConstants.COOKIE_ID);
		if (token !== undefined && token && id !== undefined && id) {
			console.log(token);
			console.log(id);
		}
	},
	loginSuccess: function (data) {
		if (data.token === undefined || data.token === null || data.tokenExpires === undefined || data.tokenExpires === null) {
			alert('Weird error with cookie');
			// loginError();
			return;
		}
		// console.log(data.tokenExpires);
		// Cookie.save(LoginConstants.COOKIE_TOKEN, data.token, {expires: data.tokenExpires});
		// {expires: data.tokenExpires}
		Cookie.save(LoginConstants.COOKIE_ID, data.id);

		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_SUCCESS,
			token: data.token
		});
	},
	logoutSuccess: function () {
		Cookie.remove(LoginConstants.COOKIE_TOKEN);
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGOUT_SUCCESS
		});
	},
	setLoginProfile: function (data) {
		Dispatcher.dispatch({
			actionType: LoginConstants.SET_PROFILE,
			profile: data.profile
		});
	}
};

module.exports = LoginActions;
