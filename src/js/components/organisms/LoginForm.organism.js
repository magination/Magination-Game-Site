var React = require('react');

var LoginAction = require('../../actions/LoginAction');
var FeedbackAction = require('../../actions/FeedbackAction');
var URLS = require('../../config/config').urls;
var NavigationAction = require('../../actions/NavigationAction');

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: ''
		};
	},
	handleUsernameChange: function (e) {
		this.setState({
			username: e.target.value
		});
	},
	handlePasswordChange: function (e) {
		this.setState({
			password: e.target.value
		});
	},
	render: function () {
		return (
			<div className='col-md-4 col-md-offset-4'>
				<form className='form-signin' onSubmit={this.onSubmitForm}>
					<h2 className='form-signin-heading'>Please sign in</h2>
					<label htmlFor='inputEmail' className='sr-only'>Username/Email</label>
					<input ref='usernameInput' value={this.state.username} onChange={this.handleUsernameChange} type='text' id='inputEmail' className='form-control' placeholder='Username / Email' required autofocus/>
					<label htmlFor='inputPassword' className='sr-only'>Password</label>
					<input value={this.state.password} onChange={this.handlePasswordChange} type='password' id='inputPassword' className='form-control' placeholder='Password' required/>
					<button className='btn btn-lg btn-primary btn-block' type='submit'>Login </button>
				</form>
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
