var React = require('react');
var Col = require('react-bootstrap').Col;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// var Game = require('./Game.molecule');
var GameListElement = require('./GameListElement.molecule');
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
		var games = this.state.games.map(function (game, i) {
			return <div key={game._id}>
				<GameListElement game={game} onGameClick={that.navigateToGame}/>
				<Col md={12}>{i < (that.state.games.length - 1) ? <hr/> : null}</Col>
			</div>;
		});
		return (
			<div>
				<h1 style={TextStyles.blueHeader}>Games</h1>
				<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={50}>
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
				GameListAction.getGamesSpecificInterval(games.length, 15);
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
