var Dispatcher = require('../dispatchers/Dispatcher');
var MyGamesConstants = require('../constants/MyGamesConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-gamelist';

var _publishedGames = [];
var _unpublishedGames = [];

var MyGamesStore = _.extend({}, EventEmitter.prototype, {
	getPublishedGames: function () {
		return _publishedGames;
	},
	getUnpublishedGames: function () {
		return _unpublishedGames;
	},
	addChangeListener: function (callback, changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.on(changeEvent, callback);
	},
	emitChange: function (changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.emit(changeEvent);
	},
	clearGameList: function (isPublished) {
		if (isPublished) _publishedGames = [];
		else _unpublishedGames = [];
	},
	removeChangeListener: function (callback, changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.removeListener(changeEvent, callback);
	}
});

MyGamesStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case MyGamesConstants.UPDATE_PUBLISHED_GAMES:
		_publishedGames = action.games;
		MyGamesStore.emitChange();
		break;
	case MyGamesConstants.UPDATE_UNPUBLISHED_GAMES:
		_unpublishedGames = action.games;
		MyGamesStore.emitChange();
		break;
	}
});

module.exports = MyGamesStore;
