var React = require('react');

var URLS = require('../../config/config').urls;

var GameList = require('../molecules/browsegames/GameList.molecule');

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