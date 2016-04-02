

var Dispatcher = require('../dispatchers/Dispatcher');
var NavigationConstants = require('../constants/NavigationConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var browserHistory = require('react-router').browserHistory;
var CHANGE_EVENT = 'change-login';

var LoginStore = require('./LoginStore');

var _navigationState = {
    redirectPath: null,
    currentPath: null
};
function shouldRedirectToLogin(destination){
    if(LoginStore.getLoginState()) {
        return false;
    }

    var isPathLoginProtected = false;
    NavigationConstants.LOGGED_IN_EXCLUSIVE_PATHS.every(function(element){
        if(destination.indexOf(element) > -1){
            isPathLoginProtected = true;
            return false;
        }
        return true;
    });

    return isPathLoginProtected;
}
function pushDestination(destination){
    
    /*
        setTimeout is used as an alternative to setImmediate (which is not directly supported by all browsers). 
        The dispatcher doesn't allow dispatching while a dispatch-event is in progress (due to data consistency
        in stores).
        By using setTimeout, browserHistory.push() will happen in the next eventloop iteration.
    */
    setTimeout(function(){
        if(shouldRedirectToLogin(destination)) {
            _navigationState.redirectPath = destination;
            _navigationState.currentPath = '/login';
            browserHistory.push('/login');
        }
        else {
            _navigationState.currentPath = destination;
            browserHistory.push(destination);
        }
        NavigationStore.emitChange();
    }, 0);
}

/*
    This function checks if the previous page is a page that should be accessible to logged in users. If it is for example register or confirmation, it should
    be overridden. The list of overridden elements is located in NavigationConstants. Default is also located in NavigationConstants
*/
function shouldOverrideForPreviousNavigation(){
    var override = false;
    NavigationConstants.NOT_LOGGED_IN_EXCLUSIVE_PATHS.every(function(element){
        if(_navigationState.redirectPath.indexOf(element) > -1){
            override = true;
            return false;
        }
        return true;
    });
    return override;
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
            //NavigationStore.emitChange();
            break;
        case NavigationConstants.NAVIGATE_PREVIOUS:
            if(_navigationState.redirectPath != null && _navigationState.redirectPath != undefined){                
                if(shouldOverrideForPreviousNavigation()){
                    pushDestination(NavigationConstants.DEFAULT_DESTINATION);
                }
                else {
                    pushDestination(_navigationState.redirectPath);
                }
            }
            else {
                pushDestination(NavigationConstants.DEFAULT_DESTINATION);
            }
            NavigationStore.emitChange();
            break;
        case NavigationConstants.SET_CURRENT_PATH:
            //_navigationState.redirectPath = _navigationState.currentPath;
            _navigationState.currentPath = action.destination;
            NavigationStore.emitChange();
            break;
    }
});

module.exports = NavigationStore;