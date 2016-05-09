var Colors = require('./Colors');
var ButtonStyles = {
	Magination: {
		backgroundColor: Colors.blueDark,
		color: 'white'
	},
	ToggledButton: {
		backgroundColor: Colors.blueLight,
		border: '1px solid white',
		color: 'white'
	},
	MaginationGameViewButton: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		width: '100%',
		height: '50',
		marginTop: '40'
	},
	RatingStar: {
		color: Colors.blue,
		fontSize: '25'
	},
	MaginationFillParent: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		width: '100%',
		borderWidth: '0',
		padding: '10'
	},
	MaginationSubmit: {
		backgroundColor: Colors.blueDark,
		color: 'white'
	},
	MaginationRule: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		width: '50%',
		marginLeft: '5',
		padding: '10'
	},
	MyGames: {
		myGamesButton: function (customColor) {
			return {
				color: 'white',
				width: '100%',
				paddingTop: '10',
				paddingBottom: '10',
				paddingLeft: '20',
				paddingRight: '20',
				borderWidth: '0',
				borderRadius: '10',
				marginTop: '10',
				backgroundColor: !customColor ? Colors.blueDark : customColor
			};
		}
	},
	Game: {
		gameButton: function (customColor) {
			return {
				color: 'white',
				width: '100%',
				paddingTop: '10',
				paddingBottom: '10',
				paddingLeft: '20',
				paddingRight: '20',
				borderWidth: '0',
				borderRadius: '10',
				backgroundColor: !customColor ? Colors.blueDark : customColor
			};
		}
	},
	CreateNewGame: {
		color: 'white',
		width: '100%',
		paddingTop: '25',
		paddingBottom: '25',
		borderWidth: '0',
		borderRadius: '10',
		backgroundColor: Colors.blueDark
	}
};

module.exports = ButtonStyles;
