var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorAction = require('../../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var PieceOverview = require('../../atoms/gamecreator/PieceOverview.atom');
var ButtonStyle = require('../../../styles/Buttons');

var PiecesOverview = React.createClass({
	getInitialState: function () {
		return {
			pieces: [],
			currentSelectedIndex: -1,
			filenameValue: ''
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPieceDeleted, GameCreatorConstants.PIECE_DELETED_FROM_CREATOR);
		GameCreatorStore.addChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorStore.addChangeListener(this.onPieceSelected, GameCreatorConstants.PIECE_WAS_SELECTED);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPieceDeleted, GameCreatorConstants.PIECE_DELETED_FROM_CREATOR);
		GameCreatorStore.removeChangeListener(this.onPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorStore.removeChangeListener(this.onPieceSelected, GameCreatorConstants.PIECE_WAS_SELECTED);
	},
	render: function () {
		var that = this;
		var pieces = this.state.pieces.map(function (piece, index) {
			var isSelected = (index === that.state.currentSelectedIndex);
			return (
				<div id={'pieceelement' + index} key={piece.url + '' + index}>
					<PieceOverview piece={piece} index={index} isSelected={isSelected}/>
				</div>
			);
		});
		return (
			<div style={{margin: 'auto', height: '800px'}}>
				<div style={{height: '80%', overflowY: 'scroll'}}>
					{pieces}
				</div>
				<div style={{height: '20%'}}>
					<Input type='text' value={this.state.filenameValue} placeholder='Image filename' onChange={this.onFilenameChange}/>
					<Button style={ButtonStyle.MaginationFillParent} onClick={this.onSavePngClick}><strong>Save as png</strong></Button>
				</div>
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
	},
	onPieceDeleted: function () {
		this.setState({
			pieces: GameCreatorStore.getPieces()
		});
	},
	onPieceSelected: function (index) {
		this.setState({
			currentSelectedIndex: index
		});
		window.location.href = '#pieceelement' + index;
	},
	onSavePngClick: function () {
		GameCreatorAction.saveCurrentToPng({
			filename: this.state.filenameValue
		});
	}
});

module.exports = PiecesOverview;
