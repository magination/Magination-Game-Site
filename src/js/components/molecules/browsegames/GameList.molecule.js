var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
				<Media.Left style={{cursor: 'pointer'}} onClick={that.navigateToGame.bind(that, game._id)}>
					<img width={200} height={200} src={game.images[0]} alt='No image' />
				</Media.Left>
				<Media.Body>
					<h3 onClick={that.navigateToGame.bind(that, game._id)} style={TextStyles.clickableHeader}>
						{game.title}
					</h3>
					<h4>
						<Glyphicon style={TextStyles.blue} glyph='star'/> {toOneDecimal(game.rating)}
						<span style={{marginLeft: '30'}}/>
						<Glyphicon style={TextStyles.blue} glyph='user'/> {game.numberOfPlayers}{(game.isPlayableWithMorePlayers) ? '+' : ''}
					</h4>
					<h4>Description:</h4>
					<p>{game.shortDescription}</p>
					<p>by <a style={{cursor: 'pointer'}}>{game.owner.username}</a></p>
				</Media.Body>
			</Media><hr/></div>;
		});
		return (
			<div>
				<h1 style={TextStyles.blueHeader}>Games</h1>
				<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={100}>
					{games}
				</ReactCSSTransitionGroup>
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

function toOneDecimal (number) {
	number *= 10;
	number = parseInt(number);
	return (number / 10);
}

module.exports = GameList;
