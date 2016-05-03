var React = require('react');
var GameStore = require('../../../stores/GameStore');
var SelectImage = require('./SelectImage.molecule.js');
var SelectedImageList = require('./SelectedImageList.molecule');
var Row = require('react-bootstrap').Row;

var Images = React.createClass({
	getInitialState: function () {
		return {
			images: GameStore.getGame().images,
			isShowSelectImage: false
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
				<Row><SelectedImageList images = {this.state.images} /></Row>
				<SelectImage/>
			</div>
		);
	},
	onGameStateChanged: function () {
		this.setState({
			images: GameStore.getGame().images
		});
	}
});
module.exports = Images;
