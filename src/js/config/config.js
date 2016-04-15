var restApiRoot = 'https://localhost:8000/api/';
var config = {
	urls: {
		api: {
			users: restApiRoot + 'users',
			games: restApiRoot + 'games',
			login: restApiRoot + 'login',
			confirmation: restApiRoot + 'confirmation',
			resendEmail: restApiRoot + 'resendVerificationEmail'
		}
	}
};
module.exports = config;
