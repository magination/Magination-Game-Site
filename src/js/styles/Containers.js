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
			top: '15%',
			right: '0',
			display: 'inline-block',
			position: 'absolute'
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
		aspectOneToOne: {
			outer: {
				height: '0',
				paddingBottom: '100%',
				width: '100%',
				position: 'relative',
				border: '2px solid ' + Colors.blueDark,
				borderRadius: '5'
			},
			outerBorderLess: {
				height: '0',
				paddingBottom: '100%',
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
				transform: 'translateX(-50%) translateY(-50%)',
				msTransform: 'translateX(-50%) translateY(-50%)',
				WebkitTransition: 'translateX(-50%) translateY(-50%)',
				userSelect: 'none',
				WebkitUserSelect: 'none',
				msUserSelect: 'none'
			}
		},
		aspectTwoToOne: {
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
				transform: 'translateX(-50%) translateY(-50%)',
				msTransform: 'translateX(-50%) translateY(-50%)',
				WebkitTransition: 'translateX(-50%) translateY(-50%)',
				userSelect: 'none',
				WebkitUserSelect: 'none',
				msUserSelect: 'none'
			}
		},
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
			transform: 'translateX(-50%) translateY(-50%)',
			msTransform: 'translateX(-50%) translateY(-50%)',
			WebkitTransition: 'translateX(-50%) translateY(-50%)'
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
	},
	gameList: {
		regular: {
			cursor: 'pointer',
			marginBottom: '10'
		},
		hovered: {
			cursor: 'pointer',
			backgroundColor: Colors.blueTransparent,
			marginBottom: '10'
		}
	},
	gameView: {
		shortDescription: {
			border: '1px solid ' + Colors.blue,
			borderRadius: '0',
			padding: '5'
		}
	},
	moderatorPage: {
		reportListElementContainer: {
			border: '1px solid ' + Colors.gray,
			marginTop: '10'
		}
	},
	feedback: {
		position: 'fixed',
		right: 10,
		bottom: 10,
		zIndex: 9999999999 // always in front
	},
	FrontPage: {
		gameContainer: {
			borderRadius: 10,
			padding: 15,
			width: '100%',
			border: '2px solid ' + Colors.blue
		},
		FrontPageGame: {
			container: {
				padding: 10,
				borderRadius: 5,
				border: '2px solid ' + Colors.blue,
				cursor: 'pointer'
			},
			containerHovered: {
				padding: 10,
				borderRadius: 5,
				border: '2px solid ' + Colors.blue,
				backgroundColor: Colors.blueTransparent,
				cursor: 'pointer'
			},
			imageBorder: {
				padding: 5,
				border: '1px solid white',
				borderRadius: 5
			}
		}
	}
};
module.exports = ContainerStyles;
