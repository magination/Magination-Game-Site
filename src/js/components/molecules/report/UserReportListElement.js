var React = require('react');
var ContainerStyles = require('../../../styles/Containers');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;

var GameReportListElement = React.createClass({
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
							<h4>User ID: {this.props.id} (click to expand)</h4>
						</div>
					</Col>
					<Collapse in={this.props.isShow}>
						<Col md={12}>
							<Well style={{marginBottom: '0'}}>
								<div>
									{reports}
									<Row>
										<Col md={4}><Button>Ban user</Button></Col>
										<Col md={4}><Button>Dismiss reports</Button></Col>
										<Col md={4}><Button>Go to profile</Button></Col>
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
	}
});

module.exports = GameReportListElement;
