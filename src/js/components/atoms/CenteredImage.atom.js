var React = require('react');
var ContainerStyle = require('../../styles/Containers');

var ImageList = React.createClass({
	render: function () {
		return (
			<div style={ContainerStyle.imageList.aspectOneToOne.outerBorderLess}>
				<div style={ContainerStyle.imageList.aspectOneToOne.inner}>
					<img src={this.props.src} style={ContainerStyle.imageList.aspectOneToOne.img} alt='No image'/>
				</div>
			</div>
		);
	}
});
module.exports = ImageList;
