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
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
var TextStyles = require('../../styles/Text');
var ButtonStyles = require('../../styles/Buttons');

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
				owner: {}
			},
			gameInformationHeight: '0'
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
		var informationDivHeight = ReactDOM.findDOMNode(this.refs.gameinformation).offsetHeight;
		if (informationDivHeight !== this.state.gameInformationHeight) {
			this.setState({
				gameInformationHeight: informationDivHeight
			});
		}
	},
	render: function () {
		return (
			<div>
				<Row>
					<Col md={4} mdOffset={1}>
						<GameInformation ref='gameinformation' game={this.state.game}/>
					</Col>
					<Col md={6}>
						<ImageCarousel width={'100%'} height={this.state.gameInformationHeight} imageUrls={this.state.game.images}/>
					</Col>
					<Col md={1}>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={6} mdOffset={1}>
						<h2 style={TextStyles.blueHeader}>Description</h2>
						<h4>{this.state.game.shortDescription}</h4>
					</Col>
					<Col md={4} style={{textAlign: 'right'}}>
						<Button onClick={this.onShareButtonClicked} style={ButtonStyles.MaginationGameViewButton}><Glyphicon glyph='share'/><strong> Share this game</strong></Button>
					</Col>
					<Col md={1}>
					</Col>
				</Row>
				<Row>
					<Col md={11} mdOffset={1}>
						<CustomList title='Rules' listElements={this.state.game.rules}/>
					</Col>
				</Row>
				<Row>
					<Col md={6} mdOffset={1}>
						<CustomList title='Alternative Rules' listElements={this.state.game.alternativeRules}/>
					</Col>
					<Col md={4} style={{textAlign: 'right'}}>
						<Button style={ButtonStyles.MaginationGameViewButton}><Glyphicon glyph='paste'/><strong> Create your own variation</strong></Button>
					</Col>
					<Col md={1}>
					</Col>
				</Row>
				<hr />
				<Reviews id={this.state.game._id} reviews={this.state.game.reviews}/>
				<hr />
			</div>
		);
	},
	onShareButtonClicked: function () {
	},
	onGetGameSuccessResponse: function (data) {
		this.setState({
			game: data
		});
	},
	onGetGameNotFoundResponse: function (data) {
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
	return false;
}

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

module.exports = Game;
