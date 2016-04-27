var React = require('react');
var Modal = require('react-bootstrap').Modal;
var NavigationStore = require('../../../stores/NavigationStore');
var ShareGame = React.createClass({
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
			<Modal dialogClassName='custom-modal' show={this.state.show} onHide={this.onHide}>
				<Modal.Header>
					<Modal.Title>Share this game!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					should be here
					<div className='fb-share-button' data-href={NavigationStore.getNavigationState().currentPath} data-layout='button' data-mobile-iframe='true'></div>
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

module.exports = ShareGame;
