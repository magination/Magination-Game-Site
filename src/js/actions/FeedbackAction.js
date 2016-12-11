var Dispatcher = require('../dispatchers/Dispatcher');
var FeedbackConstants = require('../constants/FeedbackConstants');

var FeedbackActions = {
	displaySuccessMessage: function (data) {
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_MESSAGE,
			message: data.message,
			statusType: 'alert alert-success fade in',
			header: data.header
		});
	},
	displayWarningMessage: function (data) {
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_WARNING,
			message: data.message,
			statusType: 'alert alert-warning fade in',
			header: data.header
		});
	},
	displayErrorMessage: function (data) {
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_ERROR,
			message: data.message,
			statusType: 'alert alert-danger fade in',
			header: data.header
		});
	},
	displayInternalServerError: function () {
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_SERVER_ERROR
		});
	},
	removeMessage: function () {
		Dispatcher.dispatch({
			actionType: FeedbackConstants.REMOVE_MESSAGE
		});
	}
};

module.exports = FeedbackActions;
