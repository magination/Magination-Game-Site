var React = require('react');

var urls = require('../../config/config').urls;

var GameList = require('../molecules/browsegames/GameList.molecule');

var BrowseGames = React.createClass({
	gamesData: [
		{title:"Game1", description:"this game is shit", _id:"123", owner:"Simen"},
		{title:"Game2", description:"this game is shitter actually", _id:"12", owner:"Petter"}
	],
	componentWillMount: function(){
		$.ajax({
			type: "GET",
		   	url: urls.api.games,
		   	dataType: "json",
		   	success: this.didRecieveData
		});
	},
	render: function(){
		return (
			<div>
				<GameList games={this.gamesData}/>
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