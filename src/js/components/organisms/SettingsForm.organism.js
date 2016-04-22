var React = require('react');
var Col = require('react-bootstrap').Col;

var ChangePassword = require('../molecules/settings/ChangePassword');
var ChangeEmail = require('../molecules/settings/ChangeEmail');

var Settings = React.createClass({
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<h2>Settings</h2>
					<ChangePassword/>
					<ChangeEmail/>
				</Col>
			</div>
		);
	}
});

module.exports = Settings;
