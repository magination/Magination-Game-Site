var React = require('react');

var GameCreatorCanvas = require('../atoms/GameCreatorCanvas.atom');

var GameCreator = React.createClass({
	render: function () {
		return (
			<div>
				<GameCreatorCanvas/>
			</div>
		);
	}
});

module.exports = GameCreator;
