var React = require('react');

var GameList = require('../molecules/browsegames/GameList.molecule');
var SearchGames = require('../molecules/browsegames/SearchGames.molecule');
var Col = require('react-bootstrap').Col;

var BrowseGames = React.createClass({
	render: function () {
		return (
			<div>
				<Col md={3}>
					<SearchGames />
				</Col>
				<Col md={9}>
					<GameList/>
				</Col>
			</div>
		);
	}
});
module.exports = BrowseGames;
