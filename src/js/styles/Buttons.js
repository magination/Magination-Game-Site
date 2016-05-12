var Colors = require('./Colors');
var ButtonStyles = {
	Magination: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		borderWidth: 0
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
		borderWidth: 0
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
		padding: '10',
		marginTop: '10'
	},
	MaginationFillParentCustom: function (customColor) {
		return {
			backgroundColor: !customColor ? Colors.blueDark : customColor,
			color: 'white',
			width: '100%',
			borderWidth: '0',
			padding: '10',
			marginTop: '10'
		};
	},
	MaginationSettingsButton: {
		customColor: function (customColor) {
			return {
				backgroundColor: !customColor ? Colors.blueDark : customColor,
				color: 'white',
				width: '100%',
				borderWidth: '0',
				padding: '10',
				marginTop: '10'
			};
		}
	},
	MaginationSubmit: {
		backgroundColor: Colors.blueDark,
		color: 'white'
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
	},
	report: {
		color: 'white',
		width: '100%',
		borderWidth: '0',
		height: '50',
		backgroundColor: Colors.redDark
	},
	submit: {
		color: 'white',
		paddingTop: '10',
		paddingBottom: '10',
		borderWidth: '0',
		backgroundColor: Colors.greenDark
	},
	cancel: {
		color: 'white',
		paddingTop: '10',
		paddingBottom: '10',
		borderWidth: '0',
		backgroundColor: Colors.yellowDark
	},
	delete: {
		color: 'white',
		paddingTop: '10',
		paddingBottom: '10',
		borderWidth: '0',
		backgroundColor: Colors.red
	},
	goBack: {
		color: 'white',
		paddingTop: '10',
		paddingBottom: '10',
		borderWidth: '0',
		backgroundColor: Colors.blue
	},
	confirmButton: {
		yes: {
			color: 'white',
			backgroundColor: Colors.greenDark,
			borderWidth: 0,
			paddingTop: 5,
			paddingBottom: 5,
			width: '100%'
		},
		no: {
			color: 'white',
			backgroundColor: Colors.redDark,
			borderWidth: 0,
			paddingTop: 5,
			paddingBottom: 5,
			width: '100%'
		}
	}
};

module.exports = ButtonStyles;
