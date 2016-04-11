var React = require('react');

var LoginAction = require('../../actions/LoginAction');
var FeedbackAction = require('../../actions/FeedbackAction');
var URLS = require('../../config/config').urls;
var NavigationAction = require('../../actions/NavigationAction');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: ''
		};
	},
	componentDidMount: function () {
		console.log(this.refs.usernameEntry.refs.input);
		this.refs.usernameEntry;
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-signin' onSubmit={this.onSubmitForm}>
						<h2 className='form-signin-heading'>Please sign in</h2>
						<Input ref='usernameEntry' value={this.state.username} type='text' label='Username / Email' placeholder='Username / Email' onChange={this.onUsernameChange}/>
						<Input value={this.state.password} type='password' label='Password' placeholder='Password' onChange={this.onPasswordChange}/>
						<Button type='submit'>Log in</Button>
					</form>
				</Col>
			</div>
		);
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
		$.ajax({
			type: 'POST',
			url: URLS.api.login,
			data: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onLoginSuccessResponse,
				401: this.onLoginUnauthorizedResponse,
				404: this.onLoginNotFoundResponse
			}
		});
	},
	onLoginSuccessResponse: function (data) {
		LoginAction.loginSuccess({
			token: data.token
		});
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '/' + data.id,
			dataType: 'json',
			headers: {
				'Authorization': data.token
			},
			statusCode: {
				200: this.onGetUserSuccessResponse,
				401: this.onGetUserUnauthorizedResponse,
				500: function () {
					alert('Server Error: see console');
					console.log(data);
				}
			}
		});
	},
	onLoginUnauthorizedResponse: function (data) {
		FeedbackAction.displayWarningMessage({
			header: 'Wrong credentials!',
			message: 'The username/password combination is not recognized'
		});
		this.setState({
			password: ''
		});
	},
	onLoginNotFoundResponse: function (data) {
		FeedbackAction.displayErrorMessage({
			header: 'No connection!',
			message: 'It seems you do not have a connection to the login server, are you sure you are connected to the internet?'
		});
	},
	onGetUserSuccessResponse: function (data) {
		LoginAction.setLoginProfile({
			profile: data
		});
		NavigationAction.navigateToPrevious();
		FeedbackAction.displaySuccessMessage({
			header: 'Login Successful!',
			message: 'You are now logged in as ' + data.email
		});
	},
	onGetUserUnauthorizedResponse: function (data) {
		alert('Error: see console');
		console.log(data);
	}
});

module.exports = LoginForm;
