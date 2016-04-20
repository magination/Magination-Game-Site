var React = require('react');

var LoginAction = require('../../../actions/LoginAction');

var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var Glyphicon = require('react-bootstrap').Glyphicon;

var NavigationLoggedInState = React.createClass({
	getInitialState: function () {
		return {
			username: null
		};
	},
	componentWillMount: function () {
		this.setState({
			username: this.props.email
		});
	},
	componentWillReceiveProps: function (props) {
		this.setState({
			username: props.email
		});
	},
	render: function () {
		return (
			<div>
				<NavDropdown title={this.state.username} id='nav-dropdown'>
					<MenuItem><Glyphicon glyph='user'/>My Profile</MenuItem>
					<MenuItem><Glyphicon glyph='knight'/>My Games</MenuItem>
					<MenuItem><Glyphicon glyph='cog'/>Settings</MenuItem>
					<MenuItem onClick={this.onLogoutClicked}><Glyphicon glyph='log-out'/>Log out</MenuItem>
				</NavDropdown>
			</div>
		);
	},
	onLogoutClicked: function () {
		LoginAction.logoutSuccess();
	}
});

module.exports = NavigationLoggedInState;
