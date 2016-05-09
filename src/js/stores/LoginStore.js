var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-login';
var Cookie = require('react-cookie');

var _loginState = {
	isLoggedIn: false,
	requestedLogin: false
};
var _profile = null;
var _token = null;
var _lastUnsuccessfulRequestOptions = [];

var LoginStore = _.extend({}, EventEmitter.prototype, {
	getToken: function () {
		return _token;
	},
	getRefreshTokenCookie: function () {
		return Cookie.load(LoginConstants.COOKIE_REFRESH_TOKEN);
	},
	getLoginState: function () {
		return _loginState;
	},
	getLoginProfile: function () {
		return _profile;
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

LoginStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case LoginConstants.LOGIN_SUCCESS:
		// _loginState = true;
		_token = action.token;
		// LoginStore.emitChange();
		break;
	case LoginConstants.LOGOUT_SUCCESS:
		_loginState.isLoggedIn = false;
		_loginState.requestedLogin = false;
		_profile = null;
		_token = null;
		LoginStore.emitChange();
		break;
	case LoginConstants.SET_PROFILE:
		_profile = action.profile;
		_loginState.isLoggedIn = true;
		_loginState.requestedLogin = false;
		_lastUnsuccessfulRequestOptions.forEach(function (options) {
			$.ajax(options);
		});
		_lastUnsuccessfulRequestOptions = [];
		LoginStore.emitChange();
		break;
	case LoginConstants.LOGIN_REQUEST:
		_loginState.requestedLogin = true;
		LoginStore.emitChange();
		break;
	case LoginConstants.APPEND_LAST_REQUEST_OPTIONS:
		_lastUnsuccessfulRequestOptions.push(action.lastRequestOptions);
		break;
	}
});

module.exports = LoginStore;
