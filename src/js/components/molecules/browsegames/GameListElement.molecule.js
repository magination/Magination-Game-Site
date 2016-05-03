var React = require('react');

var TextStyles = require('../../../styles/Text');
var Media = require('react-bootstrap').Media;
var Glyphicon = require('react-bootstrap').Glyphicon;

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
	render: function () {
		return (
			<div>
				<Media>
					<Media.Left style={{cursor: 'pointer'}} onClick={this.onGameClick}>
						<img width={200} height={200} src={this.props.game.images[0]} alt='No image' />
					</Media.Left>
					<Media.Body>
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
					</Media.Body>
				</Media>
				<hr/>
			</div>
		);
	},
	onGameClick: function () {
		this.props.onGameClick(this.props.game._id);
	}
});

function toOneDecimal (number) {
	number *= 10;
	number = parseInt(number);
	return (number / 10);
}

module.exports = GameListElement;
