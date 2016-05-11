var Dispatcher = require('../dispatchers/Dispatcher');
var ReportConstants = require('../constants/ReportConstants');
var URLS = require('../config/config').urls;
var LoginStore = require('../stores/LoginStore');

var MyGamesAction = {
	getReports: function (reportType) {
		if (!LoginStore.getLoginProfile()._id) return;
		$.ajax({
			type: 'GET',
			url: URLS.api.reports + '/' + reportType,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: onGetReportsSuccess
			}
		});
	},
	unpublishGame: function (gameId) {
		$.ajax({
			type: 'POST',
			url: URLS.api.games + '/' + gameId + '/unpublish',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: onUnpublishSuccess(gameId)
			}
		});
	},
	dismissReports: function (objectType, objectId) {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.reports + '/' + objectType + '/' + objectId,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				204: onDismissSuccess(objectType, objectId)
			}
		});
	},
	removeReview: function (reviewId) {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.reviews + '/' + reviewId,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				204: onRemoveReviewSuccess(reviewId)
			}
		});
	}
};

function onGetReportsSuccess (data) {
	Dispatcher.dispatch({
		actionType: ReportConstants.UPDATE_LOCAL_REPORTS,
		response: data
	});
}
function onUnpublishSuccess (gameId) {
	Dispatcher.dispatch({
		actionType: ReportConstants.REMOVE_LOCAL_REPORT,
		type: 'games',
		id: gameId
	});
}
function onDismissSuccess (objectType, objectId) {
	Dispatcher.dispatch({
		actionType: ReportConstants.DISMISS_REPORTS,
		type: objectType,
		id: objectId
	});
}
function onRemoveReviewSuccess (reviewId) {
	Dispatcher.dispatch({
		actionType: ReportConstants.REMOVE_LOCAL_REPORT,
		type: 'reviews',
		id: reviewId
	});
}

module.exports = MyGamesAction;
