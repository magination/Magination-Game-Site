var React = require('react');

var Fabric = require('fabric');

var canvas = new Fabric.Canvas('fabricCanvas');

var GameCreator = React.createClass({
	componentDidMount: function () {
		Fabric.Image.fromURL('/public/img/magination-pieces/piece-white-single.png', function (oImg) {
			canvas.add(oImg);
		});
	},
	render: function () {
		return (
			<div>
				<canvas id='fabricCanvas'></canvas>
			</div>
		);
	}
});

module.exports = GameCreator;
