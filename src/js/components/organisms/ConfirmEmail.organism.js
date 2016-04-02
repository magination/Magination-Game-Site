var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');
var Link = require('react-router').Link;
var URLS = require('../../config/config').urls;
var FeedbackAction = require('../../actions/FeedbackAction');

function getLastUrlId(){
	var url = NavigationStore.getNavigationState().currentPath;
	/*returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

var ConfirmEmail = React.createClass({
	getInitialState: function(){
		return {
			status: "Processing"
		};
	},
	componentWillMount: function(){
		getLastUrlId();
		$.ajax({
			type: "POST",
		   	url: URLS.api.confirmation +"/"+getLastUrlId(),
		   	dataType: "json",
		   	statusCode: {
		   		200: this.onConfirmationSuccessResponse,
		   		400: this.onConfirmationBadRequestResponse,
		   		500: FeedbackAction.displayInternalServerError
		   	}
		});
	},
	render: function(){
		return(
			<div className="text-center">{this.state.status}</div>
		)
	},
	onConfirmationSuccessResponse: function(data){
		this.setState({
			status: <div>The email was successfully confirmed. You can now <Link to="/login">Log in here</Link> using your email or username</div>
		});
	},
	onConfirmationBadRequestResponse: function(data){
		this.setState({
			status: <div>The id you have used is not valid. It has either already been confirmed, or it has expired. Please <Link to="/register">Register here</Link></div>
		});
	}

});

module.exports = ConfirmEmail;