var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-game';

var _game = null;

var GameStore = _.extend({}, EventEmitter.prototype, {
	getGame: function () {
		return _game;
	},
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

GameStore.dispatchToken = Dispatcher.register(function (action) {
	if (_game === null) {
		CreateNewGame();
	};
	switch (action.actionType) {
	case GameConstants.UPDATE_GAME_LOCALLY:
		UpdateGame(action);
		GameStore.emitChange();
		break;
	case GameConstants.CHANGE_GAME_LOCALLY:
		_game = action.game;
		GameStore.emitChange();
		break;
	case GameConstants.STORE_GAME_TO_SERVER:
		GameStore.emitChange();
		break;
	case GameConstants.ADD_NEW_RULE_TO_LOCAL_GAME:
		AddRule(action);
		GameStore.emitChange();
		break;
	case GameConstants.UPDATE_RULE_IN_LOCAL_GAME:
		UpdateRule(action);
		GameStore.emitChange();
		break;
	case GameConstants.DELETE_RULE_FROM_LOCAL_GAME:
		DeleteRule(action);
		GameStore.emitChange();
		break;
	case GameConstants.CHANGE_RULE_PRIORITIZATION_LOCALLY:
		ChangeRulePrioritization(action);
		GameStore.emitChange();
		break;
	}
});
function CreateNewGame () {
	_game = {
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
	};
};
function UpdateGame (action) {
	if (action.propertyCollection) {
		_game[action.propertyCollection][action.propertyName.toString()] = action.propertyValue;
	}
	else {
		_game[action.propertyName.toString()] = action.propertyValue;
	}
};
function AddRule (action) {
	if (action.isOptional) {
		_game.alternativeRules.push('');
	}
	else {
		_game.rules.push('');
	}
};
function UpdateRule (action) {
	if (action.isOptional) {
		_game.alternativeRules[action.position] = action.rule;
	}
	else {
		_game.rules[action.position] = action.rule;
	}
};
function DeleteRule (action) {
	if (action.isOptional) {
		_game.alternativeRules.splice(action.position, 1);
	}
	else {
		_game.rules.splice(action.position, 1);
	}
};
function ChangeRulePrioritization (action) {
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

module.exports = GameStore;
