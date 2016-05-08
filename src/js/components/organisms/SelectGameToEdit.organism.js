var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var MyGamesStore = require('../../stores/MyGamesStore');
var GameStore = require('../../stores/GameStore');
var ButtonStyle = require('../../styles/Buttons');
var MyGameList = require('../molecules/mygames/MyGamesList.molecule');
var SelectGameToEdit = React.createClass({
	getInitialState: function () {
		return {
			showModal: false
		};
	},
	componentDidMount: function () {
		MyGamesStore.addChangeListener(this.onMyGamesStateChanged);
		GameStore.addChangeListener(this.onGamesStateChanged);
		if (MyGamesStore.getUnpublishedGames()) {
			this.setState({
				showModal: ((MyGamesStore.getUnpublishedGames().length > 0) && !GameStore.hasSelectedGameToEdit())
			});
		}
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGamesStateChanged);
		MyGamesStore.removeChangeListener(this.onMyGamesStateChanged);
	},
	render: function () {
		return (
			<div>
				<Modal ref='modal' show={this.state.showModal} onEnter={this.onEnter}>
					<Modal.Body>
						<h5>It seems like you are already editing some games. Select a game to continue editing it, or click the "create new" button to create a new game.</h5>
						<br/>
						<Button style={ButtonStyle.CreateNewGame} onClick={this.createNewGameClicked}><strong>Create a new game</strong></Button>
						<hr/>
						<h5 style={{width: '100%', textAlign: 'center'}}>Or select a game below to continue editing it</h5>
						<MyGameList isPublished={false} hasEditButton={true} hasPublishButton={false}/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Hide</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},

	onHide: function () {
		this.setState({
			showModal: false
		});
	},
	close: function () {
		this.setState({
			showModal: false
		});
	},
	createNewGameClicked: function () {
		this.setState({
			showModal: false
		});
	},
	onMyGamesStateChanged: function () {
		this.setState({
			showModal: (MyGamesStore.getUnpublishedGames().length > 0 && !GameStore.hasSelectedGameToEdit())
		});
	},
	onGamesStateChanged: function () {
		this.setState({
			showModal: (MyGamesStore.getUnpublishedGames().length > 0 && !GameStore.hasSelectedGameToEdit())
		});
	}
});

module.exports = SelectGameToEdit;
