var React = require('react');
var ReportListElement = require('./UserReportListElement');

var UserReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: ''
		};
	},
	render: function () {
		var that = this;
		var users = this.props.users.map(function (user, i) {
			return (
				<ReportListElement key={i} reports={user.reports} id={user.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === user.id}/>
			);
		});
		return (
			<div>
				{users}
			</div>
		);
	},
	onExpandElementClicked: function (id) {
		this.setState({
			currentExpanded: id
		});
	}
});
module.exports = UserReportList;
