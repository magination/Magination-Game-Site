var React = require('react');
var ContainerStyles = require('../../../styles/Containers');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Button = require('react-bootstrap').Button;
var ReportAction = require('../../../actions/ReportAction');
var URLS = require('../../../config/config').urls;
var Review = require('../game/Review.molecule');

var GameReportListElement = React.createClass({
	getInitialState: function () {
		return {
			showModal: false,
			review: undefined
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
									{reports}
									<Row>
										<Col md={4} onClick={this.onRemoveReviewClicked}><Button>Delete review</Button></Col>
										<Col md={4} onClick={this.onDismissClicked}><Button>Dismiss reports</Button></Col>
										<Col md={4} onClick={this.onViewReviewClicked}><Button>View review</Button></Col>
									</Row>
								</div>
							</Well>
						</Col>
					</Collapse>
				</div>
				<Modal ref='modal' show={this.state.showModal} onHide={this.close}>
					<Modal.Body>
						<Review data={this.state.review}/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
	onExpandElementClicked: function () {
		this.props.onExpandElementClicked(this.props.isShow ? '' : this.props.id);
	},
	onDeleteReviewClicked () {
		ReportAction.removeReview(this.props.id);
	},
	onDismissClicked: function () {
		ReportAction.dismissReports('reviews', this.props.id);
	},
	onViewReviewClicked: function () {
		if (this.state.review) this.onGetReviewSuccess(this.state.review);
		$.ajax({
			type: 'GET',
			url: URLS.api.reviews + '/' + this.props.id,
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onGetReviewSuccess
			}
		});
	},
	onGetReviewSuccess: function (data) {
		this.setState({
			review: data,
			showModal: true
		});
	},
	close: function () {
		this.setState({
			showModal: false
		});
	}
});

module.exports = GameReportListElement;
