var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');
var URLS = require('../config/config').urls;

var GameAction = {
	publishGameToServer: function () {
		Dispatcher.dispatch({
			actionType: GameConstants.PUBLISH_GAME_TO_SERVER
		});
	},
	saveGameToServer: function (hasPromptedSave) {
		Dispatcher.dispatch({
			actionType: GameConstants.SAVE_GAME_TO_SERVER,
			hasPromptedSave: hasPromptedSave
		});
	},
	checkNameAvailability: function (name) {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '?' + 'title=' + name,
			contentType: 'application/json',
			dataType: 'json',
			success: onSearchResult
		});
	},
	changeGameLocally: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_GAME_LOCALLY,
			game: data
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
	setHasSelectedGameToEdit: function (hasSelectedGameToEdit) {
		Dispatcher.dispatch({
			actionType: GameConstants.SET_HAS_SELECTED_GAME_TO_EDIT,
			hasSelectedGameToEdit: hasSelectedGameToEdit
		});
	},
	changeImagePrioritizationLocally: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.CHANGE_IMAGE_PRIORITIZATION_LOCALLY,
			oldPosition: data.oldPosition,
			newPosition: data.newPosition
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

function onSearchResult (data) {
	Dispatcher.dispatch({
		actionType: GameConstants.CHECK_NAME_AVAILABILITY,
		isAvailableGameName: data.games.length === 0
	});
};

module.exports = GameAction;
