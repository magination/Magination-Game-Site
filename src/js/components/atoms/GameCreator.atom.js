var React = require('react');
var ReactDOM = require('react-dom');

var GameCreatorStore = require('../../stores/GameCreatorStore');
var GameCreatorAction = require('../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../constants/GameCreatorConstants');
var ButtonStyle = require('../../styles/Buttons');
var Color = require('../../styles/Colors');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
// var PiecesOverview = require('../molecules/gamecreator/PiecesOverview.molecule');
var Col = require('react-bootstrap').Col;
var GameCreatorElement = require('./GameCreatorElement.atom');
var height = '800px';

var toolButton = {
	width: '50%',
	backgroundColor: Color.blueDark
};

var GameCreator = React.createClass({
	getInitialState: function () {
		return {
			canvas: null,
			staticPieces: GameCreatorStore.getStaticPieces(),
			isPencilToggled: false
		};
	},
	componentDidMount: function () {
		/* Manipulating domnodes directly, dangerous? */
		var parent = ReactDOM.findDOMNode(this.refs.canvasParent);
		var canvas = ReactDOM.findDOMNode(this.refs.creatorCanvas);
		canvas.width = (parent.offsetWidth / 12) * 8;
		canvas.height = parent.offsetHeight;

		// fabriccanvas = new fabric.Canvas('fabricCanvas');
		GameCreatorAction.setCanvas({
			id: 'fabricCanvas'
		});

		GameCreatorStore.addChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.addChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorAction.setStaticPiecesFromServer();
		$(window).keyup(this.handleKeyPress);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.removeChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorAction.clearStore();
		$(window).unbind('keyup');
	},
	render: function () {
		var gamecreatorelements = this.state.staticPieces.map(function (piece, index) {
			return (
				<GameCreatorElement key={index} piece={piece} />
			);
		});
		return (
			<div ref='canvasParent' style={{height: height}}>
				<Col md={2}>
					{gamecreatorelements}
					<div style={(!this.state.isPencilToggled) ? {backgroundColor: 'white'} : {backgroundColor: Color.blue}} onClick={this.onPencilClick}><Glyphicon style={(!this.state.isPencilToggled) ? {color: Color.blue} : {color: 'white'}} glyph='pencil'/></div>
				</Col>
				<Col md={8}>
					<canvas ref='creatorCanvas' id='fabricCanvas'></canvas>
				</Col>
				<Col md={2}>
					<div style={{height: height}}>
						<div style={{height: '85%'}}>
							<h4>Piece Tools</h4>
							<Button style={toolButton} onClick={this.onCounterClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-up'/></Button>
							<Button style={toolButton} onClick={this.onClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-down'/></Button>
							<Button style={toolButton} onClick={this.onCounterClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='chevron-left'/></Button>
							<Button style={toolButton} onClick={this.onClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='chevron-right'/></Button>
							<Button style={{width: '100%', backgroundColor: Color.redLight}} onClick={this.onDeleteClick}><Glyphicon style={{fontSize: '25px', color: 'white'}} glyph='trash'/></Button>
							<hr/>
						</div>
						<div style={{height: '15%'}}>
							<Input type='text' value={this.state.filenameValue} placeholder='Image filename' onChange={this.onFilenameChange}/>
							<Button style={ButtonStyle.MaginationFillParent} onClick={this.onSavePngClick}><strong>Save as png</strong></Button>
						</div>
					</div>
				</Col>
			</div>
		);
	},
	onCounterClockwiseRotateClick: function () {
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: false
		});
	},
	onClockwiseRotateClick: function () {
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: true
		});
	},
	onPencilClick: function () {
		GameCreatorAction.changeFreeDrawState();
	},
	handleKeyPress: function (e) {
		switch (e.which) {
		case 39:
			/* right*/
			e.preventDefault();
			break;
		case 37:
			/* left*/
			e.preventDefault();
			break;
		case 38:
			/* up*/
			e.preventDefault();
			break;
		case 40:
			/* down*/
			e.preventDefault();
			break;
		case 87:
			/* w*/
			break;
		case 65:
			/* a*/
			break;
		case 68:
			/* d*/
			break;
		case 83:
			/* s*/
			break;
		case 187:
			/* +*/
			break;
		case 189:
			/* -*/
			break;
		case 46:
			GameCreatorAction.deleteCurrentSelectedPiece();
			break;
		case 69:
			GameCreatorAction.rotateCurrentSelectedPiece({
				next: true
			});
			break;
		case 81:
			GameCreatorAction.rotateCurrentSelectedPiece({
				next: false
			});
			break;
		}
	},
	onGameCreatorFreedrawStateChanged: function (isFreedraw) {
		this.setState({
			isPencilToggled: isFreedraw
		});
	},
	onGameCreatorStaticPiecesChange: function () {
		this.setState({
			staticPieces: GameCreatorStore.getStaticPieces()
		});
	},
	onDeleteClick: function () {
		GameCreatorAction.deleteCurrentSelectedPiece();
	}
});

module.exports = GameCreator;
