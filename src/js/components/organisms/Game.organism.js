var React = require('react');
var ReactDOM = require('react-dom');
var NavigationStore = require('../../stores/NavigationStore');
var URLS = require('../../config/config.js').urls;
var Reviews = require('../molecules/game/Reviews.molecule');
var GameInformation = require('../molecules/game/GameInformation.molecule');
var ImageCarousel = require('../molecules/game/ImageCarousel.molecule');
var CustomList = require('../molecules/lists/CustomList.molecule');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var TextStyles = require('../../styles/Text');
var GameActionBar = require('../molecules/game/GameActionBar');

var Game = React.createClass({
	getInitialState: function () {
		return {
			game: {
				shortDescription: '',
				rules: [],
				images: [],
				alternativeRules: [],
				reviews: [],
				pieces: {
					singles: '',
					doubles: '',
					triples: ''
				},
				owner: {},
				otherObjects: []
			},
			gameInformationHeight: '0',
			shareGameIsShowing: false
		};
	},
	componentWillMount: function () {
		/* fetch game if it was linked to directly and not from the browse list*/
		if (shouldRequestGame()) {
			$.ajax({
				type: 'GET',
				url: URLS.api.games + '/' + getLastUrlId(),
				dataType: 'json',
				statusCode: {
					200: this.onGetGameSuccessResponse,
					404: this.onGetGameNotFoundResponse,
					500: function (data) {
						console.log('Internal Server Error: ' + data.message);
					}
				}
			});
		}
		else {
			/* shouldRequestGame checks if game is defined*/
			this.setState({
				game: NavigationStore.getNavigationState().data.game
			});
		}
	},
	componentDidUpdate: function () {
		/* Dangerous implementation.. should be reconsidered. It may be infinitely recursive if the height of gameinformation
			changes at every render.
		*/
		setTimeout(this.onGameInformationRendered, 0);
	},
	render: function () {
		var offset = 1;
		var leftWidth = 7;
		var rightWidth = 3;
		return (
			<div>
				<Row>
					<Col md={4} mdOffset={1}>
						<GameInformation ref='gameinformation' game={this.state.game} onCollapseFinished={this.onGameInformationRendered}/>
					</Col>
					<Col md={6}>
						<ImageCarousel width={'100%'} height={this.state.gameInformationHeight} imageUrls={this.state.game.images}/>
					</Col>
					<Col md={1}>
					</Col>
				</Row>
				<Row style={{marginTop: '10'}}><Col md={4} mdOffset={1}><GameActionBar game={this.state.game} gameId={getLastUrlId()}/></Col></Row>
				<Col md={leftWidth + rightWidth} mdOffset={offset}><hr/></Col>
				<Row>
					<Col md={leftWidth} mdOffset={offset}>
						<h2 style={TextStyles.gameView.paddingLessHeader}>Description</h2>
						<h4>{this.state.game.shortDescription}</h4>
					</Col>
					<Col md={rightWidth}>
					</Col>
					<Col md={offset}>
					</Col>
				</Row>
				<Row>
					<Col md={leftWidth + rightWidth} mdOffset={offset}>
						<CustomList title='Rules' listElements={this.state.game.rules}/>
					</Col>
				</Row>
				<Row>
					<Col md={leftWidth} mdOffset={offset}>
						{this.gameHasAlternativeRules() ? <CustomList title='Alternative rules' listElements={this.state.game.alternativeRules}/> : null}
					</Col>
					<Col md={rightWidth} style={{textAlign: 'right'}}>
					</Col>
					<Col md={offset}>
					</Col>
				</Row>
				<Col md={leftWidth + rightWidth} mdOffset={offset}><hr/></Col>
				<Reviews id={this.state.game._id} reviews={this.state.game.reviews} offset={offset} leftWidth={leftWidth} rightWidth={rightWidth}/>
				<Col md={leftWidth + rightWidth} mdOffset={offset}><hr/></Col>
			</div>
		);
	},
	onGameInformationRendered: function () {
		var informationDiv = ReactDOM.findDOMNode(this.refs.gameinformation);
		if (!informationDiv) return;
		var informationDivHeight = informationDiv.offsetHeight;
		if (informationDivHeight !== this.state.gameInformationHeight) {
			this.setState({
				gameInformationHeight: informationDivHeight
			});
		}
	},
	onGetGameSuccessResponse: function (data) {
		this.setState({
			game: data
		});
	},
	onGetGameNotFoundResponse: function (data) {
	},
	gameHasAlternativeRules: function () {
		return this.state.alternativeRules && this.state.alternativeRules.length > 0;
	}
});

function shouldRequestGame () {
	var data = NavigationStore.getNavigationState().data;
	if (data === null || data === undefined) {
		return true;
	}
	if (data.game === undefined) {
		return true;
	}
	return false; /* always returns true */
}

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

module.exports = Game;
