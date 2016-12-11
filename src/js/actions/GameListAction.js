import Dispatcher from '../dispatchers/Dispatcher';
import GameListConstants from '../constants/GameListConstants';
import GameListStore from '../stores/GameListStore';
import config from '../config/config';
const URLS = config.urls;

const GameListActions = {
	getGamesSpecificInterval: function (start, quantity) {
		var searchfilter = GameListStore.getSearchFilters();
		searchfilter.start = start;
		searchfilter.quantity = quantity;
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '?' + $.param(searchfilter),
			contentType: 'application/json',
			dataType: 'json',
			success: onGetGames
		});
	},
	clearGamesList: function () {
		Dispatcher.dispatch({
			actionType: GameListConstants.CLEAR_GAMES_LIST
		});
	},
	setGameSearchFilters: function (filters) {
		Dispatcher.dispatch({
			actionType: GameListConstants.SET_GAMES_SEARCH_FILTERS,
			filters: filters
		});
	},
	clearSearchFilters: function () {
		Dispatcher.dispatch({
			actionType: GameListConstants.CLEAR_GAME_SEARCH_FILTERS
		});
	}
};

function onGetGames (data) {
	Dispatcher.dispatch({
		actionType: GameListConstants.ADD_GAMES_TO_LIST,
		games: data.games
	});
}

module.exports = GameListActions;
