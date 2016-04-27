var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');

var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');
var FeedbackAction = require('./FeedbackAction');
var NavigationAction = require('./NavigationAction');

var GameAction = {
	storeGameToServer: function (data) {
		console.log(data);
		$.ajax({
			type: 'POST',
			url: URLS.api.games,
			data: JSON.stringify(data),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				201: onGamePostedSuccess,
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
			propertyCollection: data.propertyCollection,
			propertyValue: data.propertyValue
		});
	},
	addNewRuleToLocalGame: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.ADD_NEW_RULE_TO_LOCAL_GAME,
			isOptional: data.isOptional
		});
	},
	updateRuleInLocalGame: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.UPDATE_RULE_IN_LOCAL_GAME,
			rule: data.rule,
			position: data.position,
			isOptional: data.isOptional
		});
	},
	deleteRuleFromLocalGame: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.DELETE_RULE_FROM_LOCAL_GAME,
			position: data.position,
			isOptional: data.isOptional
		});
	},
	changeRulePrioritizationLocally: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_RULE_PRIORITIZATION_LOCALLY,
			position: data.currentPosition,
			isMovingUp: data.isMovingUp,
			isOptional: data.isOptional
		});
	},
	createNewGameLocally: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_GAME_LOCALLY,
			game: {
				title: '',
				shortDescription: '',
				numberOfPlayers: 0,
				isPlayableWithMorePlayers: false,
				isPlayableInTeams: false,
				images: [],
				parentGame: '',
				pieces: {
					singles: 0,
					doubles: 0,
					triples: 0
				},
				rules: [],
				alternativeRules: []
			}
		});
	}
};
var onGamePostedSuccess = function (data) {
	console.log(data);
	FeedbackAction.displaySuccessMessage({
		header: 'Success.',
		message: 'Game uploaded!'
	});
	NavigationAction.navigate({
		destination: '/game/' + data._id,
		data: {
			game: data
		}
	});
};
var onPostGameUnauthorizedResponse = function () {
	FeedbackAction.displayWarningMessage({
		header: 'Not signed in.',
		message: 'Please sign in to upload a game.'
	});
};
module.exports = GameAction;
