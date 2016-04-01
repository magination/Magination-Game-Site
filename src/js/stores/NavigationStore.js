

var Dispatcher = require('../dispatchers/Dispatcher');
var NavigationConstants = require('../constants/NavigationConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var browserHistory = require('react-router').browserHistory;
var CHANGE_EVENT = 'change-login';

var _navigationState = {
    previousPath: null,
    currentPath: null
};

function pushDestination(destination){
    /*
        setTimeout is used as an easyfix. 
        The dispatcher doesn't allow dispatching while a dispatch-event is in progress (due to data consistency
        in stores).
        By using setTimeout, browserHistory.push() will happen in the next eventloop iteration.
    */
    setTimeout(function(){
        browserHistory.push(destination);
    }, 0);
}

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
            pushDestination(action.destination);
            NavigationStore.emitChange();
            break;
        case NavigationConstants.NAVIGATE_PREVIOUS:
            if(_navigationState.previousPath != null){
                var isOverridden = false;
                NavigationConstants.OVERRIDE_REDIRECT_LIST.every(function(str){
                    if(str == _navigationState.previousPath){
                        pushDestination(NavigationConstants.DEFAULT_DESTINATION);
                        isOverridden = true;
                        return false;
                    }
                    return true;
                });
                if(!isOverridden){
                    pushDestination(_navigationState.previousPath);
                }
            }
            //NavigationStore.emitChange();
            break;
        case NavigationConstants.SET_CURRENT_PATH:
            _navigationState.previousPath = _navigationState.currentPath;
            _navigationState.currentPath = action.destination;
            break;
    }
});

module.exports = NavigationStore;