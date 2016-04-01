var React = require('react');

var GameCreatorCanvas = React.createClass({
	render: function(){
		return (
			<canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas>
		);
	}
});

module.exports = GameCreatorCanvas;