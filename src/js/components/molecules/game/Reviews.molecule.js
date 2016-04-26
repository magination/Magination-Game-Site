var React = require('react');

var LoginStore = require('../../../stores/LoginStore');
var Glyphicon = require('react-bootstrap').Glyphicon;
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
		LoginStore.addChangeListener(this.onLoginChanged);
		this.doGetReviews(this.props.id);
	},
	componentWillReceiveProps: function (nextProps) {
		this.doGetReviews(nextProps.id);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginChanged);
	},
	render: function () {
		var fromIndex = (this.state.currentReviewPage * 5);
		var numberOfButtons = this.state.reviews.length / 5;

		var toIndex = fromIndex + 5;
		var reviews = this.state.reviews.slice(fromIndex, toIndex).map(function (review) {
			return <div key={review._id}><Review data={review}/><hr /></div>;
		});
		var reviewButtonNavigation = [];
		if (numberOfButtons > 1) {
			for (var i = 0; i < numberOfButtons; i++) {
				reviewButtonNavigation.push(<Button key={i} onClick={this.onReviewNavigationClicked.bind(this, i)}>{i + 1}</Button>);
			}
		}
		var ownReview = (this.state.ownReview) ? <Review data={this.state.ownReview}/> : <div></div>;
		var editReviewButton = (this.state.ownReview) ? <Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.Magination}><Glyphicon glyph='pencil'/><strong> Edit Review</strong></Button> : <div/>;
		var createNewReviewButton = (!this.state.ownReview) ? <Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.Magination}><Glyphicon glyph='pencil'/><strong> Write your own review</strong></Button> : <div/>;
		return (
			<div>
				<Col md={8}>
					{ownReview}
				</Col>
				<Col md={4}>
					{editReviewButton}
				</Col>
				<Col md={12}>
					<h2 style={TextStyles.blueHeader}>Reviews</h2>
				</Col>
				<Col md={8}>
					{reviews}
					<ButtonToolbar>
						<ButtonGroup>
							{reviewButtonNavigation}
						</ButtonGroup>
					</ButtonToolbar>
				</Col>
				<Col md={4}>
					{createNewReviewButton}
				</Col>
				<ReviewForm id={this.props.id} onDeleteSuccess={this.onDeleteReviewSuccess} onEditSuccess={this.onEditReviewSuccess} show={this.state.isShowingReviewForm} onHide={this.onModalHide} oldReview={this.state.ownReview}/>
			</div>
		);
	},
	onEditReviewSuccess: function (ownReview) {
		this.setState({
			ownReview: ownReview
		});
	},
	onDeleteReviewSuccess: function () {
		this.setState({
			ownReview: null
		});
	},
	doGetReviews: function (id) {
		if (id === undefined) {
			return;
		}
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/' + id + '/reviews',
			contentType: 'application/json',
			dataType: 'json',
			success: this.onGetReviewsSuccess
		});
		if (!LoginStore.getLoginState()) {
			return;
		}
		$.ajax({
			type: 'GET',
			url: URLS.api.games + '/' + id + '/reviews' + '?userId=' + LoginStore.getLoginProfile()._id,
			contentType: 'application/json',
			dataType: 'json',
			success: this.onGetOwnReviewSuccess
		});
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
	onGetOwnReviewSuccess: function (data) {
		this.setState({
			ownReview: data
		});
	},
	onGetReviewsSuccess: function (data) {
		if (data.reviews === undefined) {
			console.log('Got success from getReviews, but the data is malformed');
			return;
		}
		var reviews = removeOwnReview(data.reviews);
		reviews.reverse();
		this.setState({
			reviews: reviews
		});
	},
	onLoginChanged: function () {
		this.doGetReviews(this.props.id);
	}
});

function removeOwnReview (array) {
	if (!array) {
		return;
	}
	if (LoginStore.getLoginState()) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].owner._id === LoginStore.getLoginProfile()._id) {
				array.splice(i, 1);
				return array;
			}
		}
	}
	return array;
}

module.exports = Reviews;
