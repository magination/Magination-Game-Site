var React = require('react');

var NavigationAction = require('../../actions/NavigationAction');
var NavigationConstants = require('../../constants/NavigationConstants');
var NavigationStore = require('../../stores/NavigationStore');
var PATHS = require('../../constants/NavigationConstants').PATHS;
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../styles/Buttons');

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: '',
			showModal: false
		};
	},
	componentDidMount: function () {
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		return (
			<div>
				<Modal dialogClassName='custom-modal' ref='modal' show={this.state.showModal} onHide={this.onHide}>
					<Modal.Header>
						<Modal.Title>Please sign in</Modal.Title>
					</Modal.Header>
					<Modal.Body>
							<form onSubmit={this.onSubmitForm}>
								<Input value={this.state.username} type='text' label='Username / Email' placeholder='Username / Email' onChange={this.onUsernameChange}/>
								<Input value={this.state.password} type='password' label='Password' placeholder='Password' onChange={this.onPasswordChange}/>
								<Button type='submit' style={ButtonStyle.MaginationFillParent}>Log in</Button>
							</form>
					</Modal.Body>
					<Modal.Footer>
						<a href='#' onClick={this.onForgotPasswordClicked}>Forgot Password?</a>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
	onLoginStateChanged: function () {
		if (LoginStore.getLoginState().requestedLogin) {
			if (LoginStore.getRefreshTokenCookie()) {
				LoginAction.checkAutoLogin();
				return;
			}
			this.open();
		}
	},
	onHide: function () {
		this.close();
		if (NavigationConstants.isLegalDestination(LoginStore.getLoginState().isLoggedIn, NavigationStore.getNavigationState().currentPath)) {
			return;
		}
		else if (NavigationConstants.isLegalDestination(LoginStore.getLoginState().isLoggedIn, NavigationStore.getNavigationState().lastPath)) {
			NavigationAction.navigate({
				destination: NavigationStore.getNavigationState().lastPath
			});
			return;
		}
		else {
			NavigationAction.navigate({
				destination: NavigationConstants.PATHS.discover
			});
		}
	},
	close: function () {
		this.setState({ showModal: false });
	},
	open: function () {
		this.setState({ showModal: true });
	},
	onUsernameChange: function (e) {
		this.setState({
			username: e.target.value
		});
	},
	onPasswordChange: function (e) {
		this.setState({
			password: e.target.value
		});
	},
	onForgotPasswordClicked: function () {
		this.close();
		NavigationAction.navigate({
			destination: PATHS.forgotpassword
		});
	},
	onSubmitForm: function (e) {
		e.preventDefault();
		LoginAction.doLogin(this.state.username, this.state.password);
		this.setState({
			password: ''
		});
	}
});

module.exports = LoginForm;
