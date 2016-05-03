var React = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;
var RatingIcon = React.createClass({
	render: function () {
		return (
			<Glyphicon
				style={this.props.glyphStyle}
				glyph={this.props.isSelected ? this.props.selectedImage : this.props.unselectedImage}
				onMouseOver={this.props.onMouseOver}
				onMouseLeave={this.props.onMouseLeave}
				onClick={this.props.onClick}
			/>
		);
	}
});
module.exports = RatingIcon;
