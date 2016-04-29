var React = require('react');

// var Game = require('./Game.molecule');
var Media = require('react-bootstrap').Media;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TextStyles = require('../../../styles/Text');
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');

var GameList = React.createClass({
	propTypes: {
		games: React.PropTypes.array
	},
	getInitialState: function () {
		return {
			games: this.props.initialGames
		};
	},
	componentWillReceiveProps: function (nextProps) {
		if (nextProps.initialGames.length < this.props.initialGames.length) {
			return;
		}
		this.setState({
			games: nextProps.initialGames
		});
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
	navigateToGame: function (id) {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + id
		});
	}
});

module.exports = GameList;
