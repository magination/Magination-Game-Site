var React = require('react');
var URLS = require('../../config/config').urls;
var LoginStore = require('../../stores/LoginStore');
var FeedbackAction = require('../../actions/FeedbackAction');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationConstants = require('../../constants/NavigationConstants');
var ValidatorService = require('../../service/Validator.service');

var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var GameForm = React.createClass({
	getInitialState: function () {
		return {
			title: '',
			description: '',
			singles: '',
			doubles: '',
			triples: ''
		};
	},
	render: function () {
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<h2 className='text-center'>Create Game</h2>
					<form className='form-signin' onSubmit={this.postGame}>
						<Input value={this.state.title} type='text' label='Title' placeholder='Title' onChange={this.onTitleChanged}/>
						<Input value={this.state.description} type='textarea' label='Description' placeholder='How is your game played?' onChange={this.onDescriptionChanged}/>
						<Row>
							<Col md={4}>
								<strong>Required Pieces</strong>
								<Input value={this.state.singles} type='number' placeholder='Singles' onChange={this.singlesChanged} addonBefore='1'></Input>
								<Input value={this.state.doubles} type='number' placeholder='Doubles' onChange={this.doublesChanged} addonBefore='2'></Input>
								<Input value={this.state.triples} type='number' placeholder='Triples' onChange={this.triplesChanged} addonBefore={<img width={20} height={20} src='/public/img/triples.png'/>}></Input>
							</Col>
							<Col md={8}></Col>
						</Row>
						<Row>
							<Col md={12}>
								<Button type='submit'>Upload</Button>
							</Col>
						</Row>
					</form>
				</Col>
			</div>
		);
	},
	singlesChanged: function (e) {
		var singles = e.target.value;
		if (!ValidatorService.isNumericAndNotNegative(singles)) {
			singles = 0;
		}
		this.setState({
			singles: singles
		});
	},
	doublesChanged: function (e) {
		var doubles = e.target.value;
		if (!ValidatorService.isNumericAndNotNegative(doubles)) {
			doubles = 0;
		}
		this.setState({
			doubles: doubles
		});
	},
	triplesChanged: function (e) {
		var triples = e.target.value;
		if (!ValidatorService.isNumericAndNotNegative(triples)) {
			triples = 0;
		}
		this.setState({
			triples: triples
		});
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
				mainDescription: this.state.description,
				pieces: {
					singles: this.state.singles,
					doubles: this.state.doubles,
					triples: this.state.triples
				}
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.didPost
		});
	},
	didPost: function (data) {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + data._id,
			data: {
				game: data
			}
		});
		FeedbackAction.displaySuccessMessage({
			header: 'Success!',
			message: 'The game was created!'
		});
	}
});

module.exports = GameForm;
