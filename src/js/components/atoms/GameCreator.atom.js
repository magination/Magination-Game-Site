var React = require('react');
var ReactDOM = require('react-dom');

var GameCreatorStore = require('../../stores/GameCreatorStore');
var GameCreatorAction = require('../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../constants/GameCreatorConstants');

var Col = require('react-bootstrap').Col;
var GameCreatorElement = require('./GameCreatorElement.atom');

var fabriccanvas = {};

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
		canvas.width = (parent.offsetWidth / 12) * 7;
		canvas.height = parent.offsetHeight;

		fabriccanvas = new fabric.Canvas('fabricCanvas');

		GameCreatorStore.addChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
		GameCreatorStore.addChangeListener(this.onGameCreatorPieceAdded, GameCreatorConstants.ADD_PIECE_TO_CREATOR);
		GameCreatorAction.setStaticPiecesFromServer();
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onGameCreatorStaticPiecesChange, GameCreatorConstants.SET_STATIC_PIECES);
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
				<Col md={7}>
					<canvas ref='creatorCanvas' id='fabricCanvas' style={{border: '4px solid blue', borderRadius: '5'}}></canvas>
				</Col>
				<Col md={3}>
				</Col>
			</div>
		);
	},
	onGameCreatorStaticPiecesChange: function () {
		this.setState({
			staticPieces: GameCreatorStore.getStaticPieces()
		});
	},
	onGameCreatorPieceAdded: function (url) {
		fabric.Image.fromURL(url, function (oImg) {
			fabriccanvas.add(oImg);
		});
	}
});

module.exports = GameCreator;
