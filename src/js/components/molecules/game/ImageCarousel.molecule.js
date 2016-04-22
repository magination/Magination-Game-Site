var React = require('react');

var Carousel = require('react-bootstrap').Carousel;

var ImageCarousel = React.createClass({
	getInitialState: function () {
		return {
			index: 0,
			direction: null
		};
	},
	handleSelect: function (selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
	},
	render: function () {
		var carouselItems = this.props.imageUrls.map(function (url) {
			return <Carousel.Item key={url}>
						<img style={{margin: 'auto', minHeight: '272', borderRadius: '5'}} width={500} height={500} alt='Could not find the image' src={url}/>
					</Carousel.Item>;
		});
		return (
			<Carousel style={{height: '100%', width: '100%'}} activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				{carouselItems}
			</Carousel>
		);
	}
});

module.exports = ImageCarousel;
