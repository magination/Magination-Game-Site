var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;

var URLS = require('../../../config/config').urls;
var ButtonStyles = require('../../../styles/Buttons');
var Colors = require('../../../styles/Colors');

var LoginStore = require('../../../stores/LoginStore');
var FeedbackAction = require('../../../actions/FeedbackAction');

var minPasswordLength = 7;

var ChangePassword = React.createClass({
	getInitialState () {
		return {
			newPassword: '',
			confirmedPassword: '',
			currentPassword: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={12}>
					<Button
						onClick={this.onChangePasswordClicked}
						style={ButtonStyles.MaginationFillParent}
					>
						Change password
					</Button>
				</Col>
				<Collapse in={this.props.isShow}>
					<Col md={12}>
						<Well style={{marginBottom: '0'}}>
							<div>
								<form className='form-settings' onSubmit={this.storeChanges}>
									<Input
										value={this.state.currentPassword}
										required='true'
										placeholder='Enter your current password'
										type='password'
										onChange={this.onCurrentPasswordCHanged}
									/>
									<Input
										value={this.state.newPassword}
										placeholder='Enter new password'
										type='password'
										bsStyle={this.state.passwordBsStyle}
										onChange={this.onNewPasswordChanged}
										hasFeedback
									/>
									<Input
										value={this.state.confirmedPassword}
										bsStyle={this.state.bsStyleConfirmedPassword}
										placeholder='Confirm new password'
										type='password'
										bsStyle={this.state.passwordConfirmBsStyle}
										onChange={this.onConfirmedPasswordChanged}
										hasFeedback
									/>
									<Button
										style={ButtonStyles.MaginationSettingsButton.customColor(Colors.green)}
										ref='submitButton'
										type='submit'
										disabled={!this.validateFormData()}
									>
										Save changes
									</Button>
								</form>
							</div>
						</Well>
					</Col>
				</Collapse>
			</div>
		);
	},
	onChangePasswordClicked: function (e) {
		this.props.onExpandChanged(this.props.isShow ? '' : 'password');
	},
	onCurrentPasswordCHanged: function (e) {
		this.setState({
			currentPassword: e.target.value,
			currentPasswordBsStyle: e.target.value.length >= minPasswordLength ? 'success' : 'error'
		});
	},
	onNewPasswordChanged: function (e) {
		this.setState({
			newPassword: e.target.value,
			passwordBsStyle: e.target.value.length >= minPasswordLength ? 'success' : 'error',
			passwordConfirmBsStyle: e.target.value === this.state.confirmedPassword && e.target.value.length >= minPasswordLength ? 'success' : 'error'
		});
	},
	onConfirmedPasswordChanged: function (e) {
		this.setState({
			confirmedPassword: e.target.value,
			passwordConfirmBsStyle: e.target.value === this.state.newPassword && e.target.value.length >= minPasswordLength ? 'success' : 'error'
		});
	},
	validateFormData: function () {
		return this.state.confirmedPassword === this.state.newPassword &&
			this.state.currentPassword.length >= minPasswordLength &&
			this.state.newPassword.length >= minPasswordLength;
	},
	storeChanges: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'PUT',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id,
			data: JSON.stringify({
				oldPassword: this.state.currentPassword,
				password: this.state.newPassword
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onRequestSuccess,
			statusCode: {
				401: this.onBadPasswordResponse
			}
		});
	},
	onRequestSuccess: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Password updated'
		});
	},
	onBadPasswordResponse: function (data) {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'Old password is wrong'
		});
	}
});
module.exports = ChangePassword;
