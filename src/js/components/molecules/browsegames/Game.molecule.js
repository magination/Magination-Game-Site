var React = require('react');

var BrowseGames = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		owner: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<div className="col-md-12">
				<div>{this.props.title}</div>
				<div>{this.props.description}</div>
				<div>{this.props.owner}</div>
			</div>
		);
	}
});
module.exports = BrowseGames;