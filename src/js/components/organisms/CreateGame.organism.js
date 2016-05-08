var React = require('react');

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var MyGamesStore = require('../../stores/MyGamesStore');
var MyGamesAction = require('../../actions/MyGamesAction');

var SelectGameToEdit = require('./SelectGameToEdit.organism');
var GameForm = require('./GameForm.organism');

var CreateGame = React.createClass({
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
		else if (!MyGamesStore.getUnpublishedGames()) {
			MyGamesAction.getUnpublishedGames();
		}
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		return (
			<div>
				<GameForm/>
				<SelectGameToEdit/>
			</div>
		);
	},
	onLoginStateChanged: function () {
		if (!MyGamesStore.getUnpublishedGames()) {
			MyGamesAction.getUnpublishedGames();
		}
	}
});

module.exports = CreateGame;
