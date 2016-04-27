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
			rating: (this.props.oldReview) ? this.props.oldReview.rating : 0,
			reviewText: (this.props.oldReview) ? this.props.oldReview.reviewText : ''
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			rating: (nextProps.oldReview) ? nextProps.oldReview.rating : 0,
			reviewText: (nextProps.oldReview) ? nextProps.oldReview.reviewText : ''
		});
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
		var deleteButton = (this.props.oldReview) ? <Button type='button' bsStyle='danger' onClick={this.onDeleteClicked}><strong>Delete</strong></Button> : <span/>;
		return (
			<div>
				<Modal dialogClassName='custom-modal' show={this.props.show} onHide={this.onHide}>
					<form onSubmit={this.onSubmitReview}>
						<Modal.Header>
							<Modal.Title>Write a Review</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Input style={TextStyles.textArea} type='textarea' value={this.state.reviewText} placeholder='Review Text' onChange={this.onReviewTextChanged}/>
							<Rating rating={this.state.rating} glyphStyle={ButtonStyles.RatingStar} maxRating='5' onRatingClicked={this.onRatingClicked} selectedImage='star' unselectedImage='star-empty'/>
						</Modal.Body>
						<Modal.Footer>
							<Button type='button' onClick={this.onHide}>Cancel</Button>
							{deleteButton}
							<Button style={ButtonStyles.Magination} type='submit'><strong>Save</strong></Button>
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		);
	},
	onReviewTextChanged: function (e) {
		if (e.target.value.length > 5000) {
			return;
		}
		this.setState({
			reviewText: e.target.value
		});
	},
	onDeleteClicked: function () {
		$.ajax({
			type: 'DELETE',
			url: URLS.api.games + '/' + this.props.id + '/reviews/' + this.props.oldReview._id,
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.onDeleteSuccessResponse
		});
	},
	onSubmitReview: function (e) {
		e.preventDefault();
		var requestType = 'POST';
		var url = URLS.api.games + '/' + this.props.id + '/reviews';
		if (this.props.oldReview) {
			requestType = 'PUT';
			url += '/' + this.props.oldReview._id;
		}
		$.ajax({
			type: requestType,
			url: url,
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
	onDeleteSuccessResponse: function (data) {
		if (this.props.onDeleteSuccess) {
			this.props.onDeleteSuccess(data);
		}
		this.onHide();
	},
	onPostReviewSuccess: function (data) {
		if (this.props.onEditSuccess) {
			this.props.onEditSuccess(data);
		}
		this.onHide();
	}
});

module.exports = ReviewForm;
