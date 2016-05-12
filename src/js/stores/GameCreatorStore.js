var URLS = require('../config/config').urls;
var LoginStore = require('./LoginStore');
var LoginAction = require('../actions/LoginAction');
var GameAction = require('../actions/GameAction');

var Dispatcher = require('../dispatchers/Dispatcher');
var GameCreatorConstants = require('../constants/GameCreatorConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'default_creator_event';
var apiRootUrl = require('../config/config').urls.server.root;

var _pieces = [];
var _staticPieces = [
	[
		[]
	]
];
var _staticPiecesFolderStructure = {};
var _fabricCanvas = null;
var _loadedData = {};
var _currentGameId = null;
var _gamecreatorList = [];

var GameCreatorStore = _.extend({}, EventEmitter.prototype, {
	getPieces: function () {
		_pieces = _fabricCanvas.getObjects().map(function (object) {
			return {
				url: object.imageUrl
			};
		});
		return _pieces;
	},
	getPencilOptions: function () {
		return {
			size: _fabricCanvas.freeDrawingBrush.width,
			color: _fabricCanvas.freeDrawingBrush.color
		};
	},
	getActiveGameCreator: function () {
		if (!_loadedData) {
			console.log('ERROR: Tried to get active gamecreator, but active data was null');
			return;
		}
		return _loadedData;
	},
	getGameCreatorList: function () {
		return _gamecreatorList;
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
		_staticPiecesFolderStructure = action.imageFolderStructure;
		GameCreatorStore.emitChange(GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.emitChange(CHANGE_EVENT);
		break;
	case GameCreatorConstants.SET_CANVAS:
		_fabricCanvas = new fabric.Canvas(action.id);
		_fabricCanvas.on('selection:cleared', selectionChanged);
		break;
	case GameCreatorConstants.SET_SELECTED_INDEX:
		if (action.index < 0) _fabricCanvas.deactivateAll().renderAll();
		else _fabricCanvas.setActiveObject(_fabricCanvas.item(action.index));
		selectionChanged(action.index);
		break;
	case GameCreatorConstants.CLEAR_GAMECREATOR_STORE:
		_fabricCanvas = new fabric.Canvas(action.id);
		_fabricCanvas.on('selection:cleared', selectionChanged);
		_loadedData = null;
		GameCreatorStore.emitChange(GameCreatorConstants.GAMECREATORE_STORE_CLEARED);
		break;
	case GameCreatorConstants.SAVE_GAMECREATOR_JSON:
		saveGameAsJson();
		break;
	case GameCreatorConstants.SAVE_GAMECREATOR_PNG:
		saveGameAsPng();
		break;
	case GameCreatorConstants.DELETE_SELECTED_PIECE_FROM_CREATOR:
		deleteSelectedPiece();
		GameCreatorStore.emitChange(GameCreatorConstants.PIECE_DELETED_FROM_CREATOR);
		break;
	case GameCreatorConstants.ROTATE_CURRENT_SELECTED_PIECE:
		rotateSelectedPiece(action.next);
		break;
	case GameCreatorConstants.CHANGE_FREEDRAW_STATE:
		changeFreedrawState();
		break;
	case GameCreatorConstants.SET_PENCIL_OPTIONS:
		setPencilOptions(action.options);
		break;
	case GameCreatorConstants.MOVE_SELECTED_PIECE:
		moveSelectedPieces(action.direction);
		break;
	case GameCreatorConstants.ITERATE_SELECTED_PIECES_DEPTH:
		iterateSelectedPiecesDepth(action.direction);
		break;
	case GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER:
		if (action.list) {
			if (action.list.length > 0) _gamecreatorList = action.list;
			else _gamecreatorList = [];
		}
		else break;
		if (action.gameId) _currentGameId = action.gameId;
		else _currentGameId = null;
		GameCreatorStore.emitChange(GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER);
		break;
	case GameCreatorConstants.SET_LOADED_DATA_TO_ID:
		setCanvasToGameCreatorId(action.gameCreatorId);
		break;
	case GameCreatorConstants.SET_CREATOR_NAME:
		if (!_loadedData) {
			_loadedData = {};
		}
		_loadedData.title = action.creatorName;
		saveGameAsJson();
		break;
	}
});

function setCanvasToGameCreatorId (gameCreatorId) {
	if (_loadedData) {
		if (_loadedData._id) saveGameAsJson();
	}
	_gamecreatorList.every(function (gamecreator) {
		if (gameCreatorId === gamecreator._id) {
			_fabricCanvas.clear();
			_fabricCanvas.loadFromJSON(gamecreator.json, _fabricCanvas.renderAll.bind(_fabricCanvas));

			setLoadedData(gamecreator);
			return false;
		}
		return true;
	});
}

function setLoadedData (gamecreator) {
	_loadedData = gamecreator;
	GameCreatorStore.emitChange(GameCreatorConstants.ACTIVE_DATA_CHANGED);
}

function changeFreedrawState () {
	_fabricCanvas.isDrawingMode = !_fabricCanvas.isDrawingMode;
	GameCreatorStore.emitChange(GameCreatorConstants.FREEDRAW_STATE_CHANGED, _fabricCanvas.isDrawingMode);
}

function setPencilOptions (options) {
	if (options['size'] > 0) {
		_fabricCanvas.freeDrawingBrush.width = options['size'];
	}
	if (options['color']) {
		_fabricCanvas.freeDrawingBrush.color = options['color'];
	}
	GameCreatorStore.emitChange(GameCreatorConstants.PENCIL_OPTIONS_CHANGED);
}

function iterateSelectedPiecesDepth (direction) {
	var objects = _fabricCanvas.getObjects();
	var iterateIndexes = [];
	objects.forEach(function (object, index) {
		if (object.get('active')) {
			iterateIndexes.push(index);
		}
	});
	var lastObjectIndexDeniedMove = -1;
	if (direction === 'in') {
		iterateIndexes.forEach(function (objectIndex, index) {
			if (lastObjectIndexDeniedMove !== (objectIndex - 1)) {
				_fabricCanvas.sendBackwards(objects[objectIndex]);
				// iterateIndexes[index] = objectIndex - 1;
			}
			else lastObjectIndexDeniedMove = objectIndex;
		});
	}
	else if (direction === 'out') {
		lastObjectIndexDeniedMove = objects.length;
		iterateIndexes.reverse();
		iterateIndexes.forEach(function (objectIndex, index) {
			if (lastObjectIndexDeniedMove !== (objectIndex + 1)) {
				_fabricCanvas.bringForward(objects[objectIndex]);
				// iterateIndexes[index] = objectIndex + 1;
			}
			else lastObjectIndexDeniedMove = objectIndex;
		});
	}
}

function moveSelectedPieces (direction) {
	var deltaX = 0;
	var deltaY = 0;
	var moveQuantity = 10;
	switch (direction) {
	case 'right':
		deltaX = moveQuantity;
		break;
	case 'left':
		deltaX = -moveQuantity;
		break;
	case 'down':
		deltaY = moveQuantity;
		break;
	case 'up':
		deltaY = -moveQuantity;
		break;
	}
	_fabricCanvas.getObjects().forEach(function (object) {
		if (object.get('active')) {
			object.set('left', object.get('left') + deltaX);
			object.set('top', object.get('top') + deltaY);
		}
	});
	_fabricCanvas.renderAll();
}

function selectionChanged (index) {
	if (index === undefined) {
		index = -1;
	}
	removeObjectsOutsideCanvas();
	GameCreatorStore.emitChange(GameCreatorConstants.PIECE_WAS_SELECTED, index);
}

function deleteSelectedPiece () {
	_fabricCanvas.getObjects().forEach(function (object) {
		if (object.get('active')) {
			object.remove();
			deleteSelectedPiece();
		}
	});
}

function rotateSelectedPiece (rotateToNext) {
	_fabricCanvas.getObjects().forEach(function (object) {
		if (object.get('active')) {
			if (object.imageUrl) {
				var newSrc = findNextRotationImage(rotateToNext, object);
				var newImg = new Image();
				newImg.crossOrigin = 'Anonymous';
				newImg.onload = function () {
					var currentObj = object;
					var oldWidth = currentObj.width;
					var oldHeight = currentObj.height;
					currentObj.setElement(newImg);
					currentObj.setCoords();
					var widthDiff = (oldWidth - currentObj.width) / 10;
					var heightDiff = (oldHeight - currentObj.height) / 10;
					currentObj.set({
						left: currentObj.left + widthDiff,
						top: currentObj.top + heightDiff,
						imageUrl: newSrc
					});
					_fabricCanvas.renderAll();
				};
				newImg.src = newSrc;
			}
		}
	});
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
	};
	img.src = piece.url;
}

function removeObjectsOutsideCanvas () {
	_fabricCanvas.getObjects().forEach(function (object) {
		if (isOutsideBorder(object)) {
			object.remove();
		}
	});
	var objects = _fabricCanvas.getObjects();
	for (var i = 0; i < objects.length; i++) {
		if (isOutsideBorder(objects[i])) {
			objects[i].remove();
			i--;
		}
	}
}

function isOutsideBorder (object) {
	var width = _fabricCanvas.getWidth();
	var height = _fabricCanvas.getHeight();
	var bounding = object.getBoundingRect();
	if (bounding.left + bounding.width < 0) {
		return true;
	}
	else if (bounding.left > width) {
		return true;
	}
	else if (bounding.top + bounding.height < 0) {
		return true;
	}
	else if (bounding.top > height) {
		return true;
	}
	else return false;
}

function saveGameAsJson () {
	var requestAction = null;
	var url = null;
	if (_currentGameId === null) {
		console.log('ERROR - Tried to save gamecreator to undefined game');
		return;
	}
	if (!_loadedData._id) {
		requestAction = 'POST';
		url = URLS.api.unpublishedGames + '/' + _currentGameId + '/gameCreators';
	}
	else {
		requestAction = 'PUT';
		url = URLS.api.unpublishedGames + '/' + _currentGameId + '/gameCreators/' + _loadedData._id;
	}
	if (!_loadedData.title) {
		_loadedData.title = 'Unnamed Creator';
	}
	$.ajax({
		type: requestAction,
		url: url,
		data: JSON.stringify({
			json: _fabricCanvas.toJSON(),
			title: _loadedData.title
		}),
		headers: {
			'Authorization': LoginStore.getToken()
		},
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		success: onSaveJsonSuccessResponse
	});
}

function saveGameAsPng () {
	if (!_loadedData) {
		console.log('WARNING - Saved game without loaded data');
		return;
	}
	if (_currentGameId === null) {
		console.log('ERROR - Tried to save gamecreator to undefined game');
		return;
	}
	_fabricCanvas.deactivateAll().renderAll();
	var data = _fabricCanvas.toDataURL().replace('data:image/png;base64,', '');
	var blob = b64toBlob(data, 'image/png');
	var formData = new FormData();
	formData.append('image', blob, 'gamecreatorimg');
	var url = URLS.api.unpublishedGames +
		'/' + _currentGameId +
		'/gameCreators/' +
		_loadedData._id +
		'/image' +
		'?' + $.param({overwrite: 'true'});
	$.ajax({
		type: 'PUT',
		url: url,
		data: formData,
		headers: {
			'Authorization': LoginStore.getToken()
		},
		dataType: 'json',
		contentType: false,
		processData: false,
		success: onRequestSuccess,
		statusCode: {
			409: onSavePngConflictResponse
		}
	});
}

function onSaveJsonSuccessResponse (data) {
	var isNew = _gamecreatorList.every(function (gamecreator, index) {
		if (gamecreator._id === data._id) {
			_gamecreatorList[index] = $.extend(true, {}, data);
			if (!_loadedData._id) {
				setLoadedData(_gamecreatorList[index]);
			}
			return false;
		}
		return true;
	});
	if (isNew) {
		_gamecreatorList.unshift(data);
		if (!_loadedData._id) {
			setLoadedData(_gamecreatorList[0]);
		}
	}
	GameCreatorStore.emitChange(GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER);
}

function onRequestSuccess (data) {
	LoginAction.updateLoginProfile();
	GameAction.addImageToLocalGame({
		image: data.image
	});
	GameCreatorStore.emitChange(GameCreatorConstants.PNG_ADDED_TO_GAME);
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

function findNextRotationImage (rotateToNext, object) {
	var currentSrc = object.imageUrl.replace(apiRootUrl, '');
	var splittedSrc = currentSrc.split('/');
	if (currentSrc.indexOf('\\') > -1) {
		splittedSrc = currentSrc.split('\\');
	}
	splittedSrc.splice(0, 3);
	var url = '';
	_staticPiecesFolderStructure.children.forEach(function (piece) {
		if (piece.name === splittedSrc[0]) {
			piece.children.forEach(function (color) {
				if (color.name === splittedSrc[1]) {
					color.children.forEach(function (rotation, index) {
						if (rotation.name === splittedSrc[2]) {
							if (rotateToNext) {
								if (index + 1 > color.children.length - 1) {
									url = color.children[0].path;
								}
								else {
									url = color.children[(index + 1)].path;
								}
							}
							else {
								if (index - 1 < 0) {
									url = color.children[color.children.length - 1].path;
								}
								else {
									url = color.children[(index - 1)].path;
								}
							}
						}
					});
				}
			});
		}
	});
	url = apiRootUrl + '' + url;
	return url;
}

module.exports = GameCreatorStore;
