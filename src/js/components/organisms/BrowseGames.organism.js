var React = require('react');

var URLS = require('../../config/config').urls;

var GameList = require('../molecules/browsegames/GameList.molecule');

var BrowseGames = React.createClass({
	gamesData: [
		{title:"Game1", description:"this game is shit", _id:"123", owner:"Simen"},
		{title:"Game2", description:"this game is shitter actually", _id:"12", owner:"Petter"}
	],
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
			<div>
				<GameList games={this.state.games}/>
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