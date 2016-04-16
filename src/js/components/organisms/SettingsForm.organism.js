var React = require('react');
var LoginStore = require('../../stores/LoginStore');
var URLS = require('../../config/config.js').urls;
var FeedbackAction = require('../../actions/FeedbackAction');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var Settings = React.createClass({
	getInitialState: function () {
		if (!LoginStore.getLoginProfile()) {
			return {
				email: ''
			};
		}
		else {
			return {
				originalEmail: LoginStore.getLoginProfile().email,
				newEmail: LoginStore.getLoginProfile().email,
				userId: LoginStore.getLoginProfile()._id,
				password: '',
				newPassword: '',
				newPasswordConfirm: '',
				oldPassword: '',
				bsStylePassword: 'error'
			};
		}
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-settings' onSubmit={this.updateUser}>
						<h2 className='form-settings-heading'>Settings</h2>
						<Input ref='emailInput' value={this.state.newEmail} type='text' label='Change email' placeholder='Enter new email' onChange={this.onEmailChanged}/>
						<Input ref='newPasswordInput' value={this.state.newPassword} type='password' label='New password' placeholder='Enter new password' onChange={this.onNewPasswordChanged}/>
						<Input ref='newPasswordConfirmInput' value={this.state.newPasswordConfirm} type='password' label='Confirm new password' placeholder='Confirm new password' onChange={this.onNewPasswordConfirmChanged}/>
						<Input ref='oldPasswordInput' value={this.state.oldPassword} type='password' label='Old password' placeholder='Enter your old password' onChange={this.onOldPasswordChanged}/>
						<Button type='submit'>Submit changes</Button>
					</form>
				</Col>
			</div>
		);
	},
	onEmailChanged: function (e) {
		this.setState({
			newEmail: e.target.value
		});
	},
	onNewPasswordChanged: function (e) {
		this.setState({
			newPassword: e.target.value
		});
	},
	onNewPasswordConfirmChanged: function (e) {
		this.setState({
			newPasswordConfirm: e.target.value
		});
	},
	onOldPasswordChanged: function (e) {
		this.setState({
			oldPassword: e.target.value
		});
	},
	updateUser: function (e) {
		e.preventDefault();
		if (!this.state.userId) {
			this.requestLogin();
		}
		else if (!this.state.oldPassword) {
			this.refs.oldPasswordInput.refs.input.focus();
			FeedbackAction.displayWarningMessage({
				header: 'Warning',
				message: 'Please enter your current password to change credentials.'
			});
		}
		else if (this.state.newPassword && this.state.newPassword !== this.state.newPasswordConfirm) {
			this.setState({
				newPassword: '',
				newPasswordConfirm: ''
			});
			this.refs.newPasswordInput.refs.input.focus();
			FeedbackAction.displayWarningMessage({
				header: 'Error',
				message: 'The passwords you entered does not match.'
			});
		}
		/* TODO: validate email*/
		else {
			var data = {};
			if (this.state.originalEmail !== this.state.newEmail) data['email'] = this.state.newEmail;
			if (this.state.newPassword.length > 0) data['password'] = this.state.newPassword;
			if (!data.email && !data.password) {
				FeedbackAction.displayWarningMessage({
					header: 'Warning',
					message: 'Nothing to update.'
				});
				return;
			};
			data['oldPassword'] = this.state.oldPassword;
			$.ajax({
				type: 'PUT',
				url: URLS.api.users + '/' + this.state.userId,
				data: JSON.stringify(data),
				headers: {
					'Authorization': LoginStore.getToken()
				},
				contentType: 'application/json',
				dataType: 'json',
				success: this.didUpdate,
				statusCode: {
					200: this.onRequestSuccess,
					401: this.onRequestInvalidPassword
				}
			});
		}
	},
	didUpdate: function () {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Credentials updated.'
		});
	},
	requestLogin: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'It seems you are not signed in, please sign in before attempting this action.'
		});
	},
	onRequestInvalidPassword: function () {
		this.refs.oldPasswordInput.refs.input.focus();
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'The old password is wrong.'
		});
	}
});

module.exports = Settings;
