var Dispatcher = require('../dispatchers/Dispatcher');
var GameCreatorConstants = require('../constants/GameCreatorConstants');
var URLS = require('../config/config').urls;
var GameCreatorActions = {
	addPieceByUrl: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.ADD_PIECE_TO_CREATOR,
			piece: data.piece
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
			actionType: GameCreatorConstants.SAVE_GAMECREATOR_PNG,
			filename: data.filename
		});
	},
	saveCurrentToJson: function () {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.SAVE_GAMECREATOR_JSON
		});
	},
	clearStore: function () {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.CLEAR_GAMECREATOR_STORE
		});
	}
};

function onGetStaticPiecesSuccessResponse (data) {
	var pieces = parseFolderStructureToPieces(data);
	Dispatcher.dispatch({
		actionType: GameCreatorConstants.SET_STATIC_PIECES,
		pieces: pieces
	});
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
