/**
 * Created by petteriversen on 11.04.16.
 */
var React = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;

var RatingIcon = React.createClass({
	render: function () {
		return (
			<Glyphicon
				glyph={this.props.isSelected ? this.props.selectedImage : this.props.unselectedImage}
				onMouseOver={this.props.onMouseOver}
				onMouseLeave={this.props.onMouseLeave}
				onClick={this.props.onClick}
			/>
		);
	}
});
module.exports = RatingIcon;
