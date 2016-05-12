var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonStyles = require('../../../styles/Buttons');
var TextStyles = require('../../../styles/Text');
var LoginStore = require('../../../stores/LoginStore');
var URLS = require('../../../config/config').urls;

var Report = React.createClass({
	getInitialState: function () {
		return {
			userMessage: undefined,
			reportText: ''
		};
	},
	render: function () {
		return (
			<div>
				<Modal dialogClassName='custom-modal' show={this.props.show} onHide={this.onHide}>
					<Modal.Header>
						<Modal.Title>Report</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.userMessage
							? <h3>{this.state.userMessage}</h3>
							: <Input style={TextStyles.textArea} type='textarea' value={this.state.reportText} placeholder='Describe the infringement' onChange={this.onReportTextChanged}/>}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.onHide}>{this.state.userMessage ? 'CLOSE' : 'CANCEL'}</Button>
						{this.state.userMessage
							? null
							: <Button style={ButtonStyles.Magination} onClick={this.onReportClicked}>REPORT</Button>}
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
	onReportClicked: function (e) {
		e.preventDefault();
		if (this.state.reportText === '') {
			return;
		};
		this.postReport();
	},
	onHide: function () {
		this.props.close();
	},
	postReport: function () {
		var report = {
			type: this.props.reportType,
			id: this.props.objectId,
			reportText: this.state.reportText
		};
		var requestUrl = URLS.api.reports;
		requestUrl += '/' + report.type;

		$.ajax({
			type: 'POST',
			url: requestUrl,
			data: JSON.stringify(report),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				201: this.onReportSubmitSuccessResponse
			}
		});
	},
	onReportSubmitSuccessResponse: function () {
		this.setState({
			userMessage: 'Report submitted'
		});
	},
	onReportTextChanged: function (e) {
		if (e.target.value.length > 5000) {
			return;
		}
		this.setState({
			reportText: e.target.value
		});
	}
});

module.exports = Report;
