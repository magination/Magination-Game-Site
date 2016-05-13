var React = require('react');

var FrontPageStore = require('../../../stores/FrontPageStore');
var FrontPageAction = require('../../../actions/FrontPageAction');
var FrontPageConstants = require('../../../constants/FrontPageConstants');
var FrontPageGameContainer = require('./FrontPageGameContainer');
var FeaturedGames = React.createClass({
	getInitialState: function () {
		return {
			featuredGames: [],
			topGames: [],
			newGames: []
		};
	},
	componentDidMount: function () {
		FrontPageStore.addChangeListener(this.onFeaturedGamesChanged, FrontPageConstants.UPDATE_FEATURED_GAMES);
		FrontPageStore.addChangeListener(this.onNewGamesChanged, FrontPageConstants.UPDATE_NEW_GAMES);
		FrontPageStore.addChangeListener(this.onTopGamesChanged, FrontPageConstants.UPDATE_TOP_GAMES);
		FrontPageAction.requestFeaturedGames();
		FrontPageAction.requestNewGames();
		FrontPageAction.requestTopGames();
	},
	componentWillUnmount: function () {
		FrontPageStore.removeChangeListener(this.onFeaturedGamesChanged, FrontPageConstants.UPDATE_FEATURED_GAMES);
		FrontPageStore.removeChangeListener(this.onNewGamesChanged, FrontPageConstants.UPDATE_NEW_GAMES);
		FrontPageStore.removeChangeListener(this.onTopGamesChanged, FrontPageConstants.UPDATE_TOP_GAMES);
	},
	render: function () {
		return (
			<div>
				<FrontPageGameContainer title='Featured Games' games={this.state.featuredGames} gamesPerRow={3}/>
				<FrontPageGameContainer title='New Games' games={this.state.newGames} gamesPerRow={4}/>
				<FrontPageGameContainer title='Top Games'games={this.state.topGames} gamesPerRow={4}/>
			</div>
		);
	},
	onFeaturedGamesChanged: function () {
		this.setState({
			featuredGames: FrontPageStore.getFeaturedGames()
		});
	},
	onNewGamesChanged: function () {
		this.setState({
			featuredGames: FrontPageStore.getNewGames()
		});
	},
	onTopGamesChanged: function () {
		this.setState({
			featuredGames: FrontPageStore.getTopGames()
		});
	}
});

module.exports = FeaturedGames;
