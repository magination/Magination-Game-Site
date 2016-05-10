var React = require('react');

var LoginStore = require('../../../stores/LoginStore');
var LoginAction = require('../../../actions/LoginAction');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Review = require('./Review.molecule.js');
var Col = require('react-bootstrap').Col;
var ReviewForm = require('./ReviewForm.molecule');
var ButtonStyle = require('../../../styles/Buttons');
var Button = require('react-bootstrap').Button;
var Row = require('react-bootstrap').Row;
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
		/* Checks if the review list has changed, if it has, refetch the reviews */
		var that = this;
		if (nextProps.reviews.every(function (reviewId, index) {
			if (reviewId === that.props.reviews[index]) {
				return true;
			}
			return false;
		}) && this.props.reviews.length === nextProps.reviews.length) {
			return;
		}
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
		var editReviewButton = (this.state.ownReview) ? <Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.MaginationGameViewButton}><Glyphicon glyph='pencil'/> EDIT REVIEW</Button> : <div/>;
		var createNewReviewButton = (!this.state.ownReview) ? <Button onClick={this.onWriteReviewClicked} type='button' style={ButtonStyle.MaginationGameViewButton}><Glyphicon glyph='pencil'/> WRITE A REVIEW</Button> : <div/>;
		return (
			<div>
				<Row>
					<Col md={this.props.leftWidth} mdOffset={this.props.offset}>
						{ownReview}
					</Col>
					<Col md={this.props.rightWidth}>
						{editReviewButton}
					</Col>
					<Col md={this.props.offset}>
					</Col>
				</Row>
				<Row>
					<Col md={this.props.leftWidth} mdOffset={this.props.offset}>
						<h2 style={TextStyles.gameView.paddingLessHeader}>Reviews</h2>
					</Col>
					<Col md={this.props.rightWidth} style={{textAlign: 'right'}}>
						{createNewReviewButton}
					</Col>
					<Col md={this.props.offset}>
					</Col>
				</Row>
				<Row>
					<Col md={this.props.leftWidth} mdOffset={this.props.offset}>
						{reviews}
						<ButtonToolbar>
							<ButtonGroup>
								{reviewButtonNavigation}
							</ButtonGroup>
						</ButtonToolbar>
					</Col>
					<Col md={12 - this.props.leftWidth - this.props.offset}>
					</Col>
				</Row>
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
		if (!LoginStore.getLoginState().isLoggedIn) {
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
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
			return;
		}
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
		if (LoginStore.getLoginState().isLoggedIn) {
			this.doGetReviews(this.props.id);
		}
	}
});

function removeOwnReview (array) {
	if (!array) {
		return;
	}
	if (LoginStore.getLoginState().isLoggedIn) {
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
