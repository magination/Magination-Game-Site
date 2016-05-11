var Dispatcher = require('../dispatchers/Dispatcher');
var ReportConstants = require('../constants/ReportConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change-reportStore';

var _gameReports = [];
var _userReports = [];
var _reviewReports = [];

var ReportStore = _.extend({}, EventEmitter.prototype, {
	getGameReports: function () {
		return _gameReports;
	},
	getUserReports: function () {
		return _userReports;
	},
	getReviewReports: function () {
		return _reviewReports;
	},
	addChangeListener: function (callback, specificEvent) {
		if (specificEvent) {
			this.on(specificEvent, callback);
			return;
		}
		this.on(CHANGE_EVENT, callback);
	},
	emitChange: function () {
		this.emit.apply(this, arguments);
	},
	removeChangeListener: function (callback, changeEvent) {
		if (!changeEvent) {
			changeEvent = CHANGE_EVENT;
		}
		this.removeListener(changeEvent, callback);
	}
});

ReportStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case ReportConstants.UPDATE_LOCAL_REPORTS:
		updateReportList(action);
		ReportStore.emitChange(CHANGE_EVENT);
		break;
	case ReportConstants.REMOVE_LOCAL_REPORT:
		removeLocalReport(action);
		ReportStore.emitChange(CHANGE_EVENT);
		break;
	case ReportConstants.DISMISS_REPORTS:
		removeLocalReport(action);
		ReportStore.emitChange(CHANGE_EVENT);
		break;
	}
});

function removeLocalReport (action) {
	var report = findReportById(action.id, action.type);
	switch (action.type) {
	case 'games':
		_gameReports.splice(_gameReports.indexOf(report), 1);
		ReportStore.emitChange(ReportConstants.GAME_REPORTS_UPDATED);
		break;
	case 'reviews':
		_reviewReports.splice(_gameReports.indexOf(report), 1);
		ReportStore.emitChange(ReportConstants.REVIEW_REPORTS_UPDATED);
		break;
	case 'users':
		_userReports.splice(_gameReports.indexOf(report), 1);
		ReportStore.emitChange(ReportConstants.USER_REPORTS_UPDATED);
		break;
	}
};

function updateReportList (action) {
	switch (action.response.type) {
	case 'games':
		_gameReports = action.response.reportedObjects;
		ReportStore.emitChange(ReportConstants.GAME_REPORTS_UPDATED);
		break;
	case 'users':
		_userReports = action.response.reportedObjects;
		ReportStore.emitChange(ReportConstants.USER_REPORTS_UPDATED);
		break;
	case 'reviews':
		_reviewReports = action.response.reportedObjects;
		ReportStore.emitChange(ReportConstants.REVIEW_REPORTS_UPDATED);
		break;
	}
};

function findReportById (id, type) {
	var list;
	switch (type) {
	case 'games':
		list = _gameReports;
		break;
	case 'reviews':
		list = _reviewReports;
		break;
	case 'users':
		list = _userReports;
		break;
	}
	for (var i = 0; i < list.length; i++) {
		if (list[i]._id === id) {
			return list[i];
		}
	}
	return null;
}

module.exports = ReportStore;
