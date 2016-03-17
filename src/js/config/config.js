var restApiRoot = "http://localhost:8000/api/";
var config = {
	urls: {
		api: {
			users: restApiRoot+"register",
			games: restApiRoot+"games",
			login: restApiRoot+"login"
		}
	}
};
module.exports = config;

