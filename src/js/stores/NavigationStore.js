/*DEPRECATED NOT USED1!!!*/

var Dispatcher = require('../dispatchers/Dispatcher');
var NavigationConstants = require('../constants/NavigationConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var browserHistory = require('react-router').browserHistory;
var CHANGE_EVENT = 'change-login';

var _navigationState = {
    nextRedirect: null,
    currentPath: null
};

var NavigationStore = _.extend({}, EventEmitter.prototype, {
    getNavigationState: function() {
        return _navigationState;
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

NavigationStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.actionType) {
        case NavigationConstants.NAVIGATE:
            if(_navigationState.nextRedirect == null){
                browserHistory.push(action.destination);
                _navigationState.currentPath = action.destination;
            }
            else {
                browserHistory.push(_navigationState.nextRedirect);
                _navigationState.currentPath = _navigationState.nextRedirect;
                _navigationState.nextRedirect = null;
            }
            NavigationStore.emitChange();
            break;
        case NavigationConstants.SET_NEXT_REDIRECT:
            _navigationState.nextRedirect = action.destination;
            NavigationStore.emitChange();
            break;
    }
});

module.exports = NavigationStore;