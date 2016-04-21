var React = require('react');
var Review = require('./Review.molecule.js');
var Col = require('react-bootstrap').Col;
var Collapse = require('react-bootstrap').Collapse;
var ReviewForm = require('./ReviewForm.molecule');
var ButtonStyle = require('../../../styles/Buttons');
var Button = require('react-bootstrap').Button;
var TextStyles = require('../../../styles/Text');
var URLS = require('../../../config/config').urls;
var Reviews = React.createClass({
	getInitialState: function () {
		return {
			reviews: [],
			isShowingReviewForm: false
		};
	},
	componentDidMount: function () {
		if (this.props.id === undefined) {
			return;
		}
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/' + this.props.id + '/reviews',
			contentType: 'application/json',
			dataType: 'json',
			success: this.onGetReviewsSuccess
		});
	},
	componentWillReceiveProps: function (nextProps) {
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/' + nextProps.id + '/reviews',
			contentType: 'application/json',
			dataType: 'json',
			success: this.onGetReviewsSuccess
		});
	},
	render: function () {
		var reviews = this.state.reviews.map(function (review) {
			return <Review key={review._id} data={review}/>;
		});
		return (
			<div>
				<h2 style={TextStyles.blueHeader}>Reviews</h2>
				<Collapse in={this.state.isShowingReviewForm}>
					<div>
						<ReviewForm id={this.props.id}/>
					</div>
				</Collapse>
				<Col md={8}>
					{reviews}
				</Col>
				<Col md={4}>
					<Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.Magination}>Write your own review</Button>
				</Col>
			</div>
		);
	},
	onWriteReviewClicked: function () {
		this.setState({
			isShowingReviewForm: !this.state.isShowingReviewForm
		});
	},
	onGetReviewsSuccess: function (data) {
		if (data.reviews === undefined) {
			console.log('Got success from getReviews, but the data is malformed');
			return;
		}
		this.setState({
			reviews: data.reviews
		});
	}
});

module.exports = Reviews;
