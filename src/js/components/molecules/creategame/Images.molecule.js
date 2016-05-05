var React = require('react');
var GameStore = require('../../../stores/GameStore');
var SelectImage = require('./SelectImage.molecule.js');
var GameCreatorModal = require('../../organisms/GameCreatorModal.organism');
var SelectedImageList = require('./SelectedImageList.molecule');
var ButtonStyle = require('../../../styles/Buttons');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var Images = React.createClass({
	getInitialState: function () {
		return {
			images: GameStore.getGame().images,
			isShowingSelectImage: false,
			isShowingGameCreator: false
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
				<SelectImage show={this.state.isShowingSelectImage}/>
				<GameCreatorModal show={this.state.isShowingGameCreator}/>
				<Row>
					<Col md={6}>
						<Button onClick={this.onAddImageClicked} type='button' style={ButtonStyle.MaginationFillParent}>+ Add image</Button>
					</Col>
					<Col md={6}>
						<Button onClick={this.onCreateYourOwnButtonClicked} type='button' style={ButtonStyle.MaginationFillParent}>Create Your Own</Button>
					</Col>
				</Row>
			</div>
		);
	},
	onAddImageClicked: function () {
		this.setState({
			isShowingSelectImage: true
		});
	},
	onCreateYourOwnButtonClicked: function () {
		this.setState({
			isShowingGameCreator: true
		});
	},
	onGameStateChanged: function () {
		this.setState({
			images: GameStore.getGame().images
		});
	}
});
module.exports = Images;
