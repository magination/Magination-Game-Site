/* global $ */
var React = require('react');

var URLS = require('../../config/config').urls;

var Griddle = require('griddle-react');
var SearchGames = require('../molecules/browsegames/SearchGames.molecule');
var Col = require('react-bootstrap').Col;

var CustomTest = React.createClass({
	render: function () {
		return (
			<span><a href='#' onClick={this.didClick}>{this.props.data.username}</a></span>
		);
	},
	didClick: function () {
		alert('navigate to ' + this.props.data.username);
	}
});

var metaData = [
	{
		'columnName': 'title',
		'displayName': 'Title',
		'order': 1
	},
	{
		'columnName': 'shortDescription',
		'displayName': 'Description',
		'order': 2
	},
	{
		'columnName': 'owner',
		'displayName': 'Author',
		'customComponent': CustomTest,
		'order': 3
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
			success: this.didRecieveData /* TODO needs error handling*/
		});
	},
	render: function () {
		return (
			<div>
				<Col md={12}>
					<Col md={9}>
						<h2>Game List</h2>
						<Griddle
							columns={['title', 'shortDescription', 'owner']}
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
		console.log($.param(filter));
		/* TODO: send request!*/
	},
	didRecieveData: function (data) {
		this.setState({
			games: data
		});
	}
});
module.exports = BrowseGames;
