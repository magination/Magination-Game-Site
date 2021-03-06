var React = require('react');
var ReactDOM = require('react-dom');

var GameCreatorStore = require('../../stores/GameCreatorStore');
var GameCreatorAction = require('../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../constants/GameCreatorConstants');

var GameCreatorList = require('../molecules/gamecreator/GameCreatorList.molecule');
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

var height = '800px'; /* only initial height to avoid big 'jumps', it is set dynamically in componentDidMount*/
var toolButton = {
	width: '50%',
	backgroundColor: Color.blueDark
};

var GameCreator = React.createClass({
	getInitialState: function () {
		return {
			canvas: null,
			staticPieces: [],
			otherObject: [],
			isPencilToggled: false,
			gamecreatorListHeight: '0px'
		};
	},
	componentDidMount: function () {
		/* Manipulating domnodes directly, dangerous? */
		var parent = ReactDOM.findDOMNode(this.refs.canvasParent);
		var canvas = ReactDOM.findDOMNode(this.refs.creatorCanvas);
		var browserHeight = 0;
		if (typeof (window.innerHeight) === 'number') {
		// Non-IE
			browserHeight = window.innerHeight;
		}
		else if (document.documentElement && (document.documentElement.clientHeight)) {
		// IE 6+'
			browserHeight = document.documentElement.clientHeight;
		}
		height = (browserHeight * 90) / 100;
		var width = (parent.offsetWidth / 12) * 8;
		if (height > width) {
			height = width;
		}
		else if (width > height) {
			width = height;
		}
		canvas.width = width;
		canvas.height = height;
		var pieceToolsDivHeight = ReactDOM.findDOMNode(this.refs.pieceToolsDiv).offsetHeight;
		var saveButtonsDiv = ReactDOM.findDOMNode(this.refs.saveButtonsDiv).offsetHeight;
		this.setState({
			gamecreatorListHeight: height - pieceToolsDivHeight - saveButtonsDiv - ((height / 100) * 5)
		});
		GameCreatorAction.setCanvas({
			id: 'fabricCanvas'
		});
		GameCreatorStore.addChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorStore.addChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.addChangeListener(this.onActiveDataChanged, GameCreatorConstants.ACTIVE_DATA_CHANGED);
		GameCreatorAction.setStaticPiecesFromServer();
		$(window).keydown(this.handleKeyDown);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onGameCreatorFreedrawStateChanged, GameCreatorConstants.FREEDRAW_STATE_CHANGED);
		GameCreatorStore.removeChangeListener(this.onActiveDataChanged, GameCreatorConstants.ACTIVE_DATA_CHANGED);
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
		/*if (this.state.otherObject.length > 0) {
			gamecreatorelements.push(<GameCreatorElement key='otherobjects' piece={this.state.otherObject} noRotation={true} />);
		}*/
		var gamecreatorListStyle = {
			height: this.state.gamecreatorListHeight,
			overflowY: 'auto'
		};
		var pencilPopover = <Popover id='pencilSettings'><PencilSettingsOverlay /></Popover>;
		return (
			<div ref='canvasParent' style={{height: height}}>
				<Col xs={2} md={1}>
					{gamecreatorelements}
					<div onClick={this.onPencilClick}>
						<CustomGameCreatorElement glyph={'pencil'} isToggled={this.state.isPencilToggled} settingsComponent={pencilPopover}/>
					</div>
				</Col>
				<Col xs={8} md={8}>
					<div style={{margin: 'auto'}} onDragOver={this.onDragOverCanvas} onDragLeave={this.onDragLeaveCanvas} onDrop={this.onDropElementOnCanvas} onMouseEnter={this.onMouseEnterCanvas} onMouseLeave={this.onMouseLeaveCanvas}>
						<canvas style={{border: '1px solid ' + Color.blue}} ref='creatorCanvas' id='fabricCanvas'></canvas>
					</div>
				</Col>
				<Col xs={2} md={3}>
					<div style={{height: height, paddingLeft: 10}}>
						<div ref='pieceToolsDiv'>
							<h4>Piece Tools</h4>
							<Button style={toolButton} onClick={this.onMoveSelectedDeeperClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-down'/></Button>
							<Button style={toolButton} onClick={this.onMoveSelectedShallowerClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='arrow-up'/></Button>
							<Button style={toolButton} onClick={this.onCounterClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='chevron-left'/></Button>
							<Button style={toolButton} onClick={this.onClockwiseRotateClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='chevron-right'/></Button>
							<Button style={toolButton} onClick={this.onPlusButtonClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='plus'/></Button>
							<Button style={toolButton} onClick={this.onMinusButtonClick}><Glyphicon style={{color: 'white', fontSize: '25px'}} glyph='minus'/></Button>
							<Button style={{width: '100%', backgroundColor: Color.redLight}} onClick={this.onDeleteClick}><Glyphicon style={{fontSize: '25px', color: 'white'}} glyph='trash'/></Button>
							<hr/>
							<h4>Your Creators</h4>
							<Button style={ButtonStyle.MaginationFillParent} onClick={this.onCreateNewClick}>Create New</Button>
						</div>
						<div style={gamecreatorListStyle}>
							<GameCreatorList />
						</div>
						<div style={{width: '100%', paddingTop: '20px'}} ref='saveButtonsDiv'>
							<form onSubmit={this.onCreatorNameSubmit}>
									<Input onFocus={function () { $(window).unbind('keydown'); }} onBlur={this.onNameEntryBlur} type='text' onChange={this.onCreatorNameChange} value={this.state.creatorName} placeholder='Game Creator Name'/>
							</form>
							<Button style={ButtonStyle.MaginationFillParent} onClick={this.onSaveClick}>SAVE</Button>
							<Button style={ButtonStyle.MaginationFillParent} onClick={this.onAddToGameClick}>ADD TO GAME</Button>
							<Button
								style={{width: '100%', backgroundColor: Color.gray, color: '#fff', marginTop: '10px'}}
								onClick={this.props.close}>
								CLOSE
							</Button>
						</div>
					</div>
				</Col>
			</div>
		);
	},
	onNameEntryBlur: function () {
		$(window).keydown(this.handleKeyDown);
	},
	onPlusButtonClick: function (e) {
		GameCreatorAction.addScaleToCurrentSelected({
			value: 0.1
		});
	},
	onMinusButtonClick: function (e) {
		GameCreatorAction.addScaleToCurrentSelected({
			value: -0.1
		});
	},
	onDragOverCanvas: function (e) {
		e.preventDefault();
	},
	onDropElementOnCanvas: function (e) {
		e.preventDefault();
		e.stopPropagation();
		var url = e.dataTransfer.getData('URL');
		var canvasOffset = $('#fabricCanvas').offset();
		var file = e.dataTransfer.files[0];
		if (file) {
			GameCreatorAction.uploadImageAndAddToCreator({
				file: file,
				left: e.pageX - canvasOffset.left,
				top: e.pageY - canvasOffset.top
			});
		}
		else if (url !== '') {
			GameCreatorAction.addPieceByUrl({
				piece: {
					url: url,
					left: e.pageX - canvasOffset.left,
					top: e.pageY - canvasOffset.top,
					hasControls: !(url.indexOf('/pieces/') > -1)
				}
			});
		}
	},
	onMouseLeaveCanvas: function () {
		// $(window).unbind('keydown');
	},
	onMouseEnterCanvas: function () {
		// $(window).keydown(this.handleKeyDown);
	},
	onCreateNewClick: function () {
		GameCreatorAction.loadCreatorId({gameCreatorId: null});
	},
	onSaveClick: function () {
		GameCreatorAction.saveCurrentToJson();
	},
	onActiveDataChanged: function () {
		this.setState({
			creatorName: GameCreatorStore.getActiveGameCreator().title
		});
	},
	onCreatorNameSubmit: function (e) {
		e.preventDefault();
	},
	onCreatorNameChange: function (e) {
		this.setState({
			creatorName: e.target.value
		});
		GameCreatorAction.setActiveCreatorName({
			creatorName: e.target.value
		});
	},
	onMoveSelectedDeeperClick: function () {
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'in'});
	},
	onMoveSelectedShallowerClick: function () {
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'out'});
	},
	onCounterClockwiseRotateClick: function () {
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: true
		});
	},
	onClockwiseRotateClick: function () {
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: false
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
	onGameCreatorStaticPiecesChange: function () {
		this.setState({
			staticPieces: GameCreatorStore.getStaticPieces(),
			otherObject: GameCreatorStore.getOtherObjects()
		});
	},
	onGameCreatorFreedrawStateChanged: function (isFreedraw) {
		this.setState({
			isPencilToggled: isFreedraw
		});
	},
	onAddToGameClick: function () {
		GameCreatorAction.saveCurrentToPng();
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
		GameCreatorAction.addScaleToCurrentSelected({
			value: 0.1
		});
		break;
	case 189:
		/* -*/
		GameCreatorAction.addScaleToCurrentSelected({
			value: -0.1
		});
		break;
	case 90:
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'in'});
		break;
	case 88:
		GameCreatorAction.iterateSelectedPiecesDepth({direction: 'out'});
		break;
	case 46:
		GameCreatorAction.deleteCurrentSelectedPiece();
		break;
	case 69:
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: false
		});
		break;
	case 81:
		GameCreatorAction.rotateCurrentSelectedPiece({
			next: true
		});
		break;
	}
}

module.exports = GameCreator;
