var React = require('react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var Tooltip = require('react-bootstrap').Tooltip;

var RatingIcon = React.createClass({
	render: function () {
		return (
			<OverlayTrigger placement='top' overlay={<Tooltip id={this.props.tooltip}>{this.props.tooltip}</Tooltip>} >
				<Button style={this.props.style} onClick={this.props.onClick}>{this.props.buttonText}</Button>
			</OverlayTrigger>
		);
	}
});
module.exports = RatingIcon;
