var React = require('react');
var ReactDOM = require('react-dom');

var GameCreatorStore = require('../../stores/GameCreatorStore');
var GameCreatorAction = require('../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../constants/GameCreatorConstants');

var PiecesOverview = require('../molecules/gamecreator/PiecesOverview.molecule');
var Col = require('react-bootstrap').Col;
var GameCreatorElement = require('./GameCreatorElement.atom');

var GameCreator = React.createClass({
	getInitialState: function () {
		return {
			canvas: null,
			staticPieces: GameCreatorStore.getStaticPieces()
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
		GameCreatorAction.setStaticPiecesFromServer();
		$(window).keyup(this.handleKeyPress);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
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
			<div ref='canvasParent' style={{height: '800px'}}>
				<Col md={2}>
					{gamecreatorelements}
				</Col>
				<Col md={8}>
					<canvas ref='creatorCanvas' id='fabricCanvas'></canvas>
				</Col>
				<Col md={2}>
					<PiecesOverview />
				</Col>
			</div>
		);
	},
	handleKeyPress: function (e) {
		switch (e.which) {
		case 127:
			GameCreatorAction.deleteCurrentSelectedPiece();
			break;
		case 37:
			GameCreatorAction.rotateCurrentSelectedPiece({
				next: false
			});
			e.preventDefault();
			break;
		case 39:
			GameCreatorAction.rotateCurrentSelectedPiece({
				next: true
			});
			e.preventDefault();
			break;
		}
	},
	onGameCreatorStaticPiecesChange: function () {
		this.setState({
			staticPieces: GameCreatorStore.getStaticPieces()
		});
	}
});

module.exports = GameCreator;
