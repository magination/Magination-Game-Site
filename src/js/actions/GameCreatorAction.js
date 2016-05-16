var Dispatcher = require('../dispatchers/Dispatcher');
var GameCreatorConstants = require('../constants/GameCreatorConstants');
// var LoginStore = require('../stores/LoginStore');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');
var LoginStore = require('../stores/LoginStore');

var URLS = require('../config/config').urls;

var isListening = false;

var GameCreatorActions = {
	addPieceByUrl: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.ADD_PIECE_TO_CREATOR,
			piece: data.piece
		});
	},
	deleteCurrentSelectedPiece: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.DELETE_SELECTED_PIECE_FROM_CREATOR
		});
	},
	deleteGameCreator: function (data) {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.unpublishedGames + '/' + GameStore.getGame()._id + '/gameCreators/' + data.gameCreatorId,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			dataType: 'json',
			statusCode: {
				200: onDeleteSuccessResponse
			}
		});
	},
	setPencilOptions: function (options) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SET_PENCIL_OPTIONS,
			options: options
		});
	},
	setStaticPiecesFromServer: function (data) {
		$.ajax({
			type: 'GET',
			url: URLS.api.gamecreator.staticimages,
			dataType: 'json',
			statusCode: {
				200: onGetStaticPiecesSuccessResponse
			}
		});
	},
	changeFreeDrawState: function () {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.CHANGE_FREEDRAW_STATE
		});
	},
	rotateCurrentSelectedPiece: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.ROTATE_CURRENT_SELECTED_PIECE,
			next: data.next
		});
	},
	setCanvas: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SET_CANVAS,
			id: data.id
		});
	},
	setSelectedObjectIndex: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SET_SELECTED_INDEX,
			index: data.index
		});
	},
	saveCurrentToPng: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SAVE_GAMECREATOR_PNG
		});
	},
	saveCurrentToJson: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SAVE_GAMECREATOR_JSON
		});
	},
	clearStore: function () {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.CLEAR_GAMECREATOR_STORE
		});
	},
	setActiveCreatorName: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SET_CREATOR_NAME,
			creatorName: data.creatorName
		});
	},
	moveSelectedPieces: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.MOVE_SELECTED_PIECE,
			direction: data.direction
		});
	},
	iterateSelectedPiecesDepth: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.ITERATE_SELECTED_PIECES_DEPTH,
			direction: data.direction
		});
	},
	fetchGameCreatorListFromServer: function (data) {
		if (!GameStore.getGame()) {
			return;
		}
		var gameId = GameStore.getGame()._id;
		if (!gameId) {
			console.warn('WARNING - Tried to fetch gamecreator list from server, but game id was undefined');
			return;
		}
		$.ajax({
			type: 'GET',
			url: URLS.api.unpublishedGames + '/' + gameId + '/gameCreators',
			dataType: 'json',
			statusCode: {
				200: onGetGameCreatorFullListSuccessResponse
			}
		});
	},
	setListeners: function () {
		if (isListening) {
			console.warn('WARNING - Tried to set listeners of GameCreatorAction, but it is already listening - aborted');
			return;
		}
		isListening = true;
		GameStore.addChangeListener(onLocalGameHasChanged, GameConstants.LOCAL_GAME_HAS_CHANGED);
	},
	removeListeners: function () {
		if (!isListening) {
			console.warn('WARNING - Tried to remove listeners of GameCreatorActions, but it is not listening (redundant action)');
			return;
		}
		isListening = false;
		GameStore.removeChangeListener(onLocalGameHasChanged, GameConstants.LOCAL_GAME_HAS_CHANGED);
	},
	loadCreatorId: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SET_LOADED_DATA_TO_ID,
			gameCreatorId: data.gameCreatorId
		});
	}
};

function onDeleteSuccessResponse (data) {
	Dispatcher.dispatch({
		actionType: GameCreatorConstants.GAMECREATOR_WAS_DELETED_ON_SERVER,
		gamecreator: data
	});
}

function onLocalGameHasChanged () {
	GameCreatorActions.fetchGameCreatorListFromServer();
}

function onGetGameCreatorFullListSuccessResponse (data) {
	Dispatcher.dispatch({
		actionType: GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER,
		list: data.gameCreators,
		gameId: GameStore.getGame()._id
	});
}

function onGetStaticPiecesSuccessResponse (data) {
	var pieces = [];
	var otherObjects = [];
	var piecesFolderStructure = {};
	data.children.forEach(function (type) {
		if (type.name === 'objects') {
			otherObjects = parseFolderStructureToOtherObjects(type);
		}
		else if (type.name === 'pieces') {
			piecesFolderStructure = type;
			pieces = parseFolderStructureToPieces(type);
		}
	});
	Dispatcher.dispatch({
		actionType: GameCreatorConstants.SET_STATIC_PIECES,
		pieces: pieces,
		imageFolderStructure: piecesFolderStructure,
		otherObjects: otherObjects
	});
}

function parseFolderStructureToOtherObjects (folderStructure) {
	var otherObjects = folderStructure.children.map(function (object) {
		return {
			url: ('' + URLS.server.root + '' + object.path)
		};
	});
	return otherObjects;
}

function parseFolderStructureToPieces (folderStructure) { /* hardcoded against the public folder of the pieces on the api backend */
	var pieces = [];
	pieces = folderStructure.children.map(function (piece) {
		var aPiece = piece.children.map(function (color) {
			var aColor = color.children.map(function (rotation) {
				var img = new Image();
				var url = ('' + URLS.server.root + '' + rotation.path);
				img.src = url;
				return {
					url: url
				};
			});
			return aColor;
		});
		return aPiece;
	});
	return pieces;
}

module.exports = GameCreatorActions;
