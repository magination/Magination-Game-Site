var Dispatcher = require('../dispatchers/Dispatcher');
var FeedbackConstants = require('../constants/FeedbackConstants');

var FeedbackActions = {
	displaySuccessMessage: function(data){
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_MESSAGE,
			message: data.message,
			statusType: "alert alert-success",
			header: data.header
		});
	},
	displayInternalServerError: function(data){
		Dispatcher.dispatch({
			actionType: FeedbackConstants.DISPLAY_SERVER_ERROR
		});
	},
	removeMessage: function(data){
		Dispatcher.dispatch({
			actionType: FeedbackConstants.REMOVE_MESSAGE
		});
	}
};

module.exports = FeedbackActions;