var React = require('react');

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationStore = require('../../stores/NavigationStore');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var MenuItem = require('react-bootstrap').MenuItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var Glyphicon = require('react-bootstrap').Glyphicon;

function getLoginState () {
	return LoginStore.getLoginState();
}
function getProfile () {
	return LoginStore.getLoginProfile();
}
function getNavigationState () {
	return NavigationStore.getNavigationState();
}

var imgStyle = {
	'maxWidth': '100%',
	'maxHeight': '100%'
};

var Menu = React.createClass({
	getInitialState: function () {
		return {
			isLoggedIn: getLoginState(),
			currentActive: ''
		};
	},
	componentDidMount: function () {
		LoginStore.addChangeListener(this.onLoginStateChanged);
		NavigationStore.addChangeListener(this.onNavigationStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
		NavigationStore.removeChangeListener(this.onNavigationStateChanged);
	},
	render: function () {
		var navigationStateElement = this.makeNavigationStatefulElement();
		return (
			<div>
				<Navbar fixedTop activeKey={this.state.currentActive}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href='/' ><img style={imgStyle} src='/public/img/magination-logo.png'/></a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav activeKey={this.state.currentActive}>
						<MenuItem eventKey={'/browse'} onClick={this.onNavigationClick.bind(this, '/browse')}>Browse</MenuItem>
						<MenuItem eventKey={'/upload'} onClick={this.onNavigationClick.bind(this, '/upload')}>Upload</MenuItem>
					</Nav>
					{navigationStateElement}
				</Navbar>
			</div>
		);
	},
	onNavigationClick: function (destination) {
		NavigationAction.navigate({
			destination: destination
		});
	},
	onLoginStateChanged: function () {
		this.setState({
			isLoggedIn: getLoginState()
		});
	},
	onNavigationStateChanged: function () {
		this.setState({
			currentActive: getNavigationState().currentPath
		});
	},
	onLogoutClicked: function () {
		LoginAction.logoutSuccess();
	},
	onSettingsClicked: function () {
		alert('clicked');
		NavigationAction.navigate({
			destination: '/settings'
		});
	},
	makeNavigationStatefulElement: function () {
		var navigationStateElement;
		if (this.state.isLoggedIn && getProfile() !== null) {
			navigationStateElement =
				<Nav pullRight activeKey={this.state.currentActive}>
					<NavDropdown title={getProfile().username} id='nav-dropdown'>
						<MenuItem eventKey={'profile'}><Glyphicon glyph='user'/> My Profile</MenuItem>
						<MenuItem eventKey={'games'}><Glyphicon glyph='knight'/> My Games</MenuItem>
						<MenuItem divider />
						<MenuItem onClick={this.onSettingsClicked}eventKey={'settings'}><Glyphicon glyph='cog'/> Settings</MenuItem>
						<MenuItem divider />
						<MenuItem onClick={this.onLogoutClicked}><Glyphicon glyph='log-out'/> Log out</MenuItem>
					</NavDropdown>
				</Nav>;
		}
		else {
			navigationStateElement =
				<Nav pullRight activeKey={this.state.currentActive}>
					<MenuItem eventKey={'/login'} onClick={this.onNavigationClick.bind(this, '/login')}>Log in</MenuItem>
					<MenuItem eventKey={'/register'} onClick={this.onNavigationClick.bind(this, '/register')}>Register</MenuItem>
				</Nav>;
		}
		return navigationStateElement;
	}
});

module.exports = Menu;
