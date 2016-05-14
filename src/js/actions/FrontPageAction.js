var Dispatcher = require('../dispatchers/Dispatcher');
var FrontPageConstants = require('../constants/FrontPageConstants');
var URLS = require('../config/config').urls;

var TestActions = {
	requestFeaturedGames: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/featured',
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: function (data) {
					Dispatcher.dispatch({
						actionType: FrontPageConstants.UPDATE_FEATURED_GAMES,
						games: data
					});
				}
			}
		});
	},
	requestNewGames: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/new',
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: function (data) {
					Dispatcher.dispatch({
						actionType: FrontPageConstants.UPDATE_NEW_GAMES,
						games: data
					});
				}
			}
		});
	},
	requestTopGames: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/top',
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: function (data) {
					Dispatcher.dispatch({
						actionType: FrontPageConstants.UPDATE_TOP_GAMES,
						games: data
					});
				}
			}
		});
	}
};

module.exports = TestActions;
