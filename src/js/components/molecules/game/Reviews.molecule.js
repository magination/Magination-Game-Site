var React = require('react');
var Review = require('./Review.molecule.js');
var Col = require('react-bootstrap').Col;
var ReviewForm = require('./ReviewForm.molecule');
var ButtonStyle = require('../../../styles/Buttons');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var TextStyles = require('../../../styles/Text');
var URLS = require('../../../config/config').urls;
var Reviews = React.createClass({
	getInitialState: function () {
		return {
			reviews: [],
			isShowingReviewForm: false,
			currentReviewPage: 0
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
		var fromIndex = (this.state.currentReviewPage * 5);
		var numberOfButtons = this.state.reviews.length / 5;

		var toIndex = fromIndex + 5;
		var reviews = this.state.reviews.slice(fromIndex, toIndex).map(function (review) {
			return <div key={review._id}><Review data={review}/><hr /></div>;
		});
		var reviewButtonNavigation = [];
		for (var i = 0; i < numberOfButtons; i++) {
			reviewButtonNavigation.push(<Button key={i} onClick={this.onReviewNavigationClicked.bind(this, i)}>{i + 1}</Button>);
		}
		return (
			<div>
				<h2 style={TextStyles.blueHeader}>Reviews</h2>
				<ReviewForm id={this.props.id} show={this.state.isShowingReviewForm} onHide={this.onModalHide}/>
				<Col md={8}>
					{reviews}
					<ButtonToolbar>
						<ButtonGroup>
							{reviewButtonNavigation}
						</ButtonGroup>
					</ButtonToolbar>
				</Col>
				<Col md={4}>
					<Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.Magination}>Write your own review</Button>
				</Col>
			</div>
		);
	},
	onReviewNavigationClicked: function (i) {
		this.setState({
			currentReviewPage: i
		});
	},
	onModalHide: function () {
		this.setState({
			isShowingReviewForm: false
		});
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
