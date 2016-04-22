var React = require('react');

var URLS = require('../../config/config').urls;

var NavigationStore = require('../../stores/NavigationStore');
var FeedbackAction = require('../../actions/FeedbackAction');

var VerificationSent = React.createClass({
	render: function () {
		return (
			<div className='text-center'>An email has been sent to the requested email-adress. Didnt get the email? <a href='#' onClick={this.onResendClick}>Click here to resend</a></div>
		);
	},
	onResendClick: function () {
		if (NavigationStore.getNavigationState().data === undefined || NavigationStore.getNavigationState().data == null) {
			alert('ERROR');
		}
		$.ajax({
			type: 'POST',
			url: URLS.api.resendEmail,
			data: JSON.stringify({
				email: NavigationStore.getNavigationState().data.email
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onEmailSent
			}
		});
	},
	onEmailSent: function () {
		FeedbackAction.displaySuccessMessage({
			header: 'Email sent',
			message: 'Email was successfully sent to ' + NavigationStore.getNavigationState().data.email + '. You should receive the email within few minutes.'
		});
	}
});

module.exports = VerificationSent;
