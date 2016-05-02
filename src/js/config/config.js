var restApiRoot = 'https://localhost:8000/api/';
var serverRoot = 'http://localhost:8080/public/';
var imgRoot = serverRoot + 'img/';
var config = {
	urls: {
		api: {
			users: restApiRoot + 'users',
			games: restApiRoot + 'games',
			login: restApiRoot + 'login',
			confirmation: restApiRoot + 'confirmation',
			resendEmail: restApiRoot + 'resendVerificationEmail',
			forgotpassword: restApiRoot + 'login' + '/forgot',
			comments: restApiRoot + 'comments',
			verifyEmail: restApiRoot + 'login/update',
			saveGame: restApiRoot + 'unpublishedGames'
		},
		img: {
			starWhite: imgRoot + 'starWhiteTransparent100x100.png',
			listMarkerBlueSingle: imgRoot + 'blue-single-piece-marker.png',
			favicon: imgRoot + 'favicon.ico',
			pieceSingleWhite: imgRoot + 'magination-pieces/piece-white-single.png',
			pieceDoubleWhite: imgRoot + 'magination-pieces/piece-white-double.png',
			pieceTripleWhite: imgRoot + 'magination-pieces/piece-white-triple.png',
			pieceSingleWhiteNoPadding: imgRoot + 'magination-pieces/piece-white-single-no-padding.png',
			pieceDoubleWhiteNoPadding: imgRoot + 'magination-pieces/piece-white-double-no-padding.png',
			pieceTripleWhiteNoPadding: imgRoot + 'magination-pieces/piece-white-triple.png',
			pieceSingleBlueNoPadding: imgRoot + 'magination-pieces/piece-blue-single-no-padding.png',
			pieceDoubleBlueNoPadding: imgRoot + 'magination-pieces/piece-blue-double-no-padding.png',
			pieceTripleBlueNoPadding: imgRoot + 'magination-pieces/piece-blue-triple.png',
			pieceSingleBlue: imgRoot + 'magination-pieces/piece-blue-single.png',
			pieceDoubleBlue: imgRoot + 'magination-pieces/piece-blue-double.png',
			pieceTripleBlue: imgRoot + 'magination-pieces/piece-blue-triple.png',
			peopleBlue: imgRoot + 'people.png'
		}
	}
};
module.exports = config;
