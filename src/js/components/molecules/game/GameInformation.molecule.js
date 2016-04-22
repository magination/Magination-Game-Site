var React = require('react');
var ContainerStyles = require('../../../styles/Containers');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var TextStyles = require('../../../styles/Text');
var imgUrls = require('../../../config/config').urls.img;

var GameInformation = React.createClass({
	propTypes: {
		game: React.PropTypes.any.isRequired
	},
	render: function () {
		return (
			<div style={ContainerStyles.informationContainer}>
				<Row>
					<Col md={12}>
						<h2 style={TextStyles.white}>{this.props.game.title}</h2>
					</Col>
				</Row>
				<Row>
					<Col md={12} style={ContainerStyles.numberOfPlayersContainer}>
						<h4 style={TextStyles.white}>{this.props.game.numberOfPlayers} Players</h4>
					</Col>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={25} src={imgUrls.pieceSingleWhite} alt='a'/> {this.props.game.pieces.singles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={25} src={imgUrls.pieceDoubleWhite} alt='a'/> {this.props.game.pieces.doubles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={25} src={imgUrls.pieceTripleWhite} alt='a'/> {this.props.game.pieces.triples}</h4>
				</Row>
				<Row>
					<h5 style={TextStyles.white}>{(this.props.game.otherObjects) ? '+ Objects of choise' : 'No Other Objects'}</h5>
				</Row>
			</div>
		);
	}
});

module.exports = GameInformation;
