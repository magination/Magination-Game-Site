var React = require('react');

var GameCreatorStore = require('../../stores/GameCreatorStore');
var GameCreatorConstants = require('../../constants/GameCreatorConstants');

var Modal = require('react-bootstrap').Modal;
var GameCreator = require('../atoms/GameCreator.atom.js');
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../styles/Buttons');

var GameCreatorModal = React.createClass({
	getInitialState: function () {
		return {
			show: false
		};
	},
	componentWillReceiveProps: function (nextProps) {
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPngAddedToGame, GameCreatorConstants.PNG_ADDED_TO_GAME);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPngAddedToGame, GameCreatorConstants.PNG_ADDED_TO_GAME);
	},
	render: function () {
		return (
			<div>
				<Button onClick={this.onCreateYourOwnClicked} type='button' style={ButtonStyle.MaginationFillParent}>CREATE YOUR OWN</Button>
				<Modal enforceFocus={false} show={this.state.show} onHide={this.onHide} dialogClassName='gamecreator-modal'>
					<Modal.Body>
						<GameCreator />
					</Modal.Body>
				</Modal>
			</div>
		);
	},
	onHide: function () {
		this.setState({
			show: false
		});
	},
	onPngAddedToGame: function () {
		this.onHide();
	},
	onCreateYourOwnClicked: function () {
		this.setState({
			show: true
		});
	}
});

module.exports = GameCreatorModal;
