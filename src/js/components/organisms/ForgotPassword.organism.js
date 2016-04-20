var React = require('react');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

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
				<form onSubmit={this.onSubmit}>
					<h2>Request new password</h2>
					<Input bsStyle={this.state.emailEntryBsStyle} type='email' onChange={this.onEmailEntryChange} placeholder='Email Address' value={this.state.emailEntryValue} hasFeedback />
					<Button type='submit'>Submit</Button>
				</form>
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
		var bsStyle = (ValidatorService.isEmail(e.target.value)) ? 'success' : 'error';
		this.setState({
			emailEntryValue: e.target.value,
			emailEntryBsStyle: bsStyle
		});
	}
});

module.exports = ForgotPassword;
