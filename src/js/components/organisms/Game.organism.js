var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');

var Media = require('react-bootstrap').Media;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
// var GameRating = require('GameRating');

function shouldRequestGame () {
	var data = NavigationStore.getNavigationState.data;
	if (data === undefined) {
		return true;
	}
	if (data.game === undefined) {

	}
	return false;
}

var Game = React.createClass({
	getInitialState: function () {
		return {
			game: null,
			comments: [
				{
					username: 'Simo',
					commentText: 'Dette er sykt bra jobba gutta!'
				}
			]
		};
	},
	componentWillMount: function () {
		if (shouldRequestGame()) {
			/* request game*/
		}
		else {
			/* shouldRequestGame checks if game is defined*/
			this.setState({
				game: NavigationStore.getNavigationState.data.game
			});
		}

		/* GET COMMENTS*/
	},
	render: function () {
		var count = -1;
		var comments = this.state.comments.map(function (comment) {
			count++;
			return (
				<Media key={count}>
					<Media.Left>
						<img width={64} height={64} src='/public/img/magination-logo.png' alt='Image'/>
					</Media.Left>
					<Media.Body>
						<Media.Heading>{comment.username}</Media.Heading>
						<p>{comment.commentText}</p>
					</Media.Body>
				</Media>
			);
		});
		return (
			<div>
				<strong>Title: </strong>{this.props.title}
				<strong>Description: </strong>{this.props.description}
				<strong>Author: </strong>{this.props.owner}
				<h3>Comments</h3>
				<form onSubmit={this.onSubmitComment}>
					<Input type='textarea' value={this.state.commentText} onChange={this.onCommentTextChange} />
					<Button type='submit'>Comment</Button>
				</form>
				<Media.List>
					<Media.ListItem>
						{comments}
					</Media.ListItem>
				</Media.List>
			</div>
		);
	},
	onSubmitComment: function (e) {
		e.preventDefault();
		console.log(this.state.commentText);
	},
	onCommentTextChange: function (e) {
		this.setState({
			commentText: e.target.value
		});
	}
});
module.exports = Game;
