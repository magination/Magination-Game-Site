import Dispatcher from '../dispatchers/Dispatcher';
import GameListConstants from '../constants/GameListConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change-gamelist';

let _games = [];
let _filters = {};

const GameListStore = _.extend({}, EventEmitter.prototype, {
	getGames: function () {
		return _games;
	},
	getSearchFilters: function () {
		return _filters;
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
	removeChangeListener: function (callback, changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.removeListener(changeEvent, callback);
	}
});

GameListStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case GameListConstants.ADD_GAMES_TO_LIST:
		if (!action.games) {
			console.log('addGamesToList was called in the GameListStore, with an undefined game list');
			return;
		}
		action.games.forEach(function (gameToBeAdded) {
			if (_games.every(function (game) {
				return (gameToBeAdded._id !== game._id);
			})) {
				_games.push(gameToBeAdded);
			}
		});
		GameListStore.emitChange();
		break;
	case GameListConstants.CLEAR_GAMES_LIST:
		_games = [];
		GameListStore.emitChange();
		break;
	case GameListConstants.SET_GAMES_SEARCH_FILTERS:
		if (!action.filters) {
			console.log('setGameSearchFilters was called in the GameListStore, with an undefined filter');
		}
		_filters = action.filters;
		GameListStore.emitChange(GameListConstants.SET_GAMES_SEARCH_FILTERS);
		break;
	case GameListConstants.CLEAR_GAME_SEARCH_FILTERS:
		_filters = {};
		break;
	}
});

module.exports = GameListStore;
