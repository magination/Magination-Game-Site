var React = require('react');

var NavigationStore = require('../../stores/NavigationStore');

var URLS = require('../../config/config').urls;

function getLastUrlId(){
	var url = NavigationStore.getNavigationState().currentPath.pathname;
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
		   		200: function(){alert("Success!");},
		   		500: function(){alert("Server Error: see console");console.log(data)}
		   	}
		});
	},
	render: function(){
		return(
			<div>{this.state.status}</div>
		)
	}
});

module.exports = ConfirmEmail;