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
			maxWidth: '33%',
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
	},
	imageList: {
		outer: {
			height: '0',
			paddingBottom: '50%',
			width: '100%',
			position: 'relative',
			border: '2px solid ' + Colors.blueDark,
			borderRadius: '5'
		},
		outerBorderLess: {
			height: '0',
			paddingBottom: '50%',
			width: '100%',
			position: 'relative'
		},
		inner: {
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: '0',
			left: '0'
		},
		img: {
			maxHeight: '100%',
			maxWidth: '100%',
			padding: '10',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translateX(-50%) translateY(-50%)'
		},
		upperLeft: {
			display: 'inline-block',
			position: 'absolute',
			padding: '2',
			top: '0',
			left: '0'
		},
		upperRight: {
			display: 'inline-block',
			position: 'absolute',
			padding: '2',
			top: '0',
			right: '0'
		},
		droppableDiv: {
			marginBottom: '10'
		}
	}
};
module.exports = ContainerStyles;
