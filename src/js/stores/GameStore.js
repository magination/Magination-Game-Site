var Dispatcher = require('../dispatchers/Dispatcher');
var EditGameConstants = require('../constants/EditGameConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-editGame';

var _game = null;

var EditGameStore = _.extend({}, EventEmitter.prototype, {
	getGame: function () {
		return _game;
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

EditGameStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case EditGameConstants.UPDATE_GAME_LOCALLY:
		_game[action.propertyName.toString()] = action.propertyValue;
		EditGameStore.emitChange();
		break;
	case EditGameConstants.CHANGE_GAME_LOCALLY:
		_game = action.game;
		EditGameStore.emitChange();
		break;
	}
});

module.exports = EditGameStore;
