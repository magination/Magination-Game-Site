var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Col = require('react-bootstrap').Col;
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');
var FeedbackAction = require('../../../actions/FeedbackAction');
var ValidatorService = require('../../../service/Validator.service');
var ButtonStyle = require('../../../styles/Buttons');
var ContainerStyle = require('../../../styles/Containers');

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
					<Button onClick={this.onChangeEmailClicked} style={ButtonStyle.MaginationFillParent}><strong>Change email</strong></Button>
				</Col>
				<Collapse in={this.props.isShow} style={ContainerStyle.collapse.parent}>
					<Col md={12}>
						<Well>
							<div style={ContainerStyle.collapse.child}>
								<form className='form-settings' onSubmit={this.storeChanges}>
									<Input value={this.state.currentPassword} required='true' label='Current password' placeholder='Enter your current password' type='password' onChange={this.onCurrentPasswordChanged}/>
									<Input value={this.state.newEmail} bsStyle={this.state.bsStyleEmail} label='New email' type='text' placeholder='Enter new email address' onChange={this.onNewEmailEntryChange} hasFeedback/>
									<Button ref='submitButton' type='submit'>Save changes</Button>
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
			success: this.onRequestSuccess
		});
	},
	onRequestSuccess: function (e) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Verification email sent'
		});
	}

});
module.exports = ChangePassword;
