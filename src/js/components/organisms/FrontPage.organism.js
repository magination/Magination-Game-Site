var React = require('react');
var FrontPageGames = require('../molecules/frontpage/FrontPageGames');
var FrontPage = React.createClass({
	render: function () {
		return (
			<div>
				<FrontPageGames />
			</div>
		);
	}
});

module.exports = FrontPage;
