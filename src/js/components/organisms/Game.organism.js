var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');
var URLS = require('../../config/config.js').urls;
var LoginStore = require('../../stores/LoginStore');

var Media = require('react-bootstrap').Media;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
// var GameRating = require('GameRating');

function shouldRequestGame () {
	var data = NavigationStore.getNavigationState().data;
	if (data === null || data === undefined) {
		return true;
	}
	if (data.game === undefined) {
		return true;
	}
	return false;
}

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

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
	componentDidMount: function () {
		if (shouldRequestGame()) {
			$.ajax({
				type: 'GET',
				url: URLS.api.games + '/' + getLastUrlId(),
				dataType: 'json',
				statusCode: {
					200: this.onGetGameSuccessResponse,
					404: this.onGetGameNotFoundResponse,
					500: function () {
						alert('Server Error: see console');
					}
				}
			});
		}
		else {
			/* shouldRequestGame checks if game is defined*/
			this.setState({
				game: NavigationStore.getNavigationState().data.game
			});
			$.ajax({
				type: 'GET',
				url: URLS.api.games + '/' + NavigationStore.getNavigationState().data.game._id + '/comments',
				dataType: 'json',
				statusCode: {
					200: this.onGetCommentsSuccessResponse,
					404: this.onGetCommentsNotFoundResponse,
					500: function () {
						alert('Server Error: see console');
					}
				}
			});
		}
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
		$.ajax({
			type: 'POST',
			url: URLS.api.games + '/' + this.state.game._id + '/comments',
			data: JSON.stringify({
				commentText: this.state.commentText
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onCommentSubmitSuccessResponse,
				401: alert('401'),
				404: alert('404')
			}
		});
	},
	onCommentTextChange: function (e) {
		this.setState({
			commentText: e.target.value
		});
	},
	onGetGameSuccessResponse: function (data) {
		console.log(data);
		this.setState({
			game: data
		});
	},
	onGetGameNotFoundResponse: function (data) {
		console.log(data);
	},
	onGetCommentsSuccessResponse: function (data) {
		console.log(data);
	},
	onCommentSubmitSuccessResponse: function (data) {
		console.log(data);
	}
});
module.exports = Game;
