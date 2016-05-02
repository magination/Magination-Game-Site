var React = require('react');
var ContainerStyle = require('../../../styles/Containers');
var GameAction = require('../../../actions/GameAction');

var ImageList = React.createClass({
	getInitialState: function () {
		return {
			images: this.props.images ? this.props.images : []
		};
	},
	render: function () {
		var images = [];
		var styles = [ContainerStyle.imageContainer.maginationBorderLeft, ContainerStyle.imageContainer.maginationBorderCenter, ContainerStyle.imageContainer.maginationBorderRight];
		for (var i = 0; i < this.state.images.length; i++) {
			var currentIteration = i;
			var imageUrl = this.state.images[currentIteration];
			images.push(
				<span key={i} style={styles[i % 3]}>
					<img style={ContainerStyle.image.imageList} src={imageUrl} onClick={this.onImageSelected.bind(this, currentIteration)}/>
				</span>
			);
		}
		return (
			<div style={ContainerStyle.imageContainer.imageListContainer}>
				{images}
			</div>
		);
	},
	onImageSelected (position) {
		GameAction.addImageToLocalGame({
			image: this.state.images[position]
		});
		this.props.onSelected();
	}
});
module.exports = ImageList;
