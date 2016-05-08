var URLS = require('../config/config').urls;
var LoginStore = require('./LoginStore');
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
var _loadedData = null;

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
		break;
	case GameCreatorConstants.SAVE_GAMECREATOR_JSON:
		saveGameAsJson();
		break;
	case GameCreatorConstants.SAVE_GAMECREATOR_PNG:
		saveGameAsPng(action.filename);
		break;
	case GameCreatorConstants.DELETE_SELECTED_PIECE_FROM_CREATOR:
		deleteSelectedPiece();
		GameCreatorStore.emitChange(GameCreatorConstants.PIECE_DELETED_FROM_CREATOR);
		break;
	}
});

function selectionChanged (index) {
	if (index === undefined) {
		index = -1;
	}
	GameCreatorStore.emitChange(GameCreatorConstants.PIECE_WAS_SELECTED, index);
}

function deleteSelectedPiece () {
	_fabricCanvas.getActiveObject().remove();
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
			selectionChanged(_fabricCanvas.getObjects().indexOf(imgInstance));
		});
		_fabricCanvas.add(imgInstance);
		_fabricCanvas.setActiveObject(_fabricCanvas.item(quantity));
		selectionChanged(quantity);
		saveGameAsJson();
	};
	img.src = piece.url;
}

function saveGameAsJson () {
	var jsonData = JSON.stringify(_fabricCanvas.toJSON());
	var requestAction = null;
	var url = null;
	if (_loadedData === null) {
		requestAction = 'POST';
		url = URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/gameCreatorObjects';
	}
	else {
		requestAction = 'PUT';
		url = URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/gameCreatorObjects/' + _loadedData._id;
	}
	$.ajax({
		type: requestAction,
		url: url,
		data: JSON.stringify({
			json: jsonData
		}),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: false,
		processData: false,
		success: onSaveJsonSuccessResponse
	});
}

function saveGameAsPng (filename) {
	if (!_loadedData) {
		console.log('never saved');
		return;
	}
	var data = _fabricCanvas.toDataURL().replace('data:image/png;base64,', '');
	var blob = b64toBlob(data, 'image/png');
	var formData = new FormData();
	formData.append('image', blob, filename);
	formData.append('filename', filename);
	formData.append('overwrite', 'true'); /* TODO SEND FALSE FIRST REQUEST, AND TRUE WHEN USER PROMPTS YES TO OVERWRITE*/
	$.ajax({
		type: 'PUT',
		url: URLS.api.users + '/' + LoginStore.getLoginProfile()._id + '/gameCreatorObjects/' + _loadedData._id + '/image',
		data: formData,
		headers: {
			'Authorization': LoginStore.getToken()
		},
		contentType: false,
		processData: false,
		success: onRequestSuccess,
		statusCode: {
			409: onSavePngConflictResponse
		}
	});
}

function onSaveJsonSuccessResponse (data) {
	_loadedData = data;
}

function onRequestSuccess (data) {
	console.log(data);
}

function onSavePngConflictResponse (data) {
	console.log(data);
}

function b64toBlob (b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {type: contentType});
	return blob;
}

module.exports = GameCreatorStore;
