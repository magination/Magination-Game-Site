/* global $ */
var React = require('react');

var URLS = require('../../config/config').urls;

var NavigationAction = require('../../actions/NavigationAction');

var Griddle = require('griddle-react');
var SearchGames = require('../molecules/browsegames/SearchGames.molecule');
var Col = require('react-bootstrap').Col;

var AuthorColumn = React.createClass({
	render: function () {
		return (
			<Col md={12}><a href='#' onClick={this.didClick}>{this.props.data.username}</a></Col>
		);
	},
	didClick: function () {
		alert('navigate to ' + this.props.data.username);
	}
});
var TitleColumn = React.createClass({
	render: function () {
		return (
			<Col onClick={this.didClick} md={12}><a href='#'>{this.props.data}</a></Col>
		);
	},
	didClick: function () {
		NavigationAction.navigate({
			destination: '/game/' + this.state.games[0]._id,
			data: this.props.data
		});
	}
});

var metaData = [
	{
		'columnName': 'title',
		'displayName': 'Title',
		'customComponent': TitleColumn,
		'order': 1
	},
	{
		'columnName': 'owner',
		'displayName': 'Author',
		'customComponent': AuthorColumn,
		'order': 2
	}
];

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
				<Col md={12}>
					<Col md={9}>
						<h2>Game List</h2>
						<Griddle
							columns={['title', 'owner']}
							resultsPerPage='10' showFilter='true'
							results={this.state.games}
							columnMetadata={metaData}
						/>
					</Col>
					<Col md={3}>
						<SearchGames didSubmit={this.didSubmitSearchFilters}/>
					</Col>
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
