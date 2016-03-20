var React = require('react');

var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var LoginAction = require('../../actions/LoginAction');
var URLS = require('../../config/config').urls;

var Cookie = require('react-cookie');

var LoginForm = React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: ""
		};
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
			        <Link to="register">Register</Link>
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
		   success: this._onRequestSuccess
		});
	},
	_onRequestSuccess: function(data){
		LoginAction.loginSuccess({
			value: data.token
		});
		/* Happens in the dispatcher as default to browse
			browserHistory.push('browse');
		*/
	}
});
module.exports = LoginForm;