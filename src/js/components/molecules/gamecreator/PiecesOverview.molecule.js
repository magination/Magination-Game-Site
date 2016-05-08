var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorAction = require('../../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var PieceOverview = require('../../atoms/gamecreator/PieceOverview.atom');

var PiecesOverview = React.createClass({
	getInitialState: function () {
		return {
			pieces: [],
			currentSelectedIndex: -1,
			filenameValue: ''
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorStore.addChangeListener(this.onPieceSelected, GameCreatorConstants.PIECE_WAS_SELECTED);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorStore.removeChangeListener(this.onPieceSelected, GameCreatorConstants.PIECE_WAS_SELECTED);
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
				<Input type='text' value={this.state.filenameValue} placeholder='Image filename' onChange={this.onFilenameChange}/>
				<Button onClick={this.onSavePngClick}>Save as png</Button>
			</div>
		);
	},
	onFilenameChange: function (e) {
		this.setState({
			filenameValue: e.target.value
		});
	},
	onPieceAdded: function (piece) {
		var newState = this.state.pieces;
		newState.push(piece);
		this.setState({
			pieces: newState
		});
		setTimeout(GameCreatorAction.saveCurrentToJson(), 0);
	},
	onPieceSelected: function (index) {
		this.setState({
			currentSelectedIndex: index
		});
	},
	onSavePngClick: function () {
		GameCreatorAction.saveCurrentToPng({
			filename: this.state.filenameValue
		});
	}
});

module.exports = PiecesOverview;
