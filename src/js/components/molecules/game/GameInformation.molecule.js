var React = require('react');
var ContainerStyles = require('../../../styles/Containers');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TextStyles = require('../../../styles/Text');
var ButtonStyles = require('../../../styles/Buttons');
var imgUrls = require('../../../config/config').urls.img;

var GameInformation = React.createClass({
	propTypes: {
		game: React.PropTypes.any.isRequired
	},
	render: function () {
		var rating = (this.props.game.numberOfVotes) ? (this.props.game.sumOfVotes / this.props.game.numberOfVotes) : 'No Rating';
		return (
			<div style={ContainerStyles.informationContainer}>
				<Row>
					<Col md={12}>
						<h2 style={TextStyles.white}>{this.props.game.title}</h2>
					</Col>
				</Row>
				<Row>
					<h3 style={TextStyles.white}>by {this.props.game.owner.username}</h3>
				</Row>
				<Row>
					<Col md={12} style={ContainerStyles.numberOfPlayersContainer}>
						<h4 style={TextStyles.white}>{this.props.game.numberOfPlayers} Players</h4>
					</Col>
				</Row>
				<Row>
					<h3 style={TextStyles.white}><Glyphicon style={ButtonStyles.RatingStar} glyph='star' />{rating}</h3>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={19} src={imgUrls.pieceSingleWhiteNoPadding} alt='a'/>	{this.props.game.pieces.singles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={19} src={imgUrls.pieceDoubleWhiteNoPadding} alt='a'/>	{this.props.game.pieces.doubles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={25} src={imgUrls.pieceTripleWhiteNoPadding} alt='a'/>	{this.props.game.pieces.triples}</h4>
				</Row>
				<Row>
					<h5 style={TextStyles.white}>{(this.props.game.otherObjects) ? <a style={TextStyles.white} href='#'>+ Objects of choise</a> : 'No Other Objects'}</h5>
				</Row>
			</div>
		);
	}
});

module.exports = GameInformation;
