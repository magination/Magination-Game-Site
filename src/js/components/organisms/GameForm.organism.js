var React = require('react');
var URLS = require('../../config/config').urls;
var ImageNumberPair = require('../molecules/ImageNumberPair.molecule');
var GameStore = require('../../stores/GameStore');
var GameAction = require('../../actions/GameAction');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Checkbox = require('../atoms/game/Checkbox.atom');
var HideableInput = require('../molecules/HideableInput.molecule');
var GameDescriptionInput = require('../molecules/GameDescriptionInput.molecule');

var GameForm = React.createClass({
	getInitialState: function () {
		if (GameStore.getGame()) {
			return {
				game: GameStore.getGame()
			};
		}
		else {
			return {
				game: {
					title: '',
					description: '',
					singles: '0',
					doubles: '0',
					triples: '0',
					players: '0'
				}
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
					<h3 className='text-center'>CREATE YOUR OWN GAME</h3>
					<h5>Some text about that</h5>
					<hr/>
					<form className='form-game' onSubmit={this.postGame}>
						<Row>
							<Col md={6}>
								<Input value={this.state.game.title} type='text' placeholder='GAME TITLE' onChange={this.onTitleChanged}/>
							</Col>
						</Row>
						<h4>PLAYERS</h4>
						<Row>
							<Col md={3}>
								<ImageNumberPair value={this.state.game.players} src={URLS.img.peopleBlue} placeholder='No. players' bindingProperty='players'/>
							</Col>
						</Row>
						<Checkbox checked={this.state.game.isPlayableWithMorePlayers} description='Can be played with more players' bindingProperty='isPlayableWithMorePlayers'/>
						<br/>
						<Checkbox checked={this.state.game.isPlayableInTeams} description='Can be played in teams' bindingProperty='isPlayableInTeams'/>
						<Row>
							<Col md={3}>
								<h4>PIECES</h4>
								<ImageNumberPair value={this.state.game.singles} src={URLS.img.pieceSingleBlue} placeholder='No. singles' bindingProperty='singles'/>
								<ImageNumberPair value={this.state.game.doubles} src={URLS.img.pieceDoubleBlue} placeholder='No. doubles' bindingProperty='doubles'/>
								<ImageNumberPair value={this.state.game.triples} src={URLS.img.pieceTripleBlue} placeholder='No. triples' bindingProperty='triples'/>
							</Col>
						</Row>
						<Row>
							<Col md={8}>
								<HideableInput description='Need other objects' bindableBooleanProperty='isNeedOtherObjects' bindableTextProperty='otherObjectsString' placeholder='Separate with ","' />
							</Col>
						</Row>
						<hr/>
						<h4>DESCRIPTION</h4>
						<Row>
							<Col md={8}>
								<GameDescriptionInput bindableTextProperty='gameDescription' placeholder='Describe your game!' maxLength={255} />
							</Col>
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
	onTitleChanged: function (e) {
		this.setState({
			title: e.target.value
		});
	},
	onGameStateChanged: function () {
		this.setState({
			game: GameStore.getGame()
		});
	}
});

module.exports = GameForm;
