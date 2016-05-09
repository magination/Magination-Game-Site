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
	red: {
		color: Colors.red
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
		deleteListItem: {
			color: Colors.red,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translateX(-50%) translateY(-50%)'
		}
	}
};

module.exports = TextStyles;
