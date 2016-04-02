var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var browserHistory = require('react-router').browserHistory;
var CHANGE_EVENT = 'change-login';

var _loginState = false;
var _profile = null;
var _token = null;
 
var LoginStore = _.extend({}, EventEmitter.prototype, {
    getToken: function(){
        return _token;
    },
    getLoginState: function() {
        return _loginState;
    },
    getLoginProfile: function(){
        return _profile;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

LoginStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.actionType) {
        case LoginConstants.LOGIN_SUCCESS:
            _loginState = true;
            _token = action.token;
            LoginStore.emitChange();
            break;
        case LoginConstants.LOGOUT_SUCCESS:
            _loginState = false;
            _token = null;
            LoginStore.emitChange();
            break;
        case LoginConstants.SET_PROFILE:
            _profile = action.profile;
            LoginStore.emitChange();
            break;
    }
});

module.exports = LoginStore;