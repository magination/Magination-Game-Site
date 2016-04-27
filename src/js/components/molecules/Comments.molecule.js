var React = require('react');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var LoginStore = require('../../stores/LoginStore');
var Comment = require('./Comment.molecule');

var Comments = React.createClass({
	getInitialState: function () {
		return {
			commentText: '',
			comments: []
		};
	},
	componentDidMount: function () {
		if (this.props.id === undefined) {
			return;
		}
		$.ajax({
			type: 'GET',
			url: this.props.url + '/' + this.props.id + '/comments',
			dataType: 'json',
			statusCode: {
				200: this.onGetCommentsSuccessResponse
			}
		});
	},
	componentWillReceiveProps: function (nextProps) {
		if (nextProps.id === undefined) {
			return;
		}
		$.ajax({
			type: 'GET',
			url: nextProps.url + '/' + nextProps.id + '/comments',
			dataType: 'json',
			statusCode: {
				200: this.onGetCommentsSuccessResponse
			}
		});
	},
	render: function () {
		var count = 0;
		var that = this;
		var comments = this.state.comments.map(function (comment) {
			count++;
			return <Comment key={count} comment={comment} onDeleteSuccess={that.deleteIdFromState}/>;
		});
		return (
			<div>
				<h3>Comments</h3>
				<form onSubmit={this.onSubmitComment}>
					<Input
						type='text' value={this.state.commentText}
						onChange={this.onCommentTextChange}
						disabled={!LoginStore.getLoginState().isLoggedIn}
						placeholder={LoginStore.getLoginState().isLoggedIn ? 'Write a comment' : 'You need to be logged in to comment'}
					/>
					<Button type='submit'>Comment</Button>
				</form>
				{comments}
			</div>
		);
	},
	onSubmitComment: function (e) {
		e.preventDefault();
		if (this.state.commentText === '') {
			return;
		}
		$.ajax({
			type: 'POST',
			url: this.props.url + '/' + this.props.id + '/comments',
			data: JSON.stringify({
				commentText: this.state.commentText
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			statusCode: {
				201: this.onCommentSubmitSuccessResponse
			}
		});
		this.setState({
			commentText: ''
		});
	},
	onCommentTextChange: function (e) {
		this.setState({
			commentText: e.target.value
		});
	},
	onGetCommentsSuccessResponse: function (data) {
		this.setState({
			comments: data.comments
		});
	},
	onCommentSubmitSuccessResponse: function (data) {
		this.setState({
			comments: this.state.comments.concat([data])
		});
	},
	deleteIdFromState: function (commentId) {
		var newState = this.state.comments;
		$.each(newState, function (i) {
			if (newState[i]._id === commentId) {
				newState.splice(i, 1);
				return false;
			}
		});
		this.setState({
			comments: newState
		});
	}
});

module.exports = Comments;
