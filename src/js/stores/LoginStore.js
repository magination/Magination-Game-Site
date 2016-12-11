import Dispatcher from '../dispatchers/Dispatcher';
import LoginConstants from '../constants/LoginConstants';
import _ from 'lodash';
import Cookie from 'react-cookie';
import Validator from '../service/Validator.service';
import { EventEmitter } from 'events';
const CHANGE_EVENT = 'change-login';

const _loginState = {
	isLoggedIn: false,
	requestedLogin: false
};
var _profile = null;
var _token = null;
var _lastUnsuccessfulRequestOptions = [];
var _recentAutoReRequest = [];

const LoginStore = _.extend({}, EventEmitter.prototype, {
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

const popRecentAutoReRequest = () => {
	_recentAutoReRequest.splice(0, 1);
};

const loginSuccess = (token) => {
	_token = token;
};

const setProfileAndEmitLogin = (profile) => {
	_profile = profile;
	_loginState.isLoggedIn = true;
	_loginState.requestedLogin = false;
	_lastUnsuccessfulRequestOptions.forEach(function (options) {
		options.headers['Authorization'] = _token;
		$.ajax(options);
	});
	_lastUnsuccessfulRequestOptions = [];
	LoginStore.emitChange();
};

const logoutSuccess = () => {
	_loginState.isLoggedIn = false;
	_loginState.requestedLogin = false;
	_profile = null;
	_token = null;
	LoginStore.emitChange();
};

module.exports = LoginStore;
