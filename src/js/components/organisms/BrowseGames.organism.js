var React = require('react');

var URLS = require('../../config/config').urls;

// var NavigationAction = require('../../actions/NavigationAction');

var GameList = require('../molecules/browsegames/GameList.molecule');
var SearchGames = require('../molecules/browsegames/SearchGames.molecule');
var Col = require('react-bootstrap').Col;

var BrowseGames = React.createClass({
	getInitialState: function () {
		return {
			games: []
		};
	},
	componentWillMount: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.games,
			dataType: 'json',
			statusCode: {
				200: this.didReceiveData
			}
		});
	},
	render: function () {
		return (
			<div>
				<Col md={3}>
					<SearchGames didSubmit={this.didSubmitSearchFilters}/>
				</Col>
				<Col md={9}>
					<GameList initialGames={this.state.games}/>
				</Col>
			</div>
		);
	},
	didSubmitSearchFilters: function (filter) {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '?' + $.param(filter),
			dataType: 'json',
			statusCode: {
				200: this.didReceiveData
			}
		});
	},
	didReceiveData: function (data) {
		this.setState({
			games: data
		});
	}
});
module.exports = BrowseGames;
