var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var FeedbackAction = require('./FeedbackAction');
var LoginStore = require('../stores/LoginStore');
var ParserService = require('../service/Parser.service');
var Cookie = require('react-cookie');
var URLS = require('../config/config').urls;

var LoginAction = {
	doLogin: function (username, password) {
		LoginService.doLogin(username, password, this.loginSuccess);
	},
	requestLogin: function () {
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_REQUEST
		});
	},
	appendLastUnsuccessfulRequestOptions: function (data) {
		Dispatcher.dispatch({
			actionType: LoginConstants.APPEND_LAST_REQUEST_OPTIONS,
			lastRequestOptions: data.lastRequestOptions
		});
	},
	checkAutoLogin: function () {
		LoginService.checkAutoLogin();
	},
	loginSuccess: function (data) {
		if (!data.token || !data.refreshToken) {
			console.log('Error: missing token or refreshtoken, stop login');
			// loginError();
			return;
		}
		var token = ParserService.decodeJWT(data.token);
		var refreshToken = ParserService.decodeJWT(data.refreshToken);
		var tokenExpiration = new Date(token.claims.exp * 1000);
		var refreshTokenExpiration = new Date(refreshToken.claims.exp * 1000);
		Cookie.save(LoginConstants.COOKIE_TOKEN, data.token, {expires: tokenExpiration, path: '/'});
		Cookie.save(LoginConstants.COOKIE_REFRESH_TOKEN, data.refreshToken, {expires: refreshTokenExpiration, path: '/'});

		Dispatcher.dispatch({
			actionType: LoginConstants.LOGIN_SUCCESS,
			token: data.token
		});
	},
	logoutSuccess: function () {
		Cookie.remove(LoginConstants.COOKIE_TOKEN);
		Cookie.remove(LoginConstants.COOKIE_REFRESH_TOKEN);
		Dispatcher.dispatch({
			actionType: LoginConstants.LOGOUT_SUCCESS
		});
	},
	setLoginProfile: function (data) {
		Dispatcher.dispatch({
			actionType: LoginConstants.SET_PROFILE,
			profile: data.profile
		});
	},
	updateLoginProfile: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			console.log('Tried to update LoginProfile while not being logged in');
			return;
		}
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id,
			dataType: 'json',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			success: onGetUserSuccessResponse
		});
	}
};

function onLoginUnauthorizedResponse (data) {
	FeedbackAction.displayWarningMessage({
		header: 'Wrong credentials!',
		message: 'The username/password combination is not recognized'
	});
	LoginAction.logoutSuccess();
};
function onLoginNotFoundResponse (data) {
	FeedbackAction.displayErrorMessage({
		header: 'User does not exist!',
		message: 'The user you tried to log in with does not exist'
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
};
function onLoginSuccessResponse (data) {
	LoginAction.loginSuccess({
		token: data.token,
		refreshToken: data.refreshToken
	});
	var token = ParserService.decodeJWT(data.token);
	$.ajax({
		type: 'GET',
		url: URLS.api.users + '/' + token.claims.id,
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
	FeedbackAction.displaySuccessMessage({
		header: 'Login Successful!',
		message: 'You are now logged in'
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
		var refreshToken = Cookie.load(LoginConstants.COOKIE_REFRESH_TOKEN);
		if (refreshToken) {
			this.doLoginWithToken(refreshToken);
		}
	},
	doLoginWithToken: function (token) {
		$.ajax({
			type: 'GET',
			url: URLS.api.refresh,
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
