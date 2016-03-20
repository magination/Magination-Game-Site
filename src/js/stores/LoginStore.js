var Dispatcher = require('../dispatchers/Dispatcher');
var LoginConstants = require('../constants/LoginConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var browserHistory = require('react-router').browserHistory;
var CHANGE_EVENT = 'change-login';

var _loginState = false;
var _postLoginRedirect = 'browse';

var LoginStore = _.extend({}, EventEmitter.prototype, {
    getLoginState: function() {
        return _loginState;
    },
    getPostLoginRedirect: function(){
        return _postLoginRedirect;
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
            if(_postLoginRedirect != null){
                browserHistory.push(_postLoginRedirect);
                _postLoginRedirect = 'browse';
            }
            LoginStore.emitChange();
            break;
        case LoginConstants.LOGIN_ERROR:
            _loginState = false;
            LoginStore.emitChange();
            break;
        case LoginConstants.LOGOUT_SUCCESS:
            _loginState = false;
            LoginStore.emitChange();
            break;
        case LoginConstants.SET_POSTLOGINREDIRECTPATH:
            _postLoginRedirect = action.path;
            console.log(_postLoginRedirect);
            break;
    }
});

module.exports = LoginStore;