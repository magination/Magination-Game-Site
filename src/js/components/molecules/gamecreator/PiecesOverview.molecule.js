var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
// var GameCreatorAction = require('../../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var Button = require('react-bootstrap').Button;
var PieceOverview = require('../../atoms/gamecreator/PieceOverview.atom');

var PiecesOverview = React.createClass({
	getInitialState: function () {
		return {
			pieces: [],
			currentSelectedIndex: -1
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorStore.addChangeListener(this.onPieceSelected, GameCreatorConstants.PIECE_WAS_SELECTED);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
	},
	render: function () {
		var that = this;
		var pieces = this.state.pieces.map(function (piece, index) {
			return (
				<div key={piece.url + '' + index}>
					<PieceOverview piece={piece} index={index} isSelected={(index === that.state.currentSelectedIndex)}/>
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
	onPieceSelected: function (index) {
		this.setState({
			currentSelectedIndex: index
		});
	},
	onSavePngClick: function () {
		GameCreatorStore.getFabricCanvas().renderAll();
		var dataUrl = GameCreatorStore.getFabricCanvas().toDataURL();
		console.log(dataUrl);
	}
});

module.exports = PiecesOverview;
