var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var LoginStore = require('../../../stores/LoginStore');
var FeedbackAction = require('../../../actions/FeedbackAction');
var URLS = require('../../../config/config').urls;

var ModeratorListItem = require('./ModeratorListItem');

var Moderators = React.createClass({
	getInitialState: function () {
		return {
			moderators: [],
			newModeratorUsername: ''
		};
	},
	componentDidMount: function () {
		this.requestModeratorList();
	},
	render: function () {
		var moderators = [];
		var that = this;
		if (this.state.moderators && this.state.moderators.length > 0) {
			this.state.moderators.forEach(function (item, index) {
				var moderator = <ModeratorListItem key={index} username={item} onDeleteModeratorClicked={that.onDeleteModeratorClicked}/>;
				moderators.push(moderator);
			});
		}
		return (
			<div>
				<Col md={12}>
					<h5>Add moderator</h5>
				</Col>
				<Col md={4}>
					<Input type='text' placeholder='Enter username' onChange={this.onModeratorNameChanged}/>
				</Col>
				<Col md={4}>
					<Button onClick={this.onAddModeratorClicked}>Add moderator</Button>
				</Col>
				<Col md={4}><div></div></Col>
				<Col md={12}>
					<h5>Current moderators:</h5>
				</Col>
				<Col md={12}>
					{moderators}
				</Col>
			</div>
		);
	},
	onModeratorNameChanged: function (e) {
		this.setState({
			newModeratorUsername: e.target.value
		});
	},
	onAddModeratorClicked: function () {
		if (this.state.newModeratorUsername.length === 0) return;
		$.ajax({
			type: 'POST',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			url: URLS.api.moderators + '/' + this.state.newModeratorUsername,
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onPostSuccessResponse,
				404: this.onPostNotFoundResponse
			}
		});
	},
	onPostSuccessResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Success',
			message: 'Moderator added'
		});
		this.requestModeratorList();
	},
	onPostNotFoundResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'No user with given username found'
		});
	},
	onDeleteModeratorClicked: function (username) {
		$.ajax({
			type: 'DELETE',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			url: URLS.api.moderators + '/' + username,
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onDeleteSuccessResponse
			}
		});
	},
	onDeleteSuccessResponse: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Moderator removed'
		});
	},
	requestModeratorList: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.moderators,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onGetModeratorsSuccessResponse
			}
		});
	},
	onGetModeratorsSuccessResponse: function (data) {
		this.setState({
			moderators: data
		});
	}
});

module.exports = Moderators;
