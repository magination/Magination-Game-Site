var Dispatcher = require('../dispatchers/Dispatcher');
var GameCreatorConstants = require('../constants/GameCreatorConstants');
var URLS = require('../config/config').urls;
var GameCreatorActions = {
	addPieceByUrl: function (data) {
		Dispatcher.dispatch({
			actionType: GameCreatorConstants.ADD_PIECE_TO_CREATOR,
			url: data.url
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
			var aColor = color.children.map(function (img) {
				return ('' + URLS.server.root + '' + img.path);
			});
			return aColor;
		});
		return aPiece;
	});
	return pieces;
}

module.exports = GameCreatorActions;
