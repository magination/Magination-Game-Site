var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var GameStore = require('../../stores/GameStore');
var GameAction = require('../../actions/GameAction');
var GameConstants = require('../../constants/GameConstants');
var LoginStore = require('../../stores/LoginStore');
var NavigationAction = require('../../actions/NavigationAction');
var NavigationStore = require('../../stores/NavigationStore');

var ButtonStyle = require('../../styles/Buttons');

var SaveGameModal = React.createClass({
	getInitialState: function () {
		return {
			showModal: false
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onGameFormClosed, GameConstants.GAME_FORM_CLOSED);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameFormClosed, GameConstants.GAME_FORM_CLOSED);
	},
	render: function () {
		return (
			<div>
				<Modal dialogClassName='custom-modal' ref='modal' show={this.state.showModal}>
					<Modal.Header>
						<Modal.Title>Unsaved changes</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>The game you were editing had some unsaved changes. Do you want to save the changes or delete the game?</h5>
					</Modal.Body>
					<Modal.Footer>
						<Button style={ButtonStyle.submit} onClick={this.onSaveClicked}>Save</Button>
						<Button style={ButtonStyle.goBack} onClick={this.onGoBackClicked}>Go back</Button>
						<Button style={ButtonStyle.delete} onClick={this.onDeleteClicked}>Delete</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
	onGameFormClosed: function () {
		this.setState({
			showModal: !GameStore.hasPromptedSave() && LoginStore.getLoginState().isLoggedIn
		});
	},
	onSaveClicked: function () {
		GameAction.saveGameAndResetGameStore();
		this.setState({ showModal: false });
	},
	onDeleteClicked: function () {
		GameAction.deleteGameFromServer();
		this.setState({ showModal: false });
	},
	onGoBackClicked: function () {
		NavigationAction.navigate({
			destination: NavigationStore.getNavigationState().lastPath
		});
		this.setState({ showModal: false });
	},
	close: function () {
		this.setState({ showModal: false });
	},
	open: function () {
		this.setState({showModal: true});
	}
});

module.exports = SaveGameModal;
