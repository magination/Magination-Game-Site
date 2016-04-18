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
			comment: this.props.comment,
			replyCommentText: '',
			isViewingReplies: false
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			comment: nextProps.comment
		});
	},
	render: function () {
		var DeleteEditButton = <div />;
		var mediaBody = <p>{this.state.comment.commentText}</p>;
		var replies = <div/>;
		var replyForm = <div/>;
		if (isThisUser(this.state.comment.owner._id)) {
			DeleteEditButton =
				<Media.Right>
					<a href='#' onClick={this.onDeleteCommentClick}><i>Delete</i></a>
					<a href='#' onClick={this.onEditClick}><i>Edit</i></a>
				</Media.Right>;
		}
		if (this.state.isEditingComment) {
			mediaBody =
				<form onSubmit={this.onEditCommentSubmit}>
					<Input
						value={this.state.editingCommentText}
						onChange={this.onEditValueChange}
						placeholder='Edit Comment'
						type='text'
					/>
				</form>;
		}
		if (this.state.isViewingReplies) {
			var count = 0;
			replies = this.state.comment.childComments.map(function (comment) {
				count++;
				return <Comment key={count} comment={comment}/>;
			});
			replyForm =
				<Media>
					<Media.Body>
						<Media.Heading>Reply</Media.Heading>
						<form onSubmit={this.onSubmitReplyComment}>
							<Input type='text' onChange={this.onReplyEntryChanged}/>
						</form>
					</Media.Body>
				</Media>;
		}
		return (
			<Media>
				<Media.Left>
					<img width={64} height={64} src='' alt='Profile Pic'/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>{this.state.comment.owner.username} <small><i>{getDateSmallFormat(this.state.comment.createdAt)}</i></small></Media.Heading>
					{mediaBody}
					{replyForm}
					{replies}
				</Media.Body>
				<Media.Right>
					{DeleteEditButton}
					<a href='#' onClick={this.showChildComments}>Reply</a>
				</Media.Right>
			</Media>
		);
	},
	onSubmitReplyComment: function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: URLS.api.comments + '/' + this.state.comment._id,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			data: {
				commentText: this.state.replyCommentText
			},
			dataType: 'json',
			statusCode: {
				201: this.onSubmitReplySuccessResponse
			}
		});
	},
	onSubmitReplySuccessResponse: function (data) {
		this.setState({
			comment: data
		});
	},
	onReplyEntryChanged: function (e) {
		this.setState({
			replyCommentText: e.target.value
		});
	},
	showChildComments: function () {
		this.setState({
			isViewingReplies: !this.state.isViewingReplies
		});
	},
	onEditValueChange: function (e) {
		this.setState({
			editingCommentText: e.target.value
		});
	},
	onDeleteCommentClick: function () {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.games + '/' + this.state.comment.game + '/comments/' + this.state.comment._id,
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
		this.props.onDeleteSuccess(data._id);
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

function getDateSmallFormat (jsondate) {
	var date = new Date(jsondate);
	return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear() + ' - ' + (date.getHours() + 1) + ':' + (date.getMinutes() + 1);
}

module.exports = Comment;
