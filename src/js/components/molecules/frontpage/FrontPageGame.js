var React = require('react');

var CenteredImage = require('../../atoms/CenteredImage.atom');

var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var ContainerStyles = require('../../../styles/Containers');
var TextStyles = require('../../../styles/Text');
var FrontPageGameContainer = React.createClass({
	getInitialState: function () {
		return {
			gameContainerStyle: ContainerStyles.FrontPage.FrontPageGame.container
		};
	},
	render: function () {
		return (
			<div style={this.state.gameContainerStyle} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onGameClick}>
				<h4 style={TextStyles.blue}>{this.props.game.title}</h4>
				<CenteredImage src={this.props.game.images[0]} aspect='twoToOne'/>
				<h4 style={TextStyles.blue}>{this.props.game.shortDescription.length > 30 ? this.props.game.shortDescription.substring(0, 27) + '...' : this.props.game.shortDescription}</h4>
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