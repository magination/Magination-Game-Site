var React = require('react');

var NavigationAction = require('../../actions/NavigationAction');

var ListLinkElement = React.createClass({
	render: function() {
		var className = (this.props.isActive)?"active":""
		return(
			<li className={className} onClick={this.onClick}><a href="#">{this.props.displayText}</a></li>
		);
	},
	onClick: function(){
		NavigationAction.navigate({
			destination: this.props.destination
		});
	}
});

module.exports = ListLinkElement;