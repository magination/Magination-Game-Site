var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');

 var URLS = require('../config/config').urls;
 var LoginStore = require('./loginStore');
 var FeedbackAction = require('../../actions/FeedbackAction');

var GameAction = {
	storeGameToServer: function (data) {
		 $.ajax({
		 type: 'POST',
		 url: URLS.api.games,
		 data: JSON.stringify({
		 game: data.game
		 }),
		 headers: {
		 'Authorization': LoginStore.getToken()
		 },
		 contentType: 'application/json',
		 dataType: 'json',
		 statusCode: {
		 200: onGamePostedSuccess,
		 401: onPostGameUnauthorizedResponse,
		 500: function () {
		 alert('Server Error: see console');
		 console.log(data);
		 }
		 }
		 });

	},
	updateCurrentGameLocally: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.UPDATE_GAME_LOCALLY,
			propertyName: data.propertyName,
			propertyValue: data.propertyValue
		});
	},
	createNewGameLocally: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_GAME_LOCALLY,
			game: {}
		});
	}
};
/*
 var onGamePostedSuccess = function (data) {
 Dispatcher.dispatch({
 actionType: GameConstants.CHANGE_GAME_LOCALLY,
 game: data.game
 });
 };
 var onPostGameUnauthorizedResponse = function () {
 FeedbackAction.displayWarningMessage({
 header: 'Not signed in.',
 message: 'Please sign in to upload a game.'
 });
 };
 */

module.exports = GameAction;
