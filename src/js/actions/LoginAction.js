var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var FeedbackAction = require('./FeedbackAction');
var Cookie = require('react-cookie');
var URLS = require('../config/config').urls;

var LoginAction = {
	doLogin: function (username, password) {
		LoginService.doLogin(username, password, this.loginSuccess);
	},
	checkAutoLogin: function () {
		LoginService.checkAutoLogin();
	},
	loginSuccess: function (data) {
		if (data.token === undefined || data.token === null || data.tokenExpires === undefined || data.tokenExpires === null) {
			alert('Weird error with cookie');
			// loginError();
			return;
		}
		var d = new Date(data.tokenExpires);
		Cookie.save(LoginConstants.COOKIE_TOKEN, data.token, {expires: d, path: '/'});
		Cookie.save(LoginConstants.COOKIE_ID, data.id, {expires: d, path: '/'});

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

function onLoginUnauthorizedResponse (data) {
	FeedbackAction.displayWarningMessage({
		header: 'Wrong credentials!',
		message: 'The username/password combination is not recognized'
	});
};
function onLoginNotFoundResponse (data) {
	FeedbackAction.displayErrorMessage({
		header: 'No connection!',
		message: 'It seems you do not have a connection to the login server, are you sure you are connected to the internet?'
	});
};
function onGetUserUnauthorizedResponse (data) {
	alert('Error: see console');
	console.log(data);
};
function onGetUserSuccessResponse (data) {
	LoginAction.setLoginProfile({
		profile: data
	});
	// NavigationAction.navigateToPrevious();
	FeedbackAction.displaySuccessMessage({
		header: 'Login Successful!',
		message: 'You are now logged in as ' + data.email
	});
};
function onLoginSuccessResponse (data) {
	LoginAction.loginSuccess({
		token: data.token,
		tokenExpires: data.expiresIn,
		id: data.id
	});
	$.ajax({
		type: 'GET',
		url: URLS.api.users + '/' + data.id,
		dataType: 'json',
		headers: {
			'Authorization': data.token
		},
		statusCode: {
			200: onGetUserSuccessResponse,
			401: onGetUserUnauthorizedResponse,
			500: function () {
				alert('Server Error: see console');
				console.log(data);
			}
		}
	});
};
var LoginService = {
	doLogin: function (username, password) {
		$.ajax({
			type: 'POST',
			url: URLS.api.login,
			data: JSON.stringify({
				username: username,
				password: password
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: onLoginSuccessResponse,
				401: onLoginUnauthorizedResponse,
				404: onLoginNotFoundResponse
			}
		});
	},
	checkAutoLogin: function () {
		var token = Cookie.load(LoginConstants.COOKIE_TOKEN);
		if (token) {
			this.doLoginWithToken(token);
		}
	},
	doLoginWithToken: function (token) {
		$.ajax({
			type: 'GET',
			url: URLS.api.login + '/refresh',
			headers: {
				'Authorization': token
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: onLoginSuccessResponse,
				401: onLoginUnauthorizedResponse,
				404: onLoginNotFoundResponse
			}
		});
	}
};

module.exports = LoginAction;
