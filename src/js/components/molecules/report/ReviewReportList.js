var React = require('react');
var ReportListElement = require('./ReviewReportListElement');

var ReviewReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: ''
		};
	},
	render: function () {
		var that = this;
		var reviews = this.props.reviews.map(function (review, i) {
			return (
				<ReportListElement key={i} reports={review.reports} id={review.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === review.id}/>
			);
		});
		return (
			<div>
				{reviews}
			</div>
		);
	},
	onExpandElementClicked: function (id) {
		this.setState({
			currentExpanded: id
		});
	}
});
module.exports = ReviewReportList;
