var React = require('react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
var Input = require('react-bootstrap').Input;

var ConfirmButton = React.createClass({
	render: function () {
		return (
			<OverlayTrigger
                trigger='focus'
                placement={this.props.placement}
                overlay={<Tooltip ref='tooltip'>{this.props.tooltip}</Tooltip>}
            >
                <Input
                    value={this.props.value}
                    bsStyle={this.props.bsStyle}
                    label={this.props.label}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    hasFeedback={this.props.hasFeedback}
                />
			</OverlayTrigger>
		);
	}
});
module.exports = ConfirmButton;
