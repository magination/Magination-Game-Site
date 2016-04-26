var React = require('react');
var Col = require('react-bootstrap').Col;

var ChangePassword = require('../molecules/settings/ChangePassword');
var ChangeEmail = require('../molecules/settings/ChangeEmail');

var Settings = React.createClass({
	getInitialState () {
		return {
			currentExpanded: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<h2>Settings</h2>
					<hr/>
					<ChangePassword md={4} isShow={this.state.currentExpanded === 'password'} currentExpanded={this.state.currentExpanded} onExpandChanged={this.onSettingsButtonClicked}/>
					<hr/>
					<ChangeEmail md={4} isShow={this.state.currentExpanded === 'email'} currentExpanded={this.state.currentExpanded} onExpandChanged={this.onSettingsButtonClicked}/>
					<hr/>
				</Col>
			</div>
		);
	},
	onSettingsButtonClicked: function (buttonName) {
		console.log(buttonName);
		this.setState({
			currentExpanded: buttonName
		});
	}
});

module.exports = Settings;
