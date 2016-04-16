var React = require('react');
var NavigationAction = require('../../actions/NavigationAction');
var URLS = require('../../config/config').urls;

var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

function isEmail (email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
			bsStyleUsername: 'error',
			bsStyleEmail: 'error',
			bsStyleEmailConfirm: 'error',
			bsStylePassword: 'error',
			bsStylePasswordConfirm: 'error'
		};
	},
	componentDidMount: function () {
		this.refs.usernameEntry.refs.input.focus();
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-signin' onSubmit={this.onSubmitForm}>
						<h2 className='form-signin-heading'>Register</h2>
						<Input ref='usernameEntry' value={this.state.username} bsStyle={this.state.bsStyleUsername} label='Username' type='text' placeholder='Enter your username' onChange={this.onUsernameEntryChange} hasFeedback/>
						<Input value={this.state.email} bsStyle={this.state.bsStyleEmail} label='Email' type='text' placeholder='Enter your email address' onChange={this.onEmailEntryChange} hasFeedback/>
						<Input value={this.state.emailConfirm} bsStyle={this.state.bsStyleEmailConfirm} type='text' placeholder='Confirm your email address' onChange={this.onEmailConfirmEntryChange} hasFeedback/>
						<Input value={this.state.password} bsStyle={this.state.bsStylePassword} type='password' label='Password' placeholder='Password' onChange={this.onPasswordEntryChange} hasFeedback/>
						<Input value={this.state.passwordConfirm} bsStyle={this.state.bsStylePasswordConfirm} type='password' placeholder='Confirm Password' onChange={this.onPasswordConfirmEntryChange} hasFeedback/>
						<Button type='submit'>Register</Button>
					</form>
				</Col>
			</div>
		);
	},
	onEmailEntryChange: function (e) {
		/* TODO: CHECK IF EMAIL EXISTS (maybe on unfocus instead)*/
		var successStatus = 'success';
		if (!isEmail(e.target.value)) {
			successStatus = 'error';
		}
		this.setState({
			email: e.target.value,
			bsStyleEmail: successStatus
		});
	},
	onEmailConfirmEntryChange: function (e) {
		var successStatus = 'error';
		if (e.target.value === this.state.email) {
			successStatus = 'success';
		}
		this.setState({
			emailConfirm: e.target.value,
			bsStyleEmailConfirm: successStatus
		});
	},
	onUsernameEntryChange: function (e) {
		/* TODO: CHECK IF USER EXISTS (maybe on unfocus instead)*/
		var successStatus = 'error';
		if (e.target.value !== '') {
			successStatus = 'success';
		}
		this.setState({
			username: e.target.value,
			bsStyleUsername: successStatus
		});
	},
	onPasswordEntryChange: function (e) {
		var successStatus = 'error';
		if (e.target.value !== '') {
			successStatus = 'success';
		}
		this.setState({
			password: e.target.value,
			bsStylePassword: successStatus
		});
	},
	onPasswordConfirmEntryChange: function (e) {
		var successStatus = 'error';
		if (e.target.value === this.state.password) {
			successStatus = 'success';
		}
		this.setState({
			passwordConfirm: e.target.value,
			bsStylePasswordConfirm: successStatus
		});
	},
	onSubmitForm: function (e) {
		e.preventDefault();

		/* TODO: check fields*/

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
	}
});

module.exports = RegisterForm;
