var React = require('react');
var ContainerStyles = require('../../../styles/Containers');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var ReportAction = require('../../../actions/ReportAction');

var GameReportListElement = React.createClass({
	getInitialState: function () {
		return {
			userFeedback: undefined
		};
	},
	render: function () {
		var reports = this.props.reports.map(function (report, i) {
			return (
				<div key={i}>
					<h3 style={{padding: '0', margin: '0'}}>Description:</h3>
					<h5 style={{padding: '0', margin: '0'}}>{report.reportText}</h5>
					<Col md={12}><hr/></Col>
				</div>);
		});
		return (
			<div>
				<div>
					<Col md={12} onClick={this.onExpandElementClicked} style={ContainerStyles.moderatorPage.reportListElementContainer}>
						<div>
							<h4>Game ID: {this.props.id} (click to expand)</h4>
						</div>
					</Col>
					<Collapse in={this.props.isShow}>
						<Col md={12}>
							<Well style={{marginBottom: '0'}}>
								<div>
									{this.state.userFeedback ? <h5>{this.state.userFeedback}</h5> : reports}
									<Row>
										<Col md={12}>
											<Button onClick={this.onUnpublishClicked}>Unpublish</Button>
											<Button onClick={this.onDismissClicked}>Dismiss reports</Button>
											<Button onClick={this.onGoToGameClicked}>Go to game</Button>
										</Col>
									</Row>
								</div>
							</Well>
						</Col>
					</Collapse>
				</div>
			</div>
		);
	},
	onExpandElementClicked: function () {
		this.props.onExpandElementClicked(this.props.isShow ? '' : this.props.id);
	},
	onUnpublishClicked () {
		ReportAction.unpublishGame(this.props.id);
	},
	onDismissClicked: function () {
		ReportAction.dismissReports('games', this.props.id);
	},
	onGoToGameClicked: function () {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + this.props.id
		});
	}
});

module.exports = GameReportListElement;
