import Dispatcher from '../dispatchers/Dispatcher';
import FrontPageConstants from '../constants/FrontPageConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change-frontpage';

var _featuredGames;
var _topGames;
var _newGames;

const FrontPageStore = _.extend({}, EventEmitter.prototype, {
	getFeaturedGames: function () {
		return _featuredGames;
	},
	getTopGames: function () {
		return _topGames;
	},
	getNewGames: function () {
		return _newGames;
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

FrontPageStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case FrontPageConstants.UPDATE_FEATURED_GAMES:
		_featuredGames = action.games;
		FrontPageStore.emitChange(FrontPageConstants.UPDATE_FEATURED_GAMES);
		break;
	case FrontPageConstants.UPDATE_NEW_GAMES:
		_newGames = action.games;
		FrontPageStore.emitChange(FrontPageConstants.UPDATE_NEW_GAMES);
		break;
	case FrontPageConstants.UPDATE_TOP_GAMES:
		_topGames = action.games;
		FrontPageStore.emitChange(FrontPageConstants.UPDATE_TOP_GAMES);
		break;
	}
});

module.exports = FrontPageStore;
