var React = require('react');
var Col = require('react-bootstrap').Col;

var NotFoundPage = React.createClass({
	render: function () {
		return (
			<Col md={4} mdOffset={2}>
				<h5>Magnetic fields have distorted time and space, rendering us unable to find the requested page.</h5>
			</Col>
		);
	}
});

module.exports = NotFoundPage;
