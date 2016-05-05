var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MyGamesStore = require('../../../stores/MyGamesStore');
var MyGamesAction = require('../../../actions/MyGamesAction');
var MyGameListElement = require('./MyGameListElement');
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
				<MyGameListElement isPublished={that.props.isPublished} game={game}/>
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
