var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var FeedbackAction = require('../../../actions/FeedbackAction');
var LoginStore = require('../../../stores/LoginStore');
var URLS = require('../../../config/config').urls;
var ButtonStyles = require('../../../styles/Buttons');

var FeaturedGames = React.createClass({
	getInitialState: function () {
		return {
			gameOneId: '',
			gameTwoId: '',
			gameThreeId: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={12}>
					<h5>Enter up to three game ids to set them as featured games. Leaving fields empty causes the featured game list to include less games.</h5>
				</Col>
                <Col md={4}>
                    <h5>Featured game 1</h5>
                    <Input type='text' placeholder='Enter game id'/>
                </Col>
                <Col md={4}>
                    <h5>Featured game 2</h5>
                    <Input type='text' placeholder='Enter game id'/>
                </Col>
                <Col md={4}>
                    <h5>Featured game 3</h5>
                    <Input type='text' placeholder='Enter game id'/>
                </Col>
				<Col md={12}>
					<Button style={ButtonStyles.MaginationFillParent} onClick={this.onUpdateClicked}>Update featured games</Button>
				</Col>
			</div>
		);
	},
	onPasswordEntryChanged: function (e) {
		this.setState({
			passwordEntryValue: e.target.value
		});
		this.validateForm();
	},
	onPasswordConfirmEntryChanged: function (e) {
		this.setState({
			passwordConfirmEntryValue: e.target.value
		});
		this.validateForm();
	},
	onUpdateClicked: function () {
		var games = [];
		if (this.state.gameOneId !== '') games.push(this.state.gameOneId);
		if (this.state.gameTwoId !== '') games.push(this.state.gameTwoId);
		if (this.state.gameThreeId !== '') games.push(this.state.gameThreeId);
		$.ajax({
			type: 'PUT',
			url: URLS.api.games + '/featured',
			data: JSON.stringify({
				games: games
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onSubmitSuccessResponse,
				404: this.onSubmitNotFoundResponse,
				422: this.onSubmitUnprocessableEntityResponse
			}
		});
	},
	onSubmitSuccessResponse: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Success',
			message: 'Featured games updated'
		});
	},
	onSubmitNotFoundResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'Atleast one of the ids provided did not link to a game'
		});
	},
	onSubmitUnprocessableEntityResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'Atleast one of the provided ids are not valid game ids'
		});
	}
});

module.exports = FeaturedGames;
