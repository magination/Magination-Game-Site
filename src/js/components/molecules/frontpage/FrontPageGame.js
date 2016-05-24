var React = require('react');

var CenteredImage = require('../../atoms/CenteredImage.atom');
var Rating = require('../browsegames/RateGame.molecule');

var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var ContainerStyles = require('../../../styles/Containers');
var TextStyles = require('../../../styles/Text');
var ButtonStyles = require('../../../styles/Buttons');
var FrontPageGameContainer = React.createClass({
	getInitialState: function () {
		return {
			gameContainerStyle: ContainerStyles.FrontPage.FrontPageGame.container
		};
	},
	render: function () {
		return (
			<div style={this.state.gameContainerStyle} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onGameClick}>
				<div style={ContainerStyles.FrontPage.FrontPageGame.imageContainer}>
					<CenteredImage src={this.props.game.images[0]} aspect='oneToOne'/>
				</div>
				<h3 style={TextStyles.white}>{this.props.game.title}</h3>
				<h4 style={TextStyles.white}>By: {this.props.game.owner.username}</h4>
				<Rating isStatic maxRating={5} rating={this.props.game.rating} glyphStyle={ButtonStyles.RatingStarWhite} selectedImage='star' unselectedImage='star-empty'/>
			</div>
		);
	},
	onMouseOver: function () {
		this.setState({
			gameContainerStyle: ContainerStyles.FrontPage.FrontPageGame.containerHovered
		});
	},
	onMouseOut: function () {
		this.setState({
			gameContainerStyle: ContainerStyles.FrontPage.FrontPageGame.container
		});
	},
	onGameClick: function () {
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.game + '/' + this.props.game._id
		});
	}
});

module.exports = FrontPageGameContainer;
