
var constants = {
	PATHS: {
		discover: '/discover',
		creategame: '/create',
		register: '/register',
		forgotpassword: '/forgotpassword',
		confirmforgotpassword: 'confirmforgotpassword/:id',
		game: '/game'
	},
	SET_CURRENT_PATH: 'set_current_path',
	NAVIGATE: 'navigate',
	NAVIGATE_PREVIOUS: 'navigate_previous',

	DEFAULT_DESTINATION: '/discover',
	NOT_LOGGED_IN_EXCLUSIVE_PATHS: [
		'register',
		'confirmation'
	],
	LOGGED_IN_EXCLUSIVE_PATHS: [
		'create',
		'settings'
	],
	isLegalDestination: function (loginState, destination) {
		var isLegal = true;
		if (loginState) {
			this.NOT_LOGGED_IN_EXCLUSIVE_PATHS.every(function (element) {
				if (destination.indexOf(element) > -1) {
					isLegal = false;
					return false;
				}
				return true;
			});
		}
		else {
			this.LOGGED_IN_EXCLUSIVE_PATHS.every(function (element) {
				if (destination.indexOf(element) > -1) {
					isLegal = false;
					return false;
				}
				return true;
			});
		}
		return isLegal;
	}
};
module.exports = constants;
