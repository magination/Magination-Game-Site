var React = require('react');

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationStore = require('../../stores/NavigationStore');
var NavigationConstants = require('../../constants/NavigationConstants');

var NavigationPaths = NavigationConstants.PATHS;

var LoginForm = require('./LoginForm.organism');
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
				<LoginForm ref='loginModal'/>
				<Navbar fixedTop activeKey={this.state.currentActive}>
					<Navbar.Header>
						<Navbar.Brand>
							<a href='/' ><img style={imgStyle} src='/public/img/magination-logo.png'/></a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav activeKey={this.state.currentActive}>
						<MenuItem eventKey={NavigationPaths.discover} onClick={this.onNavigationClick.bind(this, NavigationPaths.discover)}>Discover</MenuItem>
						<MenuItem eventKey={NavigationPaths.creategame} onClick={this.onNavigationClick.bind(this, NavigationPaths.creategame)}>Create</MenuItem>
					</Nav>
					{navigationStateElement}
				</Navbar>
			</div>
		);
	},
	onNavigationClick: function (destination) {
		if (!NavigationConstants.isLegalDestination(getLoginState(), destination)) {
			this.refs.loginModal.open();
		}
		NavigationAction.navigate({
			destination: destination
		});
	},
	onLoginClick: function () {
		this.refs.loginModal.open();
	},
	onLoginStateChanged: function () {
		if (getLoginState()) {
			this.refs.loginModal.close();
		}
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
						<MenuItem href='/' onClick={this.onLogoutClicked}><Glyphicon glyph='log-out'/> Log out</MenuItem>
					</NavDropdown>
				</Nav>;
		}
		else {
			navigationStateElement =
				<Nav pullRight activeKey={this.state.currentActive}>
					<MenuItem eventKey={'/login'} onClick={this.onLoginClick}>Log in</MenuItem>
					<MenuItem eventKey={NavigationPaths.register} onClick={this.onNavigationClick.bind(this, NavigationPaths.register)}>Register</MenuItem>
				</Nav>;
		}
		return navigationStateElement;
	}
});

module.exports = Menu;
