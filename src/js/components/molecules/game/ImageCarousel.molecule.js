var React = require('react');
var ReactDOM = require('react-dom');
var ContainerStyles = require('../../../styles/Containers');
var TextStyles = require('../../../styles/Text');
var Colors = require('../../../styles/Colors');
var Glyphicon = require('react-bootstrap').Glyphicon;

var ImageCarousel = React.createClass({
	getInitialState: function () {
		return {
			index: 0,
			width: '400',
			height: '400'
		};
	},
	componentWillReceiveProps: function (nextProps) {
		var width = ReactDOM.findDOMNode(this).offsetWidth;
		var border = 10;
		var fontSize = 50;
		var height = nextProps.height;
		var innerDivStyle = {
			width: (height > width) ? (width - border) : (height - border),
			height: (height > width) ? (width - border) : (height - border),
			margin: 'auto'
		};
		var chevronRightStyle = $.extend(true, {}, ContainerStyles.imgCarouselChevronContainer);
		chevronRightStyle.left = ((width * 85) / 100) + border;
		chevronRightStyle.width = ((15 * width) / 100);
		chevronRightStyle.height = height - border;
		chevronRightStyle.paddingTop = (height / 2) - fontSize;
		var chevronLeftStyle = $.extend(true, {}, ContainerStyles.imgCarouselChevronContainer);
		chevronLeftStyle.width = ((15 * width) / 100);
		chevronLeftStyle.height = height - border;
		chevronLeftStyle.paddingTop = (height / 2) - fontSize;
		var divStyle = $.extend(true, {}, ContainerStyles.imgCarouselContainer);
		divStyle.height = nextProps.height;
		divStyle.textAlign = 'center';
		this.setState({
			width: width,
			height: height,
			innerDivStyle: innerDivStyle,
			divStyle: divStyle,
			chevronRightStyle: chevronRightStyle,
			chevronLeftStyle: chevronLeftStyle
		});
	},
	componentDidMount: function () {
		$(window).resize(this.onResizeEvent);
	},
	componentWillUnmount: function () {
		$(window).unbind('resize');
	},
	render: function () {
		var stateIndex = this.state.index;
		var carouselItems = this.props.imageUrls.map(function (url, index) {
			var style = {
				maxHeight: '100%',
				maxWidth: '100%',
				minWidth: '80%',
				minHeight: '80%',
				marginRight: 'auto',
				marginLeft: 'auto'
			};
			if (index !== stateIndex) {
				style.display = 'none';
			}
			return <img key={url} style={style} alt='There was an error loading the image' src={url}/>;
		});
		return (
			<div style={this.state.divStyle}>
				<div onMouseEnter={this.onMouseEnterChevron.bind(this, 'left', true)} onMouseLeave={this.onMouseEnterChevron.bind(this, 'left', false)} hidden={this.state.index === 0} onClick={this.selectPreviousImage} style={this.state.chevronLeftStyle}>
					<h1 style={TextStyles.chevronGlyph}><Glyphicon glyph='chevron-left'/></h1>
				</div>
				<div onMouseEnter={this.onMouseEnterChevron.bind(this, 'right', true)} onMouseLeave={this.onMouseEnterChevron.bind(this, 'right', false)} hidden={this.state.index === this.props.imageUrls.length - 1 || this.props.imageUrls.length === 0} onClick={this.selectNextImage} style={this.state.chevronRightStyle}>
					<h1 style={TextStyles.chevronGlyph}><Glyphicon glyph='chevron-right'/></h1>
				</div>
				<div style={this.state.innerDivStyle}>
					{carouselItems}
				</div>
			</div>
		);
	},
	onMouseEnterChevron: function (direction, showAlteredBackground) {
		var newStyle = {};
		if (direction === 'right') {
			newStyle = $.extend(true, {}, this.state.chevronRightStyle);
			if (showAlteredBackground) {
				newStyle.background = 'linear-gradient(to right, white , ' + Colors.lightCyan + ')';
			}
			else {
				newStyle.background = 'linear-gradient(to right, white , ' + 'white' + ')';
			}
			this.setState({
				chevronRightStyle: newStyle
			});
		}
		if (direction === 'left') {
			newStyle = $.extend(true, {}, this.state.chevronLeftStyle);
			if (showAlteredBackground) {
				newStyle.background = 'linear-gradient(to right, ' + Colors.lightCyan + ' , white)';
			}
			else {
				newStyle.background = 'linear-gradient(to right, white , ' + 'white' + ')';
			}
			this.setState({
				chevronLeftStyle: newStyle
			});
		}
	},
	onMouseLeave: function () {

	},
	onResizeEvent: function () {
		this.componentWillReceiveProps(this.props);
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
	}
});

module.exports = ImageCarousel;
