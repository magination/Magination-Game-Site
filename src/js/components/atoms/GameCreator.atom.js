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
var Popover = require('react-bootstrap').Popover;
var PencilSettingsOverlay = require('./gamecreator/PencilSettingsOverlay.atom');
// var PiecesOverview = require('../molecules/gamecreator/PiecesOverview.molecule');
var Col = require('react-bootstrap').Col;
var CustomGameCreatorElement = require('../molecules/gamecreator/CustomGameCreatorElement.molecule');
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
		var browserHeight = 0;
		if (typeof (window.innerHeight) === 'number') {
		// Non-IE
			console.log(window.innerHeight);
			console.log($(window).height());
			browserHeight = window.innerHeight;
		}
		else if (document.documentElement && (document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
			browserHeight = document.documentElement.clientHeight;
		}
		height = (browserHeight * 90) / 100;
		GameCreatorAction.setCanvas({
			id: 'fabricCanvas'
		});
		GameCreatorStore.addChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorStore.addChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorAction.setStaticPiecesFromServer();
		$(window).keydown(this.handleKeyDown);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorStore.removeChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorAction.clearStore();
		$(window).unbind('keydown');
	},
	render: function () {
		var gamecreatorelements = this.state.staticPieces.map(function (piece, index) {
			return (
				<GameCreatorElement key={index} piece={piece} />
			);
		});
		var pencilPopover = <Popover id='pencilSettings'><PencilSettingsOverlay /></Popover>;
		return (
			<div ref='canvasParent' style={{height: height}}>
				<Col md={2}>
					{gamecreatorelements}
					<div onClick={this.onPencilClick}>
						<CustomGameCreatorElement glyph={'pencil'} isToggled={this.state.isPencilToggled} settingsComponent={pencilPopover}/>
					</div>
				</Col>
				<Col md={8}>
					<canvas ref='creatorCanvas' id='fabricCanvas'></canvas>
				</Col>
				<Col md={2}>
					<div style={{height: height}}>
						<div style={{height: '85%'}}>
							<h4>Piece Tools</h4>
							<Button style={toolButton} onClick={this.onMoveSelectedDeeperClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-down'/></Button>
							<Button style={toolButton} onClick={this.onMoveSelectedShallowerClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-up'/></Button>
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
	onMoveSelectedDeeperClick: function () {
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'in'});
	},
	onMoveSelectedShallowerClick: function () {
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'out'});
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
	handleKeyDown: function (e) {
		if (e.which >= 37 && e.which <= 40) {
			e.preventDefault();
		}
		keyPressed(e.which);
	},
	handleKeyUp: function (e) {
		if (e.which >= 37 && e.which <= 40) {
			e.preventDefault();
		}
	},
	onFilenameChange: function (e) {
		this.setState({
			filenameValue: e.target.value
		});
	},
	onGameCreatorStaticPiecesChange: function () {
		this.setState({
			staticPieces: GameCreatorStore.getStaticPieces()
		});
	},
	onGameCreatorFreedrawStateChanged: function (isFreedraw) {
		this.setState({
			isPencilToggled: isFreedraw
		});
	},
	onSavePngClick: function () {
		GameCreatorAction.saveCurrentToPng({
			filename: this.state.filenameValue
		});
	},
	onDeleteClick: function () {
		GameCreatorAction.deleteCurrentSelectedPiece();
	}
});

function keyPressed (key) {
	switch (key) {
	case 39:
		/* right*/
		GameCreatorAction.moveSelectedPieces({direction: 'right'});
		break;
	case 37:
		/* left*/
		GameCreatorAction.moveSelectedPieces({direction: 'left'});
		break;
	case 38:
		/* up*/
		GameCreatorAction.moveSelectedPieces({direction: 'up'});
		break;
	case 40:
		/* down*/
		GameCreatorAction.moveSelectedPieces({direction: 'down'});
		break;
	case 87:
		/* w*/
		GameCreatorAction.moveSelectedPieces({direction: 'up'});
		break;
	case 65:
		/* a*/
		GameCreatorAction.moveSelectedPieces({direction: 'left'});
		break;
	case 68:
		/* d*/
		GameCreatorAction.moveSelectedPieces({direction: 'right'});
		break;
	case 83:
		/* s*/
		GameCreatorAction.moveSelectedPieces({direction: 'down'});
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
}

module.exports = GameCreator;
