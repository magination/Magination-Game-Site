var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');
var LoginAction = require('../../actions/LoginAction');
var Link = require('react-router').Link;
var URLS = require('../../config/config').urls;
var FeedbackAction = require('../../actions/FeedbackAction');

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

var VerifyEmailChange = React.createClass({
	getInitialState: function () {
		return {
			status: this.props.initialText
		};
	},
	componentDidMount: function () {
		getLastUrlId();
		$.ajax({
			type: 'POST',
			url: URLS.api.verifyEmail + '/' + getLastUrlId(),
			dataType: 'json',
			statusCode: {
				200: this.onConfirmationSuccessResponse,
				400: this.onConfirmationBadRequestResponse,
				404: this.onConfirmationUnauthorizedResponse,
				500: FeedbackAction.displayInternalServerError
			}
		});
	},
	render: function () {
		return (
			<div className='text-center'>{this.state.status}</div>
		);
	},
	onConfirmationUnauthorizedResponse: function (data) {
		this.setState({
			status: <div>Could not find reset token. <Link to='/settings'>Request new token</Link></div>
		});
	},
	onConfirmationSuccessResponse: function (data) {
		LoginAction.logoutSuccess();
		this.setState({
			status: <div>The email change was successful. Please <Link to='/login'>sign in</Link></div>
		});
	},
	onConfirmationBadRequestResponse: function (data) {
		this.setState({
			status: <div>The id you have used is not valid. Go to your settings <Link to='/settings'>settings</Link> to request a new email change.</div>
		});
	}

});

module.exports = VerifyEmailChange;
