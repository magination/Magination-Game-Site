var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');
var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');
var GameStore = require('../stores/GameStore');

var GameAction = {
	publishGameToServer: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.PUBLISH_GAME_TO_SERVER
		});
	},
	autoSaveGameToServer: function (callback) {
		Dispatcher.dispatch({
			actionType: GameConstants.SAVE_GAME_TO_SERVER,
			hasPromptedSave: false
		});
	},
	manualSaveGameToServer: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.SAVE_GAME_TO_SERVER,
			hasPromptedSave: true
		});
	},
	saveGameAndResetGameStore: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.SAVE_GAME_AND_RESET_GAME_STORE
		});
	},
	checkNameAvailability: function (name) {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '?' + 'exactTitle=' + name,
			contentType: 'application/json',
			dataType: 'json',
			success: onSearchResult
		});
	},
	deleteGameFromServer: function () {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.unpublishedGames + '/' + GameStore.getGame()._id,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: function () {
					Dispatcher.dispatch({
						actionType: GameConstants.REMOVE_GAME_LOCALLY
					});
				}
			}
		});
	},
	createNewGame: function (game, shouldPromptSaveOnExit) {
		$.ajax({
			type: 'POST',
			url: URLS.api.unpublishedGames,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			data: JSON.stringify(game),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				201: function (data) {
					Dispatcher.dispatch({
						actionType: GameConstants.CHANGE_GAME_LOCALLY,
						game: data,
						shouldPromptSaveOnExit: shouldPromptSaveOnExit
					});
				}
			}
		});
	},
	changeGameLocally: function (game) {
		if (!game._id) {
			console.warn('Change game called without game id');
			return;
		};
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_GAME_LOCALLY,
			game: game
		});
	},
	removeGameLocally: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.REMOVE_GAME_LOCALLY
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
	addImageToLocalGame: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.ADD_IMAGE_TO_LOCAL_GAME,
			image: data.image
		});
	},
	removeImageFromLocalGame: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.REMOVE_IMAGE_FROM_LOCAL_GAME,
			position: data.position
		});
	},
	changeImagePrioritizationLocally: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_IMAGE_PRIORITIZATION_LOCALLY,
			oldPosition: data.oldPosition,
			newPosition: data.newPosition
		});
	}
};

function onSearchResult (data) {
	Dispatcher.dispatch({
		actionType: GameConstants.CHECK_NAME_AVAILABILITY,
		isAvailableGameName: data.games.length === 0
	});
};

module.exports = GameAction;
