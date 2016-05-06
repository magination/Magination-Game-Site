
var Dispatcher = require('../dispatchers/Dispatcher');
var GameCreatorConstants = require('../constants/GameCreatorConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'default_creator_event';

var _pieces = [];
var _staticPieces = [
	[
		[
			'/public/img/magination-pieces/piece-black-single.png'
		]
	]
];
// var _canvasComponent = null;
var _fabricCanvas = null;

var _rawData = {};

var GameCreatorStore = _.extend({}, EventEmitter.prototype, {
	getPieces: function () {
		return _pieces;
	},
	getFabricCanvas: function () {
		return _fabricCanvas;
	},
	getStaticPieces: function () {
		return _staticPieces;
	},
	getRawData: function () {
		return _rawData;
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
	removeChangeListener: function (callback, specificEvent) {
		if (specificEvent) {
			this.removeListener(specificEvent, callback);
			return;
		}
		this.removeListener(CHANGE_EVENT, callback);
	}
});

GameCreatorStore.dispatchToken = Dispatcher.register(function (action) {
	switch (action.actionType) {
	case GameCreatorConstants.ADD_PIECE_TO_CREATOR:
		addPieceToCreator(action.piece);
		GameCreatorStore.emitChange(GameCreatorConstants.ADD_PIECE_TO_CREATOR, action.piece);
		break;
	case GameCreatorConstants.SET_STATIC_PIECES:
		_staticPieces = action.pieces;
		GameCreatorStore.emitChange(GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.emitChange(CHANGE_EVENT);
		break;
	case GameCreatorConstants.SET_CANVAS:
		_fabricCanvas = new fabric.Canvas(action.id);
		_fabricCanvas.on('selection:cleared', selectionChanged);
		break;
	case GameCreatorConstants.SET_SELECTED_INDEX:
		_fabricCanvas.setActiveObject(_fabricCanvas.item(action.index));
		selectionChanged(action.index);
		break;
	}
});

function selectionChanged (index) {
	if (index === undefined) {
		index = -1;
	}
	GameCreatorStore.emitChange(GameCreatorConstants.PIECE_WAS_SELECTED, index);
}

function addPieceToCreator (piece) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var imgInstance = new fabric.Image(img, {});
		imgInstance.set({
			left: 200,
			top: 200
		});
		var quantity = _fabricCanvas.getObjects().length;
		imgInstance.scale(0.20);
		imgInstance.on('selected', function () {
			selectionChanged(quantity);
		});
		_fabricCanvas.add(imgInstance);
		_fabricCanvas.setActiveObject(_fabricCanvas.item(quantity));
		selectionChanged(quantity);
	};
	img.src = piece.url;
}

module.exports = GameCreatorStore;
