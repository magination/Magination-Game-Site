var React = require('react');
var NavigationAction = require('../../actions/NavigationAction');
var URLS = require('../../config/config').urls;

var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var TextStyle = require('../../styles/Text');
var ButtonStyle = require('../../styles/Buttons');
var minPasswordLength = 7;

function isEmail (email) {
	var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

var RegisterForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			email: '',
			emailConfirm: '',
			password: '',
			passwordConfirm: '',
			submitButtonIsActive: false
		};
	},
	componentDidMount: function () {
		this.refs.usernameEntry.refs.input.focus();
	},
	render: function () {
		return (
			<div>
				<Col md={8} mdOffset={4}>
					<form className='form-signin' onSubmit={this.onSubmitForm}>
						<h2 className='form-signin-heading'>Register</h2>
						<Row>
							<div>
								<Col md={6}>
									<Input
										ref='usernameEntry'
										value={this.state.username}
										bsStyle={this.state.usernameBsStyle}
										type='text'
										placeholder='Enter your username'
										onChange={this.onUsernameEntryChange}
										hasFeedback
									/>
								</Col>
								<Col md={6}>
									<h5 style={TextStyle.Register.error}>{this.state.usernameHint}</h5>
								</Col>
							</div>
						</Row>
						<Row>
							<Col md={6}>
								<Input
									value={this.state.email}
									bsStyle={this.state.emailBsStyle}
									type='text'
									placeholder='Enter your email address'
									onChange={this.onEmailEntryChange}
									hasFeedback/>
							</Col>
							<Col md={6}>
								<h5 style={TextStyle.Register.error}>{this.state.emailHint}</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Input
									value={this.state.emailConfirm}
									bsStyle={this.state.emailConfirmBsStyle}
									type='text'
									placeholder='Confirm your email address'
									onChange={this.onEmailConfirmEntryChange}
									hasFeedback
								/>
							</Col>
							<Col md={6} style={{height: '100%'}}>
								<h5 style={TextStyle.Register.error}>{this.state.emailConfirmHint}</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Input
									value={this.state.password}
									bsStyle={this.state.passwordBsStyle}
									type='password'
									placeholder='Password'
									tooltip='Password must be atleast 7 characters'
									onChange={this.onPasswordEntryChange}
									hasFeedback
								/>
							</Col>
							<Col md={6} style={{height: '100%'}}>
								<h5 style={TextStyle.Register.error}>{this.state.passwordHint}</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6} >
								<Input
									value={this.state.passwordConfirm}
									bsStyle={this.state.passwordConfirmBsStyle}
									type='password' placeholder='Confirm Password'
									onChange={this.onPasswordConfirmEntryChange}
									hasFeedback
								/>
							</Col>
							<Col md={6} style={{height: '100%'}}>
								<h5 style={TextStyle.Register.error}>{this.state.passwordConfirmHint}</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button
									disabled={!this.validateFormData()}
									style={ButtonStyle.MaginationFillParent}
									type='submit'
								>
									Sign up
								</Button>
							</Col>
						</Row>
					</form>
				</Col>
			</div>
		);
	},
	onUsernameEntryChange: function (e) {
		this.setState({
			username: e.target.value,
			usernameBsStyle: this.validUsername(e.target.value) ? 'success' : 'error',
			usernameHint: e.target.value.length > 0 ? '' : 'You must enter a username'
		});
		this.searchUsername(e.target.value);
	},
	onEmailEntryChange: function (e) {
		this.setState({
			email: e.target.value,
			emailBsStyle: this.validEmail(e.target.value) ? 'success' : 'error',
			emailHint: isEmail(e.target.value) ? '' : 'Invalid email'
		});
	},
	onEmailConfirmEntryChange: function (e) {
		this.setState({
			emailConfirm: e.target.value,
			emailConfirmBsStyle: this.validConfirmEmail(e.target.value) ? 'success' : 'error',
			emailConfirmHint: e.target.value === this.state.email ? '' : 'Emails does not match'
		});
	},
	onPasswordEntryChange: function (e) {
		this.setState({
			password: e.target.value,
			passwordBsStyle: this.validPassword(e.target.value) ? 'success' : 'error',
			passwordHint: e.target.value.length >= minPasswordLength ? '' : 'Password must contain at least 7 characters'
		});
	},
	onPasswordConfirmEntryChange: function (e) {
		this.setState({
			passwordConfirm: e.target.value,
			passwordConfirmBsStyle: this.validConfirmPassword(e.target.value) ? 'success' : 'error',
			passwordConfirmHint: e.target.value === this.state.password ? '' : 'Passwords does not match'
		});
	},
	validUsername: function (username) {
		return username.length > 0;
	},
	validEmail: function (email) {
		return isEmail(email);
	},
	validConfirmEmail: function (email) {
		return email === this.state.email && isEmail(email);
	},
	validPassword: function (password) {
		return password.length >= minPasswordLength;
	},
	validConfirmPassword: function (password) {
		return password === this.state.password && password.length > 0;
	},
	onSubmitForm: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: URLS.api.users,
			data: JSON.stringify({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				409: function () {
					alert('Bad Request');
				},
				500: function () {
					alert('Internal Server Error');
				},
				200: this.onRequestSuccess
			}
		});
	},
	onRequestSuccess: function (data) {
		NavigationAction.navigate({
			destination: '/verificationsent',
			data: {email: this.state.email}
		});
	},
	validateFormData: function () {
		return this.validUsername(this.state.username) &&
		this.validEmail(this.state.email) &&
		this.validConfirmEmail(this.state.emailConfirm) &&
		this.validPassword(this.state.password) &&
		this.validConfirmPassword(this.state.passwordConfirm);
	},
	searchUsername: function (username) {
		if (username === '') return;
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '?username=' + username,
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				409: function () {
					alert('Username taken');
				},
				500: function () {
					alert('Internal Server Error');
				},
				200: this.onUsernameResponse
			}
		});
	},
	onUsernameResponse: function (data) {
		this.setState({
			usernameHint: data.users.length > 0 ? 'Username taken' : '',
			usernameBsStyle: data.users.length > 0 ? 'error' : 'success'
		});
	}
});

module.exports = RegisterForm;
