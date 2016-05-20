var React = require('react');
var Col = require('react-bootstrap').Col;
var GameStore = require('../../../../stores/GameStore');
var GameAction = require('../../../../actions/GameAction');
var AllowDropImageContainer = require('./AllowDropImageContainer');

var DragAndDropImageList = React.createClass({
	getInitialState: function () {
		return {
			images: GameStore.getGame() ? GameStore.getGame().images : []
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onImageListChanged);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onImageListChanged);
	},
	render: function () {
		var imageList = [];
		var position = 0;
		for (var i = 0; i < this.state.images.length; i++) {
			position = i;
			imageList.push(
				<Col md={3} key={i}>
					<AllowDropImageContainer onDeleteClicked={this.onDeleteClicked} imageDropped={this.imageDropped} image={this.state.images[position]} position={position} />
				</Col>
			);
		}
		return (
			<div>
				{imageList}
			</div>
		);
	},
	imageDropped: function (oldPosition, newPosition) {
		GameAction.changeImagePrioritizationLocally({
			oldPosition: oldPosition,
			newPosition: newPosition
		});
	},
	onImageListChanged: function () {
		this.setState({
			images: GameStore.getGame() ? GameStore.getGame().images : []
		});
	},
	onDeleteClicked: function (position) {
		GameAction.removeImageFromLocalGame({
			position: position
		});
	}
});
module.exports = DragAndDropImageList;
