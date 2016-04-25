var React = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;
var ButtonStyles = require('../../styles/Buttons');
var RatingIcon = React.createClass({
	render: function () {
		return (
			<Glyphicon
				style={ButtonStyles.RatingStar}
				glyph={this.props.isSelected ? this.props.selectedImage : this.props.unselectedImage}
				onMouseOver={this.props.onMouseOver}
				onMouseLeave={this.props.onMouseLeave}
				onClick={this.props.onClick}
			/>
		);
	}
});
module.exports = RatingIcon;
