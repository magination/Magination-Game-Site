import Dispatcher from '../dispatchers/Dispatcher';
import MyGamesConstants from '../constants/MyGamesConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
import LoginStore from '../stores/LoginStore';
import config from '../config/config';
const URLS = config.urls;

const CHANGE_EVENT = 'change-myGames';
var _publishedGames;
var _unpublishedGames;

const MyGamesStore = _.extend({}, EventEmitter.prototype, {
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
		if (isPublished) _publishedGames = null;
		else _unpublishedGames = null;
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
		deleteGameFromServer(action.gameId);
		break;
	}
});

function publishGameToServer (gameId) {
	var game = findGameById(gameId, false);
	$.ajax({
		type: 'POST',
		url: URLS.api.unpublishedGames + '/' + gameId + '/publish',
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
	$.ajax({
		type: 'DELETE',
		url: URLS.api.unpublishedGames + '/' + gameId,
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		statusCode: {
			200: function () {
				if (_unpublishedGames.length === 1) {
					_unpublishedGames = [];
				}
				else {
					var game = findGameById(gameId, false);
					_unpublishedGames.splice(_unpublishedGames.indexOf(game), 1);
				}
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
