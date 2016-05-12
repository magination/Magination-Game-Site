var React = require('react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var Popover = require('react-bootstrap').Popover;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ButtonStyles = require('../../styles/Buttons');
var ConfirmButton = React.createClass({
	render: function () {
		var customButton;
		if (this.props.glyph) {
			customButton = <Button ref='button' style={this.props.style}><Glyphicon glyph={this.props.glyph}/> {this.props.buttonText}</Button>;
		}
		else {
			customButton = <Button ref='button' style={this.props.style}> {this.props.buttonText}</Button>;
		}
		var popOver = <Popover title='Confirm' id={'Confirm action'}>
						<Row>
							<Col md={12}>{this.props.confirmationDialog}</Col>
						</Row>
						<Row>
							<Col md={4}><Button style={ButtonStyles.confirmButton.yes} onClick={this.onYesClicked}>Yes</Button></Col>
							<Col md={4} mdOffset={2} style={{position: 'absolute', right: 0}}><Button style={ButtonStyles.confirmButton.no}>No</Button></Col>
						</Row>
						</Popover>;
		return (
			<OverlayTrigger trigger='focus' placement={this.props.placement} overlay={popOver}>
				{customButton}
			</OverlayTrigger>
		);
	},
	onYesClicked: function () {
		this.props.onClick();
	}
});
module.exports = ConfirmButton;
