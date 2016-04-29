var React = require('react');
var ReactDOM = require('react-dom');
var ContainerStyles = require('../../../styles/Containers');
var TextStyles = require('../../../styles/Text');
var Glyphicon = require('react-bootstrap').Glyphicon;

var ImageCarousel = React.createClass({
	getInitialState: function () {
		return {
			index: 0,
			width: '10',
			height: '10'
		};
	},
	componentWillReceiveProps: function (nextProps) {
		var width = ReactDOM.findDOMNode(this).offsetWidth + 10;
		var height = nextProps.height - 10;
		var innerDivStyle = {
			width: (height > width) ? width : height,
			height: (height > width) ? width : height,
			margin: 'auto'
		};
		var chevronRightStyle = $.extend(true, {}, ContainerStyles.imgCarouselChevronContainer);
		chevronRightStyle.left = ((width * 80) / 100);
		chevronRightStyle.width = ((20 * width) / 100);
		chevronRightStyle.height = height;
		chevronRightStyle.paddingTop = (height / 2) - 50;
		var chevronLeftStyle = $.extend(true, {}, ContainerStyles.imgCarouselChevronContainer);
		chevronLeftStyle.width = ((20 * width) / 100);
		chevronLeftStyle.height = height;
		chevronLeftStyle.paddingTop = (height / 2) - 50;
		var divStyle = $.extend(true, {}, ContainerStyles.imgCarouselContainer);
		divStyle.height = nextProps.height;
		this.setState({
			width: width,
			height: height,
			innerDivStyle: innerDivStyle,
			divStyle: divStyle,
			chevronRightStyle: chevronRightStyle,
			chevronLeftStyle: chevronLeftStyle

		});
	},
	selectNextImage: function () {
		if (this.state.index + 1 >= this.props.imageUrls.length) {
			return;
		}
		this.setState({
			index: this.state.index + 1
		});
	},
	selectPreviousImage: function () {
		if (this.state.index - 1 <= -1) {
			return;
		}
		this.setState({
			index: this.state.index - 1
		});
	},
	render: function () {
		var stateIndex = this.state.index;
		var carouselItems = this.props.imageUrls.map(function (url, index) {
			var style = {
				maxHeight: '100%',
				maxWidth: '100%',
				minHeight: '100%',
				minWidth: '100%'
			};
			if (index !== stateIndex) {
				style.display = 'none';
			}
			return <img key={url} style={style} alt='There was an error loading the image' src={url}/>;
		});
		return (
			<div style={this.state.divStyle}>
				<div onClick={this.selectPreviousImage} style={this.state.chevronLeftStyle}>
					<h1 style={TextStyles.chevronGlyph}><Glyphicon glyph='chevron-left'/></h1>
				</div>
				<div onClick={this.selectNextImage} style={this.state.chevronRightStyle}>
					<h1 style={TextStyles.chevronGlyph}><Glyphicon glyph='chevron-right'/></h1>
				</div>
				<div style={this.state.innerDivStyle}>
					{carouselItems}
				</div>
			</div>
		);
	}
});

module.exports = ImageCarousel;
