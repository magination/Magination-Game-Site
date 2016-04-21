var React = require('react');

var LoginStore = require('../../../stores/LoginStore');
var URLS = require('../../../config/config').urls;

var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var ReviewForm = React.createClass({
	getInitialState: function () {
		return {
			rating: 2,
			reviewText: ''
		};
	},
	render: function () {
		return (
			<div>
				<form onSubmit={this.onSubmitReview}>
					<Input type='text' value={this.state.reviewText} placeholder='Review Text' onChange={this.onReviewTextChanged}/>
					<Button type='submit'>Submit</Button>
				</form>
			</div>
		);
	},
	onReviewTextChanged: function (e) {
		this.setState({
			reviewText: e.target.value
		});
	},
	onSubmitReview: function (e) {
		e.preventDefault();
		console.log(this.state.rating);
		console.log(this.state.reviewText);
		$.ajax({
			type: 'POST',
			url: URLS.api.games + '/' + this.props.id + '/reviews',
			data: JSON.stringify({
				rating: this.state.rating,
				reviewText: this.state.reviewText
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onPostReviewSuccess
		});
	},
	onPostReviewSuccess: function (data) {
		console.log(data);
	}
});

module.exports = ReviewForm;
