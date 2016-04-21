var React = require('react');
var URLS = require('../../config/config').urls;
var LoginStore = require('../../stores/LoginStore');
var FeedbackAction = require('../../actions/FeedbackAction');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationConstants = require('../../constants/NavigationConstants');
var ValidatorService = require('../../service/Validator.service');
var ImageNumberPair = require('../molecules/ImageNumberPair.molecule');
var GameStore = require('../../stores/GameStore');
var GameAction = require('../../actions/GameAction');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var GameForm = React.createClass({
	getInitialState: function () {
		if (GameStore.getGame()) {
			return {
				title: GameStore.getGame().title ? GameStore.getGame().title : '',
				description: GameStore.getGame().description ? GameStore.getGame().description : '',
				singles: GameStore.getGame().singles ? GameStore.getGame().singles : '0',
				doubles: GameStore.getGame().doubles ? GameStore.getGame().doubles : '0',
				triples: GameStore.getGame().triples ? GameStore.getGame().triples : '0'
			};
		}
		else {
			return {
				title: '',
				description: '',
				singles: '0',
				doubles: '0',
				triples: '0'
			};
		}
	},
	componentWillMount () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	componentDidMount () {
		if (GameStore.getGame()) {
			/*
			TODO: Confirm overwriting already stored game
			 */
		}
		else {
			GameAction.createNewGameLocally();
		}
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
								<strong>PIECES</strong>
								<ImageNumberPair value={this.state.singles} src={URLS.img.pieceSingleBlue} placeholder='Singles' bindingProperty='singles'/>
								<ImageNumberPair value={this.state.doubles} src={URLS.img.pieceDoubleBlue} placeholder='Doubles' bindingProperty='doubles'/>
								<ImageNumberPair value={this.state.triples} src={URLS.img.pieceTripleBlue} placeholder='Triples' bindingProperty='triples'/>
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
	onGameStateChanged: function () {
		this.setState({
			singles: GameStore.getGame().singles,
			doubles: GameStore.getGame().doubles,
			triples: GameStore.getGame().triples
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
