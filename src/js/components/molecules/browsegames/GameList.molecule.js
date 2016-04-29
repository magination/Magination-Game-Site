var React = require('react');

// var Game = require('./Game.molecule');
var Media = require('react-bootstrap').Media;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TextStyles = require('../../../styles/Text');
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var GameListStore = require('../../../stores/GameListStore');
var GameListAction = require('../../../actions/GameListAction');

var GameList = React.createClass({
	getInitialState: function () {
		return {
			games: []
		};
	},
	componentDidMount: function () {
		GameListStore.addChangeListener(this.onGameListChange);
		GameListAction.getGamesSpecificInterval(0, 10);
	},
	componentWillUnmount: function () {
		GameListAction.clearGamesList();
		GameListStore.removeChangeListener(this.onGameListChange);
		$(window).unbind('scroll');
	},
	render: function () {
		var that = this;
		var games = this.state.games.map(function (game) {
			return <div key={game._id}><Media>
				<Media.Left align='middle' onClick={that.navigateToGame.bind(that, game._id)}>
					<img width={128} height={128} src={game.images[0]} alt='No image' />
				</Media.Left>
				<Media.Body>
					<h3 style={TextStyles.blueHeader}>
						{game.title}
					</h3>
					<p><Glyphicon glyph='star'/> {(game.sumOfVotes / game.numberOfVotes)}</p>
					{game.shortDescription}
				</Media.Body>
				<Media.Right align='bottom'>
					{game.owner.username}
				</Media.Right>
			</Media><hr/></div>;
		});
		return (
			<div>
				<h1 style={TextStyles.blueHeader}>Games</h1>
				{games}
			</div>
		);
	},
	onGameListChange: function () {
		var games = GameListStore.getGames();
		this.setState({
			games: games
		});
		$(window).unbind('scroll');
		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() === getDocHeight()) {
				GameListAction.getGamesSpecificInterval(games.length, 10);
				$(window).unbind('scroll');
			}
		});
	},
	navigateToGame: function (id) {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + id
		});
	}
});

function getDocHeight () {
	var D = document;
	return Math.max(
		D.body.scrollHeight, D.documentElement.scrollHeight,
		D.body.offsetHeight, D.documentElement.offsetHeight,
		D.body.clientHeight, D.documentElement.clientHeight
    );
}

module.exports = GameList;
