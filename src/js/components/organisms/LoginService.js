var LoginAction = require('../../actions/LoginAction');
var NavigationAction = require('../../actions/NavigationAction');
var FeedbackAction = require('../../actions/FeedbackAction');
var URLS = require('../../config/config').urls;
var Cookie = require('react-cookie');
var LoginConstants = require('../../constants/LoginConstants');

var onLoginUnauthorizedResponse = function (data) {
	FeedbackAction.displayWarningMessage({
		header: 'Wrong credentials!',
		message: 'The username/password combination is not recognized'
	});
};
var onLoginNotFoundResponse = function (data) {
	FeedbackAction.displayErrorMessage({
		header: 'No connection!',
		message: 'It seems you do not have a connection to the login server, are you sure you are connected to the internet?'
	});
};
var onGetUserUnauthorizedResponse = function (data) {
	alert('Error: see console');
	console.log(data);
};
var onGetUserSuccessResponse = function (data) {
	LoginAction.setLoginProfile({
		profile: data
	});
	NavigationAction.navigateToPrevious();
	FeedbackAction.displaySuccessMessage({
		header: 'Login Successful!',
		message: 'You are now logged in as ' + data.email
	});
};
var onLoginSuccessResponse = function (data) {
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
		console.log('1');
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
			console.log(token);
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

module.exports = LoginService;
