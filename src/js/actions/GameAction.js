var Dispatcher = require('../dispatchers/Dispatcher');
var GameConstants = require('../constants/GameConstants');

var GameAction = {
	storeGameToServer: function (data) {
		Dispatcher.dispatch({
			actionType: GameConstants.STORE_GAME_TO_SERVER,
			game: data.game
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

module.exports = GameAction;
