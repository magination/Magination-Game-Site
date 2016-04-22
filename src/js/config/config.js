var restApiRoot = 'https://localhost:8000/api/';
var imgRoot = 'http://localhost:8080/public/img/';
var config = {
	urls: {
		api: {
			users: restApiRoot + 'users',
			games: restApiRoot + 'games',
			login: restApiRoot + 'login',
			confirmation: restApiRoot + 'confirmation',
			resendEmail: restApiRoot + 'resendVerificationEmail',
			forgotpassword: restApiRoot + 'login' + '/forgot',
			comments: restApiRoot + 'comments'
		},
		img: {
			listMarkerBlueSingle: imgRoot + 'blue-single-piece-marker.png',
			favicon: imgRoot + 'favicon.ico',
			pieceSingleWhite: imgRoot + 'magination-pieces/piece-white-single.png',
			pieceDoubleWhite: imgRoot + 'magination-pieces/piece-white-double.png',
			pieceTripleWhite: imgRoot + 'magination-pieces/piece-white-triple.png',
			pieceSingleBlue: imgRoot + 'magination-pieces/piece-blue-single.png',
			pieceDoubleBlue: imgRoot + 'magination-pieces/piece-blue-double.png',
			pieceTripleBlue: imgRoot + 'magination-pieces/piece-blue-triple.png',
			peopleBlue: imgRoot + 'people.png'
		}
	}
};
module.exports = config;
