var React = require('react');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var FeedbackAction = require('../../actions/FeedbackAction');

var URLS = require('../../config/config').urls;
var NavigationStore = require('../../stores/NavigationStore');

var ConfirmForgotPassword = React.createClass({
	getInitialState: function () {
		return {
			passwordEntryValue: '',
			passwordConfirmEntryValue: ''
		};
	},
	render: function () {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<h2>Enter your new password</h2>
					<Input placeholder='New Password' type='password' value={this.state.passwordEntryValue} onChange={this.onPasswordEntryChanged}/>
					<Input placeholder='Confirm New Password' type='password' value={this.state.passwordConfirmEntryValue} onChange={this.onPasswordConfirmEntryChanged}/>
					<Button type='submit'>Submit</Button>
				</form>
			</div>
		);
	},
	onPasswordEntryChanged: function (e) {
		this.setState({
			passwordEntryValue: e.target.value
		});
	},
	onPasswordConfirmEntryChanged: function (e) {
		this.setState({
			passwordConfirmEntryValue: e.target.value
		});
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
	}
});

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

module.exports = ConfirmForgotPassword;
