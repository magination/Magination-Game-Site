var React = require('react');
var RatingIcon = require('../../atoms/RatingIcon');
var TextStyles = require('../../../styles/Text');

var RateGame = React.createClass({
	getInitialState () {
		return {
			rating: (this.props.rating) ? this.props.rating : 0,
			selectedRating: (this.props.rating) ? this.props.rating : 0
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			rating: nextProps.rating,
			selectedRating: nextProps.rating
		});
	},
	onIconHovered (id) {
		this.setState({
			rating: id
		});
	},
	onMouseLeave: function () {
		this.setState({
			rating: this.state.selectedRating
		});
	},
	onRatingClicked: function () {
		this.props.onRatingClicked(this.state.rating);
		this.setState({
			selectedRating: this.state.rating
		});
	},
	render: function () {
		var ratingIcons = [];
		for (var i = 1; i <= this.props.maxRating; i++) {
			if (this.props.isStatic) {
				ratingIcons.push(
					<RatingIcon
						key={i}
						selectedImage={this.props.selectedImage}
						unselectedImage={this.props.unselectedImage}
						isSelected={this.state.rating > i - 1}
						glyphStyle={this.props.glyphStyle}
					/>
				);
			}
			else {
				ratingIcons.push(
					<RatingIcon
						key={i}
						selectedImage={this.props.selectedImage}
						unselectedImage={this.props.unselectedImage}
						isSelected={this.state.rating > i - 1}
						onClick={this.onRatingClicked}
						onMouseOver={this.onIconHovered.bind(this, i)}
						onMouseLeave={this.onMouseLeave}
						glyphStyle={this.props.glyphStyle}
					/>
				);
			}
		}
		return (
			<div style={TextStyles.FrontPage.gamePreviewStarContainer}>
				{ratingIcons}
			</div>
		);
	}
});
module.exports = RateGame;
