var GameAction = require('../actions/GameAction');

function autosave () {
	GameAction.autoSaveGameToServer();
}
module.exports = autosave;
