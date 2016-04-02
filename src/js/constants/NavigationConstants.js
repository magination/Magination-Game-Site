
var constants = {
	SET_CURRENT_PATH: 'set_current_path',
	NAVIGATE: 'navigate',
	NAVIGATE_PREVIOUS: 'navigate_previous',

	DEFAULT_DESTINATION: 'browse',
	NOT_LOGGED_IN_EXCLUSIVE_PATHS: [
		"login",
		"register",
		"confirmation"
	],
	LOGGED_IN_EXCLUSIVE_PATHS: [
		"upload"
	]
}
module.exports = constants;