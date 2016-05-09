var React = require('react');
var ContainerStyle = require('../../../styles/Containers');
var GlyphIcon = require('react-bootstrap').Glyphicon;
var TextStyle = require('../../../styles/Text');
var AllowDropImageContainer = React.createClass({
	render: function () {
		return (
			<div style={ContainerStyle.imageList.droppableDiv} onDrop={this.onImageDrop} onDragOver={this.allowDrop} >
				<div style={ContainerStyle.imageList.outer} draggable={true} onDragStart={this.onImageDrag}>
					<div style={ContainerStyle.imageList.inner}>
						<img src={this.props.image} style={ContainerStyle.imageList.img} draggable={false}></img>
						<div style={ContainerStyle.imageList.upperRight} onClick={this.onDeleteClicked}>
							<GlyphIcon glyph='glyphicon glyphicon-remove' style={TextStyle.red} ></GlyphIcon>
						</div>
					</div>
				</div>
			</div>
		);
	},
	onImageDrop: function (e) {
		e.preventDefault();
		var otherPosition = e.dataTransfer.getData('position');
		this.props.imageDropped(otherPosition, this.props.position);
	},
	onImageDrag: function (e) {
		e.dataTransfer.setData('position', this.props.position);
	},
	allowDrop: function (e) {
		e.preventDefault();
	},
	onDeleteClicked: function () {
		this.props.onDeleteClicked(this.props.position);
	}
});
module.exports = AllowDropImageContainer;
