var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Row = require('react-bootstrap').Row;
var UploadImage = require('./UploadImage.molecule.js');
var ImageList = require('./ImageList');
var ButtonStyle = require('../../../../styles/Buttons');

var SelectImage = React.createClass({
	getInitialState: function () {
		return {
			showModal: false,
			activeKey: 1
		};
	},
	render: function () {
		return (
			<div>
				<Button onClick={this.onAddImageClicked} type='button' style={ButtonStyle.MaginationFillParent}>ADD IMAGE</Button>
				<Modal ref='modal' show={this.state.showModal} onEnter={this.onEnter} onHide={this.onHide} dialogClassName='selectimage-modal'>
					<Modal.Body>
						<Tabs activeKey={this.state.activeKey} onSelect={this.onTabSelected}>
							<Tab eventKey={1} title='Your images'>
								<Row>
									<ImageList onSelected={this.close}/>
								</Row>
							</Tab>
							<Tab eventKey={2} title='Upload an image'>
								<UploadImage onImageSubmitted={this.onImageSubmitted}/>
							</Tab>
						</Tabs>
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
	onAddImageClicked: function () {
		this.setState({showModal: true});
	},
	onImageSubmitted: function () {
		this.setState({
			activeKey: 1
		});
	},
	onTabSelected: function (selectedTabKey) {
		this.setState({
			activeKey: selectedTabKey
		});
	}
});

module.exports = SelectImage;
