var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-game';
var URLS = require('../config/config').urls;
var LoginStore = require('./loginStore');

var _game = null;
var _isGamePosted = false;

var GameStore = _.extend({}, EventEmitter.prototype, {
	getGame: function () {
		return _game;
	},
	isGamePosted: function () {
		return _isGamePosted;
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
		_game[action.propertyName.toString()] = action.propertyValue;
		GameStore.emitChange();
		break;
	case GameConstants.CHANGE_GAME_LOCALLY:
		_game = action.game;
		GameStore.emitChange();
		break;
	case GameConstants.STORE_GAME_TO_SERVER:
		postGame();
		GameStore.emitChange();
	}
});

var postGame = function () {
	$.ajax({
		type: 'POST',
		url: URLS.api.games,
		data: JSON.stringify({
			game: _game
		}),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		success: didPostGame
	});
};
var didPostGame = function () {
	_isGamePosted = true;
	GameStore.emitChange();
};

module.exports = GameStore;
