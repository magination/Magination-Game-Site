var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-login';
var Cookie = require('react-cookie');
var Validator = require('../service/Validator.service');

var _loginState = {
	isLoggedIn: false,
	requestedLogin: false
};
var _profile = null;
var _token = null;
var _lastUnsuccessfulRequestOptions = [];
var _recentAutoReRequest = [];

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
		loginSuccess(action.token);
		break;
	case LoginConstants.LOGOUT_SUCCESS:
		logoutSuccess();
		break;
	case LoginConstants.SET_PROFILE:
		setProfileAndEmitLogin(action.profile);
		break;
	case LoginConstants.LOGIN_REQUEST:
		_loginState.requestedLogin = true;
		LoginStore.emitChange();
		break;
	case LoginConstants.APPEND_LAST_REQUEST_OPTIONS:
		if (_recentAutoReRequest.every(function (request) {
			return !Validator.requestOptionsAreEqual(request, action.lastRequestOptions);
		})) {
			_lastUnsuccessfulRequestOptions.push(action.lastRequestOptions);
			_recentAutoReRequest.push(action.lastRequestOptions);
			setTimeout(popRecentAutoReRequest, 1000 * 10);
		}
		else {
			console.warn('WARNING - Diplicate unauthorized request. Prevented Auto-ReRequest');
		}
		break;
	}
});

function popRecentAutoReRequest () {
	_recentAutoReRequest.splice(0, 1);
}

function loginSuccess (token) {
	// _loginState = true;
	_token = token;
	// LoginStore.emitChange();
}

function setProfileAndEmitLogin (profile) {
	_profile = profile;
	_loginState.isLoggedIn = true;
	_loginState.requestedLogin = false;
	_lastUnsuccessfulRequestOptions.forEach(function (options) {
		options.headers['Authorization'] = _token;
		$.ajax(options);
	});
	_lastUnsuccessfulRequestOptions = [];
	LoginStore.emitChange();
}

function logoutSuccess () {
	_loginState.isLoggedIn = false;
	_loginState.requestedLogin = false;
	_profile = null;
	_token = null;
	LoginStore.emitChange();
}

module.exports = LoginStore;
