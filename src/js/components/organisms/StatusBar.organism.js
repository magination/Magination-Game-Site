var React = require('react');

var FeedbackStore = require('../../stores/FeedbackStore');
var FeedbackAction = require('../../actions/FeedbackAction');

function getFeedback(){
	return FeedbackStore.getFeedback();
}

var StatusBar = React.createClass({
	getInitialState: function(){
		return {
			statusType: "",
			header: "",
			message: ""
		};
	},
	componentDidMount: function(){
		FeedbackStore.addChangeListener(this.onFeedbackChange);
	},
	componentWillUnmount: function(){
		FeedbackStore.removeChangeListener(this.onFeedbackChange);
	},
	render: function(){
		var xButton = (this.state.statusType != "")?<a className="close" data-dismiss="alert">&times;</a>:<a/>;
		return (
			<div className={this.state.statusType}>
				{xButton}
				<strong>{this.state.header}</strong> {this.state.message}
			</div>
		)
	},
	onFeedbackChange: function(){
		this.setState(getFeedback());
	}
});

module.exports = StatusBar;