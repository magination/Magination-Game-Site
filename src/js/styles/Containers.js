var Colors = require('./Colors');
var ContainerStyles = {
	informationContainer: {
		backgroundColor: Colors.blue,
		borderRadius: '5',
		textAlign: 'center'
	},
	searchContainer: {
		backgroundColor: Colors.blue,
		borderRadius: '5',
		textAlign: 'center',
		padding: '40'
	},
	imgCarouselContainer: {
		border: '5px solid ' + Colors.blue,
		borderRadius: '5',
		width: '100%',
		height: '100%'
	},
	imgCarouselChevronContainer: {
		position: 'absolute',
		textAlign: 'center'
	},
	numberOfPlayersContainer: {
		backgroundColor: Colors.blueLight
	},
	gameInListContainer: {
		border: '4px solid ' + Colors.blue,
		borderRadius: '5',
		padding: '5'
	},
	ruleList: {
		leftIcon: {
			color: Colors.blue,
			display: 'inline-block',
			verticalAlign: 'middle',
			paddingRight: '5'
		},
		input: {
			width: '50%',
			display: 'inline-block'
		},
		rightIcon: {
			color: Colors.blue,
			display: 'inline-block',
			verticalAlign: 'middle',
			paddingLeft: '5'
		}
	},
	collapse: {
		child: {
			paddingTop: '20',
			paddingBottom: '20'
		},
		parent: {
			paddingTop: '0',
			paddingBottom: '0',
			marginTop: '0',
			marginBottom: '0'
		}
	},
	hidden: {
		height: '0'
	},
	paddingLess: {
		padding: '0'
	}
};

module.exports = ContainerStyles;
