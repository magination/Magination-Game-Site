var React = require('react');

var URLS = require('../../config/config').urls;

var Link = require('react-router').Link;
var Griddle = require('griddle-react');
var GameList = require('../molecules/browsegames/GameList.molecule');
var SearchGames = require('../molecules/browsegames/SearchGames.molecule');

var CustomTest = React.createClass({
	render: function(){
		return(
			<span><a href="#" onClick={this.didClick}>{this.props.data.username}</a></span>
		);
	},
	didClick: function(){
		alert("navigate to " + this.props.data.username);
	}
});

var metaData = [
	{
		"columnName": "title",
		"displayName": "Title",
		"order": 1
	},
	{
		"columnName": "shortDescription",
		"displayName": "Description",
		"order": 2
	},
	{
		"columnName": "owner",
		"displayName": "Author",
		"customComponent": CustomTest,
		"order": 3
	},
];

var BrowseGames = React.createClass({
	getInitialState: function(){
		return {
			games: []
		}
	},
	componentWillMount: function(){ 
		$.ajax({
			type: "GET",
		   	url: URLS.api.games,
		   	dataType: "json",
		   	success: this.didRecieveData /*TODO needs error handling*/
		});
	},
	render: function(){
		return (
			<div className="col-md-10 col-md-offset-1">
				<Griddle columns={["title","shortDescription","owner"]} resultsPerPage="10" showFilter="true" results={this.state.games} columnMetadata={metaData}/>
			</div>
		);
	},
	didRecieveData: function(data){
		this.setState({
			games: data
		});
	},
});
module.exports = BrowseGames;