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
			favicon: imgRoot + 'favicon.ico',
			pieceSingleBlue: imgRoot + 'magination-pieces/piece-blue-single.png',
			pieceDoubleBlue: imgRoot + 'magination-pieces/piece-blue-double.png',
			pieceTripleBlue: imgRoot + 'magination-pieces/piece-blue-triple.png'
		}
	}
};
module.exports = config;
