var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;

var FeedbackAction = require('../../actions/FeedbackAction');
var NavigationStore = require('../../stores/NavigationStore');

var URLS = require('../../config/config').urls;
var ButtonStyles = require('../../styles/Buttons');
var TextStyles = require('../../styles/Text');

var minPasswordLength = 7;

var ConfirmForgotPassword = React.createClass({
	getInitialState: function () {
		return {
			passwordEntryValue: '',
			passwordConfirmEntryValue: '',
			isFormValid: false
		};
	},
	render: function () {
		return (
			<div>
				<Col md={8} mdOffset={4}>
					<form onSubmit={this.onSubmit}>
						<Row>
							<Col md={12}>
								<h4>Enter your new password</h4>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Input
									placeholder='New Password'
									type='password'
									value={this.state.passwordEntryValue}
									onChange={this.onPasswordEntryChanged}
									bsStyle={this.state.passwordBsStyle}
									hasFeedback
								/>
							</Col>
							<Col md={6}>
								<h5 style={TextStyles.red}>
									{this.state.passwordEntryValue.length >= minPasswordLength ? '' : 'Password must be at least 7 characters'}
								</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Input
									placeholder='Confirm New Password'
									type='password'
									value={this.state.passwordConfirmEntryValue}
									onChange={this.onPasswordConfirmEntryChanged}
									bsStyle={this.state.passwordConfirmBsStyle}
									hasFeedback
								/>
							</Col>
							<Col md={6}>
								<h5 style={TextStyles.red}>
									{this.state.passwordEntryValue === this.state.passwordConfirmEntryValue ? '' : 'Passwords must match'}
								</h5>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button
									type='submit'
									disabled={this.state.isFormValid}
									style={ButtonStyles.MaginationFillParent}
								>
									Submit
								</Button>
							</Col>
						</Row>
					</form>
				</Col>
			</div>
		);
	},
	onPasswordEntryChanged: function (e) {
		this.setState({
			passwordEntryValue: e.target.value,
			passwordBsStyle: e.target.value.length >= minPasswordLength ? 'success' : 'error',
			passwordConfirmBsStyle: e.target.value === this.state.password && e.target.value.length >= minPasswordLength ? 'success' : 'error'
		});
		this.validateForm();
	},
	onPasswordConfirmEntryChanged: function (e) {
		this.setState({
			passwordConfirmEntryValue: e.target.value,
			passwordConfirmBsStyle: e.target.value === this.state.passwordEntryValue && e.target.value.length >= minPasswordLength ? 'success' : 'error'
		});
		this.validateForm();
	},
	onSubmit: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: URLS.api.forgotpassword + '/' + getLastUrlId(),
			data: JSON.stringify({
				password: this.state.passwordEntryValue
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onSubmitSuccessResponse,
				404: this.onSubmitNotFoundResponse
			}
		});
	},
	onSubmitSuccessResponse: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Changed Password!',
			message: 'Your password has now been changed'
		});
	},
	onSubmitNotFoundResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'The request url is either expired or does not exist, please request a new email'
		});
	},
	validateForm: function () {
		return this.state.passwordEntryValue >= minPasswordLength && this.state.passwordEntryValue === this.state.passwordConfirmEntryValue;
	}
});

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

module.exports = ConfirmForgotPassword;
