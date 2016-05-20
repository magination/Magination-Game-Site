var React = require('react');
var ReportListElement = require('./ReviewReportListElement');
var ReportStore = require('../../../stores/ReportStore');
var ReportAction = require('../../../actions/ReportAction');
var ReportConstants = require('../../../constants/ReportConstants');

var ReviewReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			reviews: [],
			userFeedback: 'Loading reports'
		};
	},
	componentDidMount () {
		ReportStore.addChangeListener(this.onReviewReportsChanged, ReportConstants.REVIEW_REPORTS_UPDATED);
		ReportAction.getReports('reviews');
	},
	componentWillUnmount: function () {
		ReportStore.removeChangeListener(this.onReviewReportsChanged, ReportConstants.REVIEW_REPORTS_UPDATED);
	},
	render: function () {
		var that = this;
		var reviews = this.state.reviews.map(function (review, i) {
			return (
				<ReportListElement key={i} reports={review.reports} id={review.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === review.id}/>
			);
		});
		return (
			<div>
				{this.state.reviews.length > 0 ? reviews : <h5>{this.state.userFeedback}</h5>}
			</div>
		);
	},
	onExpandElementClicked: function (id) {
		this.setState({
			currentExpanded: id
		});
	},
	onReviewReportsChanged: function () {
		this.setState({
			games: ReportStore.getReviewReports(),
			userFeedback: 'No reports to show, great job!'
		});
	}

});
module.exports = ReviewReportList;
