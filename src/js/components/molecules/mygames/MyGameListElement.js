var React = require('react');

var TextStyles = require('../../../styles/Text');
var Media = require('react-bootstrap').Media;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;
var ButtonStyles = require('../../../styles/Buttons');
var Colors = require('../../../styles/Colors');
var MyGamesAction = require('../../../actions/MyGamesAction');
var GameAction = require('../../../actions/GameAction');
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var CenteredImage = require('../../atoms/CenteredImage.atom');
var MyGameListElement = React.createClass({
	render: function () {
		return (
			<div>
				<Media>
					<Media.Left>
						<div style={{width: '200', height: '200'}}>
							<CenteredImage src={this.props.game.images[0]}/>
						</div>
					</Media.Left>
					<Media.Body>
						<h3>
							{this.props.game.title ? this.props.game.title : 'No title'}
						</h3>
						<h4>
							<Glyphicon style={TextStyles.blue} glyph='star'/> {toOneDecimal(this.props.game.rating)}
							<span style={{marginLeft: '30'}}/>
							<Glyphicon style={TextStyles.blue} glyph='user'/> {this.props.game.numberOfPlayers}{(this.props.game.isPlayableWithMorePlayers) ? '+' : ''}
						</h4>
						<div>
							<h4>Description:</h4>
							<p>{this.props.game.shortDescription ? this.props.game.shortDescription : 'No description'}</p>
						</div>
					</Media.Body>
                    <Media.Right>
						{this.props.hasPublishButton
							? <Button onClick={this.onPublishClicked} style={ButtonStyles.MyGames.myGamesButton(Colors.green)}><strong>Publish</strong></Button>
							: null}
						{this.props.hasEditButton
							? <Button onClick={this.onEditGameClicked} style={ButtonStyles.MyGames.myGamesButton(Colors.blue)}><strong>Edit</strong></Button>
							: null}
						{this.props.isPublished
							? <Button onClick={this.onUnPublishGameClicked} style={ButtonStyles.MyGames.myGamesButton(Colors.yellow)}><strong>Unpublish</strong></Button>
							: <Button onClick={this.onDeleteGameClicked} style={ButtonStyles.MyGames.myGamesButton(Colors.red)}><strong>Delete</strong></Button>}
                    </Media.Right>
				</Media>
				<hr/>
			</div>
		);
	},
	onPublishClicked: function () {
		MyGamesAction.publishGame(this.props.game._id);
		GameAction.removeGameLocally();
	},
	onEditGameClicked: function () {
		GameAction.changeGameLocally(this.props.game);
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.creategame
		});
	},
	onUnPublishGameClicked: function () {
		MyGamesAction.unPublishGame(this.props.game._id);
		GameAction.removeGameLocally();
	},
	onDeleteGameClicked: function () {
		MyGamesAction.deleteGame(this.props.game._id);
		GameAction.removeGameLocally();
	}
});

function toOneDecimal (number) {
	number *= 10;
	number = parseInt(number);
	return (number / 10);
}

module.exports = MyGameListElement;
