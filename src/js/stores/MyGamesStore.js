var Dispatcher = require('../dispatchers/Dispatcher');
var MyGamesConstants = require('../constants/MyGamesConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-myGames';
var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');

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
	case MyGamesConstants.PUBLISH_UNPUBLISHED_GAME:
		publishGameToServer(action.gameId);
		break;
	case MyGamesConstants.UNPUBLISH_PUBLISHED_GAME:
		unPublishGameToServer(action.gameId);
		break;
	case MyGamesConstants.DELETE_GAME:
		deleteGameFromServer(action.gameId, action.isPublished);
		break;
	}
});

function publishGameToServer (gameId) {
	var game = findGameById(gameId, false);
	$.ajax({
		type: 'POST',
		url: URLS.api.unpublishedGames + '/' + gameId + '/publish',
		data: JSON.stringify(game),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		statusCode: {
			200: function (data) {
				_unpublishedGames.splice(_unpublishedGames.indexOf(game), 1);
				_publishedGames.push(data);
				MyGamesStore.emitChange();
			}
		}
	});
}
function unPublishGameToServer (gameId) {
	var game = findGameById(gameId, true);
	$.ajax({
		type: 'POST',
		url: URLS.api.games + '/' + gameId + '/unpublish',
		data: JSON.stringify(game),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		statusCode: {
			200: function (data) {
				_publishedGames.splice(_publishedGames.indexOf(game), 1);
				_unpublishedGames.push(data);
				MyGamesStore.emitChange();
			}
		}
	});
}

function deleteGameFromServer (gameId) {
	var game = findGameById(gameId, true);
	$.ajax({
		type: 'DELETE',
		url: URLS.api.unpublishedGames + '/' + gameId,
		data: JSON.stringify(game),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		statusCode: {
			200: function (data) {
				_unpublishedGames.splice(_unpublishedGames.indexOf(game), 1);
				MyGamesStore.emitChange();
			}
		}
	});
}

function findGameById (gameId, isPublished) {
	var list = isPublished ? _publishedGames : _unpublishedGames;
	for (var i = 0; i < list.length; i++) {
		if (list[i]._id === gameId) {
			return list[i];
		}
	}
	return null;
}

module.exports = MyGamesStore;
