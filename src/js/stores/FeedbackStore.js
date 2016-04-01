var Dispatcher = require('../dispatchers/Dispatcher');
var FeedbackConstants = require('../constants/FeedbackConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-feedback';

var _feedback = { 
    statusType: "", 
    header: "",
    message: ""
};

var FeedbackStore = _.extend({}, EventEmitter.prototype, {
    getFeedback: function() {
        return _feedback;
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

FeedbackStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.actionType) {
        case FeedbackConstants.DISPLAY_MESSAGE:
            _feedback = {
                statusType: action.statusType,
                header: action.header,
                message: action.message
            };
            FeedbackStore.emitChange();
            break;
        case FeedbackConstants.REMOVE_MESSAGE:
            _feedback = {
                statusType: "",
                header: "",
                message: ""
            };
            FeedbackStore.emitChange();
            break;
    }
});

module.exports = FeedbackStore;