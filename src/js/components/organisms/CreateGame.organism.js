var React = require('react');

var LoginAction = require('../../actions/LoginAction');
var LoginStore = require('../../stores/LoginStore');

var GameForm = require('./GameForm.organism');
var SelectGameToEdit = require('./SelectGameToEdit.organism');

var CreateGame = React.createClass({
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
	},
	render: function () {
		return (
			<div>
				<GameForm/>
				<SelectGameToEdit/>
			</div>
		);
	}
});

module.exports = CreateGame;
