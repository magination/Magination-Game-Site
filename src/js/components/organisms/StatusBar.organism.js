var React = require('react');

var StatusBar = React.createClass({
	getInitialState: function(){
		return {
			statusType: "",
			header: "Success",
			text: "Logged in as ..."
		};
	},
	render: function(){
		return (
			<div className={this.state.statusType}>
			</div>
		)
	}
});

module.exports = StatusBar;