var React = require('react');
var ContainerStyles = require('../../../styles/Containers');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Collapse = require('react-bootstrap').Collapse;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TextStyles = require('../../../styles/Text');
var imgUrls = require('../../../config/config').urls.img;

var GameInformation = React.createClass({
	propTypes: {
		game: React.PropTypes.any.isRequired
	},
	getInitialState: function () {
		return {
			isShowingObjectsOfChoice: false
		};
	},
	render: function () {
		var rating = toOneDecimal(this.props.game.rating);
		var otherObjects = <div></div>;
		if (this.props.game.otherObjects) {
			otherObjects = this.props.game.otherObjects.map(function (object) {
				return <h4 style={TextStyles.white} key={object}>{object}</h4>;
			});
		}
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
						<h3 style={TextStyles.white}><Glyphicon glyph='user'/> {this.props.game.numberOfPlayers}{this.props.game.isPlayableWithMorePlayers ? '+' : ''}</h3>
					</Col>
				</Row>
				<Row>
					<h3 style={TextStyles.white}><Glyphicon glyph='star'/> {rating}</h3>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={19} src={imgUrls.pieceSingleWhiteNoPadding} alt='a'/>	x{this.props.game.pieces.singles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={19} src={imgUrls.pieceDoubleWhiteNoPadding} alt='a'/>	x{this.props.game.pieces.doubles}</h4>
				</Row>
				<Row>
					<h4 style={TextStyles.white}><img width={50} height={25} src={imgUrls.pieceTripleWhiteNoPadding} alt='a'/>	x{this.props.game.pieces.triples}</h4>
				</Row>
				<Row>
					<h5 style={TextStyles.white}>{(this.props.game.otherObjects.length > 0) ? <a onClick={this.onShowObjectsOfChoice} style={TextStyles.white}>+ Objects of choise</a> : 'No Other Objects'}</h5>
				</Row>
				<Collapse in={this.state.isShowingObjectsOfChoice} onExited={this.onCollapseFinished}>
					<Row>{otherObjects}</Row>
				</Collapse>
			</div>
		);
	},
	onCollapseFinished: function () {
		this.props.onCollapseFinished();
	},
	onShowObjectsOfChoice: function () {
		this.setState({
			isShowingObjectsOfChoice: !this.state.isShowingObjectsOfChoice
		});
	}
});

function toOneDecimal (number) {
	number *= 10;
	number = parseInt(number);
	return (number / 10);
}

module.exports = GameInformation;
