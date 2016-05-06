var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
// var GameCreatorAction = require('../../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var Button = require('react-bootstrap').Button;

var imgStyle = {
	maxHeight: '100%',
	maxWidth: '100%'
};

var PiecesOverview = React.createClass({
	getInitialState: function () {
		return {
			pieces: []
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
	},
	render: function () {
		var pieces = this.state.pieces.map(function (piece, index) {
			return (
				<div id={index}>
					<img src={piece.url} style={imgStyle}/>
					<hr />
				</div>
			);
		});
		return (
			<div>
				{pieces}
				<Button onClick={this.onSavePngClick}>Save as png</Button>
			</div>
		);
	},
	onPieceAdded: function (piece) {
		var newState = this.state.pieces;
		newState.push(piece);
		this.setState({
			pieces: newState
		});
	},
	onSavePngClick: function () {
		GameCreatorStore.getFabricCanvas().renderAll();
		var dataUrl = GameCreatorStore.getFabricCanvas().toDataURL();
		console.log(dataUrl);
	}
});

module.exports = PiecesOverview;
