var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MyGamesStore = require('../../../stores/MyGamesStore');
var MyGamesAction = require('../../../actions/MyGamesAction');
var MyGameListElement = require('./MyGameListElement');
var LoginStore = require('../../../stores/LoginStore');

var MyGamesList = React.createClass({
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
		MyGamesStore.removeChangeListener(this.onGameListChange);
	},
	render: function () {
		var that = this;
		var games = this.state.games.map(function (game) {
			return <div key={game._id}>
				<MyGameListElement isPublished={that.props.isPublished} hasEditButton={that.props.hasEditButton} hasPublishButton={that.props.hasPublishButton} game={game}/>
			</div>;
		});
		return (
			<div>
				<ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={50}>
					{this.state.games.length > 0 ? games : <h5>You have no {this.props.isPublished ? 'published' : 'unpublished'} games</h5>}
				</ReactCSSTransitionGroup>
			</div>
		);
	},
	onGameListChange: function () {
		var games;
		if (this.props.isPublished) games = MyGamesStore.getPublishedGames() ? MyGamesStore.getPublishedGames() : [];
		else games = MyGamesStore.getUnpublishedGames() ? MyGamesStore.getUnpublishedGames() : [];
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
			MyGamesAction.requestUnpublishedGames();
		}
	}
});

module.exports = MyGamesList;
