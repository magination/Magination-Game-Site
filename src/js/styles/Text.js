var Colors = require('./Colors');

var TextStyles = {
	blueHeader: {
		color: Colors.blueDark
	},
	clickableBlueHeader: {
		color: Colors.blueDark,
		cursor: 'pointer'
	},
	clickableHeader: {
		cursor: 'pointer'
	},
	white: {
		color: 'white'
	},
	blue: {
		color: Colors.blue
	},
	blueDark: {
		color: Colors.blueDark
	},
	red: {
		color: Colors.red
	},
	green: {
		color: Colors.green
	},
	RatingStarWhite: {
		color: 'white',
		fontSize: '30'
	},
	textArea: {
		resize: 'none',
		height: '220px'
	},
	chevronGlyph: {
		fontSize: '50px',
		color: Colors.blue
	},
	alignRight: {
		textAlign: 'right'
	},
	alignCenter: {
		textAlign: 'center',
		verticalAlign: 'middle'
	},
	glyphIcon: {
		alignCenterBlue: {
			textAlign: 'center',
			verticalAlign: 'center',
			color: Colors.blue
		}
	},
	gameView: {
		paddingLessHeader: {
			margin: '0',
			padding: '0',
			color: Colors.blueDark
		}
	},
	FrontPage: {
		gameContainerTitle: {
			color: 'white',
			verticalAlign: 'middle',
			width: '100%'
		}
	},
	CreateGame: {
		error: {
			color: Colors.red,
			padding: 2,
			verticalAlign: 'middle'
		},
		success: {
			color: Colors.green,
			padding: 2,
			verticalAlign: 'middle'
		}
	},
	Register: {
		error: {
			color: Colors.red
		}
	}
};

module.exports = TextStyles;
