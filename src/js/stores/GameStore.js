import Dispatcher from '../dispatchers/Dispatcher';
import GameConstants from '../constants/GameConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
import config from '../config/config';
const URLS = config.urls;
import LoginStore from '../stores/LoginStore';
import NavigationAction from '../actions/NavigationAction';
import FeedbackAction from '../actions/FeedbackAction';
const CHANGE_EVENT = 'change-game';

let _game;
let _hasPromptedSave = true;
let _isAvailableGameName = false;

const GameStore = _.extend({}, EventEmitter.prototype.setMaxListeners(25), {
	getGame: function () {
		return _game;
	},
	hasPromptedSave: function () {
		return _hasPromptedSave;
	},
	isAvailableGameName: function () {
		return _isAvailableGameName;
	},
	addChangeListener: function (callback, specificEvent) {
		if (specificEvent) {
			this.on(specificEvent, callback);
			return;
		}
		this.on(CHANGE_EVENT, callback);
	},
	emitChange: function () {
		this.emit.apply(this, arguments);
	},
	removeChangeListener: function (callback, changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.removeListener(changeEvent, callback);
	}
});

GameStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case GameConstants.UPDATE_GAME_LOCALLY:
		UpdateGame(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.CHANGE_GAME_LOCALLY:
		_game = action.game;
		_hasPromptedSave = !action.shouldPromptSaveOnExit;
		GameStore.emitChange(GameConstants.LOCAL_GAME_HAS_CHANGED);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.PUBLISH_GAME_TO_SERVER:
		PublishGameToServer();
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.SAVE_GAME_TO_SERVER:
		SaveGameToServer(action.hasPromptedSave);
		break;
	case GameConstants.ADD_NEW_RULE_TO_LOCAL_GAME:
		AddRule(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.UPDATE_RULE_IN_LOCAL_GAME:
		UpdateRule(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.DELETE_RULE_FROM_LOCAL_GAME:
		DeleteRule(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.CHANGE_RULE_PRIORITIZATION_LOCALLY:
		ChangeRulePrioritization(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.ADD_IMAGE_TO_LOCAL_GAME:
		AddImageToLocalGame(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.REMOVE_IMAGE_FROM_LOCAL_GAME:
		RemoveImageFromLocalGame(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.CHANGE_IMAGE_PRIORITIZATION_LOCALLY:
		ChangeImagePrioritization(action);
		GameStore.emitChange(CHANGE_EVENT);
		break;
	case GameConstants.CHECK_NAME_AVAILABILITY:
		CheckNameAvailability(action);
		break;
	case GameConstants.SAVE_GAME_AND_RESET_GAME_STORE:
		SaveGameAndResetGameStore();
		GameStore.emitChange();
		break;
	case GameConstants.REMOVE_GAME_LOCALLY:
		_game = undefined;
		_hasPromptedSave = true;
		GameStore.emitChange();
		break;
	}
});
const ChangeImagePrioritization = (action) => {
	var images = _game.images;
	let selectedItem = images[action.oldPosition];
	images[action.oldPosition] = images[action.newPosition];
	images[action.newPosition] = selectedItem;
	_game.images = images;
};
const AddImageToLocalGame = (action) => {
	_game.images.push(action.image);
	SaveGameToServer();
};
const RemoveImageFromLocalGame  = (action) => {
	_game.images.splice(action.position, 1);
	SaveGameToServer();
};
const PublishGameToServer = () => {
	$.ajax({
		type: 'POST',
		url: URLS.api.unpublishedGames + '/' + _game._id + '/publish',
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		statusCode: {
			200: function (data) {
				onGamePostedSuccess(data);
			},
			401: function (data) {
				onPostGameUnauthorizedResponse(data);
			}
		}
	});
};

const SaveGameToServer = (hasPromptedSave) => {
	_hasPromptedSave = hasPromptedSave;
	_game.id = undefined;
	$.ajax({
		type: _game._id ? 'PUT' : 'POST',
		url: _game._id ? URLS.api.unpublishedGames + '/' + _game._id : URLS.api.unpublishedGames,
		data: JSON.stringify(_game),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		success: onSaveGameSuccessResponse
	});
};

const SaveGameAndResetGameStore = () => {
	_hasPromptedSave = true;
	$.ajax({
		type: _game._id ? 'PUT' : 'POST',
		url: _game._id ? URLS.api.unpublishedGames + '/' + _game._id : URLS.api.unpublishedGames,
		data: JSON.stringify(_game),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: 'application/json',
		dataType: 'json',
		success: function () {
			FeedbackAction.displaySuccessMessage({
				header: 'Success.',
				message: 'Game saved, you can leave and edit it later.'
			});
			_game = undefined;
		}
	});
};

const CheckNameAvailability = (action) => {
	_isAvailableGameName = action.isAvailableGameName;
	GameStore.emitChange(GameConstants.CHECK_NAME_AVAILABILITY);
};

const UpdateGame = (action) => {
	if (action.propertyCollection) {
		_game[action.propertyCollection][action.propertyName.toString()] = action.propertyValue;
	}
	else {
		_game[action.propertyName.toString()] = action.propertyValue;
	}
};

const AddRule = (action) => {
	if (action.isOptional) {
		_game.alternativeRules.push('');
	}
	else {
		_game.rules.push('');
	}
};

const UpdateRule = (action) => {
	if (action.isOptional) {
		_game.alternativeRules[action.position] = action.rule;
	}
	else {
		_game.rules[action.position] = action.rule;
	}
};

const DeleteRule = (action) => {
	if (action.isOptional) {
		_game.alternativeRules.splice(action.position, 1);
	}
	else {
		_game.rules.splice(action.position, 1);
	}
};

const ChangeRulePrioritization = (action) => {
	if (action.isOptional) {
		var alternativeRules = _game.alternativeRules;
		let selectedItem = alternativeRules[action.position];
		if (action.isMovingUp) {
			alternativeRules[action.position] = alternativeRules[action.position - 1];
			alternativeRules[action.position - 1] = selectedItem;
		}
		else {
			alternativeRules[action.position] = alternativeRules[action.position + 1];
			alternativeRules[action.position + 1] = selectedItem;
		}
		_game.alternativeRules = alternativeRules;
	}
	else {
		var rules = _game.rules;
		let selectedItem = rules[action.position];
		if (action.isMovingUp) {
			rules[action.position] = rules[action.position - 1];
			rules[action.position - 1] = selectedItem;
		}
		else {
			rules[action.position] = rules[action.position + 1];
			rules[action.position + 1] = selectedItem;
		}
		_game.rules = rules;
	}
};

const onGamePostedSuccess = (data) => {
	FeedbackAction.displaySuccessMessage({
		header: 'Success.',
		message: 'Game published!'
	});
	NavigationAction.navigate({
		destination: '/game/' + data._id
	});
	_game = undefined;
	_hasPromptedSave = true;
};

const onSaveGameSuccessResponse = (data) => {
	_game._id = data._id;
	if (_hasPromptedSave) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success.',
			message: 'Game saved, you can leave and edit it later.'
		});
	}
};

const onPostGameUnauthorizedResponse = () => {
	FeedbackAction.displayWarningMessage({
		header: 'Not signed in.',
		message: 'Please sign in to upload a game.'
	});
};

module.exports = GameStore;
