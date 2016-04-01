var React = require('react');

var BrowseGames = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		owner: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<div>
				<strong>Title: </strong>{this.props.title}
				<br/>
				<strong>Description: </strong>{this.props.description}
				<br/>
				<strong>Owner: </strong>{this.props.owner}
			</div>
		);
	}
});
module.exports = BrowseGames;