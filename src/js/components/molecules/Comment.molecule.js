var React = require('react');

var Media = require('react-bootstrap').Media;
var Input = require('react-bootstrap').Input;

var LoginStore = require('../../stores/LoginStore');
var URLS = require('../../config/config').urls;

var Comment = React.createClass({
	getInitialState: function () {
		return {
			isEditingComment: false,
			editingCommentText: this.props.comment.commentText,
			comment: this.props.comment
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			comment: nextProps.comment
		});
	},
	render: function () {
		var DeleteEditButton = <div/>;
		var MediaBody = <p>{this.state.comment.commentText}</p>;
		if (isThisUser(this.state.comment.owner._id)) {
			DeleteEditButton =
				<Media.Right>
							<a onClick={this.onDeleteCommentClick}>&times;</a>
							<a onClick={this.onEditClick}><i>Edit</i></a>
				</Media.Right>;
		}
		if (this.state.isEditingComment) {
			MediaBody =
				<form onSubmit={this.onEditCommentSubmit}>
					<Input
						value={this.state.editingCommentText}
						onChange={this.onEditValueChange}
						placeholder='Edit Comment'
						type='text'
					/>
				</form>;
		}
		return (
			<Media>
				<Media.Left>
					<img width={64} height={64} src='' alt='Profile Pic'/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>{this.state.comment.owner.username} <i>{this.state.comment.createdAt}</i></Media.Heading>
					{MediaBody}
				</Media.Body>
				{DeleteEditButton}
			</Media>
		);
	},
	onEditValueChange: function (e) {
		this.setState({
			editingCommentText: e.target.value
		});
	},
	onDeleteCommentClick: function (commentId) {
		$.ajax({
			type: 'DELETE',
			url: this.state.url + '/' + this.state.id + '/comments/' + commentId,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			dataType: 'json',
			statusCode: {
				200: this.onDeleteSuccessResponse
			}
		});
	},
	onEditClick: function (commentId) {
		this.setState({
			isEditingComment: !this.state.isEditingComment
		});
	},
	onEditCommentSubmit: function (e) {
		e.preventDefault();
		this.setState({
			isEditingComment: false
		});
		$.ajax({
			type: 'PUT',
			url: URLS.api.games + '/' + this.state.comment.game + '/comments/' + this.state.comment._id,
			data: JSON.stringify({
				commentText: this.state.editingCommentText
			}),
			'headers': {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				200: this.onEditCommentSuccessResponse
			}
		});
	},
	onEditCommentSuccessResponse: function (data) {
		this.setState({
			comment: data
		});
	},
	onDeleteSuccessResponse: function (data) {
		console.log(data);
		var newState = this.state.comments;
		$.each(newState, function (i) {
			if (newState[i]._id === data._id) {
				newState.splice(i, 1);
				return false;
			}
		});
		this.setState({
			comments: newState
		});
	}
});

function isThisUser (userId) {
	if (LoginStore.getLoginProfile() === null) {
		return false;
	}
	if (LoginStore.getLoginProfile()._id === userId) {
		return true;
	}
	return false;
}

module.exports = Comment;
