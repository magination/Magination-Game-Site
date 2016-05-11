var React = require('react');
var ReportListElement = require('./UserReportListElement');
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');

var UserReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			users: []
		};
	},
	componentDidMount () {
		$.ajax({
			type: 'GET',
			url: URLS.api.report + '/users',
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
		var users = this.state.users.map(function (user, i) {
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
	},
	onRequestSuccess: function (data) {
		this.setState({
			users: data
		});
	}
});
module.exports = UserReportList;
