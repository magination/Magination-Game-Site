var React = require('react');
var ChangePassword = require('../molecules/settings/ChangePassword');
var ChangeEmail = require('../molecules/settings/ChangeEmail');
var EditMyPieces = require('../molecules/settings/EditMyPieces.molecule');
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');

var Settings = React.createClass({
	getInitialState () {
		return {
			currentExpanded: ''
		};
	},
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
	},
	render: function () {
		return (
			<div>
				<ChangePassword isShow={this.state.currentExpanded === 'password'} currentExpanded={this.state.currentExpanded} onExpandChanged={this.onSettingsButtonClicked}/>
				<ChangeEmail isShow={this.state.currentExpanded === 'email'} currentExpanded={this.state.currentExpanded} onExpandChanged={this.onSettingsButtonClicked}/>
				<EditMyPieces isShow={this.state.currentExpanded === 'myPieces'} currentExpanded={this.state.currentExpanded} onExpandChanged={this.onSettingsButtonClicked}/>
			</div>
		);
	},
	onSettingsButtonClicked: function (buttonName) {
		this.setState({
			currentExpanded: buttonName
		});
	}
});

module.exports = Settings;
