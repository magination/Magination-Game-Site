var React = require('react');
var LoginService = require('./LoginService');

var NavigationAction = require('../../actions/NavigationAction');
var LoginStore = require('../../stores/LoginStore');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: '',
			showModal: false
		};
	},
	render: function () {
		return (
			<div>
				<Modal ref='modal' show={this.state.showModal} onHide={this.onHide}>
					<Modal.Body>
						<form onSubmit={this.onSubmitForm}>
							<h2>Please sign in</h2>
							<Input value={this.state.username} type='text' label='Username / Email' placeholder='Username / Email' onChange={this.onUsernameChange}/>
							<Input value={this.state.password} type='password' label='Password' placeholder='Password' onChange={this.onPasswordChange}/>
							<Button type='submit'>Log in</Button>
						</form>
					</Modal.Body>
				</Modal>
			</div>
		);
	},
	onHide: function () {
		this.close();
		if (!LoginStore.getLoginState()) {
			NavigationAction.navigate({
				destination: '/'
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
	onSubmitForm: function (e) {
		e.preventDefault();
		LoginService.doLogin(this.state.username, this.state.password);
		this.setState({
			password: ''
		});
	}
});

module.exports = LoginForm;
