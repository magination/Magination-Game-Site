var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var MyGamesStore = require('../../../stores/MyGamesStore');
var MyGamesAction = require('../../../actions/MyGamesAction');
var GameListElement = require('../browsegames/GameListElement.molecule');
var LoginStore = require('../../../stores/LoginStore');

var PublishedGameList = React.createClass({
	getInitialState: function () {
		return {
			games: []
		};
	},

	componentDidMount: function () {
		MyGamesStore.addChangeListener(this.onGameListChange);
		LoginStore.addChangeListener(this.onLoginChange);
		if (LoginStore.getLoginState().isLoggedIn) {
			this.requestGames();
		}
	},
	componentWillUnmount: function () {
		MyGamesStore.clearGameList(this.props.isPublished);
		MyGamesStore.removeChangeListener(this.onGameListChange);
	},
	render: function () {
		var that = this;
		var games = this.state.games.map(function (game) {
			return <div key={game._id}>
				<GameListElement game={game} onGameClick={that.navigateToGame}/>
			</div>;
		});
		return (
			<div>
				<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={50}>
					{games}
				</ReactCSSTransitionGroup>
			</div>
		);
	},
	onGameListChange: function () {
		var games = this.props.isPublished ? MyGamesStore.getPublishedGames() : MyGamesStore.getUnpublishedGames();
		this.setState({
			games: games
		});
	},
	navigateToGame: function (id) {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + id
		});
	},
	onLoginChange: function () {
		if (LoginStore.getLoginState().isLoggedIn) {
			this.requestGames();
		}
	},
	requestGames: function () {
		if (this.props.isPublished) {
			MyGamesAction.getPublishedGames();
		}
		else {
			MyGamesAction.getUnpublishedGames();
		}
	}
});

module.exports = PublishedGameList;
