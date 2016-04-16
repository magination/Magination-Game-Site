var React = require('react');
var URLS = require('../../config/config').urls;
var LoginStore = require('../../stores/LoginStore');
var FeedbackAction = require('../../actions/FeedbackAction');

var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var GameForm = React.createClass({
	getInitialState: function () {
		return {
			title: '',
			description: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<h2 className='text-center form-uploadGame-heading'>Upload game</h2>
					<form className='form-signin' onSubmit={this.postGame}>
						<Input value={this.state.title} type='text' label='Title' placeholder='Title' onChange={this.onTitleChanged}/>
						<Input value={this.state.description} type='textarea' label='Description' placeholder='How is your game played?' onChange={this.onDescriptionChanged}/>
						<Button type='submit'>Upload</Button>
					</form>
				</Col>
			</div>
		);
	},
	onTitleChanged: function (e) {
		this.setState({
			title: e.target.value
		});
	},
	onDescriptionChanged: function (e) {
		this.setState({
			description: e.target.value
		});
	},
	postGame: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: URLS.api.games,
			data: JSON.stringify({
				title: this.state.title,
				shortDescription: this.state.description,
				mainDescription: this.state.description
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.didPost
		});
	},
	didPost: function () {
		FeedbackAction.displaySuccessMessage({
			header: 'Saved',
			message: 'Game saved.'
		});
	}
});

module.exports = GameForm;
