var React = require('react');

var LoginAction = require('../../actions/LoginAction');
var LoginStore = require('../../stores/LoginStore');
var URLS = require('../../config/config').urls;
var browserHistory = require('react-router').browserHistory;
var NavigationAction = require('../../actions/NavigationAction');
var Cookie = require('react-cookie');

function getLoginState(){
	return LoginStore.getLoginState();
}

var LoginForm = React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: ""
		};
	},
	componentWillMount: function(){
		
	},
	handleUsernameChange: function(e){
		this.setState({
			username: e.target.value
		});
	},
	handlePasswordChange: function(e){
		this.setState({
			password: e.target.value
		});
	},
	render: function(){
		return(
			<div className="col-md-4 col-md-offset-4">
				<form className="form-signin" onSubmit={this._onSubmitForm}>
		        	<h2 className="form-signin-heading">Please sign in</h2>
		        	<label htmlFor="inputEmail" className="sr-only">Username/Email</label>
		        	<input value={this.state.username} onChange={this.handleUsernameChange} type="text" id="inputEmail" className="form-control" placeholder="Username/Email" required autofocus/>
		        	<label htmlFor="inputPassword" className="sr-only">Password</label>
		        	<input value={this.state.password} onChange={this.handlePasswordChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
		        	<button className="btn btn-lg btn-primary btn-block" type="submit">Login </button>
		        </form>
	        </div>
		);
	},
	_onSubmitForm: function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
		   	url: URLS.api.login,
			data: JSON.stringify({
		      username: this.state.username,
		      password: this.state.password
		   }),
		   contentType: "application/json",
		   dataType: "json",
		   success: this._onLoginRequestSuccess
		});
	},
	_onLoginRequestSuccess: function(data){
		LoginAction.loginSuccess({
			token: data.token
		});
		$.ajax({
			type: "GET",
		   	url: URLS.api.users+"/"+data.id,
		   	dataType: "json",
		   	headers: {
		        'Authorization': + data.token,
    		},
		   	statusCode: {
		   		200: this._onGetUserResponse,
		   		401: this._onBadTokenResponse,
		   		500: function(){alert("Server Error: see console");console.log(data)}
		   	}
		});
	},
	_onGetUserResponse: function(data){
		LoginAction.setLoginProfile({
			profile: data
		});
		NavigationAction.navigateToPrevious();
	},
	_onBadTokenResponse: function(data){
		alert('Error: see console');
		console.log(data);
	}
});
module.exports = LoginForm;