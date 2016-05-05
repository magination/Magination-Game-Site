var React = require('react');

var Modal = require('react-bootstrap').Modal;
var GameCreator = require('../atoms/GameCreator.atom.js');

var GameCreatorModal = React.createClass({
	getInitialState: function () {
		return {
			show: false
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			show: nextProps.show
		});
	},
	render: function () {
		return (
			<Modal show={this.state.show} onHide={this.onHide} dialogClassName='gamecreator-modal'>
				<Modal.Body>
					<GameCreator />
				</Modal.Body>
			</Modal>
		);
	},
	onHide: function () {
		this.setState({
			show: false
		});
	}
});

module.exports = GameCreatorModal;
