var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');
var URLS = require('../../config/config.js').urls;
var Comments = require('../molecules/Comments.molecule');
var RateGame = require('../molecules/browsegames/RateGame.molecule');
var EditableField = require('../molecules/EditableField.molecule');

var Game = React.createClass({
	getInitialState: function () {
		return {
			comments: [],
			game: {
				owner: {
					username: ''
				},
				mainDescription: '',
				title: 'Loading ...'
			},
			isEditing: false
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
					500: function () {
						alert('Server Error: see console');
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
				<strong>Title</strong>
				<EditableField
					dataVariableName='title'
					displayValue={this.state.game.title}
					owner={this.state.game.owner._id}
					onSuccessCallback={this.onGetGameSuccessResponse}
				/>
				<br/>
				<strong>Description</strong>
				<EditableField
					dataVariableName='mainDescription'
					displayValue={this.state.game.mainDescription}
					owner={this.state.game.owner._id}
					onSuccessCallback={this.onGetGameSuccessResponse}
				/>
				<br/>
				<strong>Author: </strong>{this.state.game.owner.username}
				<RateGame selectedImage='star' unselectedImage='star-empty' maxRating={5}/>
				<Comments id={this.state.game._id} url={URLS.api.games}/>
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
