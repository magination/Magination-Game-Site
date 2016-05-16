var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var ButtonStyles = require('../../styles/Buttons');

var FeedbackAction = require('../../actions/FeedbackAction');
var ValidatorService = require('../../service/Validator.service');
var URLS = require('../../config/config').urls;

var ForgotPassword = React.createClass({
	getInitialState: function () {
		return {
			emailEntryValue: '',
			emailEntryBsStyle: 'error'
		};
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form onSubmit={this.onSubmit}>
						<h4>Request new password</h4>
						<Input
							bsStyle={this.state.emailEntryBsStyle}
							type='email'
							onChange={this.onEmailEntryChange}
							placeholder='Email Address'
							value={this.state.emailEntryValue}
							hasFeedback
						/>
						<Button
							type='submit'
							style={ButtonStyles.MaginationFillParent}
							disabled={!this.validateForm()}
						>
							Submit
						</Button>
					</form>
				</Col>
			</div>
		);
	},
	onSubmit: function (e) {
		e.preventDefault();
		if (this.state.emailEntryBsStyle === 'error') {
			return;
		}
		$.ajax({
			type: 'POST',
			url: URLS.api.forgotpassword,
			data: JSON.stringify({
				email: this.state.emailEntryValue
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onSubmitSuccessResponse,
				404: this.onSubmitNotFoundResponse,
				422: this.onSubmitUnprocessableEntityResponse
			}
		});
	},
	onSubmitSuccessResponse: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success!',
			message: 'An email has been sent to the specified address'
		});
	},
	onSubmitNotFoundResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error!',
			message: 'The requested email does not exist'
		});
	},
	onEmailEntryChange: function (e) {
		this.setState({
			emailEntryValue: e.target.value,
			emailEntryBsStyle: ValidatorService.isEmail(e.target.value) ? 'success' : 'error'
		});
	},
	validateForm: function () {
		return ValidatorService.isEmail(this.state.emailEntryValue);
	}
});

module.exports = ForgotPassword;
