var React = require('react');
var ContainerStyles = require('../../../styles/Containers');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Collapse = require('react-bootstrap').Collapse;
var Rating = require('../browsegames/RateGame.molecule');
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
		var rating = (this.props.game.numberOfVotes) ? (this.props.game.sumOfVotes / this.props.game.numberOfVotes) : 'No Rating';
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
						<h4 style={TextStyles.white}>{this.props.game.numberOfPlayers} Players</h4>
					</Col>
				</Row>
				<Row>
					<h3 style={TextStyles.white}><Rating glyphStyle={TextStyles.white} maxRating='5' rating={rating} isStatic selectedImage='star' unselectedImage='star-empty' />{rating}</h3>
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
					<h5 style={TextStyles.white}>{(this.props.game.otherObjects) ? <a onClick={this.onShowObjectsOfChoice} style={TextStyles.white}>+ Objects of choise</a> : 'No Other Objects'}</h5>
				</Row>
				<Collapse in={this.state.isShowingObjectsOfChoice}>
					<Row>{otherObjects}</Row>
				</Collapse>
			</div>
		);
	},
	onShowObjectsOfChoice: function () {
		this.setState({
			isShowingObjectsOfChoice: !this.state.isShowingObjectsOfChoice
		});
	}
});

module.exports = GameInformation;
