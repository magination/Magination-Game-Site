var React = require('react');

var Media = require('react-bootstrap').Media;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var LoginStore = require('../../stores/LoginStore');

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
			return (
				<Media key={count}>
					<Media.Left>
						<img width={64} height={64} src='/public/img/magination-logo.png' alt='Profile Pic'/>
					</Media.Left>
					<Media.Body>
						<Media.Heading>{comment.owner.username}</Media.Heading>
						<p>{comment.commentText}</p>
					</Media.Body>
					<Media.Right>
						<a onClick={that.onDeleteCommentClick.bind(that, comment._id)}>&times;</a>
					</Media.Right>
				</Media>
			);
		});
		return (
			<div>
				<h3>Comments</h3>
				<form onSubmit={this.onSubmitComment}>
					<Input type='textarea' value={this.state.commentText} onChange={this.onCommentTextChange} />
					<Button type='submit'>Comment</Button>
				</form>
				{comments}
			</div>
		);
	},
	onSubmitComment: function (e) {
		e.preventDefault();
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
	},
	onCommentTextChange: function (e) {
		this.setState({
			commentText: e.target.value
		});
	},
	onDeleteCommentClick: function (commentId) {
		$.ajax({
			type: 'DELETE',
			url: this.props.url + '/' + this.props.id + '/comments/' + commentId,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			dataType: 'json',
			statusCode: {
				200: this.onDeleteSuccessResponse
			}
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
	}
});

module.exports = Comments;
