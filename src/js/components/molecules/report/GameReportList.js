var React = require('react');
var ReportListElement = require('./GameReportListElement');
var URLS = require('../../../config/config').urls;
var LoginStore = require('../../../stores/LoginStore');

var GameReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			games: [],
			userFeedback: 'Loading reports'
		};
	},
	componentDidMount () {
		$.ajax({
			type: 'GET',
			url: URLS.api.report + '/games',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				201: this.onRequestSuccess
			}
		});
	},
	render: function () {
		var that = this;
		var games = this.state.games.map(function (game, i) {
			return (
				<ReportListElement key={i} reports={game.reports} id={game.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === game.id}/>
			);
		});
		return (
			<div>
				{this.state.games.length > 0 ? games : <h5>{this.state.userFeedback}</h5>}
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
			games: data,
			hasSuccesRequest: 'No reports to show, good job!'
		});
	}
});
module.exports = GameReportList;
