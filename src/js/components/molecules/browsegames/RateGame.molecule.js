var React = require('react');
var RatingIcon = require('../../atoms/RatingIcon.js');
var Col = require('react-bootstrap').Col;

var RateGame = React.createClass({
	getInitialState () {
		return {
			rating: this.props.isStatic ? this.props.rating : 1
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
				ratingIcons.push(<RatingIcon key={i} selectedImage={this.props.selectedImage} unselectedImage={this.props.unselectedImage} isSelected={this.state.rating > i - 1}/>);
			}
			else {
				ratingIcons.push(<RatingIcon key={i} selectedImage={this.props.selectedImage} unselectedImage={this.props.unselectedImage} isSelected={this.state.rating > i - 1} onClick={this.onRatingClicked} onMouseOver={this.onIconHovered.bind(this, i)} onMouseLeave={this.onIconUnhovered}/>);
			}
		}
		return (
			<div>
				<Col md={4} mdOffset={5}>
					{ratingIcons}
				</Col>
			</div>
		);
	},
	onRatingClicked: function () {
		this.props.ratingSelected(this.state.rating);
	}
});
module.exports = RateGame;
