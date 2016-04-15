var React = require('react');
var RatingIcon = require('../../atoms/RatingIcon');

var RateGame = React.createClass({
	getInitialState () {
		return {
			rating: this.props.isStatic ? this.props.rating : 3
		};
	},

	onIconHovered (id) {
		this.setState({
			rating: id
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
						onClick={this.props.onRatingClicked.bind(this, this.state.rating)}
						onMouseOver={this.onIconHovered.bind(this, i)}
					/>
				);
			}
		}
		return (
			<div>
				{ratingIcons}
			</div>
		);
	}
});
module.exports = RateGame;
