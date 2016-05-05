var React = require('react');
var GameStore = require('../../../stores/GameStore');
var SelectImage = require('./SelectImage.molecule.js');
var GameCreatorModal = require('../../organisms/GameCreatorModal.organism');
var SelectedImageList = require('./SelectedImageList.molecule');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Images = React.createClass({
	getInitialState: function () {
		return {
			images: GameStore.getGame().images
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		return (
			<div>
				<Row>
					<SelectedImageList images = {this.state.images} />
				</Row>
				<Row>
					<Col md={6}>
						<SelectImage ref='selectImageModal'/>
					</Col>
					<Col md={6}>
						<GameCreatorModal ref='createImageModal'/>
					</Col>
				</Row>
			</div>
		);
	},
	onAddImageClicked: function () {
		this.refs.selectImageModal.show = true;
	},
	onCreateYourOwnButtonClicked: function () {
		this.refs.createImageModal.show = true;
	},
	onGameStateChanged: function () {
		this.setState({
			images: GameStore.getGame().images
		});
	}
});
module.exports = Images;
