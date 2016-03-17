var React = require('react');

var BrowseGames = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		owner: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<ul className="list-inline">
				<li className="list-group-item">{this.props.title}</li>
				<li className="list-group-item">{this.props.description}</li>
				<li className="list-group-item">{this.props.owner}</li>
			</ul>
		);
	}
});
module.exports = BrowseGames;