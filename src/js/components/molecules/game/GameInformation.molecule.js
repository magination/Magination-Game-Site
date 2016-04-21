var React = require('react');
var ContainerStyle = require('../../../styles/Containers').informationContainer;
var GameInformation = React.createClass({
	render: function () {
		return (
			<div style={ContainerStyle}>
				Yo bois!
			</div>
		);
	}
});

module.exports = GameInformation;
