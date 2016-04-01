

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
function shouldOverride(){
    var override = false;
    NavigationConstants.OVERRIDE_REDIRECT_LIST.every(function(element){
        if(_navigationState.previousPath.pathname.indexOf(element) > -1){
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
            NavigationStore.emitChange();
            break;
        case NavigationConstants.NAVIGATE_PREVIOUS:
            if(_navigationState.previousPath != null){                
                if(shouldOverride()){
                    pushDestination(NavigationConstants.DEFAULT_DESTINATION);
                }
                else {
                    pushDestination(_navigationState.previousPath);
                }
            }
            else {
                pushDestination(NavigationConstants.DEFAULT_DESTINATION);
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