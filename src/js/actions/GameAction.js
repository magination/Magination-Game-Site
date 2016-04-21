var Dispatcher = require('../dispatchers/Dispatcher');
var EditGameConstants = require('../constants/EditGameConstants');

var GameAction = {
	storeGameToServer: function (data) {
		Dispatcher.dispatch({
			actionType: EditGameConstants.STORE_GAME_TO_SERVER,
			game: data.game
		});
	},
	updateCurrentGameLocally: function (data) {
		Dispatcher.dispatch({
			actionType: EditGameConstants.UPDATE_GAME_LOCALLY,
			propertyName: data.propertyName,
			propertyValue: data.propertyValue
		});
	},
	createNewGameLocally: function () {
		Dispatcher.dispatch({
			actionType: EditGameConstants.CHANGE_GAME_LOCALLY,
			game: {}
		});
	}
};

module.exports = GameAction;
