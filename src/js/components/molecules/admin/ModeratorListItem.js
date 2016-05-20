var React = require('react');
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var ButtonStyles = require('../../../styles/Buttons');

var Moderators = React.createClass({
	render: function () {
		return (
			<div>
				<Col md={10}>
					<h5>{this.props.username}</h5>
				</Col>
				<Col md={2}>
					<Button
						style={ButtonStyles.delete}
						onClick={this.onDeleteClicked}
					>
						Remove
					</Button>
				</Col>
			</div>
		);
	},
	onDeleteClicked: function () {
		this.props.onDeleteModeratorClicked(this.props.username);
	}
});

module.exports = Moderators;
