var React = require('react');
var ReactDOM = require('react-dom');
// var Fabric = require('fabric');
var Col = require('react-bootstrap').Col;
var canvas = new fabric.Canvas('fabricCanvas');
var GameCreator = React.createClass({
	getInitialState: function () {
		return {
			canvas: null
		};
	},
	componentDidMount: function () {
		var parent = ReactDOM.findDOMNode(this.refs.canvasParent);
		var canvas = ReactDOM.findDOMNode(this.refs.creatorCanvas);
		canvas.width = parent.offsetWidth;
		canvas.height = parent.offsetHeight;
		this.setState({
			canvas: new fabric.Canvas('fabricCanvas')
		});
	},
	render: function () {
		return (
			<div style={{width: '100%', height: '100%'}}>
				<Col md={4}>

				</Col>
				<Col md={8} ref='canvasParent'>
					<canvas ref='creatorCanvas' id='fabricCanvas' style={{border: '1px solid black'}}></canvas>
				</Col>
			</div>
		);
	}
});

module.exports = GameCreator;
