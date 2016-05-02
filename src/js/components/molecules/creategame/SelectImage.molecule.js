var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../styles/Buttons');
var UploadImage = require('./UploadImage.molecule.js');
var ImageList = require('./ImageList');
var Row = require('react-bootstrap').Row;
var LoginStore = require('../../../stores/LoginStore');
var Col = require('react-bootstrap').Col;

var SelectImage = React.createClass({
	getInitialState: function () {
		return {
			showModal: false,
			images: LoginStore.getLoginProfile() ? LoginStore.getLoginProfile().images : []
		};
	},
	componentDidMount: function () {
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		return (
			<div>
				<Modal ref='modal' show={this.state.showModal} onEnter={this.onEnter} onHide={this.onHide}>
					<Modal.Body>
						<h3>YOUR IMAGES</h3>
						<Row>
							<ImageList images = {this.state.images} onSelected={this.close}/>
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
				<Row><Col md={6}><Button onClick={this.open} type='button' style={ButtonStyle.MaginationFillParent}>+ Add image</Button></Col></Row>
			</div>
		);
	},
	close: function () {
		this.setState({ showModal: false });
	},
	open: function () {
		this.setState({ showModal: true });
	},
	onHide: function () {
		this.setState({ showModal: false });
	},
	onRequestSuccess: function (data) {
		this.setState({
			images: data
		});
	},
	onLoginStateChanged: function () {
		if (LoginStore.getLoginProfile() === null) return;
		this.setState({
			images: LoginStore.getLoginProfile().images
		});
	},
	refreshImageList: function () {
	}
});

module.exports = SelectImage;
