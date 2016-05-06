var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var UploadImage = require('./UploadImage.molecule.js');
var ImageList = require('./ImageList');
var Row = require('react-bootstrap').Row;
var ButtonStyle = require('../../../styles/Buttons');

var SelectImage = React.createClass({
	getInitialState: function () {
		return {
			showModal: false
		};
	},
	render: function () {
		return (
			<div>
				<Button onClick={this.onAddImageClicked} type='button' style={ButtonStyle.MaginationFillParent}>+ Add image</Button>
				<Modal ref='modal' show={this.state.showModal} onEnter={this.onEnter} onHide={this.onHide}>
					<Modal.Body>
						<h3>YOUR IMAGES</h3>
						<h5>Click an image to add it to the list. If you have no images, upload one below!</h5>
						<Row>
							<ImageList onSelected={this.close}/>
						</Row>
						<hr/>
						<h3>UPLOAD AN IMAGE</h3>
						<br/>
						<UploadImage onSubmitted={this.refreshImageList}/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
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
	onRequestSuccess: function (data) {
		this.setState({
			images: data
		});
	},
	onAddImageClicked: function () {
		this.setState({showModal: true});
	}
});

module.exports = SelectImage;
