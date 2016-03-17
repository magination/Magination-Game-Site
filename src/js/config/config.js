var restApiRoot = "http://localhost:8000/api/";
var config = {
	urls: {
		api: {
			register: restApiRoot+"register",
			games: restApiRoot+"games",
			login: restApiRoot+"login"
		}
	}
};
module.exports = config;

