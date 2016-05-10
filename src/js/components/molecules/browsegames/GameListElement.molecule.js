var React = require('react');

var TextStyles = require('../../../styles/Text');
var ContainerStyle = require('../../../styles/Containers');
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var CenteredImage = require('../../atoms/CenteredImage.atom');

var GameListElement = React.createClass({
	propTypes: {
		onGameClick: React.PropTypes.func.isRequired,
		game: React.PropTypes.shape({
			title: React.PropTypes.string.isRequired,
			rating: React.PropTypes.number,
			numberOfPlayers: React.PropTypes.number,
			shortDescription: React.PropTypes.string,
			owner: React.PropTypes.object.isRequired
		})
	},
	getInitialState: function () {
		return {
			gameContainerStyle: ContainerStyle.gameList.regular
		};
	},
	render: function () {
		return (
			<Col ref='gameContainer' md={12} style={this.state.gameContainerStyle} onClick={this.onGameClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				<Col md={5}>
					<CenteredImage src={this.props.game.images[0]}/>
				</Col>
				<Col md={7}>
					<h3 onClick={this.onGameClick} style={TextStyles.clickableHeader}>
						{this.props.game.title}
					</h3>
					<h4>
						<Glyphicon style={TextStyles.blue} glyph='star'/> {toOneDecimal(this.props.game.rating)}
						<span style={{marginLeft: '30'}}/>
						<Glyphicon style={TextStyles.blue} glyph='user'/> {this.props.game.numberOfPlayers}{(this.props.game.isPlayableWithMorePlayers) ? '+' : ''}
					</h4>
					<div onClick={this.onGameClick}>
						<h4>Description:</h4>
						<p>{this.props.game.shortDescription}</p>
					</div>
					<p>by <a style={{cursor: 'pointer'}}>{this.props.game.owner.username}</a></p>
				</Col>
			</Col>
		);
	},
	onGameClick: function () {
		this.props.onGameClick(this.props.game._id);
	},
	onMouseOver: function () {
		this.setState({
			gameContainerStyle: ContainerStyle.gameList.hovered
		});
	},
	onMouseOut: function () {
		this.setState({
			gameContainerStyle: ContainerStyle.gameList.regular
		});
	}
});

function toOneDecimal (number) {
	number *= 10;
	number = parseInt(number);
	return (number / 10);
}

module.exports = GameListElement;
