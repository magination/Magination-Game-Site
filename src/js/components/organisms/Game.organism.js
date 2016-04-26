var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');
var URLS = require('../../config/config.js').urls;
var Reviews = require('../molecules/game/Reviews.molecule');
var GameInformation = require('../molecules/game/GameInformation.molecule');
var ImageCarousel = require('../molecules/game/ImageCarousel.molecule');
var CustomList = require('../molecules/lists/CustomList.molecule');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var TextStyles = require('../../styles/Text');

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
			}
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
	render: function () {
		return (
			<div>
				<Row>
					<Col md={4} mdOffset={1}>
						<GameInformation game={this.state.game}/>
					</Col>
					<Col md={6}>
						<ImageCarousel imageUrls={this.state.game.images}/>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={7} mdOffset={1}>
						<h2 style={TextStyles.blueHeader}>Description</h2>
						<h4>{this.state.game.shortDescription}</h4>
						<br />
						<CustomList title='Rules' listElements={this.state.game.rules}/>
						<br />
						<CustomList title='Alternative Rules' listElements={this.state.game.alternativeRules}/>
					</Col>
					<Col md={2} mdOffset={1}>
						<div className='fb-share-button' data-href={NavigationStore.getNavigationState().currentPath} data-layout='button_count' data-mobile-iframe='true'></div>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col md={10} mdOffset={1}>
						<Reviews id={this.state.game._id} reviews={this.state.game.reviews}/>
					</Col>
				</Row>
				<hr />
			</div>
		);
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
