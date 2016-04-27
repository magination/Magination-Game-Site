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
var RuleList = require('../molecules/creategame/RuleList');
var AlternativeRuleList = require('../molecules/creategame/AlternativeRuleList');
var TextStyle = require('../../styles/Text');
var ButtonStyle = require('../../styles/Buttons');
var Colors = require('../../styles/Colors');

var GameForm = React.createClass({
	getInitialState: function () {
		if (GameStore.getGame() !== null) {
			return {
				title: GameStore.getGame().title,
				game: GameStore.getGame()
			};
		}
		else {
			return {
				game: {},
				title: ''
			};
		}
	},
	componentDidMount () {

	},
	render: function () {
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<h3 className='text-center' style={TextStyle.blueHeader}>CREATE YOUR OWN GAME</h3>
					<h5>Upload your game idea!</h5>
					<hr/>
					<form className='form-game' onSubmit={this.submitGame}>
						<Row>
							<Col md={6}>
								<Input value={this.state.title} type='text' placeholder='GAME TITLE' onChange={this.onTitleChanged}/>
							</Col>
						</Row>
						<h3 style={TextStyle.blueHeader}>PLAYERS</h3>
						<Row>
							<Col md={3}>
								<ImageNumberPair value={this.state.game ? this.state.game.numberOfPlayers : 0} src={URLS.img.peopleBlue} placeholder='No. players' bindingProperty='numberOfPlayers'/>
							</Col>
						</Row>
						<Checkbox checked={false} description='Can be played with more players' bindingProperty='isPlayableWithMorePlayers'/>
						<br/>
						<Checkbox checked={false} description='Can be played in teams' bindingProperty='isPlayableInTeams'/>
						<hr/>
						<h3 style={TextStyle.blueHeader}>PIECES</h3>
						<Row>
							<Col md={3}>
								<ImageNumberPair value={this.state.game.pieces ? this.state.game.pieces.singles : 0} src={URLS.img.pieceSingleBlue} placeholder='No. singles' bindingCollection ='pieces' bindingProperty='singles'/>
								<ImageNumberPair value={this.state.game.pieces ? this.state.game.pieces.doubles : 0} src={URLS.img.pieceDoubleBlue} placeholder='No. doubles' bindingCollection ='pieces' bindingProperty='doubles'/>
								<ImageNumberPair value={this.state.game.pieces ? this.state.game.pieces.triples : 0} src={URLS.img.pieceTripleBlue} placeholder='No. triples' bindingCollection ='pieces' bindingProperty='triples'/>
							</Col>
						</Row>
						<Row>
							<Col md={8}>
								<HideableInput description='Need other objects' bindableTextProperty='otherObjects' placeholder='Separate with ","' />
							</Col>
						</Row>
						<hr/>
						<h3 style={TextStyle.blueHeader}>DESCRIPTION</h3>
						<Row>
							<Col md={8}>
								<GameDescriptionInput bindableTextProperty='shortDescription' placeholder='Describe your game!' maxLength={255} />
							</Col>
						</Row>
						<hr/>
						<h3 style={TextStyle.blueHeader}>RULES</h3>
						<Row>
							<Col md={8}>
								<RuleList propertyCollection='rules' listItemPlaceholder = 'Enter a rule' bindableTextProperty='rule' propertyCollection='rules'/>
							</Col>
						</Row>
						<hr/>
						<h3 style={TextStyle.blueHeader}>Alternative rules</h3>
						<Row>
							<Col md={8}>
								<AlternativeRuleList propertyCollection='alternativeRules' listItemPlaceholder = 'Enter a rule' bindableTextProperty='rule' propertyCollection='rules'/>
							</Col>
						</Row>
						<hr/>
						<Row>
							<Col md={2}>
								<Button style={ButtonStyle.Game.gameButton(Colors.red)}>CANCEL</Button>
							</Col>
							<Col md={2}>
								<Button style={ButtonStyle.Game.gameButton(Colors.blue)} onClick={this.onSaveClicked}>SAVE</Button>
							</Col>
							<Col md={2}>
								<Button style={ButtonStyle.Game.gameButton(Colors.yellow)}>PREVIEW</Button>
							</Col>
							<Col md={2}>
								<Button style={ButtonStyle.Game.gameButton(Colors.green)} onClick={this.onSubmitClicked}>PUBLISH</Button>
							</Col>
						</Row>
						<hr/>
					</form>
				</Col>
			</div>
		);
	},
	submitGame: function (e) {
		e.preventDefault();
		GameAction.storeGameToServer(GameStore.getGame());
	},
	onTitleChanged: function (e) {
		this.setState({
			title: e.target.value
		});
		GameAction.updateCurrentGameLocally({
			propertyName: 'title',
			propertyValue: e.target.value
		});
	},
	onSaveClicked: function () {
		console.log(GameStore.getGame());
	},
	onSubmitClicked: function () {
		GameAction.storeGameToServer();
	}
});

module.exports = GameForm;
