var React = require('react');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;

var URLS = require('../../config/config').urls;
var TextStyle = require('../../styles/Text');
var ButtonStyle = require('../../styles/Buttons');
var Colors = require('../../styles/Colors');
var NavigationPaths = require('../../constants/NavigationConstants').PATHS;

var ImageNumberPair = require('../molecules/creategame/ImageNumberPair.molecule.js');
var Checkbox = require('../atoms/game/Checkbox.atom');
var HideableInput = require('../molecules/creategame/HideableInput.molecule.js');
var GameDescriptionInput = require('../molecules/creategame/GameDescriptionInput.molecule.js');
var RuleList = require('../molecules/creategame/RuleList');
var AlternativeRuleList = require('../molecules/creategame/AlternativeRuleList');
var AutoSave = require('../../service/AutoSave.service.js');
var ButtonWithTooltip = require('../atoms/ButtonWithTooltip');
var ConfirmButton = require('../atoms/ConfirmButton');
var Images = require('../molecules/creategame/Images/Images.molecule.js');

var GameStore = require('../../stores/GameStore');
var GameAction = require('../../actions/GameAction');
var GameConstants = require('../../constants/GameConstants');
var MyGamesAction = require('../../actions/MyGamesAction');
var NavigationAction = require('../../actions/NavigationAction');

var GameForm = React.createClass({
	getInitialState: function () {
		return {
			game: GameStore.getGame(),
			isAvailableGameName: undefined,
			showSaveGameModal: false
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onGameStateChanged);
		GameStore.addChangeListener(this.onGameNameAvailabilityChanged, GameConstants.CHECK_NAME_AVAILABILITY);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameStateChanged);
		GameStore.removeChangeListener(this.onGameNameAvailabilityChanged, GameConstants.CHECK_NAME_AVAILABILITY);
		GameStore.emitChange(GameConstants.GAME_FORM_CLOSED);
		GameAction.setHasSelectedGameToEdit(false);
	},
	render: function () {
		return (
			<div>
				<Col md={10} mdOffset={1}>
						<h1 ref='header' style={TextStyle.blueHeader}>CREATE YOUR OWN GAME</h1>
					<hr/>
					<Row>
						<Col md={4}>
							<Input value={this.state.game.title} bsStyle={this.state.isAvailableGameName ? 'success' : 'error'} type='text' ref='gameTitle' placeholder='TITLE' onChange={this.onTitleChanged} onBlur={this.onTitleUnfocused} hasFeedback/>
						</Col>
						<Col md={8} style={{paddingLeft: 0}}>
							{<h5 style={this.state.isAvailableGameName ? TextStyle.green : TextStyle.red}>{this.getGameNameFeedbackMessage()}</h5>}
						</Col>
					</Row>
					<h3>PLAYERS</h3>
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
							<GameDescriptionInput ref='gameDescription' bindableTextProperty='shortDescription' placeholder='Describe your game!' maxLength={255} />
						</Col>
					</Row>
					<hr/>
					<h3 style={TextStyle.blueHeader}>RULES</h3>
					<Row>
						<Col md={8}>
							<RuleList ref='rules' propertyCollection='rules' listItemPlaceholder = 'Enter a rule' bindableTextProperty='rule' propertyCollection='rules'/>
						</Col>
					</Row>
					<hr/>
					<h3 style={TextStyle.blueHeader}>ALTERNATIVE RULES</h3>
					<Row>
						<Col md={8}>
							<AlternativeRuleList propertyCollection='alternativeRules' listItemPlaceholder = 'Enter a rule' bindableTextProperty='rule' propertyCollection='rules'/>
						</Col>
					</Row>
					<hr/>
					<h3 style={TextStyle.blueHeader}>IMAGES</h3>
					<Row>
						<Images/>
					</Row>
					<br/>
					<hr/>
					<Row>
						<Col md={2}>
							<ConfirmButton confirmationDialog='This action will delete the game and any changes you have made to it, and exit the editor. Do you want to continue?' style={ButtonStyle.Game.gameButton(Colors.red)} onClick={this.onCancelClicked} placement='top' buttonText='CANCEL'/>
						</Col>
						<Col md={2}>
							<ButtonWithTooltip style={ButtonStyle.Game.gameButton(Colors.blue)} onClick={this.onSaveClicked} tooltip='Save your game so you can come back later and finish it.' buttonText='SAVE'/>
						</Col>
						<Col md={2}>
							<ButtonWithTooltip style={ButtonStyle.Game.gameButton(Colors.yellow)} onClick={this.onPreviewClicked} tooltip='See how your game will look once published!' buttonText='PREVIEW'/>
						</Col>
						<Col md={2}>
							<ButtonWithTooltip style={ButtonStyle.Game.gameButton(Colors.green)} onClick={this.onPublishClicked} tooltip='Publish your game for everyone to see!' buttonText='PUBLISH'/>
						</Col>
					</Row>
					<hr/>
				</Col>
			</div>
		);
	},
	onGameStateChanged: function () {
		this.setState({
			game: GameStore.getGame()
		});
	},
	onTitleChanged: function (e) {
		GameAction.updateCurrentGameLocally({
			propertyName: 'title',
			propertyValue: e.target.value
		});
	},
	onTitleUnfocused: function () {
		GameAction.checkNameAvailability(this.state.game.title);
		AutoSave();
	},
	onSaveClicked: function () {
		GameAction.saveGameToServer(true);
	},
	onPreviewClicked: function () {
		NavigationAction.navigate({
			destination: '/game/preview',
			data: {
				game: this.state.game
			}
		});
	},
	onPublishClicked: function () {
		if (this.gameIsValid()) {
			GameAction.publishGameToServer();
		}
	},
	onCancelClicked () {
		GameAction.createNewGameLocally();
		if (this.state.game_id) MyGamesAction.deleteGame(this.state.game._id);
		GameAction.setHasSelectedGameToEdit(false);
		NavigationAction.navigate({
			destination: NavigationPaths.discover
		});
	},
	onSelectGameToEditClicked: function () {
		GameAction.setHasSelectedGameToEdit(false);
	},
	gameIsValid: function () {
		var game = GameStore.getGame();
		if (!game.title) {
			this.refs.gameTitle.refs.input.focus();
			return false;
		}
		if (!game.shortDescription) {
			this.refs.gameDescription.focusInput();
			return false;
		}
		return true;
	},
	onGameNameAvailabilityChanged: function () {
		this.setState({
			isAvailableGameName: GameStore.isAvailableGameName()
		});
	},
	getGameNameFeedbackMessage: function () {
		if (this.state.isAvailableGameName === undefined) {
			return '';
		}
		if (this.state.isAvailableGameName) {
			return 'Name available!';
		}
		return 'Name already taken';
	}
});

module.exports = GameForm;
