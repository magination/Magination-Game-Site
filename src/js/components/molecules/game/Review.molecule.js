var React = require('react');

var Media = require('react-bootstrap').Media;
var ImgSrc = require('../../../config/config').urls.img;

var Review = React.createClass({
	propTypes: {
		data: React.PropTypes.any.isRequired
	},
	render: function () {
		return (
			<div>
				<Media>
					<Media.Left>
						<img width={64} height={64} src={ImgSrc.pieceSingleBlue} alt='Profile Pic'/>
					</Media.Left>
					<Media.Body>
						<Media.Heading>{this.props.data.owner.username}</Media.Heading>
						{this.props.data.reviewText}
					</Media.Body>
				</Media>
			</div>
		);
	}
});

module.exports = Review;
