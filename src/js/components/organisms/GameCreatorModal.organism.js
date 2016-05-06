var React = require('react');

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
	render: function () {
		return (
			<div>
				<Button onClick={this.onCreateYourOwnClicked} type='button' style={ButtonStyle.MaginationFillParent}>Create Your Own</Button>
				<Modal show={this.state.show} onHide={this.onHide} dialogClassName='gamecreator-modal'>
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
	onCreateYourOwnClicked: function () {
		this.setState({
			show: true
		});
	}
});

module.exports = GameCreatorModal;
