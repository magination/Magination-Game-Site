var React = require('react');
var ReportListElement = require('./GameReportListElement');

var GameReportList = React.createClass({
	getInitialState () {
		return {
			currentExpanded: ''
		};
	},
	render: function () {
		var that = this;
		var games = this.props.games.map(function (game, i) {
			return (
				<ReportListElement key={i} reports={game.reports} id={game.id} onExpandElementClicked={that.onExpandElementClicked} isShow={that.state.currentExpanded === game.id}/>
			);
		});
		return (
			<div>
				{games}
			</div>
		);
	},
	onExpandElementClicked: function (id) {
		this.setState({
			currentExpanded: id
		});
	}
});
module.exports = GameReportList;
