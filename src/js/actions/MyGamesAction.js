var Dispatcher = require('../dispatchers/Dispatcher');
var GameListConstants = require('../constants/GameListConstants');
var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');

var GameListActions = {
	getPublishedGames: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/games',
			contentType: 'application/json',
			dataType: 'json',
			success: onGetPublishedGames
		});
	},
	getUnpublishedGames: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/unpublishedgames',
			contentType: 'application/json',
			dataType: 'json',
			success: onGetUnpublishedGames
		});
	}
};

function onGetPublishedGames (data) {
	Dispatcher.dispatch({
		actionType: GameListConstants.UPDATE_PUBLISHED_GAMES,
		games: data.games
	});
}

function onGetUnpublishedGames (data) {
	Dispatcher.dispatch({
		actionType: GameListConstants.UPDATE_UNPUBLISHED_GAMES,
		games: data.games
	});
}

module.exports = GameListActions;
