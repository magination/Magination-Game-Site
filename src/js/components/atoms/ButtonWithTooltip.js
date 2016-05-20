var React = require('react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var Tooltip = require('react-bootstrap').Tooltip;
var Glyphicon = require('react-bootstrap').Glyphicon;

var ButtonWithTooltip = React.createClass({
	render: function () {
		var customButton;
		if (this.props.glyph) {
			customButton = <Button style={this.props.style} onClick={this.props.onClick}><Glyphicon glyph={this.props.glyph}/> {this.props.buttonText}</Button>;
		}
		else {
			customButton = <Button style={this.props.style} onClick={this.props.onClick}> {this.props.buttonText}</Button>;
		}
		return (
			<OverlayTrigger style={{width: '100%', margin: '0'}} placement='top' overlay={<Tooltip id={this.props.tooltip}>{this.props.tooltip}</Tooltip>} >
				{customButton}
			</OverlayTrigger>
		);
	}
});
module.exports = ButtonWithTooltip;
