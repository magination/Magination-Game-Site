var React = require('react');

var Media = require('react-bootstrap').Media;
var ImgSrc = require('../../../config/config').urls.img;
var Rating = require('../browsegames/RateGame.molecule');
var ButtonStyles = require('../../../styles/Buttons');

var CenteredImage = require('../../atoms/CenteredImage.atom');

var Review = React.createClass({
	propTypes: {
		data: React.PropTypes.any.isRequired
	},
	render: function () {
		return (
			<div>
				<Media>
					<Media.Left>
						<div style={{width: 128, height: 128}}>
							<CenteredImage src={ImgSrc.person_male} alt='Profile Pic'/>
						</div>
					</Media.Left>
					<Media.Body>
						<Media.Heading>{this.props.data.owner.username}</Media.Heading>
						<Rating glyphStyle={ButtonStyles.RatingStar} maxRating='5' rating={this.props.data.rating} isStatic selectedImage='star' unselectedImage='star-empty'/>
						<p>{this.props.data.reviewText}</p>
					</Media.Body>
				</Media>
			</div>
		);
	}
});

module.exports = Review;
