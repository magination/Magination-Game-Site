var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');
var FeedbackAction = require('../../../actions/FeedbackAction');
var ButtonStyle = require('../../../styles/Buttons');

var ChangePassword = React.createClass({
	getInitialState () {
		return {
			newPassword: '',
			confirmedPassword: '',
			currentPassword: '',
			bsStyleConfirmedPassword: 'error'
		};
	},
	render: function () {
		return (
			<div>
				<Button onClick={this.onChangePasswordClicked} style={ButtonStyle.MaginationFillParent}>
					Change password
				</Button>
				<Collapse in={this.props.isShow}>
					<Well>
						<div>
							<form className='form-settings' onSubmit={this.storeChanges}>
								<Input value={this.state.currentPassword} required='true' label='Current password' placeholder='Enter your current password' type='password' onChange={this.onCurrentPasswordCHanged}/>
								<Input value={this.state.newPassword} label='New password' placeholder='Enter new password' type='password' onChange={this.onNewPasswordChanged}/>
								<Input value={this.state.confirmedPassword} bsStyle={this.state.bsStyleConfirmedPassword} label='Confirm new password' placeholder='Confirm new password' type='password' onChange={this.onConfirmedPasswordChanged}/>
								<Button ref='submitButton' type='submit'>Save changes</Button>
							</form>
						</div>
					</Well>
				</Collapse>
			</div>
		);
	},
	onChangePasswordClicked: function (e) {
		this.props.onExpandChanged(this.props.isShow ? '' : 'password');
	},
	onCurrentPasswordCHanged: function (e) {
		this.setState({
			currentPassword: e.target.value
		});
	},
	onNewPasswordChanged: function (e) {
		this.setState({
			newPassword: e.target.value
		});
	},
	onConfirmedPasswordChanged: function (e) {
		var successStatus = 'error';
		if (e.target.value === this.state.newPassword) {
			successStatus = 'success';
		}
		this.setState({
			confirmedPassword: e.target.value,
			bsStyleConfirmedPassword: successStatus
		});
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
			success: this.onRequestSuccess
		});
	},
	onRequestSuccess: function (e) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Password updated'
		});
	}

});
module.exports = ChangePassword;
