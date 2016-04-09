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
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-signin' onSubmit={this.onSubmitForm}>
						<h2 className='form-signin-heading'>Please sign in</h2>
						<Input type='text' label='Username / Email' placeholder='Username / Email' onChange={this.onUsernameChange}/>
						<Input type='password' label='Password' placeholder='Password' onChange={this.onPasswordChange}/>
						<Button type='submit'>Log in</Button>
					</form>
				</Col>
			</div>
		);
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
				401: this.onLoginUnauthorizedResponse
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
