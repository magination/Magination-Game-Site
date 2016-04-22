var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-game';

var _game = null;

var GameStore = _.extend({}, EventEmitter.prototype, {
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

GameStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case GameConstants.UPDATE_GAME_LOCALLY:
		if (action.propertyCollection) {
			_game[action.propertyCollection][action.propertyName.toString()] = action.propertyValue;
		}
		else {
			_game[action.propertyName.toString()] = action.propertyValue;
		}
		GameStore.emitChange();
		break;
	case GameConstants.CHANGE_GAME_LOCALLY:
		_game = action.game;
		GameStore.emitChange();
		break;
	case GameConstants.STORE_GAME_TO_SERVER:
		GameStore.emitChange();
	}
});

module.exports = GameStore;
