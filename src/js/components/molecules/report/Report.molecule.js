var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonStyles = require('../../../styles/Buttons');
var TextStyles = require('../../../styles/Text');
var LoginStore = require('../../../stores/LoginStore');
var URLS = require('../../../config/config').urls;
var GlyphIcon = require('react-bootstrap').Glyphicon;

var Report = React.createClass({
	getInitialState: function () {
		return {
			userMessage: undefined,
			reportText: '',
			isShowModal: false
		};
	},
	render: function () {
		return (
			<div>
				<Button style={ButtonStyles.report} onClick={this.onShowModalClicked}><GlyphIcon glyph='glyphicon glyphicon-flag'/> REPORT</Button>
				<Modal dialogClassName='custom-modal' show={this.state.isShowModal} onHide={this.onHide}>
					<Modal.Header>
						<Modal.Title>Report</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.userMessage
							? <h3>{this.state.userMessage}</h3>
							: <Input style={TextStyles.textArea} type='textarea' value={this.state.reportText} placeholder='Describe the infringement' onChange={this.onReportTextChanged}/>}
					</Modal.Body>
					<Modal.Footer>
						<Button style={ButtonStyles.cancel} onClick={this.onHide}>{this.state.userMessage ? 'CLOSE' : 'CANCEL'}</Button>
						{this.state.userMessage
							? null
							: <Button style={ButtonStyles.submit} onClick={this.onReportClicked}>REPORT</Button>}
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
		this.setState({
			isShowModal: false,
			reportText: '',
			userMessage: undefined
		});
	},
	onShowModalClicked: function () {
		this.setState({
			isShowModal: true
		});
	},
	postReport: function () {
		var report = {
			type: this.props.reportType,
			id: this.props.reportId,
			reportText: this.state.reportText
		};
		var requestUrl = URLS.api.report;
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
