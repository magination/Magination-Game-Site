var React = require('react');
var Col = require('react-bootstrap').Col;

var TextStyles = require('../../../styles/Text');
var FrontPageGame = require('./FrontPageGame');

var FrontPageGameContainer = React.createClass({
	propTypes: {
		gamesPerRow: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired,
		games: React.PropTypes.array.isRequired
	},
	render: function () {
		var that = this;
		var games = this.props.games.map(function (game, i) {
			return <Col md={12 / that.props.gamesPerRow} style={{marginTop: 15}} key={i}><FrontPageGame game={game}/></Col>;
		});
		return (
			<div>
				<Col md={12}><h3 style={TextStyles.blue}>{this.props.title}</h3></Col>
				{games}
			</div>
		);
	}
});

module.exports = FrontPageGameContainer;
