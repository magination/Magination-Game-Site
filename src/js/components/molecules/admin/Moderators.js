var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var LoginStore = require('../../stores/LoginStore');

var FeedbackAction = require('../../../actions/FeedbackAction');

var URLS = require('../../../config/config').urls;
var ButtonStyles = require('../../../styles/Buttons');

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
		this.state.moderators.forEach(function (item, index) {
			var moderator = <ModeratorListItem username={item.name} userId={item._id} onClick={this.onDeleteModeratorClicked}/>;
			moderators.push(moderator);
		});
		return (
			<div>
				<Row>
					<h5>Add moderator</h5>
				</Row>
				<Row>
					<Col md={4}>
						<Input type='text' placeholder='Enter user id'/>
					</Col>
				</Row>
				<Row>
				<Col md={4}>
					<Button style={ButtonStyles.MaginationFillParent}>Update featured games</Button>
				</Col>
				</Row>
				<Row>
					<h5>Current moderators:</h5>
				</Row>
				<Col md={12}>
					{moderators}
				</Col>
			</div>
		);
	},
	onAddModeratorClicked: function () {
		if (this.state.newModeratorUsername.length === 0) return;
		$.ajax({
			type: 'POST',
			url: URLS.api.users + '/moderators/' + this.state.newModeratorUsername,
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onPostSuccessResponse,
				404: this.onPostNotFoundResponse,
				422: this.onPostUnprocessableEntityResponse
			}
		});
	},
	onDeleteModeratorClicked: function (username) {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.users + '/moderators/' + username,
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
	onGetModeratorsSuccessResponse: function (data) {
		this.setState({
			moderators: data
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
			message: 'At least one of the ids provided did not link to a game'
		});
	},
	onPostUnprocessableEntityResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'At least one of the provided ids are not valid game ids'
		});
	},
	requestModeratorList: function () {
		$.ajax({
			type: 'GET',
			url: URLS.api.users + '/moderators',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onGetModeratorsSuccessResponse
			}
		});
	}
});

module.exports = Moderators;
