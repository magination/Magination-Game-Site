var React = require('react');
var ReportListElement = require('./UserReportListElement');
var ReportStore = require('../../../stores/ReportStore');
var ReportAction = require('../../../actions/ReportAction');
var ReportConstants = require('../../../constants/ReportConstants');

var UserReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			users: [],
			userFeedback: 'Loading reports'
		};
	},
	componentDidMount () {
		ReportStore.addChangeListener(this.onUserReportsChanged, ReportConstants.USER_REPORTS_UPDATED);
		ReportAction.getReports('users');
	},
	componentWillUnmount: function () {
		ReportStore.removeChangeListener(this.onUserReportsChanged, ReportConstants.USER_REPORTS_UPDATED);
	},
	render: function () {
		var that = this;
		var users = this.state.users.map(function (user, i) {
			return (
				<ReportListElement key={i} reports={user.reports} id={user.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === user.id}/>
			);
		});
		return (
			<div>
				{this.state.users.length > 0 ? users : <h5>{this.state.userFeedback}</h5>}
			</div>
		);
	},
	onExpandElementClicked: function (id) {
		this.setState({
			currentExpanded: id
		});
	},
	onUserReportsChanged: function () {
		this.setState({
			games: ReportStore.getUserReports(),
			userFeedback: 'No reports to show, great job!'
		});
	}
});
module.exports = UserReportList;
