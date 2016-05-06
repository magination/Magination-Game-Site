
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
var _fabricCanvas = null;

var GameCreatorStore = _.extend({}, EventEmitter.prototype, {
	getPieces: function () {
		_pieces = _fabricCanvas.getObjects().map(function (object) {
			return {
				url: object.imageUrl
			};
		});
		return _pieces;
	},
	getFabricCanvas: function () {
		return _fabricCanvas;
	},
	getStaticPieces: function () {
		return _staticPieces;
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
	case GameCreatorConstants.CLEAR_GAMECREATOR_STORE:
		_fabricCanvas = new fabric.Canvas(action.id);
		_fabricCanvas.on('selection:cleared', selectionChanged);
		GameCreatorStore.emitChange(GameCreatorConstants.GAMECREATORE_STORE_CLEARED);
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
			top: 200,
			imageUrl: piece.url
		});
		var quantity = _fabricCanvas.getObjects().length;
		imgInstance.scale(0.20);
		imgInstance.perPixelTargetFind = true;
		imgInstance.targetFindTolerance = 4;
		imgInstance.on('selected', function () {
			selectionChanged(quantity);
		});
		_fabricCanvas.add(imgInstance);
		_fabricCanvas.setActiveObject(_fabricCanvas.item(quantity));
		selectionChanged(quantity);
	};
	img.src = piece.url;
	console.log(GameCreatorStore.getPieces());
}

module.exports = GameCreatorStore;
