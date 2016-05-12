var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var MyGamesStore = require('../../stores/MyGamesStore');
var MyGamesAction = require('../../actions/MyGamesAction');
var GameStore = require('../../stores/GameStore');
var GameAction = require('../../actions/GameAction');
var ButtonStyle = require('../../styles/Buttons');
var MyGameList = require('../molecules/mygames/MyGamesList.molecule');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationConstants = require('../../constants/NavigationConstants');
var NavigationStore = require('../../stores/NavigationStore');
var LoginStore = require('../../stores/LoginStore');
var GameService = require('../../service/GameService');
var SelectGameToEdit = React.createClass({
	getInitialState: function () {
		return {
			showModal: false
		};
	},
	componentDidMount: function () {
		if (LoginStore.getLoginState().isLoggedIn && MyGamesStore.getUnpublishedGames()) {
			this.shouldShowModal();
		}
		MyGamesStore.addChangeListener(this.onMyGamesStateChanged);
		LoginStore.addChangeListener(this.onLoginStateChanged);
		GameStore.addChangeListener(this.onGameStoreStateChanged);
		MyGamesAction.requestUnpublishedGames();
	},
	componentWillUnmount: function () {
		MyGamesStore.removeChangeListener(this.onMyGamesStateChanged);
		LoginStore.removeChangeListener(this.onLoginStateChanged);
		GameStore.removeChangeListener(this.onGameStoreStateChanged);
	},
	render: function () {
		return (
			<div>
				<Modal ref='modal' show={this.state.showModal} onEnter={this.onEnter} onHide={this.onHide}>
					<Modal.Body>
						<h5>It seems like you are already editing some games. Select a game to continue editing it, or click the "create new" button to create a new game.</h5>
						<br/>
						<Button style={ButtonStyle.CreateNewGame} onClick={this.onCreateNewGameClicked}><strong>Create a new game</strong></Button>
						<hr/>
						<h5 style={{width: '100%', textAlign: 'center'}}>Select a game below to continue editing it</h5>
						<MyGameList isPublished={false} hasEditButton={true} hasPublishButton={false}/>
					</Modal.Body>
				</Modal>
			</div>
		);
	},
	onHide: function () {
		if (NavigationConstants.isLegalDestination(LoginStore.getLoginState().isLoggedIn, NavigationStore.getNavigationState().lastPath)) {
			NavigationAction.navigate({
				destination: NavigationStore.getNavigationState().lastPath
			});
			return;
		}
		else {
			NavigationAction.navigate({
				destination: NavigationConstants.PATHS.discover
			});
		}
	},
	onCreateNewGameClicked: function () {
		this.createNewGame();
	},
	createNewGame: function () {
		GameAction.changeGameLocally(GameService.createEmptyGame());
		setTimeout(GameAction.autoSaveGameToServer(), 0);
		this.setState({
			showModal: false
		});
	},
	shouldShowModal: function () {
		if (MyGamesStore.getUnpublishedGames()) {
			if (MyGamesStore.getUnpublishedGames().length === 0) {
				this.createNewGame();
			}
			else {
				this.setState({
					showModal: ((MyGamesStore.getUnpublishedGames().length > 0) && !GameStore.hasSelectedGameToEdit())
				});
			}
		}
	},
	onLoginStateChanged: function () {
		MyGamesAction.requestUnpublishedGames();
	},
	onMyGamesStateChanged: function () {
		this.shouldShowModal();
	},
	onGameStoreStateChanged: function () {
		this.shouldShowModal();
	}
});

module.exports = SelectGameToEdit;
