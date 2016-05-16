var React = require('react');
var ReportListElement = require('./GameReportListElement');
var ReportStore = require('../../../stores/ReportStore');
var ReportAction = require('../../../actions/ReportAction');
var ReportConstants = require('../../../constants/ReportConstants');

var GameReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: '',
			games: [],
			userFeedback: 'Loading reports'
		};
	},
	componentDidMount () {
		ReportStore.addChangeListener(this.onGameReportsChanged, ReportConstants.GAME_REPORTS_UPDATED);
		ReportAction.getReports('games');
	},
	componentWillUnmount: function () {
		ReportStore.removeChangeListener(this.onGameReportsChanged, ReportConstants.GAME_REPORTS_UPDATED);
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
	onGameReportsChanged: function () {
		this.setState({
			games: ReportStore.getGameReports(),
			userFeedback: 'No reports to show, great job!'
		});
	}
});
module.exports = GameReportList;
