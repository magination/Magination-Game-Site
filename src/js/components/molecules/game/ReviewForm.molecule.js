var React = require('react');

var LoginStore = require('../../../stores/LoginStore');
var URLS = require('../../../config/config').urls;

var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Modal = require('react-bootstrap').Modal;
var Rating = require('../browsegames/RateGame.molecule');

var ButtonStyles = require('../../../styles/Buttons');
var TextStyles = require('../../../styles/Text');

var ReviewForm = React.createClass({
	getInitialState: function () {
		return {
			rating: 0,
			reviewText: ''
		};
	},
	onRatingClicked: function (rating) {
		this.setState({
			rating: rating
		});
	},
	onHide: function () {
		this.props.onHide();
	},
	render: function () {
		return (
			<div>
					<Modal dialogClassName='custom-modal' show={this.props.show} onHide={this.onHide} animation={false}>
						<form onSubmit={this.onSubmitReview}>
							<Modal.Header>
								<Modal.Title>Write a Review</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Input style={TextStyles.textArea} type='textarea' value={this.state.reviewText} placeholder='Review Text' onChange={this.onReviewTextChanged}/>
								<Rating glyphStyle={ButtonStyles.RatingStar} maxRating='5' onRatingClicked={this.onRatingClicked} selectedImage='star' unselectedImage='star-empty'/>
							</Modal.Body>
							<Modal.Footer>
								<Button type='button' onClick={this.onHide}>Cancel</Button>
								<Button style={ButtonStyles.Magination} type='submit'>Submit</Button>
							</Modal.Footer>
						</form>
					</Modal>
			</div>
		);
	},
	onReviewTextChanged: function (e) {
		if (e.target.value.lenght > 5000) {
			return;
		}
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
