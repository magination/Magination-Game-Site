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
		padding: '40',
		paddingTop: '10'
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
			paddingRight: '5',
			float: 'left'
		},
		input: {
			overflow: 'hidden'
		},
		rightIcon: {
			color: Colors.blue,
			verticalAlign: 'middle',
			textAlign: 'center',
			paddingLeft: '5',
			float: 'right',
			display: 'inline-block'
		}
	},
	imageContainer: {
		maginationBorderLeft: {
			padding: '5',
			maxWidth: '33%',
			minHeight: '100%',
			verticalAlign: 'middle',
			display: 'inline-block'
		},
		maginationBorderRight: {
			padding: '5',
			maxWidth: '33%',
			minHeight: '100%',
			verticalAlign: 'middle',
			display: 'inline-block'
		},
		maginationBorderCenter: {
			padding: '5',
			maxWidth: '34%',
			minHeight: '100%',
			verticalAlign: 'middle',
			display: 'inline-block',
			overflow: 'hidden'
		},
		imageListContainer: {
			whiteSpace: 'normal'
		}
	},
	image: {
		imageList: {
			border: '2px solid ' + Colors.blue,
			borderRadius: '5',
			verticalAlign: 'middle',
			maxWidth: '100%',
			padding: '5'
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
