var React = require('react');
var ContainerStyle = require('../../styles/Containers');

var ImageList = React.createClass({
	render: function () {
		var image = this.getAspectStyle();
		return (
			<div>
				{image}
			</div>
		);
	},
	getAspectStyle: function () {
		switch (this.props.aspect) {
		case 'twoToOne':
			return (
				<div style={ContainerStyle.imageList.aspectTwoToOne.outerBorderLess}>
					<div style={ContainerStyle.imageList.aspectTwoToOne.inner}>
						<img src={this.props.src} style={ContainerStyle.imageList.aspectTwoToOne.img} alt='No image'/>
					</div>
				</div>
			);
		default:
			return (
				<div style={ContainerStyle.imageList.aspectOneToOne.outerBorderLess}>
					<div style={ContainerStyle.imageList.aspectOneToOne.inner}>
						<img src={this.props.src} style={ContainerStyle.imageList.aspectOneToOne.img} alt='No image'/>
					</div>
				</div>
			);
		}
	}
});

module.exports = ImageList;
