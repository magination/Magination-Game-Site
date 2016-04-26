var Colors = require('./Colors');
var ButtonStyles = {
	Magination: {
		backgroundColor: Colors.blueDark,
		color: 'white'
	},
	RatingStar: {
		color: Colors.blue,
		fontSize: '25'
	},
	MaginationFillParent: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		width: '100%'
	},
	MaginationRule: {
		backgroundColor: Colors.blueDark,
		color: 'white',
		width: '50%',
		marginLeft: '5'
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
	}
};

module.exports = ButtonStyles;
