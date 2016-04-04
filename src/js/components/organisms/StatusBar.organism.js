var React = require('react');

var FeedbackStore = require('../../stores/FeedbackStore');

function getFeedback () {
	return FeedbackStore.getFeedback();
}

var StatusBar = React.createClass({
	getInitialState: function () {
		return {
			statusType: '',
			header: '',
			message: ''
		};
	},
	componentDidMount: function () {
		FeedbackStore.addChangeListener(this.onFeedbackChange);
	},
	componentWillUnmount: function () {
		FeedbackStore.removeChangeListener(this.onFeedbackChange);
	},
	render: function () {
		var xButton = (this.state.statusType !== '') ? <a onClick={this.onCloseFeedbackClick} className='close'>&times;</a> : <a/>;
		return (
			<div className={this.state.statusType}>
				{xButton}
				<strong>{this.state.header}</strong> {this.state.message}
			</div>
		);
	},
	onCloseFeedbackClick: function () {
		this.setState({
			statusType: 'hide'
		});
	},
	onFeedbackChange: function () {
		this.setState(getFeedback());
	}
});

module.exports = StatusBar;
