var React = require('react');
var SelectImage = require('./SelectImage.molecule.js');
var GameCreatorModal = require('../../../organisms/GameCreatorModal.organism.js');
var DragAndDropImageList = require('./DragAndDropImageList');
var Col = require('react-bootstrap').Col;

var Images = React.createClass({
	render: function () {
		return (
			<div>
				<Col md={12}>
					<h5>Add images to describe your game. Drag an image on top of another one to swap places.</h5>
				</Col>
				<DragAndDropImageList/>
				<Col md={12}>
					{/* Force new line */}
				</Col>
				<Col md={4}>
					<SelectImage ref='selectImageModal'/>
				</Col>
				<Col md={4}>
					<GameCreatorModal ref='createImageModal'/>
				</Col>
			</div>
		);
	},
	onAddImageClicked: function () {
		this.refs.selectImageModal.show = true;
	},
	onCreateYourOwnButtonClicked: function () {
		this.refs.createImageModal.show = true;
	}
});
module.exports = Images;
