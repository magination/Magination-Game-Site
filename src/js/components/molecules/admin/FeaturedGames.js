var React = require('react');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var FeedbackAction = require('../../../actions/FeedbackAction');

var URLS = require('../../../config/config').urls;
var ButtonStyles = require('../../../styles/Buttons');

var FeaturedGames = React.createClass({
	getInitialState: function () {
		return {
		};
	},
	render: function () {
		return (
			<div>
                <Col md={4}>
                    <h5>Featured game 1</h5>
                    <Input type='text' placeholder='Enter game id'/>
                    <Button style={ButtonStyles.MaginationFillParent}>Update game 1</Button>
                </Col>
                <Col md={4}>
                    <h5>Featured game 2</h5>
                    <Input type='text' placeholder='Enter game id'/>
                    <Button style={ButtonStyles.MaginationFillParent}>Update game 2</Button>
                </Col>
                <Col md={4}>
                    <h5>Featured game 3</h5>
                    <Input type='text' placeholder='Enter game id'/>
                    <Button style={ButtonStyles.MaginationFillParent}>Update game 3</Button>
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
	onSubmit: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: URLS.api.forgotpassword,
			data: JSON.stringify({
				password: this.state.passwordEntryValue
			}),
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onSubmitSuccessResponse,
				404: this.onSubmitNotFoundResponse
			}
		});
	},
	onSubmitSuccessResponse: function (data) {
		FeedbackAction.displaySuccessMessage({
			header: 'Changed Password!',
			message: 'Your password has now been changed'
		});
	},
	onSubmitNotFoundResponse: function () {
		FeedbackAction.displayErrorMessage({
			header: 'Error',
			message: 'The request url is either expired or does not exist, please request a new email'
		});
	}
});

module.exports = FeaturedGames;
