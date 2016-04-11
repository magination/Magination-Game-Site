var React = require('react');

var Media = require('react-bootstrap').Media;
// var GameRating = require('GameRating');

var Game = React.createClass({
	getInitialState: function () {
		return {
			comments: [
				{
					username: 'Simo',
					commentText: 'Dette er sykt bra jobba gutta!'
				}
			]
		};
	},
	render: function () {
		var comments = this.state.comments.map(function (comment) {
			return (
				<Media>
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
				{comments}
			</div>
		);
	}
});
module.exports = Game;
