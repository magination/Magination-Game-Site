var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');
var LoginAction = require('../../../actions/LoginAction');
var FeedbackAction = require('../../../actions/FeedbackAction');
var ValidatorService = require('../../../service/Validator.service');
var ButtonStyles = require('../../../styles/Buttons');
var Colors = require('../../../styles/Colors');

// var ContainerStyle = require('../../../styles/Containers');

var ChangePassword = React.createClass({
	getInitialState () {
		return {
			newEmail: '',
			bsStyleNewEmail: 'error',
			currentPassword: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={12}>
					<Button onClick={this.onChangeEmailClicked} style={ButtonStyles.MaginationFillParent}><strong>Change email</strong></Button>
				</Col>
				<Collapse in={this.props.isShow}>
					<Col md={12}>
						<Well style={{marginBottom: '0px'}}>
							<div>
								<form className='form-settings' onSubmit={this.storeChanges}>
									<Input value={this.state.currentPassword} required='true' label='Current password' placeholder='Enter your current password' type='password' onChange={this.onCurrentPasswordChanged}/>
									<Input value={this.state.newEmail} bsStyle={this.state.bsStyleEmail} label='New email' type='text' placeholder='Enter new email address' onChange={this.onNewEmailEntryChange} hasFeedback/>
									<Button style={ButtonStyles.MaginationSettingsButton.customColor(Colors.green)} ref='submitButton' type='submit'><strong>Save changes</strong></Button>
								</form>
							</div>
						</Well>
					</Col>
				</Collapse>
			</div>
		);
	},
	onChangeEmailClicked: function (e) {
		this.props.onExpandChanged(this.props.isShow ? '' : 'email');
	},
	onNewEmailEntryChange: function (e) {
		successStatus = 'error';
		if (ValidatorService.isEmail(e.target.value)) {
			var successStatus = 'success';
		}
		this.setState({
			newEmail: e.target.value,
			bsStyleNewEmail: successStatus
		});
	},
	onCurrentPasswordChanged: function (e) {
		this.setState({
			currentPassword: e.target.value
		});
	},
	storeChanges: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'PUT',
			url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id,
			data: JSON.stringify({
				email: this.state.newEmail,
				oldPassword: this.state.currentPassword
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onRequestSuccess,
			error: this.onRequestError
		});
	},
	onRequestSuccess: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Verification email sent'
		});
		if (data.token && data.refreshToken) {
			LoginAction.loginSuccess(data);
		}
	},
	onRequestError: function (e) {
		FeedbackAction.displaySuccessMessage({
			header: 'Error',
			message: 'Could not change email, try again.'
		});
	}
});
module.exports = ChangePassword;
