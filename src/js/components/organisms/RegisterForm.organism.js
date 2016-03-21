var React = require('react');
var NavigationAction = require('../../actions/NavigationAction');
var URLS = require('../../config/config').urls;

var RegisterForm = React.createClass({
	getInitialState: function(){
		return {
			username: "",
			email: "",
			password: "",
			passwordConfirm: ""
		};
	},
	handleEmailChange: function(e){
		this.setState({
			email: e.target.value
		});
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
	handlePasswordConfirmChange: function(e){
		this.setState({
			passwordConfirm: e.target.value
		});
	},
	render: function(){
		return(
			<div className="col-md-4 col-md-offset-4">
				<form className="form-signin" onSubmit={this._onSubmitForm}>
		        	<h2 className="form-signin-heading">Register</h2>
		        	<label htmlFor="inputEmail" className="sr-only">Email</label>
		        	<input value={this.state.email} onChange={this.handleEmailChange} type="email" id="inputUsername" className="form-control" placeholder="Email" required autofocus/>
		        	<label htmlFor="inputEmail" className="sr-only">Username</label>
		        	<input value={this.state.username} onChange={this.handleUsernameChange} type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus/>
		        	<label htmlFor="inputPassword" className="sr-only">Password</label>
		        	<input value={this.state.password} onChange={this.handlePasswordChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
		        	<label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
		        	<input value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange} type="password" id="inputConfirmPassword" className="form-control" placeholder="Confirm Password" required/>
		        	<button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
		        </form>
	        </div>	
		);
	},
	_onSubmitForm: function(e){
		e.preventDefault();

		if(this.state.password != this.state.passwordConfirm){
			return;
		}

		$.ajax({
			type: "POST",
		   	url: URLS.api.users,
			data: JSON.stringify({
				email: this.state.email,
		      	username: this.state.username,
		      	password: this.state.password
		   	}),
		   	contentType: "application/json",
		   	dataType: "json",
		   	statusCode: {
		   		409: function(){
		   			alert("Bad Request");
		   		},
    			500: function() {
      				alert( "Internal Server Error" );
    			},
    			200: this._onRequestSuccess
  			}
		});
	},
	_onRequestSuccess: function(data){
		NavigationAction.navigate({
			destination: 'login'
		});
	}
});

module.exports = RegisterForm;