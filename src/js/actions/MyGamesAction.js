var Dispatcher = require('../dispatchers/Dispatcher');
var MyGamesConstants = require('../constants/MyGamesConstants');
var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');

var MyGamesAction = {
	getPublishedGames: function () {
		if (!LoginStore.getLoginProfile()._id) return;
		$.ajax({
			type: 'GET',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/games',
			contentType: 'application/json',
			dataType: 'json',
			success: onGetPublishedGames
		});
	},
	requestUnpublishedGames: function () {
		if (!LoginStore.getLoginState().isLoggedIn) return;
		$.ajax({
			type: 'GET',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/unpublishedGames',
			contentType: 'application/json',
			dataType: 'json',
			success: onGetUnpublishedGames
		});
	},
	publishGame: function (gameId) {
		Dispatcher.dispatch({
			actionType: MyGamesConstants.PUBLISH_UNPUBLISHED_GAME,
			gameId: gameId
		});
	},
	unPublishGame: function (gameId) {
		Dispatcher.dispatch({
			actionType: MyGamesConstants.UNPUBLISH_PUBLISHED_GAME,
			gameId: gameId
		});
	},
	deleteGame: function (gameId) {
		Dispatcher.dispatch({
			actionType: MyGamesConstants.DELETE_GAME,
			gameId: gameId
		});
	}
};

function onGetPublishedGames (data) {
	Dispatcher.dispatch({
		actionType: MyGamesConstants.UPDATE_PUBLISHED_GAMES,
		games: data
	});
}

function onGetUnpublishedGames (data) {
	Dispatcher.dispatch({
		actionType: MyGamesConstants.UPDATE_UNPUBLISHED_GAMES,
		games: data
	});
}

module.exports = MyGamesAction;
