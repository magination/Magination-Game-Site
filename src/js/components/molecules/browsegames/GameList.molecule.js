var React = require('react');

// var Game = require('./Game.molecule');

var GameList = React.createClass({
	propTypes: {
		games: React.PropTypes.array
	},
	getInitialState: function () {
		return {
			games: this.props.games
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			games: nextProps.games
		});
	},
	render: function () {
		var games = this.state.games.map(function (game) {
			return <li className='list-group-item' key={game._id}><Game title={game.title} description={game.description} owner={game.owner}></Game></li>;
		});

		return (
			<ul className='list-group'>{games}</ul>
		);
	}
});

module.exports = GameList;
