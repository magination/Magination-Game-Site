var GameAction = require('../actions/GameAction');

function autosave () {
	GameAction.saveGameToServer();
}
module.exports = autosave;
