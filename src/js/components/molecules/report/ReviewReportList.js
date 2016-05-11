var React = require('react');
var ReportListElement = require('./ReviewReportListElement');
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');

var ReviewReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			reviews: [],
			userFeedback: 'Loading reports'
		};
	},
	componentDidMount () {
		$.ajax({
			type: 'GET',
			url: URLS.api.report + '/reviews',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onRequestSuccess
			}
		});
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
	onRequestSuccess: function (data) {
		this.setState({
			reviews: data.reviews,
			userFeedback: 'No reports to show, good job!'
		});
	}

});
module.exports = ReviewReportList;
